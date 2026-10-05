#!/usr/bin/env node

import { appendFile, readFile } from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
import {
  decodeContentsResponse,
  generateCatalog,
  validateCatalog,
  verifyEntryAssets,
} from "./catalog.mjs";

const token = process.env.GITHUB_TOKEN;
if (!token)
  throw new Error("GITHUB_TOKEN is required to publish the central catalog.");

const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? "MarshalTitan/Sentinel").split("/");
if (!owner || !repository)
  throw new Error("GITHUB_REPOSITORY must use owner/repository format.");

const registry = JSON.parse(await readFile("generator/plugins.json", "utf8"));
const childCache = new Map();
let finalCommit = "unchanged";
let changed = false;
let completed = false;

for (let attempt = 1; attempt <= 3; attempt += 1) {
  const central = await fetchContents(owner, repository, "main", true);
  const currentCatalog = decodeContentsResponse(central, `${owner}/${repository}@main/repo.json`);
  const result = await generateCatalog({
    registry,
    currentCatalog,
    fetchManifest: fetchChildManifest,
    validateRemoteEntry: (entry) => verifyEntryAssets(entry),
    onWarning: (warning) => console.warn(`::warning::${warning}`),
  });

  if (isDeepStrictEqual(result.catalog, currentCatalog)) {
    console.log("Central repo.json already matches every authoritative child manifest.");
    await verifyPublicCatalog(currentCatalog);
    completed = true;
    break;
  }

  const content = `${JSON.stringify(result.catalog, null, 2)}\n`;
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repository}/contents/repo.json`,
    {
      method: "PUT",
      headers: authenticatedHeaders(),
      body: JSON.stringify({
        message: "Reconcile Sentinel plugin catalog",
        content: Buffer.from(content, "utf8").toString("base64"),
        sha: central.sha,
        branch: "main",
      }),
      signal: AbortSignal.timeout(30_000),
    },
  );

  if (response.status === 409) {
    console.warn(`::warning::Catalog changed during attempt ${attempt}; refetching and retrying.`);
    childCache.clear();
    continue;
  }
  if (!response.ok)
    throw new Error(`GitHub Contents API publish failed with HTTP ${response.status}: ${await response.text()}`);

  const payload = await response.json();
  finalCommit = payload.commit?.sha ?? "unknown";
  changed = true;
  console.log(`Published reconciled repo.json in commit ${finalCommit}.`);
  await verifyPublicCatalog(result.catalog, finalCommit);
  completed = true;
  break;
}

if (!completed)
  throw new Error("Catalog publication did not complete.");

if (process.env.GITHUB_OUTPUT) {
  await appendFile(
    process.env.GITHUB_OUTPUT,
    `changed=${changed}\ncatalog_commit=${finalCommit}\n`,
    "utf8",
  );
}

async function fetchChildManifest(record) {
  const key = `${record.owner}/${record.repository}@${record.branch}`;
  if (!childCache.has(key)) {
    childCache.set(key, (async () => {
      const payload = await fetchContents(record.owner, record.repository, record.branch, false);
      return decodeContentsResponse(payload, `${key}/repo.json`);
    })());
  }
  return structuredClone(await childCache.get(key));
}

async function fetchContents(sourceOwner, sourceRepository, branch, authenticated) {
  const url = new URL(
    `/repos/${sourceOwner}/${sourceRepository}/contents/repo.json`,
    "https://api.github.com",
  );
  url.searchParams.set("ref", branch);
  const response = await fetch(url, {
    headers: authenticated ? authenticatedHeaders() : publicHeaders(),
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    throw new Error(
      `${sourceOwner}/${sourceRepository}@${branch}/repo.json returned HTTP ${response.status}.`,
    );
  }
  return response.json();
}

async function verifyPublicCatalog(expected, cacheKey = Date.now().toString()) {
  const url = new URL(`https://raw.githubusercontent.com/${owner}/${repository}/main/repo.json`);
  url.searchParams.set("catalog", cacheKey);
  let lastError;
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "SentinelCatalogGenerator/1.0" },
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok)
        throw new Error(`HTTP ${response.status}`);
      const actual = await response.json();
      validateCatalog(actual);
      if (!isDeepStrictEqual(actual, expected))
        throw new Error("public content has not reached the expected commit yet");
      console.log(`Verified the permanent public catalog with ${actual.length} entries.`);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 12)
        await new Promise((resolve) => setTimeout(resolve, 5_000));
    }
  }
  throw new Error(`Public catalog verification failed: ${lastError.message}`);
}

function publicHeaders() {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "SentinelCatalogGenerator/1.0",
  };
}

function authenticatedHeaders() {
  return {
    ...publicHeaders(),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
