# Release Process

Applies to the independently versioned Sentinel repositories. Current source snapshot: [Sentinel Ecosystem](SENTINEL_ECOSYSTEM.md). This document separates the required contract from workflow gaps.

## Normal release contract

1. Work on a branch in the owning repository; inspect current instructions and source. Preserve InternalName and configuration compatibility. Keep UI-only work separate from automation changes.
2. Pin approved Core packages exactly, update vendored/downloaded packages and lock data through that repository's process, and verify hashes. Core 0.3.1 is the current audited baseline; future upgrades require a fresh release check.
3. Run the repository's policy tests, restore/build, applicable UI checks and package validation on cloud runners. Record commit, environment/API and results. Obtain required in-game evidence or clearly label the build as awaiting supervised acceptance.
4. Increment the plugin's four-part version for changed release content. Produce a tag/source-linked ZIP with the correctly named top-level DLL, manifest and dependency metadata; check bundled Core assemblies. Avoid same-version replacement.
5. Publish the ZIP, verify the public asset and embedded manifest, then update the **child** repo.json. Preserve other entries when one repository owns multiple plugins.
6. Optionally send `plugin-released` repository_dispatch to MarshalTitan/Sentinel to accelerate reconciliation. Child plugins must not directly edit the central repo.json. Central reconciliation independently reads child manifests and validates the candidate; the scheduled path must work without a cross-repository token.
7. Wait for reconciliation and verify the permanent public catalog contains the exact version and install/update/testing URLs. Inspect warnings: a successful central run can preserve last-known-good rather than advance the requested release.
8. Report source/tag/asset/CI links, catalog confirmation and remaining in-game tests. “ZIP uploaded” alone is not release completion.

Permanent installation URL: https://raw.githubusercontent.com/MarshalTitan/Sentinel/main/repo.json

## Actual workflow entry points

| Repository | Inspected publication trigger | Current caveat |
|---|---|---|
| Core | Tag push, [release.yml](https://github.com/MarshalTitan/SentinelCore/blob/300703b360a58fb4b73bf7675d31fe8cab4614cd/.github/workflows/release.yml) | Three NuGet libraries, no plugin ZIP/catalog entry. |
| SRank | Main change to SRankSentinel.csproj or manual dispatch, [release.yml](https://github.com/MarshalTitan/SRankSentinel/blob/0731a00e9186ec916718e6c031d4f0b163a6a3e6/.github/workflows/release.yml) | Checks out main; verify resolved source before dispatch. Separate SentinelHunts workflows also exist. |
| PvP | Main/tag pushes in [build.yml](https://github.com/MarshalTitan/PvPSentinel/blob/d47e8b7429c135fec2976c1e980175f33787c4f3/.github/workflows/build.yml); PR build path | Missing catalog token currently warns; public verification is conditional on dispatch. |
| HUD | Main commit containing `[publish-live]`, [release.yml](https://github.com/MarshalTitan/SentinelHUD/blob/e7d53978a2821ffc4cb6613de4b92511caad415d/.github/workflows/release.yml) | Mandatory dispatch and bounded verification; same-source retries revalidate existing assets. |
| Classy | Manual; main push or opened/synchronized PR touching .github/releases, [publish.yml](https://github.com/MarshalTitan/ClassySentinel/blob/8763b77a1f8b8fcc4a01845d108715b4431565d7/.github/workflows/publish.yml) | Checks out main, can publish from a PR event and clobber an existing asset; token notification is optional. Treat as a remediation priority. |
| Profiles | Manual dispatch, [release.yml](https://github.com/MarshalTitan/SentinelProfiles/blob/23610575f0a9f20a31f003866cfcb60ea1b4caf8/.github/workflows/release.yml) | Mandatory dispatch and bounded verification. |
| Relay | Manual or main commit with `[publish-live]` / `[verify-live]`, [release.yml](https://github.com/MarshalTitan/SentinelRelay/blob/d2401031bd20430c37d2bc0d64a98aa17c157954/.github/workflows/release.yml) | Supports revalidation; mandatory dispatch and bounded verification. |

Read the actual workflow before each release; do not assume identical triggers or that opening a plugin PR is always publication-free. The scope/order follow-up to merged PR #2 changes documentation only; Phase 1 will reconcile the actual workflow table after implementation.

## Credentials and central reconciliation

The central workflow uses its own GITHUB_TOKEN with contents:write. Optional child notification may use DALAMUD_CATALOG_TOKEN for repository dispatch; the child GITHUB_TOKEN alone is repository-scoped. No cross-repository secret should be required for the scheduled reconciliation path. Public verification must run regardless of notification availability/success and allow the hourly schedule plus execution time; a finite timeout fails visibly. Audit all references before declaring an old secret removable. Never place credentials in documentation or logs.

[Update Sentinel Catalog](https://github.com/MarshalTitan/Sentinel/blob/1f703528c428fc993945aafb85a27bdd0742932e/.github/workflows/update-catalog.yml) runs hourly at minute 17, on manual dispatch and on plugin-released. Registry order is deterministic; remote entry metadata, PNG icons, ZIP structure and embedded identity/version/API are checked. The inspected central ZIP validator requires a DLL but does not independently inspect its assembly version; child package validation remains necessary.

The publisher updates repo.json conditionally by blob SHA, retries conflicts, and checks public output. Failed/invalid known children fall back; invalid new children and unregistered existing entries abort. This is self-healing distribution, not automated bug repair.

## Failure recovery and rollback

- Diagnose the child release, manifest, dispatch and central warning/result separately. Prefer rerunning **Update Sentinel Catalog** after correcting the child source.
- Missing/rejected optional notifications may warn and fall back to scheduled reconciliation. Missing child-manifest credentials or a stale public catalog after the verification deadline fail the release. Existing workflows still need normalization to this revised contract.
- Do not lower a child version expecting automatic rollback: downgrade protection preserves the higher central version. Prefer a new higher version containing reverted behavior. Any deliberate downgrade/retirement requires an explicit coordinated review.
- Keep the older Update Plugin Entry workflow for emergency recovery only. Normal plugins do not write the central entry directly.
- Register a new InternalName only after a valid child release exists. Retire registry and central entry together in a reviewed change.

For these canonical documents, create a cloud/GitHub branch and PR, check only the intended files changed, verify relative links and evidence, and run central PR CI. Do not tag a plugin release or alter repo.json for a documentation-only change.
