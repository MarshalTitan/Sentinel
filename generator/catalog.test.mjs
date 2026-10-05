import assert from "node:assert/strict";
import test from "node:test";
import {
  compareVersions,
  generateCatalog,
  validateCatalog,
  validateEntry,
} from "./catalog.mjs";

test("aggregates normal multi-plugin manifests", async () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "AlphaRepo");
  const beta = makeEntry("Beta", "2.0.0.0", "BetaRepo");
  const result = await run(
    [record("Alpha", "AlphaRepo"), record("Beta", "BetaRepo")],
    [alpha, beta],
    new Map([
      ["AlphaRepo", [alpha]],
      ["BetaRepo", [beta]],
    ]),
  );
  assert.deepEqual(result.catalog.map((entry) => entry.InternalName), ["Alpha", "Beta"]);
  assert.equal(result.warnings.length, 0);
});

test("selects multiple InternalNames from one repository", async () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "SharedRepo");
  const beta = makeEntry("Beta", "1.1.0.0", "SharedRepo");
  const manifest = [alpha, beta];
  const result = await run(
    [record("Alpha", "SharedRepo"), record("Beta", "SharedRepo")],
    manifest,
    new Map([["SharedRepo", manifest]]),
  );
  assert.deepEqual(result.catalog, manifest);
});

test("rejects duplicate registry InternalNames", async () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "AlphaRepo");
  await assert.rejects(
    () => run(
      [record("Alpha", "AlphaRepo"), record("Alpha", "AlphaRepo")],
      [alpha],
      new Map([["AlphaRepo", [alpha]]]),
    ),
    /Duplicate registry InternalName/,
  );
});

test("preserves last-known-good when child manifest is missing", async () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "AlphaRepo");
  const result = await generateCatalog({
    registry: [record("Alpha", "AlphaRepo")],
    currentCatalog: [alpha],
    fetchManifest: async () => { throw new Error("repo.json returned HTTP 404"); },
  });
  assert.deepEqual(result.catalog, [alpha]);
  assert.match(result.warnings[0], /HTTP 404/);
});

test("preserves last-known-good when child JSON is malformed", async () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "AlphaRepo");
  const result = await generateCatalog({
    registry: [record("Alpha", "AlphaRepo")],
    currentCatalog: [alpha],
    fetchManifest: async () => { throw new Error("repo.json contains malformed JSON"); },
  });
  assert.deepEqual(result.catalog, [alpha]);
  assert.match(result.warnings[0], /malformed JSON/);
});

test("preserves last-known-good when requested InternalName is absent", async () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "SharedRepo");
  const beta = makeEntry("Beta", "1.0.0.0", "SharedRepo");
  const result = await run(
    [record("Alpha", "SharedRepo")],
    [alpha],
    new Map([["SharedRepo", [beta]]]),
  );
  assert.deepEqual(result.catalog, [alpha]);
  assert.match(result.warnings[0], /found 0/);
});

test("prevents a stale child manifest from downgrading the catalog", async () => {
  const current = makeEntry("Alpha", "2.0.0.0", "AlphaRepo");
  const stale = makeEntry("Alpha", "1.9.9.9", "AlphaRepo");
  const result = await run(
    [record("Alpha", "AlphaRepo")],
    [current],
    new Map([["AlphaRepo", [stale]]]),
  );
  assert.equal(result.catalog[0].AssemblyVersion, "2.0.0.0");
  assert.match(result.warnings[0], /Stale child version/);
});

test("preserves last-known-good when a child repository is unavailable", async () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "AlphaRepo");
  const result = await generateCatalog({
    registry: [record("Alpha", "AlphaRepo")],
    currentCatalog: [alpha],
    fetchManifest: async () => { throw new Error("GitHub API returned HTTP 503"); },
  });
  assert.deepEqual(result.catalog, [alpha]);
  assert.match(result.warnings[0], /HTTP 503/);
});

test("preserves last-known-good when a release asset is missing", async () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "AlphaRepo");
  const updated = makeEntry("Alpha", "1.0.1.0", "AlphaRepo");
  const result = await generateCatalog({
    registry: [record("Alpha", "AlphaRepo")],
    currentCatalog: [alpha],
    fetchManifest: async () => [updated],
    validateRemoteEntry: async () => { throw new Error("release ZIP returned HTTP 404"); },
  });
  assert.equal(result.catalog[0].AssemblyVersion, "1.0.0.0");
  assert.match(result.warnings[0], /release ZIP returned HTTP 404/);
});

test("rejects invalid release URLs without replacing last-known-good", async () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "AlphaRepo");
  const invalid = makeEntry("Alpha", "1.0.1.0", "AlphaRepo");
  invalid.DownloadLinkInstall = "https://example.com/Alpha.zip";
  invalid.DownloadLinkUpdate = invalid.DownloadLinkInstall;
  invalid.DownloadLinkTesting = invalid.DownloadLinkInstall;
  const result = await generateCatalog({
    registry: [record("Alpha", "AlphaRepo")],
    currentCatalog: [alpha],
    fetchManifest: async () => [invalid],
  });
  assert.deepEqual(result.catalog, [alpha]);
  assert.match(result.warnings[0], /release URL/);
});

test("uses the exact last-known-good object during fallback", async () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "AlphaRepo");
  alpha.Description = "Known-good metadata that must be retained byte-for-byte semantically.";
  const result = await generateCatalog({
    registry: [record("Alpha", "AlphaRepo")],
    currentCatalog: [alpha],
    fetchManifest: async () => { throw new Error("temporary failure"); },
  });
  assert.deepEqual(result.catalog[0], alpha);
});

test("fails safely for a new plugin with no fallback", async () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "AlphaRepo");
  await assert.rejects(
    () => generateCatalog({
      registry: [record("Alpha", "AlphaRepo"), record("Beta", "BetaRepo")],
      currentCatalog: [alpha],
      fetchManifest: async (item) => {
        if (item.internalName === "Alpha")
          return [alpha];
        throw new Error("repo.json returned HTTP 404");
      },
    }),
    /Beta has no last-known-good entry/,
  );
});

test("keeps deterministic explicit registry ordering", async () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "SharedRepo");
  const beta = makeEntry("Beta", "1.0.0.0", "SharedRepo");
  const result = await run(
    [record("Beta", "SharedRepo"), record("Alpha", "SharedRepo")],
    [alpha, beta],
    new Map([["SharedRepo", [alpha, beta]]]),
  );
  assert.deepEqual(result.catalog.map((entry) => entry.InternalName), ["Beta", "Alpha"]);
});

test("accepts a repository-specific release tag suffix", () => {
  const hunts = makeEntry("SentinelHunts", "0.1.1.0", "SharedRepo");
  const url = "https://github.com/MarshalTitan/SharedRepo/releases/download/v0.1.1.0-sentinelhunts/SentinelHunts.zip";
  hunts.DownloadLinkInstall = url;
  hunts.DownloadLinkUpdate = url;
  hunts.DownloadLinkTesting = url;
  validateEntry(hunts, record("SentinelHunts", "SharedRepo"));
});

test("compares four-part versions numerically", () => {
  assert.equal(compareVersions("1.10.0.0", "1.9.9.9"), 1);
  assert.equal(compareVersions("1.0.0.0", "1.0.0.0"), 0);
  assert.equal(compareVersions("0.9.0.0", "1.0.0.0"), -1);
});

test("rejects duplicate catalog display names", () => {
  const alpha = makeEntry("Alpha", "1.0.0.0", "AlphaRepo");
  const beta = makeEntry("Beta", "1.0.0.0", "BetaRepo");
  beta.Name = alpha.Name;
  assert.throws(() => validateCatalog([alpha, beta]), /Duplicate plugin Name/);
});

async function run(registry, currentCatalog, manifests) {
  return generateCatalog({
    registry,
    currentCatalog,
    fetchManifest: async (item) => {
      if (!manifests.has(item.repository))
        throw new Error("missing child manifest");
      return structuredClone(manifests.get(item.repository));
    },
  });
}

function record(internalName, repository) {
  return {
    owner: "MarshalTitan",
    repository,
    branch: "main",
    internalName,
  };
}

function makeEntry(internalName, version, repository) {
  const asset = `https://github.com/MarshalTitan/${repository}/releases/download/v${version}/${internalName}.zip`;
  return {
    Author: "MarshalTitan",
    Name: `${internalName} Display Name`,
    Punchline: `${internalName} punchline`,
    Description: `${internalName} description`,
    InternalName: internalName,
    AssemblyVersion: version,
    TestingAssemblyVersion: version,
    RepoUrl: `https://github.com/MarshalTitan/${repository}`,
    IconUrl: `https://raw.githubusercontent.com/MarshalTitan/${repository}/main/assets/icon.png`,
    ApplicableVersion: "any",
    DalamudApiLevel: 15,
    TestingDalamudApiLevel: 15,
    IsHide: false,
    IsTestingExclusive: false,
    DownloadCount: 0,
    LastUpdate: 1,
    LoadPriority: 0,
    DownloadLinkInstall: asset,
    DownloadLinkUpdate: asset,
    DownloadLinkTesting: asset,
    Tags: ["sentinel"],
  };
}
