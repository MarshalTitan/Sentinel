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
| Profiles | Manual main dispatch or main commit containing [publish-live] | Existing release is refused (immutable). New ZIP is verified before shared child promotion. |
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

Hub follows the standard child-release chain. `MarshalTitan/SentinelHub` cloud CI restores exact hash-verified Core/UI 0.4.1 locks, parses PowerShell release scripts, tests policy/native UI, builds the ZIP and validates its identity/API/version and exact bundled libraries. A main push with `[publish-live]` publishes only after validation passes. The version-linked public ZIP must match the validated artifact; existing releases/assets are refused, never replaced.

First-child bootstrap creates root repo.json only after the installable public ZIP validates. Shared distribution is pinned to Sentinel commit `311b9d3446cca61c50213a320445f3e1d57a96f6`. It promotes/verifies only the Hub child; the central registry and generated candidate are handled by a separate central PR after release validation. The public registered-identity smoke distinguishes authorized future children from published entries while retaining mandatory verification of every existing public identity.

0.1.0.0 is the first usable beta, awaiting FFXIV acceptance. Rollback is disabling/uninstalling Hub; no consumer migration or catalog downgrade is needed. No HUD cleanup or utility release is part of this publication.

Publication: [Hub source ac1e7411788b](https://github.com/MarshalTitan/SentinelHub/commit/ac1e7411788ba89b973073576d421a9c2a024127), [cloud run](https://github.com/MarshalTitan/SentinelHub/actions/runs/38846452080), [release 0.1.0.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.1.0.0). Public asset SHA256 `7ee080adf3cec91e92f4b106aa0720ddf925a023ddb1a258da74a177ed0c0690`.

[Central registration PR #20](https://github.com/MarshalTitan/Sentinel/pull/20) merged after generator/asset and Linux/Windows publication checks passed. Exact public child/central Hub readback was verified after merge; seven prior catalog objects remain unchanged. The [post-merge central run](https://github.com/MarshalTitan/Sentinel/actions/runs/38846833272) passed.

## Hub 0.2 / HUD 0.8.4.6 proving release — 2026-10-16 UTC

Publish HUD's additive compatibility bridge first; it preserves the runtime and config for absent/old Hub. Publish Hub's default-OFF utility only after cloud policy/peer-simulation/native-UI/package checks pass. Both releases remain source/version-linked and immutable; publicly download/validate before child promotion. Hub workflow versions/artifact names now derive from the project, avoiding stale 0.1 publication constants.

Installed Hub manifest validation now requires correct IconUrl/RepoUrl and verifies the public PNG. The 0.1 missing installed IconUrl was confirmed directly from its published ZIP; no screenshot/browser access was required for diagnosis.

Reconcile both authoritative child objects centrally, preserving the other six entries including the historical Hunts catalog object. No child writes central repo.json. Record exact public equality before completion. This is opt-in proving publication, not acceptance of native timer behavior; no HUD cleanup/Quest Convenience migration is released.

Publication evidence: Hub source `884fa0d7512111d61128cfd1b8378d8fcbbc8166`, [0.2.0.0 release](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.2.0.0), [cloud release run](https://github.com/MarshalTitan/SentinelHub/actions/runs/38850365423); public ZIP SHA256 `03cf0905bafc58e9c4a99554648aea105007864787da3a0374dd65011f80bb35`. HUD source `8be0102d9d438407eb3ca9ce30fd6817589074e4`, [0.8.4.6 release](https://github.com/MarshalTitan/SentinelHUD/releases/tag/v0.8.4.6), [release run](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38850004862); public ZIP SHA256 `016becfc8824355421fedeb15d963bc4acefe55991b70ed473f296880482c8fa`. Both public package validation steps passed before child promotion. Exact public central readback is required before reporting task completion.


Candidate publication checks: during a pull request, a changed/new entry must exactly match its authoritative child fetched through the public Contents API and pass icon/ZIP validation. Unchanged published entries still require exact child/central equality. After merge, every registered identity requires exact public equality, including missing entries; a bounded five-minute wait covers CDN propagation. Seventeen distribution policy tests cover ownership, conflicts, timeouts and candidate-phase failure cases.


Independent public raw readback at **2026-10-16 04:32 UTC** confirmed exact authoritative child/central objects for Hub **0.2.0.0** and HUD **0.8.4.6**, eight total entries and all six unrelated objects unchanged. [Central PR #23](https://github.com/MarshalTitan/Sentinel/pull/23) passed generator/public-assets and Linux/Windows checks and merged as `afa082021a8a19be178d3650e6362ec71f4e4dee`. [Strict post-merge validation](https://github.com/MarshalTitan/Sentinel/actions/runs/38851108841) verifies every identity without candidate deferral. In-game Anti-AFK acceptance remains pending.

## Quest Convenience proving release — 2026-10-16 UTC

Anti-AFK's scoped four-step PASS authorizes routine continuation to Quest migration. Publish **HUD 0.8.4.7** compatibility before **Hub 0.3.0.0**. Retain optional primitive IPC and HUD's original preferences/engines. Hub defaults OFF/Manual and requires acknowledgment before native actions; package publication does not remove the native acceptance gate.

Cloud validation retains exact Core pins, package identity/icon checks and immutable source/version ZIPs. New checks enforce complete accepted native/policy source equality, pending-state revocation, public preference/independent-lease compatibility and narrow native UI states. Public ZIPs must validate before child promotion; Hub must match the tested artifact. Reconcile exact authoritative child objects centrally and preserve all six unrelated entries, including historical SentinelHunts. Post-merge smoke checks every public identity.

Rollback is disabling only Hub Quest Convenience or unloading Hub; HUD retains its original settings and engine. No downgrade or config rewrite. [Supervised procedure](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/QUEST_CONVENIENCE_MIGRATION.md) must pass before separate HUD cleanup. Anti-AFK, Quest defaults, preserved source and the tested reward mode remain separate evidence categories.

HUD source `f4f135f94895615cfbbdfdf04a3e71936d2205e1`, [release run 38852990176](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38852990176), [0.8.4.7](https://github.com/MarshalTitan/SentinelHUD/releases/tag/v0.8.4.7); public asset metadata SHA256 `a43a27fd5f46a3224d0d1100654dc9ab597c7f6eff94653e3e815c661c20779b`. Final Hub PR head `279e5d1a9e5c1762b1a1b5d7a3c5456d598b06b4` passed [38853135394](https://github.com/MarshalTitan/SentinelHub/actions/runs/38853135394); merged/release source `ae8f4a9be9d6d3adbe867970136075ff90f72505`.

Publication evidence: [Hub PR #4](https://github.com/MarshalTitan/SentinelHub/pull/4), [source ae8f4a9be9d6](https://github.com/MarshalTitan/SentinelHub/commit/ae8f4a9be9d6d3adbe867970136075ff90f72505), [main/release 38853259121](https://github.com/MarshalTitan/SentinelHub/actions/runs/38853259121), [0.3.0.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.3.0.0); public ZIP SHA256 `823d55b2a0ce68b7082b4eb0454bff0cbe9dd49a8cf629e0ca6f6233e40af85f`. HUD [source f4f135f94895](https://github.com/MarshalTitan/SentinelHUD/commit/f4f135f94895615cfbbdfdf04a3e71936d2205e1), [release 38852990176](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38852990176), [0.8.4.7](https://github.com/MarshalTitan/SentinelHUD/releases/tag/v0.8.4.7), public ZIP SHA256 `a43a27fd5f46a3224d0d1100654dc9ab597c7f6eff94653e3e815c661c20779b`. Both public ZIP-validation steps passed before child promotion; Hub additionally hash-compared its public ZIP with the validated artifact. Exact public central equality and post-merge distribution checks are required before reporting availability complete.

## HUD utility cleanup release — 2026-10-16 UTC

The user replied **PASS** at **2026-10-16 01:08 America/Toronto** to the latest Quest Convenience checklist: ordinary dialogue/manual choices, cutscene skipping, manual and chosen automatic rewards, and off/reload ownership behavior. The instruction identified **Hub 0.3.0.0 / HUD 0.8.4.7**; versions were not independently restated. Reward mode was not named and submarine was not separately confirmed. This closes that scoped replacement gate; it does not certify all modes, all original checklist cases, logout/dual-reload races or unreported scenarios. Accepted Hub native code and saved settings are unchanged by cleanup.

Publish **Hub 0.3.1.0 first**, then **HUD 0.8.5.1**, after exact-head cloud checks. No release asset replacement. Keep Core/UI pins and all unrelated catalog objects unchanged; aggregate validated authoritative child objects exactly and require strict post-merge equality.

**Hub 0.3.1.0 / HUD 0.8.5.1** form the separate utility cleanup stage. HUD removes the Anti-AFK and Quest native services, framework call sites and action controls; its Convenience page shows retained preferences for explicit import. Schema 12, original preference values and v1 IPC import/claim/release contracts remain. Claims validate compatible requesting Hub and bounded tokens but have no native action callback. Hub changes only ownership guidance, metadata and compatibility tests; accepted engine/controller/configuration code and Core/UI pins (Hub 0.4.1, HUD 0.3.1) are unchanged. Camera/visual modules and six unrelated catalog identities remain unchanged.

**Cleanup in-game acceptance is pending.** [Exact procedure and rollback](https://github.com/MarshalTitan/SentinelHUD/blob/main/docs/UTILITY_CLEANUP.md): confirm versions/settings and HUD's migration notice; with Hub utilities enabled prove ordinary text/manual choice; turn utilities OFF and verify manual dialogue/no increasing Hub check counter after 35 seconds; disable Hub while HUD/camera continue working, then re-enable/restore options and reload HUD once. With HUD 0.8.5.0, disabling Hub leaves utility actions OFF instead of resuming old HUD engines. Rollback: turn Hub utilities OFF before restoring HUD 0.8.4.7 and review its retained old preferences. Do not repeat the prior full idle/cutscene/reward checklist for this structural cleanup.


Cloud PR validation: [Hub #5](https://github.com/MarshalTitan/SentinelHub/pull/5), exact head `e77bed56f8892aa1e2a18974741f21a1024f82e2`, [38854695201](https://github.com/MarshalTitan/SentinelHub/actions/runs/38854695201) PASS; **36 policy groups / 810 native UI cases**, accepted native/policy complete source equality, locked Core/UI 0.4.1, package/icon validation. [HUD #7](https://github.com/MarshalTitan/SentinelHUD/pull/7), exact head `d4c9471dde6578b9e699df767d2d2b3a2f3d7b67`, [build 38854697124](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38854697124) and [infrastructure 38854697198](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38854697198) PASS; **53 Core groups** (32 utility-preference combinations in the added group), **11 pinned Core UI / 7 native UI groups**, exact Core/UI 0.3.1 and package validation. Compiler zero warnings/errors in inspected code-build logs; runner action deprecation notices are separate. Neither automated result certifies live cleanup behavior.

Metadata correction: HUD **0.8.5.0** removed the native engines, but distribution inspection caught stale separate installed/catalog descriptions. **0.8.5.1** corrects those descriptions without changing runtime code or replacing the immutable 0.8.5.0 asset. Package validation now requires exact project/template/catalog/packaged description agreement. The final cleanup test pair uses Hub 0.3.1.0 and HUD 0.8.5.1.

Initial cleanup publication completed successfully: Hub source `2cd19bbec5a33f424c07722a188320dea2353acb`, [release run 38854919454](https://github.com/MarshalTitan/SentinelHub/actions/runs/38854919454), [0.3.1.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.3.1.0), public ZIP SHA256 `30aaf6d355c079cd95f316c5d5184aeca4f2e84a7e0eb94f0c272fc27232bc8d` (release metadata plus workflow public ZIP/hash comparison). HUD cleanup source `53ad2faa9c52bab9766da68a780b849dd9efbfd0`, [release 38855124978](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38855124978), [0.8.5.0](https://github.com/MarshalTitan/SentinelHUD/releases/tag/v0.8.5.0); public ZIP digest read from asset metadata `4908f6d3757bb3569ebcea104f324ec8cabd9f5d506db54a6b28659b5e1f109c`, public package validation PASS. [Central #26](https://github.com/MarshalTitan/Sentinel/pull/26), merge `8dfc5475f13304af597db27b4f4ddad9ab3b3913`, [PR 38855381203](https://github.com/MarshalTitan/Sentinel/actions/runs/38855381203) and [strict main 38855458356](https://github.com/MarshalTitan/Sentinel/actions/runs/38855458356) PASS. Exact raw readback matched both child objects; all six unrelated objects were unchanged.

Metadata patch [HUD #8](https://github.com/MarshalTitan/SentinelHUD/pull/8), exact head `a9ed5b9defa81b3a9d2aed831e1c8e4cacdf9267`, [build 38855433828](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38855433828) and [infrastructure 38855433846](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38855433846) PASS. 53/53 Core, 11/11 pinned UI and 7/7 native UI groups; 0 warnings/errors; 0.8.5.1 package validates exact project/template/catalog/installed description agreement. Merge/release source `7e77dceb46a469476e375e37739fa119ac174885` changes no C# runtime/configuration file.

Final HUD metadata artifact: [0.8.5.1](https://github.com/MarshalTitan/SentinelHUD/releases/tag/v0.8.5.1), source `7e77dceb46a469476e375e37739fa119ac174885`, [release workflow 38855597090](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38855597090). Public ZIP validation, including exact installed description agreement, passed before child promotion. Asset-metadata SHA256 `80df7fd504ca233087575532161aa4d686006d3007e514703ac04041bfcace94` was read; this is not an independently downloaded hash. The shared release workflow requires exact central equality before completion. Final catalog reconciliation copies this child object and unchanged Hub 0.3.1.0 exactly; all six unrelated entries stay unchanged. Generator/public-asset and Linux/Windows distribution checks govern the candidate and strict main verification. The remaining human gate is the narrow cleanup procedure above.

## Cleanup PASS and live/dev inventory correction — 2026-10-16 UTC

The user replied **PASS** at **2026-10-16 01:38 America/Toronto** to the four-step utility-cleanup checklist for the preceding instructed pair **Hub 0.3.1.0 / HUD 0.8.5.1**: settings retained, Hub dialogue/manual choices, both modules Off with unchanged Anti-AFK counter, and HUD/camera independence plus Hub re-enable/HUD reload. Versions were not separately restated in the reply. This closes that scoped cleanup gate. The same message reports a separate Hub Plugins inventory defect: the SRank development copy's version was shown instead of installed live **0.7.56.0**. This does not recertify unreported earlier reward modes/submarine scenarios or navigation gates.

**Hub 0.3.1.1** corrects component inventory selection. Dalamud's public IsDev and effective Version identify instances; when both copies exist, the non-dev installation supplies version, load/restriction state and fresh settings-button eligibility regardless of enumeration order. A dev-only installation remains visible with an explicit development label. Versions are read from the selected installation, not hardcoded to 0.7.56.0 or inferred from the remote catalog. Dependency lookup/probes, utility controllers/native algorithms/settings, Core/UI pins, HUD and all SRank source/binaries remain unchanged.

The focused [inventory check](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/LIVE_DEV_DISCOVERY.md) remains: update Hub to 0.3.1.1, /shub → Dashboard → Refresh inventory, then Plugins; with live SRank 0.7.56.0 and dev both installed, expect **0.7.56.0 / Installation: live** and the live loaded/not-loaded state. Dashboard must agree. No repeat utility/idle/cutscene/reward checklist. Rollback is Hub 0.3.1.0; no config deletion or SRank/HUD change. After this correction, Latency/Weaving remains a separate source/measurement/conflict-design stage with default OFF; no compensation/hooks are enabled.

Exact-head validation: [Hub #6](https://github.com/MarshalTitan/SentinelHub/pull/6), source `4faede2d14326be4c345f5018cc882b01a58fa93`, [cloud 38857061266](https://github.com/MarshalTitan/SentinelHub/actions/runs/38857061266) PASS. **39 policy groups** and **1,002 native UI cases** (672 page/state/width/theme/scale including dev-only/duplicate rows, 42 Anti-AFK, 288 Quest) passed; existing keyboard/controller/collapse/restore/privacy tests retained. Full accepted Quest native/policy source equality, locked Core/UI 0.4.1, packaged bytes/identity/icon validation and compilation with zero warnings/errors passed. Public Dalamud IExposedPlugin.IsDev and Version were checked against official source before implementation. Merge/release source `3cb54022c37a5eeceb58ff340476ac2e0a40f56b`. Automated tests do not close the focused live display check.

Publication: [Hub 0.3.1.1](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.3.1.1), source `3cb54022c37a5eeceb58ff340476ac2e0a40f56b`, [release run 38857207541](https://github.com/MarshalTitan/SentinelHub/actions/runs/38857207541). Public installable ZIP validation and public-to-validated-artifact SHA256 comparison passed before child promotion; public asset SHA256 `a537464bc9e661ff33a2377e6c67eb81261f8d57548b2600e03eddd374f34d84`. Exact authoritative child object is reconciled centrally, preserving all seven other objects including SRank 0.7.56.0 and HUD 0.8.5.1. Shared release completion requires exact public central equality. [Docs-only #7](https://github.com/MarshalTitan/SentinelHub/pull/7), [cloud 38857291633](https://github.com/MarshalTitan/SentinelHub/actions/runs/38857291633) PASS, corrects the refresh instruction to Dashboard before opening Plugins; it changes no release binary. Strict main catalog validation remains mandatory after reconciliation.

## Latency / Weaving implementation and proving — 2026-10-16 UTC

The user explicitly requested “our version of NoClippy” at **2026-10-16 01:55 America/Toronto**. This authorizes the separate Latency/Weaving implementation/proving stage after scoped utility cleanup acceptance. It does not report a PASS for the still-separate live/dev inventory display check or any native latency behavior.

**Hub 0.4.0.0** implements an independent, default-OFF **Latency / Weaving** module: Off / Measure only / Compensate. It correlates the local actor's latest successful natural-instant Spell/Weaponskill/Ability request with its native response, retaining no pointer across callbacks. A normal intact 0.5–0.8 s server lock, standard predicted lock, plausible countdown and a response within 500 ms are required. Correction is bounded by a fixed 40 ms response buffer and maximum 250 ms reduction; only local remaining AnimationLock is written after the original handler. Natural cast-time actions (including instant-cast effects), nonstandard/long locks, stale/reordered/duplicate/invalid effects, packets, cooldowns and action selection are excluded. No status prediction or packet-send hook is added.

Hooks are created lazily only with an explicit active mode and ready character, and disposed on Off/logout/transition/death/territory/mode changes or conflict. A shared tested transaction forwards Original and its arguments exactly once even when observations fail. Native setup/contention faults latch until Off. Any loaded NoClippy copy blocks; named XivAlexander modules and identifying exports (including renamed proxies) block without override. Full module checks precede eligible response writes; unavailable checks pause, and unexpected lock changes stop the session. Detection is scoped to known identities/exports and invariants, not every possible custom modifier. Diagnostics export only typed state and bounded numbers; no actor/action IDs, module paths, packets or private plugin configuration. HubVersion now derives from Hub's own assembly.

**At publication, native in-game acceptance was pending** under [the exact Measure→Compensate procedure and rollback](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/LATENCY_WEAVING.md). Update Hub 0.4.0.0; /shub → Utilities → Latency / Weaving. Confirm NoClippy conflict blocks, then Off and disable other compensators. At a training dummy with rotation automation off, measure about ten instant actions and confirm samples with zero applied adjustments; only then try normal single/double weaving in Compensate for about a minute. Above 40 ms response, applied counts should grow; low-delay zero correction is valid. Check Off, zoning and one Hub reload. Return version/job/response, counts and felt better/unchanged/worse plus any untested step. If measuring yields zero eligible samples, stop before Compensate and report state/job. Rollback is Off/disable Hub or Hub 0.3.1.1; no configuration deletion. Publication, numerical tests and compilation do not prove native correctness, real conflict detection or improvement.

Accepted Anti-AFK/Quest native code/settings, live/dev selection, Core/UI pins (Hub 0.4.1, HUD 0.3.1), HUD 0.8.5.1 and seven unrelated catalog identities remain unchanged by this stage. Existing hunt/PvP/navigation gates remain separate.

Cloud source/validation: [Hub #8](https://github.com/MarshalTitan/SentinelHub/pull/8), final head `941d94778ccb2552319bf2103a5fd1a2799f3c13`, [38860383806](https://github.com/MarshalTitan/SentinelHub/actions/runs/38860383806) **PASS**. **50 policy groups** include the full compensation lattice, metadata eligibility, correlation/replay/expiry, contention, hook-factory lifecycle, exact-once original helper, conflict classification, default-Off settings and numerical/privacy export. **1,200 native UI cases** = 672 page/state/width/theme/scale + 42 Anti-AFK + 288 Quest + 198 latency mode/state/theme/scale; keyboard/controller/collapse/restore and scroll/no-settings-mutation checks passed. Native typed delegate/product compilation had **zero warnings/errors**. Complete accepted Quest source/policy comparison, Core/UI 0.4.1 lock/hash/bundled bytes, scripts, installed metadata/icon/API/version and new exact description agreement passed. First run's old “no Latency field” assertion was updated to assert the new preference remains Off; this was test maintenance for the additive setting, not a native failure. Merge/release source `2e5b7a9b49ea8fb8bc7019536dbafe48e9126eea`.

Publication: [Hub 0.4.0.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.4.0.0), source `2e5b7a9b49ea8fb8bc7019536dbafe48e9126eea`, [main/release 38860815114](https://github.com/MarshalTitan/SentinelHub/actions/runs/38860815114). Release validation repeated all required checks, then public ZIP validation and public-to-validated-artifact hash comparison passed before child promotion. Public ZIP SHA256 `d062bb03e8d8b339a696a81f7b6df8933c46991f0b8c45bb5c430cd5e131cb22`. Catalog reconciliation copies the authoritative child object exactly and preserves the other seven identities. Shared release completion and strict main catalog verification require exact public equality. Publication alone does not establish native acceptance; the later scoped play-test evidence is recorded below.

## Latency / Weaving scoped play-test PASS — 2026-10-17 UTC

The user replied “I'd say PASS. I am not exactly sure how it works, but things seem good?” after the Hub 0.4.0.0 proving instructions. The attached screenshot `image(20261017-021946).png` shows **Compensate / Active**, **28 samples / 28 applied adjustments**, **313 ms last / 233 ms average action response**, **250 ms last calculated correction**, and **5,146 ms applied total**. The screenshot does not show the Hub version or job; 0.4.0.0 is the instructed build, not independently visible version evidence.

This records a **scoped normal-play PASS with active compensation and no problem reported**. It is not an explicit better-versus-Off comparison or an independent timing measurement. Known-conflict blocking, Measure-only zero writes, Off stopping counts, excluded-action behavior and zoning were not separately reported and remain unconfirmed under the [focused procedure](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/LATENCY_WEAVING.md). The separate live/dev inventory display check and existing hunt/PvP/navigation gates are unchanged.

Action-response values include server/frame delay, not raw network ping. The module reduces extra local waiting after eligible instant-action responses, retaining a 40 ms buffer and a 250 ms per-action cap; it does not speed cooldowns or invoke actions. The applied total accumulates individual corrections, not demonstrated encounter time saved or damage gain. This evidence update changes documentation only; Hub remains 0.4.0.0 with default-Off settings and unchanged native code/catalog.

Follow-up at **2026-10-16 22:26 America/Toronto (2026-10-17 UTC)**: the user reported “re-enabling everything and reloaded Hub. Everything still seems to work”. This adds a **scoped re-enable / Hub reload PASS** to the normal-play result. The reply does not identify every re-enabled component, restate version/job, provide post-reload counters, or separately confirm zoning/conflict handling. It does not establish that NoClippy/XivAlexander can run alongside Hub compensation; the single-compensator requirement remains. No new fault or regression was reported.

## Hub inventory display PASS and latency clarification — 2026-10-17 UTC

At **2026-10-16 22:32 America/Toronto**, the user confirmed “yup it shows correctly” in response to the focused Hub Plugins check for the installed live **SRankSentinel 0.7.56.0** instead of the development copy. This closes the reported live/dev version-display issue as a scoped user PASS. Hub 0.4.0.0 was the current instructed build; the reply did not separately restate Hub version or certify every inventory permutation, Dashboard/state/quick-open path. Existing automated selection coverage remains separate.

The user also clarified at 22:28 that “everything” meant Hub's own features and that they have **never used NoClippy**. The earlier reload PASS therefore concerns Hub features; real NoClippy conflict blocking remains untested. Installing another compensator is not required to continue independent Hub work.

**Measure only remains available** as the observation-without-writes troubleshooting mode. The user asked whether to retain it; the recommendation is to keep it, with Compensate for normal use. No removal or native behavior change is made. Normal-play/re-enable/reload acceptance remains scoped as above, and remaining latency scenarios and unrelated hunt/PvP/navigation gates are unchanged. This is a documentation-only reconciliation, with no new binary, version, settings or catalog changes.

## Remote controls publication hold — 2026-10-17 UTC

SRank [#28](https://github.com/MarshalTitan/SRankSentinel/pull/28), candidate 0.7.62.0, and
Relay [#11](https://github.com/MarshalTitan/SentinelRelay/pull/11), candidate 0.5.0.6, are
draft PR-only artifacts. Do not merge their version changes or create releases until
Wrothy passes the scoped real-game status/skip/reset/isolation gate. Existing releases
SRank 0.7.56.0 / Relay 0.5.0.5 remain rollback; no assets/child/central entries are changed.
The separate navigation PR #25 remains untouched/unpublished.

After returned evidence passes, carry normal review/merge/build/test/publication through
for each compatible consumer, verify immutable release ZIPs, child manifest promotion and
exact public central equality, then update canonical records. Keep the new permission OFF
by default for every character, including upgrades. Core stays unchanged: latest 0.4.1
is published, but this feature retains the consumers' compatible exact 0.3.1 pins.
Only Wrothy is the initial proving profile; prepare Elektra acceptance separately.

Exact source/artifact/CI evidence is pinned in [the remote-control test record](TEST_MATRIX.md#exact-candidate-source-ci-and-downloads). New SRank contract/UI-equivalence checks are required in both build and future release workflows. Existing publication triggers and immutable-asset/distribution behavior are unchanged.

## Remote controls: authorized normal-update delivery — 2026-10-17 UTC

The user asked to update the live plugins instead of installing dev builds. This
**supersedes the earlier remote-feature dev-only publication hold**, not the required
native acceptance record. SRank **0.7.62.0** ([#28](https://github.com/MarshalTitan/SRankSentinel/pull/28))
and Relay **0.5.0.6** ([#11](https://github.com/MarshalTitan/SentinelRelay/pull/11)) are delivered
through the existing permanent Sentinel catalog. Relay's independent per-character
**Allow SRankSentinel remote controls** permission defaults OFF on new and existing profiles.
Existing UI recovery bodies, hunt policy, chat/screenshot behavior and exact Core/UI
0.3.1 pins remain unchanged. Core 0.4.1 stays published without a new release.

Both feature PRs were marked ready after the user's new instruction. Release source:
SRank `8abf63ede74eab3b794da06a1a5e6870506e4c2b`;
Relay `228996970a2b61d9e16578be8fbe8d3a9efe158c` (existing `[publish-live]` trigger).
Final pre-merge CI passed at SRank `a3a939362ddb1b67d8fa72d04a60bf6ca5b50d9d`
and Relay `ab0fc3cf79710ee54ddb1c5cf5d33abf10db4874`; these subsequent changes were
delivery documentation/release notes only. Publication repeats automated tests and
validates public ZIPs before child promotion; child repos never write the central catalog.

Native proof remains pending and must not be relabeled PASS. The initial held versions/
artifact hashes above describe the earlier candidate snapshot. Immediate rollback is
the new permission OFF/save; prior immutable SRank 0.7.56.0 / Relay 0.5.0.5 releases remain.

### Normal publication and integrity evidence

[SRank 0.7.62.0](https://github.com/MarshalTitan/SRankSentinel/releases/tag/v0.7.62.0),
source `8abf63ede74eab3b794da06a1a5e6870506e4c2b`,
[release run 38998030447](https://github.com/MarshalTitan/SRankSentinel/actions/runs/38998030447).
Public asset metadata SHA256:
`fc80d34253e149a95401d183c58598853832336e9dff85b1ae53ac57e36e6707`.

[Relay 0.5.0.6](https://github.com/MarshalTitan/SentinelRelay/releases/tag/v0.5.0.6),
source `228996970a2b61d9e16578be8fbe8d3a9efe158c`,
[release run 38998043832](https://github.com/MarshalTitan/SentinelRelay/actions/runs/38998043832).
Public asset metadata SHA256:
`41bec3ea51b4cf41414756036c642aaa9df1733ec90dca3dfd0bf0826d3d4619`.

Release workflows repeat their automated suites and download/validate public ZIPs
before authoritative child promotion. These digests were read from GitHub release
metadata, not independently recomputed by the architect. Child and central objects
for both new versions match exactly; six other central objects remain byte-value
equivalent to the prior catalog, including SentinelHunts. Core/UI pins are unchanged.
The final pre-merge checks also passed at
[SRank 38997935074](https://github.com/MarshalTitan/SRankSentinel/actions/runs/38997935074)
and [Relay 38997938930](https://github.com/MarshalTitan/SentinelRelay/actions/runs/38997938930).
This is delivery/automated evidence, not a new native PASS.

## Relay territory-label patch — 2026-10-17 UTC

The user returned successful remote-control evidence and requested map names in replies.
Relay-only 0.5.0.7 uses the existing normal `[publish-live]` path after CI and diff review.
SRank stays 0.7.62.0; no Core release, IPC migration, new permission or catalog entry.
Immutable public ZIP validation precedes child promotion; optional notification is
followed by exact public child/central verification. Preserve the seven other catalog
objects. The user-reported status/reset PASS applies to the prior live pair; publication
of the label patch is not independent native validation of localized name lookup.

Delivery: [Relay PR #12](https://github.com/MarshalTitan/SentinelRelay/pull/12),
merge/release source `2cd747b815de6b4f2d30ac354c0a317c71c946fa`;
[final PR CI 38999806224](https://github.com/MarshalTitan/SentinelRelay/actions/runs/38999806224)
passed 57/57 existing tests and 12/12 remote groups, product build with zero warnings/errors,
exact Core 0.3.1 and installable package validation. Release repeats those checks:
[38999883616](https://github.com/MarshalTitan/SentinelRelay/actions/runs/38999883616).
Published [v0.5.0.7](https://github.com/MarshalTitan/SentinelRelay/releases/tag/v0.5.0.7)
asset `SentinelRelay.zip` metadata SHA256:
`ed7e6946feb6a52aade2b5085d0c80fb9e9e16ce3d054932b1a74d8ba11503af`.
The digest is from GitHub metadata, not independently rehashed by the architect.
Public ZIP/version validation precedes child promotion; exact child/central equality
and all seven unchanged unrelated catalog objects are verified before closing delivery.

Catalog reconciliation [39000020828](https://github.com/MarshalTitan/Sentinel/actions/runs/39000020828)
succeeded at `29246d11657ffadcf658aa4ef18b5bdbe5190f8b`. Exact public child/central
Relay 0.5.0.7 objects match; eight entries remain and the other seven are unchanged.

## Completed handoff UI and Profiles bar delivery — 2026-10-17 UTC

Publish HUD 0.8.5.2, Hub 0.4.0.1 and Profiles 0.2.1.7 independently after their CI and diff
reviews, using normal updates. Either HUD/Hub order is compatible. Profiles retains
manual main dispatch and additionally accepts an explicit main `[publish-live]` marker;
ordinary main commits and PRs never publish. Immutable assets and exact distribution
verification are unchanged.

HUD package CI previously hardcoded 0.8.5.1 and failed the new version correctly.
It now reads the four-part project version for validation/artifact naming, retaining
strict package/version checks. No release checks were bypassed or published assets replaced.
Each release validates its public ZIP before authoritative child promotion, optional
notification, central reconciliation and exact public verification. Preserve all five
unrelated catalog objects and SentinelHunts. No Core/SRank/PvP release accompanies this work.

[Exact PR/CI/source/public asset evidence](TEST_MATRIX.md#releasesource-evidence) records the three immutable releases.
Public child/central objects match all three new versions; eight identities remain and
all five unrelated objects are unchanged. Native display/cleanup observation remains scoped.

## Mount Collection publication — 2026-10-17 UTC

[Hub #12](https://github.com/MarshalTitan/SentinelHub/pull/12), final head `0f2e0a225cdce0b678f13ee44062a4b3e4667e23`, passed [PR CI 39004931436](https://github.com/MarshalTitan/SentinelHub/actions/runs/39004931436): **67 policy groups, 1,364 native UI cases**, zero compiler warnings/errors, installed metadata/package checks and exact Core/UI 0.4.1 bundled bytes. Squash/release source `3c2a5a50dd3bc937bb45ffc648a676eb825f2140` has the exact tested tree.

[Hub v0.5.0.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.5.0.0), [release workflow 39005065871](https://github.com/MarshalTitan/SentinelHub/actions/runs/39005065871), repeats required validation. Public ZIP validation and public-to-tested-artifact hash equality passed before child promotion. GitHub asset metadata digest: `sha256:81c19e1c92451a03c9b46339aba14caba470bef9df5a8217154aa4a2c62538b4` (metadata read; not independently rehashed by the architect). The immutable prior Hub 0.4.0.1 asset is retained.

This reconciliation copies the authoritative public Hub child object exactly and preserves the other seven catalog objects, including historical SentinelHunts. Strict central CI and the child release's final exact-catalog verification remain required before delivery is closed. No Core/consumer release or native utility change accompanies this module. Native acceptance stays open under [MOUNT_COLLECTION.md](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/MOUNT_COLLECTION.md); source/metadata coverage limits are explicit.

## Mount acquisition enrichment publication — Hub 0.5.1.0, 2026-10-17 UTC

[Hub #13](https://github.com/MarshalTitan/SentinelHub/pull/13), tested head `7851d24e282b3338d1a278871fcc55a457900c61`, [PR validation 39006872306](https://github.com/MarshalTitan/SentinelHub/actions/runs/39006872306) PASS: **75 policy groups, 1364 native UI cases and installable ZIP validation**. Release source `34ca50bebeed0c2367b2c79929505f33f8ec3a27` has the exact tested tree `eaa07764eb834c25a94784a16676d7c5467adfba`. [Hub v0.5.1.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.5.1.0), [normal release workflow 39006972086](https://github.com/MarshalTitan/SentinelHub/actions/runs/39006972086).

Only Hub changes. Product builds use committed resources and make no acquisition API call. A separate source-audit workflow fetched a complete 356-result API response before integration. The source proposal, explicit API reuse permission, exact retrieval timestamp/original-response SHA256 and attribution are recorded in the Hub provenance document; the FFXIV Collect application's MIT license is not substituted for a database grant. Official store title/URL facts and Edelina vendor facts are independently maintained.

Publish immutable versioned assets through the existing validate/publish/distribute path, validate public ZIP/Core/version metadata and compare its SHA with the tested artifact before promotion. Central repo.json must copy the authoritative public Hub 0.5.1.0 child object exactly while preserving the other seven objects. Strict central CI and the release's final exact public-catalog verification remain required. No replacement asset, Core release or native utility change is part of this delivery. Native acquisition/count/token/context acceptance remains pending.

Release asset metadata: SentinelHub.zip, 342201 bytes, `sha256:c29343bb4ef18d7042ec4b857a9ef119b849b3792324375d3c7262edb29f66ba`. This is GitHub's asset digest; the release pipeline independently compares the public ZIP with the tested artifact. Child promotion commit `9dea4ad1d8477eedd35196e38eff7e5a37f2344d` is version 0.5.1.0. The normal catalog reconciliation commit `456828e25ab68e140d668907b9cb52e3d73c5866` already copied that Hub object exactly and preserved the other seven catalog objects. This follow-up updates canonical documentation without rewriting the reconciled catalog.

## Fashion Accessories release — Hub 0.6.0.0, 2026-10-18 UTC

[Hub #14](https://github.com/MarshalTitan/SentinelHub/pull/14), tested head `a5a26e86ec278c8d89c9d07e2fe7beb631dc7213`, [PR CI 39140216877](https://github.com/MarshalTitan/SentinelHub/actions/runs/39140216877) PASS: **87 policy groups, 1648 native UI cases, typed reader fixtures against FFXIVClientStructs 7.57.0.9386 and installable package validation**. Exact-tree release source `6dd61dc9926edd5e1205426ba94d67715085d87e` / tree `72610af673a9f126b0f2cbd70f545d8b1b95ce27`. [Hub v0.6.0.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.6.0.0), [normal release workflow 39140412825](https://github.com/MarshalTitan/SentinelHub/actions/runs/39140412825).

The source/API/license audit and source proposal preceded import; source-audit workflows cross-checked the complete identity sets against a public Ornament game-sheet view and a permitted FFXIV Collect snapshot. No raw external game-row dataset is shipped. Product build/tests use committed resources and make no acquisition API call. Own unlocks and remote identity data are not persisted/exported. The new native surface is read-only and default-OFF; source definitions are current typed SDK fields, not unmanaged hooks or copied offsets.

Publish through the existing immutable validate/publish/distribute workflow, validate package/version/Core contents and public ZIP versus tested artifact equality, then promote the child. Verify authoritative child repo.json against the central catalog exactly, preserving the other seven entries. All five canonical documents must be reconciled and strict central Windows/Linux distribution checks must pass before delivery closes. Core/UI remain 0.4.1; no utility/Mount catalog/token engine change is part of this release. Supervised Fashion/shared-identification acceptance remains pending.

Publication evidence: `SentinelHub.zip`, 373451 bytes, GitHub asset metadata digest `sha256:978f75867fb6d4d58896b076a6cd7e4b3573f17f795155ad672399873220a11c` (metadata read, not independently rehashed by the architect). The release pipeline validates the public ZIP against the tested artifact. Child promotion commit `9aec4202373bee5e3b10adda35287987c6340b38` publishes version 0.6.0.0. This reconciliation copies that authoritative public Hub object exactly and preserves the other seven catalog entries; it also updates all five canonical documents. Strict PR/post-merge catalog CI and final public-child/central equality are required, with supervised game acceptance still pending.
