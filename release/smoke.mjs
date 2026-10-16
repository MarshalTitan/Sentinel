import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { entry, verificationTargets, requireCandidateChild } from './distribution.mjs';
import { decodeContentsResponse, validateEntry, verifyEntryAssets } from '../generator/catalog.mjs';
const registry = JSON.parse(readFileSync('generator/plugins.json', 'utf8'));
const candidate = JSON.parse(readFileSync('repo.json', 'utf8'));
async function json(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error('Distribution endpoint unavailable: ' + response.status);
  return response.json();
}
const published = await json('https://raw.githubusercontent.com/MarshalTitan/Sentinel/main/repo.json?smoke=' + Date.now());
const targets = verificationTargets(registry, candidate, published, process.env.GITHUB_EVENT_NAME === 'pull_request');
for (const { name, repository, deferred } of targets) {
  if (deferred) {
    // A PR cannot publish its catalog before merge. Validate its exact public child and assets instead.
    const record = registry.find(value => value.internalName === name);
    const payload = await json('https://api.github.com/repos/' + repository + '/contents/repo.json?ref=' +
      encodeURIComponent(record.branch));
    const child = decodeContentsResponse(payload, name);
    const expected = requireCandidateChild(child, entry(candidate, name));
    validateEntry(expected, record);
    await verifyEntryAssets(expected);
    console.log('Verified authoritative child and public assets for candidate ' + name +
      ' ' + expected.AssemblyVersion + '; exact central equality is required after merge.');
    continue;
  }
  // Every identity is mandatory after merge; existing unchanged identities remain mandatory in PRs.
  execFileSync(process.execPath, ['release/distribute.mjs'], { stdio: 'inherit',
    env: { ...process.env, SENTINEL_REPOSITORY: repository, SENTINEL_INTERNAL_NAME: name,
      SENTINEL_PUBLISH_CHILD: 'false', SENTINEL_TIMEOUT_SECONDS: '300',
      SENTINEL_SOURCE_TOKEN: '', SENTINEL_NOTIFICATION_TOKEN: '' } });
}
