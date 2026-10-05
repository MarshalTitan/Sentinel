import { inflateRawSync } from "node:zlib";

const fourPartVersion = /^\d+\.\d+\.\d+\.\d+$/;
const requiredTextFields = [
  "Author",
  "Name",
  "Punchline",
  "Description",
  "InternalName",
  "AssemblyVersion",
  "TestingAssemblyVersion",
  "RepoUrl",
  "IconUrl",
  "DownloadLinkInstall",
  "DownloadLinkUpdate",
  "DownloadLinkTesting",
];

export function compareVersions(left, right) {
  assertFourPartVersion(left, "left version");
  assertFourPartVersion(right, "right version");
  const leftParts = left.split(".").map(Number);
  const rightParts = right.split(".").map(Number);
  for (let index = 0; index < 4; index += 1) {
    if (leftParts[index] !== rightParts[index])
      return Math.sign(leftParts[index] - rightParts[index]);
  }
  return 0;
}

export function validateRegistry(registry) {
  if (!Array.isArray(registry) || registry.length === 0)
    throw new Error("The plugin registry must be a non-empty array.");

  const identities = new Set();
  for (const record of registry) {
    for (const field of ["owner", "repository", "branch", "internalName"]) {
      if (typeof record?.[field] !== "string" || record[field].trim().length === 0)
        throw new Error(`Registry record is missing '${field}'.`);
    }

    const identity = record.internalName.toLowerCase();
    if (identities.has(identity))
      throw new Error(`Duplicate registry InternalName: ${record.internalName}`);
    identities.add(identity);
  }
}

export function validateEntry(entry, record = null) {
  if (entry === null || typeof entry !== "object" || Array.isArray(entry))
    throw new Error("Catalog entry must be a JSON object.");

  for (const field of requiredTextFields) {
    if (typeof entry[field] !== "string" || entry[field].trim().length === 0)
      throw new Error(`${entry.InternalName ?? "Catalog entry"} is missing '${field}'.`);
  }

  assertFourPartVersion(entry.AssemblyVersion, `${entry.InternalName} AssemblyVersion`);
  assertFourPartVersion(entry.TestingAssemblyVersion, `${entry.InternalName} TestingAssemblyVersion`);
  assertPositiveInteger(entry.DalamudApiLevel, `${entry.InternalName} DalamudApiLevel`);
  assertPositiveInteger(
    entry.TestingDalamudApiLevel,
    `${entry.InternalName} TestingDalamudApiLevel`,
  );

  for (const field of [
    "RepoUrl",
    "IconUrl",
    "DownloadLinkInstall",
    "DownloadLinkUpdate",
    "DownloadLinkTesting",
  ]) {
    assertHttpsUrl(entry[field], `${entry.InternalName} ${field}`);
  }

  if (entry.DownloadLinkUpdate !== entry.DownloadLinkInstall)
    throw new Error(`${entry.InternalName} install and update URLs must match.`);

  validateReleaseUrl(entry.DownloadLinkInstall, entry.AssemblyVersion, entry.InternalName);
  validateReleaseUrl(
    entry.DownloadLinkTesting,
    entry.TestingAssemblyVersion,
    entry.InternalName,
  );

  if (record) {
    if (entry.InternalName !== record.internalName) {
      throw new Error(
        `Requested ${record.internalName}, but the child entry reports ${entry.InternalName}.`,
      );
    }

    const expectedRepositoryUrl = `https://github.com/${record.owner}/${record.repository}`;
    if (entry.RepoUrl.replace(/\/$/, "") !== expectedRepositoryUrl) {
      throw new Error(
        `${entry.InternalName} RepoUrl does not match its registered source repository.`,
      );
    }

    for (const field of [
      "DownloadLinkInstall",
      "DownloadLinkUpdate",
      "DownloadLinkTesting",
    ]) {
      const url = new URL(entry[field]);
      const expectedPrefix = `/${record.owner}/${record.repository}/releases/download/`;
      if (!url.pathname.startsWith(expectedPrefix)) {
        throw new Error(
          `${entry.InternalName} ${field} does not use its registered source repository.`,
        );
      }
    }
  }
}

export function validateCatalog(catalog) {
  if (!Array.isArray(catalog) || catalog.length === 0)
    throw new Error("Catalog must be a non-empty JSON array.");

  const internalNames = new Set();
  const displayNames = new Set();
  for (const entry of catalog) {
    validateEntry(entry);
    const internalName = entry.InternalName.toLowerCase();
    const displayName = entry.Name.toLowerCase();
    if (internalNames.has(internalName))
      throw new Error(`Duplicate InternalName: ${entry.InternalName}`);
    if (displayNames.has(displayName))
      throw new Error(`Duplicate plugin Name: ${entry.Name}`);
    internalNames.add(internalName);
    displayNames.add(displayName);
  }
}

export async function generateCatalog({
  registry,
  currentCatalog,
  fetchManifest,
  validateRemoteEntry = async () => {},
  onWarning = () => {},
}) {
  validateRegistry(registry);
  validateCatalog(currentCatalog);

  const registered = new Set(registry.map((record) => record.internalName.toLowerCase()));
  const currentByName = new Map(
    currentCatalog.map((entry) => [entry.InternalName.toLowerCase(), entry]),
  );
  const unregistered = currentCatalog.filter(
    (entry) => !registered.has(entry.InternalName.toLowerCase()),
  );
  if (unregistered.length > 0) {
    throw new Error(
      `Current catalog contains unregistered plugins: ${unregistered
        .map((entry) => entry.InternalName)
        .join(", ")}`,
    );
  }

  const output = [];
  const warnings = [];
  for (const record of registry) {
    const fallback = currentByName.get(record.internalName.toLowerCase());
    try {
      const manifest = await fetchManifest(record);
      if (!Array.isArray(manifest))
        throw new Error("Child repo.json is not a JSON array.");

      const matches = manifest.filter((entry) => entry?.InternalName === record.internalName);
      if (matches.length !== 1) {
        throw new Error(
          `Expected exactly one '${record.internalName}' entry; found ${matches.length}.`,
        );
      }

      const candidate = structuredClone(matches[0]);
      validateEntry(candidate, record);
      if (
        fallback
        && compareVersions(candidate.AssemblyVersion, fallback.AssemblyVersion) < 0
      ) {
        throw new Error(
          `Stale child version ${candidate.AssemblyVersion}; central last-known-good is ${fallback.AssemblyVersion}.`,
        );
      }

      await validateRemoteEntry(candidate, record);
      output.push(candidate);
    } catch (error) {
      if (!fallback) {
        throw new Error(
          `${record.internalName} has no last-known-good entry: ${errorMessage(error)}`,
          { cause: error },
        );
      }

      const warning = `${record.internalName}: ${errorMessage(error)} Preserving central last-known-good ${fallback.AssemblyVersion}.`;
      warnings.push(warning);
      onWarning(warning);
      output.push(structuredClone(fallback));
    }
  }

  validateCatalog(output);
  return { catalog: output, warnings };
}

export function decodeContentsResponse(payload, sourceName) {
  if (
    payload === null
    || typeof payload !== "object"
    || payload.type !== "file"
    || payload.encoding !== "base64"
    || typeof payload.content !== "string"
  ) {
    throw new Error(`${sourceName} returned an invalid GitHub Contents API response.`);
  }

  const text = Buffer.from(payload.content.replace(/\s/g, ""), "base64").toString("utf8");
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${sourceName} contains malformed JSON: ${errorMessage(error)}`, {
      cause: error,
    });
  }
}

export async function verifyEntryAssets(entry, fetchImpl = globalThis.fetch) {
  const icon = await downloadBytes(entry.IconUrl, fetchImpl, `${entry.InternalName} icon`);
  if (
    icon.length < 24
    || icon[0] !== 0x89
    || icon[1] !== 0x50
    || icon[2] !== 0x4e
    || icon[3] !== 0x47
  ) {
    throw new Error(`${entry.InternalName} IconUrl is not a valid PNG.`);
  }

  const packages = [
    {
      label: "stable",
      url: entry.DownloadLinkInstall,
      version: entry.AssemblyVersion,
      apiLevel: entry.DalamudApiLevel,
    },
    {
      label: "testing",
      url: entry.DownloadLinkTesting,
      version: entry.TestingAssemblyVersion,
      apiLevel: entry.TestingDalamudApiLevel,
    },
  ];
  const checked = new Set();
  for (const packageInfo of packages) {
    const key = `${packageInfo.url}\n${packageInfo.version}\n${packageInfo.apiLevel}`;
    if (checked.has(key))
      continue;
    checked.add(key);

    const zip = await downloadBytes(
      packageInfo.url,
      fetchImpl,
      `${entry.InternalName} ${packageInfo.label} release ZIP`,
    );
    inspectPluginZip(zip, entry, packageInfo);
  }
}

export function inspectPluginZip(bytes, entry, packageInfo) {
  if (!Buffer.isBuffer(bytes))
    bytes = Buffer.from(bytes);
  if (bytes.length === 0)
    throw new Error(`${entry.InternalName} ${packageInfo.label} release ZIP is empty.`);

  const files = readZipDirectory(bytes);
  for (const requiredName of [
    `${entry.InternalName}.dll`,
    `${entry.InternalName}.json`,
    `${entry.InternalName}.deps.json`,
  ]) {
    if (!files.has(requiredName)) {
      throw new Error(
        `${entry.InternalName} ${packageInfo.label} release ZIP is missing top-level ${requiredName}.`,
      );
    }
  }
  if ([...files.keys()].some((name) => name.toLowerCase().endsWith(".zip")))
    throw new Error(`${entry.InternalName} release package contains a nested ZIP.`);

  const manifestBytes = extractZipEntry(bytes, files.get(`${entry.InternalName}.json`));
  let manifest;
  try {
    manifest = JSON.parse(manifestBytes.toString("utf8").replace(/^\uFEFF/, ""));
  } catch (error) {
    throw new Error(`${entry.InternalName} package manifest is malformed JSON.`, { cause: error });
  }

  for (const field of ["InternalName", "Name", "Author"]) {
    if (manifest[field] !== entry[field])
      throw new Error(`${entry.InternalName} package manifest '${field}' does not match the catalog.`);
  }
  if (manifest.AssemblyVersion !== packageInfo.version) {
    throw new Error(
      `${entry.InternalName} package version is ${manifest.AssemblyVersion}; expected ${packageInfo.version}.`,
    );
  }
  if (manifest.DalamudApiLevel !== packageInfo.apiLevel) {
    throw new Error(
      `${entry.InternalName} package API level is ${manifest.DalamudApiLevel}; expected ${packageInfo.apiLevel}.`,
    );
  }
}

function validateReleaseUrl(value, version, internalName) {
  const url = new URL(value);
  if (url.hostname !== "github.com" || url.search || url.hash)
    throw new Error(`${internalName} release URL must be a permanent GitHub HTTPS URL.`);

  const match = url.pathname.match(
    /^\/([^/]+)\/([^/]+)\/releases\/download\/([^/]+)\/([^/]+\.zip)$/,
  );
  if (!match)
    throw new Error(`${internalName} release URL is not a GitHub Release ZIP.`);

  const [, , , tag, fileName] = match;
  if (tag !== `v${version}` && !tag.startsWith(`v${version}-`)) {
    throw new Error(
      `${internalName} release tag '${tag}' does not correspond to version ${version}.`,
    );
  }
  if (fileName !== `${internalName}.zip`)
    throw new Error(`${internalName} release URL must end in ${internalName}.zip.`);
}

async function downloadBytes(url, fetchImpl, label) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetchImpl(url, {
        redirect: "follow",
        headers: { "User-Agent": "SentinelCatalogGenerator/1.0" },
        signal: AbortSignal.timeout(60_000),
      });
      if (!response.ok)
        throw new Error(`HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length === 0)
        throw new Error("download was empty");
      return bytes;
    } catch (error) {
      lastError = error;
      if (attempt < 3)
        await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }
  throw new Error(`${label} could not be downloaded: ${errorMessage(lastError)}`);
}

function readZipDirectory(bytes) {
  const eocdSignature = 0x06054b50;
  const minimumOffset = Math.max(0, bytes.length - 65_557);
  let eocdOffset = -1;
  for (let offset = bytes.length - 22; offset >= minimumOffset; offset -= 1) {
    if (bytes.readUInt32LE(offset) === eocdSignature) {
      eocdOffset = offset;
      break;
    }
  }
  if (eocdOffset < 0)
    throw new Error("Release asset is not a readable ZIP archive.");

  const entryCount = bytes.readUInt16LE(eocdOffset + 10);
  let offset = bytes.readUInt32LE(eocdOffset + 16);
  const files = new Map();
  for (let index = 0; index < entryCount; index += 1) {
    if (bytes.readUInt32LE(offset) !== 0x02014b50)
      throw new Error("Release ZIP central directory is invalid.");
    const compression = bytes.readUInt16LE(offset + 10);
    const compressedSize = bytes.readUInt32LE(offset + 20);
    const uncompressedSize = bytes.readUInt32LE(offset + 24);
    const nameLength = bytes.readUInt16LE(offset + 28);
    const extraLength = bytes.readUInt16LE(offset + 30);
    const commentLength = bytes.readUInt16LE(offset + 32);
    const localHeaderOffset = bytes.readUInt32LE(offset + 42);
    const name = bytes.subarray(offset + 46, offset + 46 + nameLength).toString("utf8");
    files.set(name, { compression, compressedSize, uncompressedSize, localHeaderOffset });
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return files;
}

function extractZipEntry(bytes, entry) {
  if (!entry || bytes.readUInt32LE(entry.localHeaderOffset) !== 0x04034b50)
    throw new Error("Release ZIP local file header is invalid.");
  const nameLength = bytes.readUInt16LE(entry.localHeaderOffset + 26);
  const extraLength = bytes.readUInt16LE(entry.localHeaderOffset + 28);
  const dataOffset = entry.localHeaderOffset + 30 + nameLength + extraLength;
  const compressed = bytes.subarray(dataOffset, dataOffset + entry.compressedSize);
  let output;
  if (entry.compression === 0)
    output = Buffer.from(compressed);
  else if (entry.compression === 8)
    output = inflateRawSync(compressed);
  else
    throw new Error(`Unsupported ZIP compression method ${entry.compression}.`);
  if (output.length !== entry.uncompressedSize)
    throw new Error("Release ZIP entry size does not match its directory metadata.");
  return output;
}

function assertFourPartVersion(value, label) {
  if (typeof value !== "string" || !fourPartVersion.test(value))
    throw new Error(`${label} must be a four-part numeric version.`);
}

function assertPositiveInteger(value, label) {
  if (!Number.isInteger(value) || value <= 0)
    throw new Error(`${label} must be a positive integer.`);
}

function assertHttpsUrl(value, label) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${label} must be a valid HTTPS URL.`);
  }
  if (url.protocol !== "https:")
    throw new Error(`${label} must use HTTPS.`);
}

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}
