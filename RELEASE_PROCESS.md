# Release Process

Applies to independent Sentinel repositories. [Inventory](SENTINEL_ECOSYSTEM.md) records published versions; [Phase 1 audit](docs/RELEASE_INFRASTRUCTURE_AUDIT.md) records infrastructure commits, checks and limits.

## Normal release contract

1. Inspect current source/instructions on a branch. Preserve InternalName, configuration, positions, themes and input behavior. Keep workflow/UI changes separate from gameplay.
2. Pin approved Core packages, locks and bundled assemblies exactly; verify hashes. Core 0.3.1 remains the current audited baseline.
3. Build, run relevant tests and validate the package on cloud runners. Obtain required in-game evidence before treating gameplay changes as complete.
4. Increment the four-part version for changed plugin content. Publish the source/tag-linked ZIP, then download and validate its public contents. Never replace an existing asset.
5. Invoke the full-commit-pinned [shared action](.github/actions/distribute/action.yml) to promote the owning entry in the child's root repo.json. Do not pre-advertise an unavailable ZIP. The action preserves other entries, refuses downgrade/concurrent metadata overwrite and uses conditional blob-SHA writes with bounded retries.
6. Optionally notify central Sentinel with plugin-released. Missing/rejected notification warns and uses scheduled reconciliation; it never skips verification.
7. Wait for reconciliation and verify the exact public child and central entry, including all release URLs and metadata. The current bound is 90 minutes for the hourly schedule plus runner delay. Schedules can be delayed/dropped; a stale catalog at the deadline fails visibly.
8. Report source/tag/asset/CI links, catalog result and remaining live tests. Update the five canonical documents.

Permanent installation URL: https://raw.githubusercontent.com/MarshalTitan/Sentinel/main/repo.json

## Current workflow entry points

| Repository | Publication trigger / scope | Revalidation and distribution |
|---|---|---|
| Core | Tag push; three NuGet libraries | No installable-plugin ZIP or catalog entry; unchanged in Phase 1. |
| SRank | Main change to SRankSentinel.csproj or manual main dispatch | Event source is checked out; same-source prerelease revalidation only; public ZIP then shared action. |
| SentinelHunts (SRank repo) | Matching v*-sentinelhunts tag or manual main dispatch | Separate immutable ZIP; shared action promotes only SentinelHunts and preserves SRank. |
| PvP | Main/tag push; PRs build/test only | Existing release is revalidated, never overwritten; public ZIP then shared action. Main workflow-only merges do not create a new version. |
| HUD | Main commit containing [publish-live] | Existing same-source release can be revalidated; public ZIP then shared action. Manual catalog-sync is read-only recovery with optional notification. |
| Classy | Manual main dispatch or main change under .github/releases | No PR publication; same-source prerelease revalidation only; local/public ZIP checks then shared action. |
| Profiles | Manual main dispatch | Existing release is refused (immutable). New ZIP is verified before shared child promotion. |
| Relay | Manual main dispatch or main [publish-live] / [verify-live] commit | Existing asset can be explicitly revalidated without replacement; public ZIP then shared action. |

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
