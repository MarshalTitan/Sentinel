import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { registeredOwners } from './distribution.mjs';
const registry = JSON.parse(readFileSync('generator/plugins.json', 'utf8'));
// Authorized future children are not published entries. Every registered child remains mandatory.
for (const [name, repository] of registeredOwners(registry)) {
  execFileSync(process.execPath, ['release/distribute.mjs'], { stdio: 'inherit',
    env: { ...process.env, SENTINEL_REPOSITORY: repository, SENTINEL_INTERNAL_NAME: name,
      SENTINEL_PUBLISH_CHILD: 'false', SENTINEL_TIMEOUT_SECONDS: '60',
      SENTINEL_SOURCE_TOKEN: '', SENTINEL_NOTIFICATION_TOKEN: '' } });
}
