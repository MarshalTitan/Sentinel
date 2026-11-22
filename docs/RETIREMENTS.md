# Retired projects - 21 November 2026

## Current supported inventory

SRankSentinel, ClassySentinel, SentinelProfiles, SentinelRelay, SentinelHUD and SentinelHub remain supported installable plugins. SentinelCore remains a development library. SRankSentinel's normal v0.7.x releases are unaffected.

## Withdrawn projects

| Project | Retirement action | Historical material |
|---|---|---|
| PvPSentinel | Central registry/feed entry removed; direct owning feed empty; publication workflows removed | Repository source, old release records and engineering notes retained as unsupported history |
| SentinelHunts | Both feed entries removed; dedicated build/release workflows and package validator removed; install manifest removed; packaging disabled | Experimental source remains under SRankSentinel/SentinelHunts for reference only |
| SentinelRemote | No central entry or GitHub releases existed; Android artifact workflow removed; standalone client onboarding withdrawn | Repository and protocol/widget source retained as unsupported history |
| MinionFrontline | Already private, absent from catalog, with no releases; abandoned test workflow removed | Private source and notes retained; MINION itself is unchanged |

The three explicitly obsolete experimental Hunts releases and their SentinelHunts.zip assets are withdrawn: v0.1.1.0-sentinelhunts, v0.1.0.0-sentinelhunts and sentinelhunts-v0.1.0.0. Matching Hunts CI installation artifacts are also retired. Their Git tags remain historical source pointers; no normal SRank release/tag is changed.

## Prevention and existing installations

The catalog rejects retired identities in registry and catalog validation, including case variants and last-known-good fallback attempts. The current distribution ownership allowlist contains only supported projects. Retired default-branch publication workflows have been removed. Archiving PvPSentinel, SentinelRemote and MinionFrontline in GitHub Settings is the remaining administrative step; the connector does not provide repository archive/delete controls. Repositories are preserved rather than deleted.

Existing installations are not automatically uninstalled. Old PvPSentinel release files are historical downloads, not a supported feed; its current direct repo.json is empty. Supported Profiles still discovers installed plugins dynamically, so an already-installed unsupported plugin can remain visible as a user-managed entry without being advertised or installed by Sentinel.

HUD 0.8.9.5 removes the retired Frontline companion card and branded help text. Hub 0.9.0.2 removes the same component, quick-open actions, and its dedicated RotationSolver dependency check. All other HUD/Hub behavior and configurations are preserved. Relay's runtime, per-character routing, screenshots and remote recovery remain unchanged. Relay-owned desktop/host names and persisted keys containing SentinelRemote are retained for compatibility; they are not the retired Android repository.

## Historical references retained

Earlier dated canonical records, Core baseline/navigation comparisons, source namespaces and negative retirement tests remain where they explain engineering history or prevent accidental reintroduction. Retirement notices explicitly supersede old installation/publication instructions. Relay remote architecture/setup notes are labelled as engineering history where they refer to the retired Android client; no Relay runtime capability is removed.

## Verified outcome

The central catalog contains exactly six supported identities. HUD 0.8.9.5 and Hub 0.9.0.2 are published inventory-only updates; their authoritative child objects are reconciled into the central catalog. SRank remains 0.7.73.0, Classy 0.8.6.1, Profiles 0.2.1.15 and Relay 0.5.0.10. Existing local installations are not removed.

The [one-time cleanup run](https://github.com/MarshalTitan/SRankSentinel/actions/runs/44980337258) removed three experimental release records, three SentinelHunts.zip assets and 129 matching CI artifacts. All 69 normal v0.7.x release records and their asset IDs/digests match the pre-cleanup snapshot. Historical Git tags remain; no Git history was rewritten. The cleanup workflow was removed after success. PR #25's unpublished proving branch also receives the retirement exclusions and guard, without changing its runtime/version, merging it or publishing it.

## Validation

- Central Node suites: 34 tests passed. Cloud catalog validation and Linux/Windows distribution checks validate all supported public entries and reject retired identities.
- HUD: build passed with zero warnings/errors; 80 core and 19 configuration tests passed locally. Cloud build, native UI and immutable public package validation passed; [publication](https://github.com/MarshalTitan/SentinelHUD/actions/runs/44980356859).
- Hub: build passed with zero warnings/errors; 139 policy groups and the UI/integration/performance suites passed locally. The first cloud attempt hit an unchanged idle-allocation assertion; retry passed the existing suite without modifying or weakening it. Public immutable package publication: [run](https://github.com/MarshalTitan/SentinelHub/actions/runs/44980360505).
- SRank: normal build passed (one existing nullable warning); 7 remote, 114 state and 43 UI checks passed. Cloud build/release infrastructure and the new retirement guard passed. No normal plugin runtime source, project version, release asset or SRank configuration was changed.
- Relay: cloud plugin build, release-infrastructure checks and internal remote foundation passed. Its runtime, per-character Content-ID profiles, Discord routing, screenshots, inbound/outbound settings and remote SRank controls remain untouched.
- Core has documentation-only changes; no library/package/version change. Profiles and Classy source trees were verified and left unchanged. Obsolete repository workflows were removed rather than rebuilding or republishing those projects.

## Remaining GitHub Settings actions

No repository has been deleted or archived through the connector. Archive these preserved repositories through Settings > General > Danger Zone > Archive this repository:

- [PvPSentinel settings](https://github.com/MarshalTitan/PvPSentinel/settings)
- [SentinelRemote settings](https://github.com/MarshalTitan/SentinelRemote/settings)
- [MinionFrontline settings](https://github.com/MarshalTitan/MinionFrontline/settings) - remains private

Their default-branch workflows are already removed; PvPSentinel's direct feed is empty. GitHub repository administration is not available in the connected tools. Deletion is unnecessary for this retirement. SRankSentinel must remain active.

## Exact changed files

Paths are relative to each named repository; “removed” denotes a deleted file. Automatically promoted child feeds are included. The temporary SRank `.github/workflows/retire-hunts.yml` was added only to perform the authorized cleanup and then deleted, so it is absent from the final tree.

### MarshalTitan/MinionFrontline

- `.github/workflows/test.yml` (removed)
- `docs/HISTORICAL_README.md`
- `README.md`

### MarshalTitan/PvPSentinel

- `.github/workflows/build.yml` (removed)
- `.github/workflows/release-policy.yml` (removed)
- `docs/HISTORICAL_README.md`
- `README.md`
- `repo.json`

### MarshalTitan/Sentinel

- `ARCHITECTURE.md`
- `docs/MIGRATION_AUDIT.md`
- `docs/NAVIGATION_FOUNDATION.md`
- `docs/PRIVACY_AUDIT.md`
- `docs/RELEASE_INFRASTRUCTURE_AUDIT.md`
- `docs/RETIREMENTS.md`
- `generator/catalog.mjs`
- `generator/catalog.test.mjs`
- `generator/plugins.json`
- `README.md`
- `RELEASE_PROCESS.md`
- `release/distribute.mjs`
- `release/distribution.mjs`
- `release/distribution.test.mjs`
- `release/README.md`
- `repo.json`
- `ROADMAP.md`
- `SENTINEL_ECOSYSTEM.md`
- `TEST_MATRIX.md`

### MarshalTitan/SentinelCore

- `ADOPTION.md`
- `docs/ECOSYSTEM_BASELINE.md`
- `docs/NAVIGATION.md`

### MarshalTitan/SentinelHub

- `docs/ARCHITECTURE.md`
- `docs/RELEASE_NOTES.md`
- `Ecosystem/Catalog.cs`
- `README.md`
- `repo.json`
- `SentinelHub.csproj`
- `tests/Program.cs`

### MarshalTitan/SentinelHUD

- `docs/NATIVE_UI_RELEASE.md`
- `LIVE_TEST_CHECKLIST.md`
- `README.md`
- `repo.json`
- `src/SentinelHUD.Core/SentinelEcosystemRegistry.cs`
- `src/SentinelHUD/SentinelHUD.csproj`
- `src/SentinelHUD/UI/ConfigurationWindow.cs`
- `tests/SentinelHUD.Core.Tests/Program.cs`

### MarshalTitan/SentinelRelay

- `ARCHITECTURE.md`
- `BACKEND_DEPLOYMENT.md`
- `README.md`
- `remote/docs/ARCHITECTURE.md`
- `remote/docs/DESKTOP_SETUP.md`
- `remote/docs/MILESTONE_A.md`
- `remote/docs/MILESTONE_B.md`
- `remote/docs/PLAN.md`
- `remote/docs/SECURITY.md`
- `remote/README.md`

### MarshalTitan/SentinelRemote

- `.github/workflows/android.yml` (removed)
- `docs/HISTORICAL_README.md`
- `README.md`

### MarshalTitan/SRankSentinel

- `.github/scripts/Audit-RetiredHunts.mjs`
- `.github/scripts/Validate-SentinelHuntsPackage.ps1` (removed)
- `.github/workflows/build.yml`
- `.github/workflows/release-policy.yml`
- `.github/workflows/release.yml`
- `.github/workflows/sentinelhunts-build.yml` (removed)
- `.github/workflows/sentinelhunts-release.yml` (removed)
- `README.md`
- `repo.json`
- `SentinelHunts/README.md`
- `SentinelHunts/SentinelHunts.csproj`
- `SentinelHunts/SentinelHunts.json` (removed)

Sentinel's five canonical records retain dated engineering history beneath explicit retirement notices. Former map gates and Core comparisons are historical; current supported inventories, release entry points and the active roadmap exclude the retired projects. HUD historical changelog entries, compiler exclusions, forbidden-bundle validators and negative tests remain because they document past behavior or enforce retirement. Relay-owned host executable/storage names remain for compatibility and are distinct from the retired Android repository.

