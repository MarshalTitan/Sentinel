import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { publishedOwners, registeredOwners } from './distribution.mjs';
const registry = JSON.parse(readFileSync('generator/plugins.json', 'utf8'));
const response = await fetch('https://raw.githubusercontent.com/MarshalTitan/Sentinel/main/repo.json?smoke=' + Date.now(),
  { signal: AbortSignal.timeout(30000) });
if (!response.ok) throw new Error('Public catalog unavailable: ' + response.status);
const published = await response.json();
const current = publishedOwners(registry, published);
for (const [name] of registeredOwners(registry)) {
  if (!current.some(([id]) => id === name))
    console.log('New candidate identity ' + name + ' awaits central publication; generator validates its public release.');
}
// Every currently public identity remains mandatory, including missing/invalid child failures.
for (const [name, repository] of current) {
  execFileSync(process.execPath, ['release/distribute.mjs'], { stdio: 'inherit',
    env: { ...process.env, SENTINEL_REPOSITORY: repository, SENTINEL_INTERNAL_NAME: name,
      SENTINEL_PUBLISH_CHILD: 'false', SENTINEL_TIMEOUT_SECONDS: '60',
      SENTINEL_SOURCE_TOKEN: '', SENTINEL_NOTIFICATION_TOKEN: '' } });
}
