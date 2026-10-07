import { execFileSync } from 'node:child_process';
import { owners } from './distribution.mjs';
for (const [name, repository] of Object.entries(owners)) {
  execFileSync(process.execPath, ['release/distribute.mjs'], { stdio: 'inherit',
    env: { ...process.env, SENTINEL_REPOSITORY: repository, SENTINEL_INTERNAL_NAME: name,
      SENTINEL_PUBLISH_CHILD: 'false', SENTINEL_TIMEOUT_SECONDS: '60',
      SENTINEL_SOURCE_TOKEN: '', SENTINEL_NOTIFICATION_TOKEN: '' } });
}
