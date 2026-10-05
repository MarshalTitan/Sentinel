#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  decodeContentsResponse,
  generateCatalog,
  verifyEntryAssets,
} from "./catalog.mjs";

const options = parseArguments(process.argv.slice(2));
const registry = await readJson(options.registry);
const currentCatalog = await readJson(options.catalog);
const manifestCache = new Map();

const fetchManifest = async (record) => {
  const cacheKey = `${record.owner}/${record.repository}@${record.branch}`;
  if (!manifestCache.has(cacheKey)) {
    manifestCache.set(cacheKey, loadManifest(record));
  }
  return structuredClone(await manifestCache.get(cacheKey));
};

const result = await generateCatalog({
  registry,
  currentCatalog,
  fetchManifest,
  validateRemoteEntry: options.verifyAssets
    ? (entry) => verifyEntryAssets(entry)
    : async () => {},
  onWarning: (warning) => {
    if (process.env.GITHUB_ACTIONS === "true")
      console.warn(`::warning::${warning}`);
    else
      console.warn(`WARNING: ${warning}`);
  },
});

const serialized = `${JSON.stringify(result.catalog, null, 2)}\n`;
await writeFile(options.output, serialized, "utf8");
console.log(
  `Generated ${result.catalog.length} catalog entries in registry order with ${result.warnings.length} fallback warning(s).`,
);

async function loadManifest(record) {
  if (options.sourceRoot) {
    const path = resolve(options.sourceRoot, record.repository, "repo.json");
    return readJson(path);
  }

  const sourceName = `${record.owner}/${record.repository}@${record.branch}/repo.json`;
  const url = new URL(
    `/repos/${record.owner}/${record.repository}/contents/repo.json`,
    "https://api.github.com",
  );
  url.searchParams.set("ref", record.branch);
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "SentinelCatalogGenerator/1.0",
    },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok)
    throw new Error(`${sourceName} returned HTTP ${response.status}.`);
  return decodeContentsResponse(await response.json(), sourceName);
}

async function readJson(path) {
  const text = await readFile(path, "utf8");
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${path} contains malformed JSON: ${error.message}`, { cause: error });
  }
}

function parseArguments(arguments_) {
  const parsed = {
    registry: "generator/plugins.json",
    catalog: "repo.json",
    output: "repo.json",
    sourceRoot: null,
    verifyAssets: false,
  };
  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];
    if (argument === "--verify-assets") {
      parsed.verifyAssets = true;
      continue;
    }
    if (["--registry", "--catalog", "--output", "--source-root"].includes(argument)) {
      const value = arguments_[index + 1];
      if (!value)
        throw new Error(`${argument} requires a value.`);
      index += 1;
      const key = argument.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      parsed[key] = value;
      continue;
    }
    throw new Error(`Unknown argument: ${argument}`);
  }
  return parsed;
}
