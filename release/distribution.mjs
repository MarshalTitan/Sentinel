import { isDeepStrictEqual } from 'node:util';
export const owners = Object.freeze({
  SRankSentinel: 'MarshalTitan/SRankSentinel', SentinelHunts: 'MarshalTitan/SRankSentinel',
  PvPSentinel: 'MarshalTitan/PvPSentinel', SentinelHUD: 'MarshalTitan/SentinelHUD',
  ClassySentinel: 'MarshalTitan/ClassySentinel', SentinelProfiles: 'MarshalTitan/SentinelProfiles',
  SentinelRelay: 'MarshalTitan/SentinelRelay',
});
export function versionParts(version) {
  if (!/^\d+\.\d+\.\d+\.\d+$/.test(version)) throw new Error('Expected four-part numeric version');
  return version.split('.').map(BigInt);
}
export function compareVersions(a, b) {
  const aa = versionParts(a), bb = versionParts(b);
  for (let i = 0; i < 4; i++) if (aa[i] !== bb[i]) return aa[i] > bb[i] ? 1 : -1;
  return 0;
}
export function contract(repository, name, version, tag) {
  if (owners[name] !== repository) throw new Error('Unapproved repository/InternalName ownership');
  versionParts(version);
  const expectedTag = 'v' + version + (name === 'SentinelHunts' ? '-sentinelhunts' : '');
  if (tag !== expectedTag) throw new Error('Release tag does not match version/identity');
  return { repository, name, version, tag,
    asset: 'https://github.com/' + repository + '/releases/download/' + tag + '/' + name + '.zip' };
}
export function entry(catalog, name) {
  if (!Array.isArray(catalog)) throw new Error('Manifest must be an array');
  const matches = catalog.filter(x => x?.InternalName === name);
  if (matches.length !== 1) throw new Error('Expected exactly one ' + name + ' entry');
  return matches[0];
}
export function desiredEntry(source, c) {
  const result = structuredClone(entry(source, c.name));
  result.AssemblyVersion = c.version;
  result.TestingAssemblyVersion = c.version;
  for (const key of ['DownloadLinkInstall', 'DownloadLinkUpdate', 'DownloadLinkTesting']) result[key] = c.asset;
  return result;
}
function metadata(value) {
  const result = structuredClone(value);
  for (const key of ['AssemblyVersion', 'TestingAssemblyVersion', 'LastUpdate',
    'DownloadLinkInstall', 'DownloadLinkUpdate', 'DownloadLinkTesting']) delete result[key];
  return result;
}
export function promote(current, source, c, timestamp) {
  const existing = entry(current, c.name), desired = desiredEntry(source, c);
  if (compareVersions(existing.AssemblyVersion, c.version) > 0 ||
      (existing.TestingAssemblyVersion && compareVersions(existing.TestingAssemblyVersion, c.version) > 0))
    throw new Error('Refusing to downgrade a newer child release');
  if (!isDeepStrictEqual(metadata(existing), metadata(desired)))
    throw new Error('Child metadata changed since checkout; reconcile source before retrying');
  desired.LastUpdate = existing.LastUpdate;
  if (isDeepStrictEqual(existing, desired)) return { changed: false, catalog: current, expected: existing };
  desired.LastUpdate = timestamp;
  return { changed: true, catalog: current.map(x => x.InternalName === c.name ? desired : x), expected: desired };
}
export function verify(catalog, expected) {
  return isDeepStrictEqual(entry(catalog, expected.InternalName), expected);
}
export async function publishChild({ read, write, source, c, now = () => Math.floor(Date.now() / 1000) }) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const snapshot = await read();
    const next = promote(snapshot.catalog, source, c, now());
    if (!next.changed) return next.expected;
    try { await write(snapshot.sha, next.catalog); return next.expected; }
    catch (error) { if (![409, 422].includes(error.status) || attempt === 4) throw error; }
  }
}
export async function notifyOptional(token, send, warn) {
  if (!token) { warn('Optional notification token absent; waiting for scheduled reconciliation.'); return; }
  try { await send(token); }
  catch { warn('Optional notification failed; waiting for scheduled reconciliation.'); }
}
export async function waitForCatalog({ read, expected, timeoutMs, intervalMs = 60000,
  now = Date.now, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)), log = () => {} }) {
  if (!Number.isFinite(timeoutMs) || timeoutMs < 0) throw new Error('Invalid verification timeout');
  const deadline = now() + timeoutMs;
  let attempts = 0;
  do {
    attempts++;
    try { if (verify(await read(), expected)) return attempts; } catch { /* retry public propagation/network errors */ }
    if (now() >= deadline) break;
    log('Waiting for exact public catalog entry (attempt ' + attempts + ').');
    await sleep(Math.min(intervalMs, Math.max(0, deadline - now())));
  } while (now() <= deadline);
  throw new Error('Public catalog did not match the authoritative child entry before the deadline');
}
