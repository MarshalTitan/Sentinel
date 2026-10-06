# MarshalTitan Sentinel Dalamud Catalog

This repository is the permanent public catalog for independently versioned Sentinel plugins.

Add this URL under **Dalamud Settings → Experimental → Custom Plugin Repositories**:

```text
https://raw.githubusercontent.com/MarshalTitan/Sentinel/main/repo.json
```

Then open `/xlplugins`, search for the plugin, and choose **Install**. The URL, plugin
`InternalName` values, and existing plugin configurations do not change when the catalog is
reconciled.

## Source-of-truth architecture

Each installable plugin repository owns its authoritative `repo.json`, release ZIP, icon, version,
Dalamud API level, description, tags, and other plugin-specific metadata. A source repository may
own more than one installable plugin; for example, `SRankSentinel` owns both `SRankSentinel` and
`SentinelHunts` entries.

This central repository owns:

- the approved plugin list in [`generator/plugins.json`](generator/plugins.json);
- deterministic aggregation in registry order;
- metadata, version, icon, release-asset, ZIP, DLL, and embedded-manifest validation;
- downgrade protection and last-known-good fallback;
- the combined public `repo.json`.

`SentinelCore` is a shared development-library repository and is intentionally not registered as an
installable plugin.

The initial child-manifest and release-package reconciliation is recorded in
[`docs/MIGRATION_AUDIT.md`](docs/MIGRATION_AUDIT.md).

## Automatic reconciliation

The **Update Sentinel Catalog** workflow runs:

- hourly at minute 17;
- manually through `workflow_dispatch`;
- immediately after a normal plugin release through a `plugin-released` `repository_dispatch`
  notification.

The scheduled run is the authoritative self-healing safety net, not the normal publication path. A
child notification asks the central workflow to reconcile immediately; payload metadata is never
trusted. The generator always fetches the actual child `repo.json` through the GitHub Contents API.

The workflow uses this repository's own `GITHUB_TOKEN` with `contents: write`. Normal plugin
releases no longer depend on a child repository successfully writing into this repository.

Publication uses the Contents API with the current `repo.json` blob SHA. If the catalog changes
during publication, the generator refetches and retries instead of overwriting concurrent work.
Workflow concurrency also prevents two central reconciliation runs from racing each other.

## Last-known-good and downgrade protection

For every registered `InternalName`, the generator fetches and validates the exact matching object
from the child manifest.

- If the child entry is valid and its release package is downloadable, it becomes the candidate.
- If a known child's manifest, icon, or release asset is temporarily unavailable or invalid, the
  current valid central entry is preserved and the workflow emits a warning.
- If the child advertises an older version than the current central entry, the generator preserves
  the central entry and reports the stale child manifest.
- If a new plugin has no last-known-good entry and cannot be validated, generation fails and no
  partial catalog is published.
- If the current catalog contains an entry absent from the registry, generation fails rather than
  silently removing it.

The full candidate is validated before a conditional, atomic `repo.json` update. A failed run leaves
the public catalog untouched.

## Child repository release contract

Every installable Sentinel plugin release should perform this sequence:

```text
build
→ test
→ publish the GitHub Release ZIP
→ verify the public ZIP and packaged manifest
→ update that plugin repository's own repo.json
→ dispatch plugin-released to MarshalTitan/Sentinel
→ wait for central reconciliation
→ verify the public central repo.json contains the exact version and asset URLs
```

The child manifest must contain the authoritative object for each installable `InternalName` owned
by that repository. It no longer needs to directly edit `MarshalTitan/Sentinel/repo.json`.

Each child release repository must expose a `DALAMUD_CATALOG_TOKEN` Actions secret whose token can
create repository-dispatch events in `MarshalTitan/Sentinel` (`Contents: write` for a fine-grained
token). The built-in child `GITHUB_TOKEN` is repository-scoped and cannot dispatch to the central
repository. A missing credential, rejected dispatch, failed reconciliation, or stale public catalog
must fail the release workflow visibly. The hourly run remains available to repair an interrupted
publication, but normal releases must not wait for it.

## Manual recovery

The preferred manual recovery operation is **Actions → Update Sentinel Catalog → Run workflow**.
It performs a complete reconciliation of every registered plugin.

The older **Update Plugin Entry** workflow remains temporarily available as emergency tooling during
the migration. It should not be the normal publication path and can be retired after the central
generator has operated successfully across routine plugin releases.

## Adding a plugin

1. Publish the plugin's valid release ZIP.
2. Add or update the authoritative `repo.json` in the child repository.
3. Add one registry record for each new `InternalName` to `generator/plugins.json`.
4. Generate and validate the candidate catalog.
5. Merge after confirming no existing plugin is downgraded or removed.

Use the exact child branch containing `repo.json`. Do not add `SentinelCore` unless it intentionally
becomes an installable Dalamud plugin in the future.

## Intentionally retiring a plugin

Retirement must be deliberate. Remove the registry record and the corresponding central entry in
the same reviewed change, document the reason, and verify the remaining catalog. Simply deleting or
breaking a child manifest does not remove an existing plugin because last-known-good fallback keeps
it published.

## Local validation

Node.js 20 or newer is required.

```bash
npm test
node generator/generate-catalog.mjs --output candidate-repo.json --verify-assets
pwsh -File ./.github/scripts/Test-Catalog.ps1 -CatalogPath candidate-repo.json
diff -u repo.json candidate-repo.json
```

For a checked-out set of sibling repositories, `--source-root ..` reads those local child manifests
for pre-publication comparison. Production workflows always omit that option and use the GitHub
Contents API.

## Legacy SRankSentinel catalog URL

The older SRankSentinel-specific URL may remain enabled during migration, but the central URL above
is the permanent catalog. Users should not uninstall a plugin when changing repository URLs because
configuration continuity is tied to its unchanged `InternalName`.
