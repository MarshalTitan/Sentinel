import { readFile } from 'node:fs/promises';
import { contract, desiredEntry, entry, publishChild, notifyOptional, waitForCatalog, verify } from './distribution.mjs';
const env = process.env;
const repository = env.SENTINEL_REPOSITORY || env.GITHUB_REPOSITORY;
const name = env.SENTINEL_INTERNAL_NAME;
const source = JSON.parse(await readFile(env.SENTINEL_MANIFEST || 'repo.json', 'utf8'));
const version = env.SENTINEL_VERSION || entry(source, name).AssemblyVersion;
const tag = env.SENTINEL_TAG || 'v' + version + (name === 'SentinelHunts' ? '-sentinelhunts' : '');
const c = contract(repository, name, version, tag);
const publish = env.SENTINEL_PUBLISH_CHILD !== 'false';
const sourceToken = env.SENTINEL_SOURCE_TOKEN;
const timeoutMs = Number(env.SENTINEL_TIMEOUT_SECONDS || '5400') * 1000;
if (!Number.isFinite(timeoutMs) || timeoutMs < 0 || timeoutMs > 7200000) throw new Error('Invalid bounded timeout');
async function request(url, options = {}) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(30000) });
  if (!response.ok) {
    const error = new Error('HTTP ' + response.status + ' for distribution endpoint');
    error.status = response.status;
    throw error;
  }
  return response;
}
async function json(url, options) { return (await request(url, options)).json(); }
const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
const endpoint = 'https://api.github.com/repos/' + repository + '/contents/repo.json';
const raw = repo => 'https://raw.githubusercontent.com/' + repo + '/main/repo.json?sentinel=' + Date.now();
let expected;
if (publish) {
  if (!sourceToken) throw new Error('Child GITHUB_TOKEN with contents:write is required');
  const authHeaders = { ...headers, Authorization: 'Bearer ' + sourceToken };
  expected = await publishChild({
    source, c,
    read: async () => {
      const snapshot = await json(endpoint + '?ref=main', { headers: authHeaders });
      return { sha: snapshot.sha, catalog: JSON.parse(Buffer.from(snapshot.content, 'base64').toString('utf8')) };
    },
    write: async (sha, catalog) => {
      await request(endpoint, { method: 'PUT', headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ branch: 'main', sha, message: 'Publish ' + name + ' ' + version + ' manifest [skip ci]',
          content: Buffer.from(JSON.stringify(catalog, null, 2) + '\n').toString('base64') }) });
    },
  });
} else {
  const child = await json(raw(repository));
  expected = entry(child, name);
  if (!verify([expected], desiredEntry(child, c))) throw new Error('Public child does not advertise requested release');
}
await waitForCatalog({ read: () => json(raw(repository)), expected, timeoutMs: Math.min(timeoutMs, 300000), intervalMs: 10000 });
await notifyOptional(env.SENTINEL_NOTIFICATION_TOKEN, token =>
  request('https://api.github.com/repos/MarshalTitan/Sentinel/dispatches', {
    method: 'POST', headers: { ...headers, Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_type: 'plugin-released', client_payload: {
      source_repository: repository, internal_name: name, version, tag, source_commit: env.GITHUB_SHA } }),
  }), message => console.warn('::warning::' + message));
await waitForCatalog({ read: () => json(raw('MarshalTitan/Sentinel')), expected, timeoutMs, log: console.log });
console.log('Verified exact child/public central manifest entry for ' + name + ' ' + version + '.');
