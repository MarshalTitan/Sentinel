import test from 'node:test';
import assert from 'node:assert/strict';
import { contract, entry, desiredEntry, promote, publishChild, verify, notifyOptional, waitForCatalog } from './distribution.mjs';
const c = contract('MarshalTitan/SRankSentinel', 'SRankSentinel', '0.7.55.0', 'v0.7.55.0');
const old = { InternalName: c.name, AssemblyVersion: '0.7.54.0', TestingAssemblyVersion: '0.7.54.0',
  Name: 'S Rank Sentinel', LastUpdate: 1, DownloadLinkInstall: 'old', DownloadLinkUpdate: 'old', DownloadLinkTesting: 'old' };
const sibling = { InternalName: 'SentinelHunts', AssemblyVersion: '0.1.1.0', Extra: ['preserve'] };
test('ownership prevents writing central or unrelated repositories', () => {
  assert.throws(() => contract('MarshalTitan/Sentinel', c.name, c.version, c.tag));
  assert.throws(() => contract('MarshalTitan/PvPSentinel', c.name, c.version, c.tag));
});
test('tags and four-part versions are identity scoped', () => {
  assert.throws(() => contract(c.repository, c.name, '1.2', 'v1.2'));
  assert.throws(() => contract(c.repository, 'SentinelHunts', '0.1.2.0', 'v0.1.2.0'));
  assert.equal(contract(c.repository, 'SentinelHunts', '0.1.2.0', 'v0.1.2.0-sentinelhunts').name, 'SentinelHunts');
});
test('missing and duplicate identities fail closed', () => {
  assert.throws(() => entry([], c.name)); assert.throws(() => entry([old, old], c.name)); assert.throws(() => entry(old, c.name));
});
test('promotion preserves sibling and metadata, updates all URLs', () => {
  const result = promote([old, sibling], [old, sibling], c, 2);
  assert.deepEqual(result.catalog[1], sibling); assert.equal(result.expected.Name, old.Name);
  assert.equal(result.expected.LastUpdate, 2); assert.equal(old.LastUpdate, 1);
  for (const key of ['DownloadLinkInstall', 'DownloadLinkUpdate', 'DownloadLinkTesting']) assert.equal(result.expected[key], c.asset);
});
test('idempotent rerun does not churn LastUpdate', () => {
  const next = promote([old], [old], c, 2).catalog;
  assert.equal(promote(next, [old], c, 99).changed, false); assert.equal(promote(next, [old], c, 99).expected.LastUpdate, 2);
});
test('newer stable or testing entry cannot be downgraded', () => {
  assert.throws(() => promote([{ ...old, AssemblyVersion: '0.8.0.0' }], [old], c, 2));
  assert.throws(() => promote([{ ...old, TestingAssemblyVersion: '0.8.0.0' }], [old], c, 2));
});
test('concurrent metadata edit fails rather than overwriting', () => {
  assert.throws(() => promote([{ ...old, Name: 'New name' }], [old], c, 2));
});
test('conflict retry preserves concurrent sibling update', async () => {
  let reads = 0, writes = 0, final;
  await publishChild({ source: [old, sibling], c, now: () => 2,
    read: async () => ({ sha: String(++reads), catalog: [old, { ...sibling, Extra: [reads] }] }),
    write: async (sha, catalog) => { if (++writes === 1) throw Object.assign(new Error(), { status: 409 }); final = catalog; } });
  assert.equal(reads, 2); assert.deepEqual(final[1].Extra, [2]);
});
test('permission errors are not retried or hidden', async () => {
  let writes = 0;
  await assert.rejects(publishChild({ source: [old], c,
    read: async () => ({ sha: '1', catalog: [old] }),
    write: async () => { writes++; throw Object.assign(new Error('denied'), { status: 403 }); } }), /denied/);
  assert.equal(writes, 1);
});
test('exact verification rejects wrong URL, duplicate and stale metadata', () => {
  const expected = desiredEntry([old], c);
  assert.equal(verify([expected], expected), true);
  assert.equal(verify([{ ...expected, DownloadLinkTesting: 'wrong' }], expected), false);
  assert.equal(verify([{ ...expected, Name: 'stale' }], expected), false);
  assert.throws(() => verify([expected, expected], expected));
});
test('notification absence or failure does not hide verification', async () => {
  let calls = 0, warnings = 0;
  await notifyOptional('', async () => calls++, () => warnings++);
  await notifyOptional('secret', async () => { calls++; throw new Error('secret'); }, () => warnings++);
  assert.equal(calls, 1); assert.equal(warnings, 2);
  const expected = desiredEntry([old], c);
  assert.equal(await waitForCatalog({ read: async () => [expected], expected, timeoutMs: 0 }), 1);
});
test('wait tolerates stale/error responses then verifies', async () => {
  let clock = 0, count = 0; const expected = desiredEntry([old], c);
  const attempts = await waitForCatalog({ expected, timeoutMs: 100, intervalMs: 10, now: () => clock,
    sleep: async ms => { clock += ms; }, read: async () => { count++; if (count === 1) throw Error(); return count === 2 ? [old] : [expected]; } });
  assert.equal(attempts, 3);
});
test('token-free wait spans hourly schedule and has finite failure', async () => {
  let clock = 0; const expected = desiredEntry([old], c);
  await waitForCatalog({ expected, timeoutMs: 5400000, now: () => clock,
    sleep: async ms => { clock += ms; }, read: async () => clock >= 3660000 ? [expected] : [old] });
  assert(clock >= 3660000);
  await assert.rejects(waitForCatalog({ expected, timeoutMs: 0, read: async () => [old] }), /deadline/);
});
