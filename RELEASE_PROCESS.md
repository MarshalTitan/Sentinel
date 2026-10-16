# Release Process

Applies to independent Sentinel repositories. [Inventory](SENTINEL_ECOSYSTEM.md) records published versions; [Phase 1 audit](docs/RELEASE_INFRASTRUCTURE_AUDIT.md) records infrastructure commits, checks and limits.

## Normal release contract

1. Inspect current source/instructions on a branch. Preserve InternalName, configuration, positions, themes and input behavior. Keep workflow/UI changes separate from gameplay.
2. Pin approved Core packages, locks and bundled assemblies exactly; verify hashes. The six prior plugin projects retain Core 0.3.1; Hub bundles exact 0.4.1; the SRank proving branch pins published Core 0.4.1 and its verified hashes. Do not upgrade unrelated consumers implicitly.
3. Build, run relevant tests and validate the package on cloud runners. Obtain required in-game evidence before treating gameplay changes as complete. Acceptance is scoped to the tested build/scenario: the Phase 2 pass of existing SRank is a regression reference, not approval of a future shared-navigation build. UI/Profiles/facing work and unrelated choice/PvP gates remain separately recorded in the test matrix.
4. Increment the four-part version for changed plugin content. Publish the source/tag-linked ZIP, then download and validate its public contents. Never replace an existing asset.
5. Invoke the full-commit-pinned [shared action](.github/actions/distribute/action.yml) to promote the owning entry in the child's root repo.json. Do not pre-advertise an unavailable ZIP. The action preserves other entries, refuses downgrade/concurrent metadata overwrite and uses conditional blob-SHA writes with bounded retries.
6. Optionally notify central Sentinel with plugin-released. Missing/rejected notification warns and uses scheduled reconciliation; it never skips verification.
7. Wait for reconciliation and verify the exact public child and central entry, including all release URLs and metadata. The current bound is 90 minutes for the hourly schedule plus runner delay. Schedules can be delayed/dropped; a stale catalog at the deadline fails visibly.
8. Report source/tag/asset/CI links, catalog result and remaining live tests. Update the five canonical documents.

Permanent installation URL: https://raw.githubusercontent.com/MarshalTitan/Sentinel/main/repo.json

## Current workflow entry points

| Repository | Publication trigger / scope | Revalidation and distribution |
|---|---|---|
| Core | Tag push or main Directory.Build.props version change; three NuGet libraries | Build/tests before publication; immutable exact-source assets, package-hashes.json (SHA256/SHA512), then public download/hash verification. No plugin ZIP/catalog entry. |
| SRank | Main change to SRankSentinel.csproj or manual main dispatch | Event source is checked out; same-source prerelease revalidation only; public ZIP then shared action. |
| SentinelHunts (SRank repo) | Matching v*-sentinelhunts tag or manual main dispatch | Separate immutable ZIP; shared action promotes only SentinelHunts and preserves SRank. |
| PvP | Main/tag push; PRs build/test only | Existing release is revalidated, never overwritten; public ZIP then shared action. Main workflow-only merges do not create a new version. |
| HUD | Main commit containing [publish-live] | Existing same-source release can be revalidated; public ZIP then shared action. Manual catalog-sync is read-only recovery with optional notification. |
| Classy | Manual main dispatch or main change under .github/releases | No PR publication; same-source prerelease revalidation only; local/public ZIP checks then shared action. |
| Profiles | Manual main dispatch | Existing release is refused (immutable). New ZIP is verified before shared child promotion. |
| Relay | Manual main dispatch or main [publish-live] / [verify-live] commit | Existing asset can be explicitly revalidated without replacement; public ZIP then shared action. |
| Hub | Main [publish-live] commit after required validation | Dynamic four-part project version; immutable source-linked ZIP, installed icon/repository metadata and exact Core checks; public ZIP must hash-match the validated artifact before child promotion. |

Each child has Release Infrastructure Checks: actionlint, PowerShell script parsing, asset/token policy checks and read-only token-free verification of published entries. Existing plugin build/test/package checks remain. Read the actual workflow before publication; triggers are intentionally not identical.

## Credentials and retirement

| Credential/location | Required? | Safe action after Phase 1 |
|---|---|---|
| Built-in GITHUB_TOKEN, each child | Yes for release upload/changed child manifest; repository contents:write | Retain normal workflow permissions. This is not a manually stored PAT. |
| DALAMUD_CATALOG_TOKEN, each of the six children | No; optional notification only | May delete that repository secret if hourly latency is acceptable. Do not revoke its underlying token until all other uses are checked. |
| Built-in GITHUB_TOKEN, central Sentinel | Yes for central conditional publication | Retain; generator uses its own repository token. |
| Other old PAT/secret names | Not inventoried through secret administration | Do not delete based on a guessed name. No additional custom secret was found in audited release code. |

No secrets were deleted or inspected. The child token never writes central repo.json. The shared action rejects unapproved repository/identity mappings. Central dispatch payloads remain notifications, not metadata authority.

The central workflow runs hourly at minute 17, manually, or on plugin-released. Invalid/unavailable known children retain last-known-good; new invalid or unregistered existing entries abort. A successful run can preserve an older entry, so verify the requested result. Central ZIP checks do not replace child DLL/package validation.

## Recovery and rollback

- First diagnose public ZIP, child manifest, notification and central result independently. Correct the child and run **Update Sentinel Catalog**, then read-only distribution verification.
- If interrupted before child promotion, rerun the same-source release where supported; otherwise make a reviewed child-manifest recovery after validating the public ZIP. Profiles' existing-release refusal remains explicit.
- Retired legacy **Update Plugin Entry** workflow/script and unused child upsert/duplicate waiter paths must not be restored as normal distribution.
- Automatic downgrade protection blocks a simple version rollback. Prefer a higher version containing reverted behavior; deliberate downgrade or retirement requires coordinated review.
- Add a registry identity only after its valid child release exists; retire registry and central entry together deliberately. Preserve SentinelHunts.
- For documentation/workflow-only work, run applicable CI and inspect the diff. Do not bump plugin versions or manufacture releases to test infrastructure.

The next genuine changed-version release must demonstrate upload → child promotion → reconciliation → exact public verification. Read-only smoke and policy tests alone do not prove that future run.

## Controlled Phase 3 distribution

Core [0.4.0.0](https://github.com/MarshalTitan/SentinelCore/releases/tag/v0.4.0.0) is published from `67e52f5d4afb080042f9e526a6afae7480b01ff0`. Its [release run](https://github.com/MarshalTitan/SentinelCore/actions/runs/37569682234) built/tested, published all three libraries without asset replacement, and downloaded/verified their public hashes. No custom catalog token is needed for Core. [Core PR #3](https://github.com/MarshalTitan/SentinelCore/pull/3) additionally makes batched PowerShell build/test/pack steps fail on the first native command error; Core 0.4's release logs already show every command passed.

SRank 0.7.55.0 is a PR-only proving artifact, not a release or manifest promotion. Keep [PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25) unmerged until the supervised test passes, because merging its project-version change triggers normal publication. The public SRank and SentinelHunts entries remain 0.7.54.0 and 0.1.1.0 respectively. Use a separate dev-plugin load for testing, with the installed SRank copy disabled. Rollback is the session command or unloading the dev build and re-enabling accepted 0.7.54.0; no catalog downgrade is required.

## Landing foundation publication and consumer gate — 2026-10-07

Core [PR #4](https://github.com/MarshalTitan/SentinelCore/pull/4) merged at `e6527400680cddc39803321792b7c3b02fb0501d` and published immutable [0.4.1.0](https://github.com/MarshalTitan/SentinelCore/releases/tag/v0.4.1.0) / NuGet 0.4.1. [Release CI](https://github.com/MarshalTitan/SentinelCore/actions/runs/37643419684) passed build/tests, packed three libraries and downloaded/verified public SHA256 hashes. Landing is additive and disabled by default; existing installed consumers stay on their own pins. No installed Core plugin or catalog entry is introduced.

SRank PR #25's **0.7.60.0** remains a CI artifact only, not a plugin release or child/central promotion. Exact Core/UI pins, lock SHA512 and bundled DLL SHA256 validation identify the published packages. Do not merge its version change until the applicable supervised gates pass. Preserve SRank 0.7.54.0 and SentinelHunts 0.1.1.0 catalog identities.

Returned test evidence authorizes automatic continuation through routine implementation, CI, review, PR/release work and canonical reconciliation. A new FFXIV gate must include the exact tested artifact/build and rollback; never use a successful build as proof of game behavior or broaden a scoped live pass.

## Post-landing continuation — 2026-10-07

0.7.60.0 landing evidence closed the isolated mechanics gate and automatically authorized the next controlled consumer implementation. [SRank PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25) now prepares **0.7.61.0** using the same exact published Core 0.4.1 packages. There is no new Core release, plugin release, asset replacement or child/central promotion. Keep the version-changing PR unpublished pending actual shared ordinary-hunt follow/handoff/safe landing/tag/kill/return. Public rollback remains SRank **0.7.54.0**, with the independent SentinelHunts entry unchanged. See TEST_MATRIX.md for scoped live evidence and the consumer gate.


Independent live-state reconciliation at **2026-10-07 16:05 UTC**: [Profiles PR #2](https://github.com/MarshalTitan/SentinelProfiles/pull/2), source `291c3e777f7839463e4ac925ea72135f3e40b71d`, published [0.2.1.3](https://github.com/MarshalTitan/SentinelProfiles/releases/tag/v0.2.1.3). Inspected UI source adds scrollable actions/editor, measured state-control reflow and a 680-logical-pixel minimum in both themes; profile/restart semantics are unchanged. Published asset metadata SHA256 `39695578453ab4ea1a345fdf541fe4e586c9b54982ec3b7f50a49e9e2c771aab` was read, not independently rehashed. Child/central manifest objects match. This is separate from navigation: its [visual/controller acceptance](https://github.com/MarshalTitan/SentinelProfiles/blob/291c3e777f7839463e4ac925ea72135f3e40b71d/docs/UI_VALIDATION.md) remains pending and is not part of the SRank proving procedure. Earlier dated 0.2.1.2 baseline reports remain historical.

## Sentinel Hub MVP — 2026-10-16 UTC

Historical **0.1.0.0** publication record; the later Anti-AFK migration section below owns current utility status and the next acceptance gate.

Hub follows the standard child-release chain. `MarshalTitan/SentinelHub` cloud CI restores exact hash-verified Core/UI 0.4.1 locks, parses PowerShell release scripts, tests policy/native UI, builds the ZIP and validates its identity/API/version and exact bundled libraries. A main push with `[publish-live]` publishes only after validation passes. The version-linked public ZIP must match the validated artifact; existing releases/assets are refused, never replaced.

First-child bootstrap creates root repo.json only after the installable public ZIP validates. Shared distribution is pinned to Sentinel commit `311b9d3446cca61c50213a320445f3e1d57a96f6`. It promotes/verifies only the Hub child; the central registry and generated candidate are handled by a separate central PR after release validation. The public registered-identity smoke distinguishes authorized future children from published entries while retaining mandatory verification of every existing public identity.

0.1.0.0 is the first usable beta, awaiting FFXIV acceptance. Rollback is disabling/uninstalling Hub; no consumer migration or catalog downgrade is needed. No HUD cleanup or utility release is part of this publication.

Publication: [Hub source ac1e7411788b](https://github.com/MarshalTitan/SentinelHub/commit/ac1e7411788ba89b973073576d421a9c2a024127), [cloud run](https://github.com/MarshalTitan/SentinelHub/actions/runs/38846452080), [release 0.1.0.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.1.0.0). Public asset SHA256 `7ee080adf3cec91e92f4b106aa0720ddf925a023ddb1a258da74a177ed0c0690`.

[Central registration PR #20](https://github.com/MarshalTitan/Sentinel/pull/20) merged after generator/asset and Linux/Windows publication checks passed. Exact public child/central Hub readback was verified after merge; seven prior catalog objects remain unchanged. The [post-merge central run](https://github.com/MarshalTitan/Sentinel/actions/runs/38846833272) passed.

## Anti-AFK proving release — 2026-10-16 UTC

Publish compatibility before replacement: HUD [PR #5](https://github.com/MarshalTitan/SentinelHUD/pull/5), source `8be0102d9d438407eb3ca9ce30fd6817589074e4`, publishes **0.8.4.6** after cloud tests/package checks; [release run 38850004862](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38850004862) downloads/validates its public ZIP before child promotion. Public asset metadata SHA256: `016becfc8824355421fedeb15d963bc4acefe55991b70ed473f296880482c8fa`.

Hub [PR #2](https://github.com/MarshalTitan/SentinelHub/pull/2) publishes **0.2.0.0 beta** with dynamic project-version handling and mandatory installed IconUrl/RepoUrl. The release workflow verifies immutable public ZIP equality against the tested artifact, then the existing pinned action promotes the child and waits for exact central equality. HUD retains Core/UI 0.3.1; Hub retains 0.4.1. No old assets are replaced.

Release availability is separate from **pending native replacement acceptance**. The user authorized this proving publication after dashboard approval. HUD cleanup remains deferred. Rollback: disable Hub Anti-AFK or unload Hub; HUD retains its original saved preference and engine. No downgrade or configuration rewrite is needed. Sentinel Hunts retirement is limited to Hub inventory; its catalog object remains unchanged.

Hub source is `884fa0d7512111d61128cfd1b8378d8fcbbc8166`; final PR [38850172799](https://github.com/MarshalTitan/SentinelHub/actions/runs/38850172799) passed, and source-linked publication runs at [38850365423](https://github.com/MarshalTitan/SentinelHub/actions/runs/38850365423). HUD's main build and release-infrastructure runs [38850004879](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38850004879) and [38850004863](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38850004863) passed after merge.

Hub public asset metadata SHA256: `03cf0905bafc58e9c4a99554648aea105007864787da3a0374dd65011f80bb35`. Its publication step downloaded/validated the public ZIP and verified byte equality against the tested artifact before child promotion.

Central update is a reviewed candidate copied exactly from the validated authoritative child objects; generator/assets and Linux/Windows distribution checks must pass before merge. Six unrelated catalog objects, including the legacy SentinelHunts object, remain byte-for-byte equivalent as JSON data. Final public child/central equality is required after publication.
