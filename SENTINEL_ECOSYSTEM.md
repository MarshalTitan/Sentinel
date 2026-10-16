# Sentinel Ecosystem

Verified **2026-10-16 UTC for Hub publication and catalog inventory**; earlier dated gameplay evidence retains its original scope. This is the coordination index; [Architecture](ARCHITECTURE.md), [Roadmap](ROADMAP.md), [Release process](RELEASE_PROCESS.md), and [Test matrix](TEST_MATRIX.md) own their respective detail.

## Operating agreement and evidence

The user steers priorities and performs in-game acceptance. The architect coordinates the entire ecosystem and carries routine implementation, automated testing, PR creation/merge, release and catalog verification through automatically within the agreed scope. Stop only for destructive ambiguity, unavailable permissions, or required in-game validation; continue independent work that is not blocked. Use cloud execution/GitHub for routine work; use the user's PC only when live game access or testing requires it. Preserve independent plugin repositories, existing behavior, configurations, identities, and explicit opt-ins unless the user explicitly requests the change.

A live-test result is authorization to resume the current engineering phase automatically: classify evidence, reconcile canonical records, implement the next source-supported change, test/review/fix, advance routine PR/release/catalog work and prepare the next proving build. Do not wait for another “proceed”. Stop only at real FFXIV validation, product-direction conflict, destructive/irreversible ambiguity or unresolved credentials/permissions. Every FFXIV gate names the exact build/download, settings/commands, shortest procedure, PASS behavior, required evidence and rollback. Maintain the active queue in ROADMAP.md; independent low-risk work may continue while a human test is pending, in separate PRs/builds that cannot invalidate that test.

Break work into reviewable stages: verify current source/releases and evidence; define the narrow change and compatibility constraints; implement and run relevant automated checks; obtain required in-game acceptance; publish and verify child/central manifests; reconcile these five documents. Keep published functionality, implemented candidates, planned work, reported issues and pending validation distinct. Update the applicable documents whenever verified reality changes during ecosystem work; record blockers with the exact evidence or decision needed.

**Published** means an accessible release/catalog artifact, not proof of in-game correctness. **Implemented** means inspected source; **planned** means work still to do; **reported issue** means user evidence without a verified current-build closure; **unverified** means evidence is missing. Source-of-truth order: live repository source; published releases/assets; live workflows/manifests; canonical ecosystem Markdown; current active chats; historical chats. Resolve source-versus-release differences explicitly; an implemented head is not automatically a published binary.

The user confirmed Hub/Trains scope and the broad execution order on 2026-10-06 America/Toronto; those decisions are recorded in [Roadmap](ROADMAP.md). Earlier incomplete chat retrieval no longer blocks this scope.

## Verified inventory

The six pre-Hub plugin projects retain Core UI package **0.3.1**; Hub bundles **0.4.1**. Core **0.4.1** is published; Hub uses its unchanged UI APIs while the unmerged SRank proving PR separately adopts opt-in navigation. The eight current central catalog objects match their authoritative child objects after Hub registration.

| Component | Published identity | Responsibility and current boundary |
|---|---|---|
| SentinelCore | [v0.4.1.0](https://github.com/MarshalTitan/SentinelCore/releases/tag/v0.4.1.0); NuGet 0.4.1 | Additive navigation, bounded opt-in physical landing and sanitized diagnostics; UI APIs unchanged. Existing consumers retain 0.3.1. No installed Core plugin/catalog entry. |
| Central Sentinel | [current catalog](https://github.com/MarshalTitan/Sentinel/blob/main/repo.json) | Approved registry, deterministic aggregation, validation, last-known-good fallback and automated reconciliation. |
| SRankSentinel | [v0.7.56.0](https://github.com/MarshalTitan/SRankSentinel/releases/tag/v0.7.56.0) (prerelease) | S/SS report intake, same-DC queue/travel, safe parking, one gated tag, positive kill evidence and recovery; companion/history UI. |
| PvPSentinel | [v0.3.1.23](https://github.com/MarshalTitan/PvPSentinel/releases/tag/v0.3.1.23) | Experimental five-map Frontline navigation, diagnostics and combat-provider boundaries. Map recognition does not imply complete objective semantics or in-game acceptance. |
| SentinelHUD | [v0.8.5.1](https://github.com/MarshalTitan/SentinelHUD/releases/tag/v0.8.5.1) | Actor HUD/editor, self marker/highlight, awareness, targeting counter and camera. Utility engines moved to Hub; original import preferences retained. |
| ClassySentinel | [v0.8.6.0](https://github.com/MarshalTitan/ClassySentinel/releases/tag/v0.8.6.0) (prerelease) | Exact gear-set launcher, dynamic job classification, multiple sets and scoped controller capture. |
| SentinelProfiles | [v0.2.1.6](https://github.com/MarshalTitan/SentinelProfiles/releases/tag/v0.2.1.6) (prerelease) | Manual three-state profiles and drift reporting; separate responsive actions/editor repair published, visual/controller acceptance pending; restart semantics unchanged. |
| SentinelRelay | [v0.5.0.5](https://github.com/MarshalTitan/SentinelRelay/releases/tag/v0.5.0.5) | Per-character webhooks, authorized REST-polled replies, hunt rewards and opt-in game-window screenshots; no hosted backend. |
| SentinelHunts | Historical test, still cataloged as 0.1.1.0 | User retired it from Hub inventory. This Dashboard-scoped removal does not delete its historical catalog/release identity. It is not Sentinel Trains. |
| Sentinel Hub | [v0.3.1.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.3.1.0) beta | Optional control center; scoped Anti-AFK/Quest replacement PASS. Utility ownership guidance updated for cleaned HUD; cleanup runtime gate pending. Profiles/Relay runtime state remains unavailable. |
| Sentinel Trains | Planned; scope confirmed | Independent A-rank train automation consuming future shared navigation; does not replace SRankSentinel or SentinelHunts. |

GitHub's stable-only latest-release endpoint returned 404 for SRank, Classy and Profiles; release lists and exact catalog tags verified their prereleases instead. Never interpret that 404 as “unpublished.”

## Important reconciliations

- The unchanged released-consumer UI baseline is **0.3.1**, tag **v0.3.1.0**, commit `300703b360a58fb4b73bf7675d31fe8cab4614cd`. UI package release-metadata SHA-256: `e1a9ce4e1ce36042c0fcd53f4c23874d918640be10eef16c21f1cd436c6ba747`. This audit read GitHub's digest; it did not independently download/hash the package.
- SRank source includes direct Faloop integration as well as HuntAlerts/Sonar despite older introductory descriptions. Personal reward credit is distinct from report/tag/kill evidence; [Plugin.History.cs](https://github.com/MarshalTitan/SRankSentinel/blob/0731a00e9186ec916718e6c031d4f0b163a6a3e6/Plugin.History.cs) gates receipt matching and enabled-expansion recording.
- PvP [readiness code](https://github.com/MarshalTitan/PvPSentinel/blob/d47e8b7429c135fec2976c1e980175f33787c4f3/Strategy/FrontlinePilotReadiness.cs) permits travel with responsive, loaded RSR even when its mode reports Off. Generic external/native modes do not satisfy the current automatic-pilot connection gate. Queue/requeue remains disabled.
- Relay's earlier hosted-service/slash-command architecture is superseded. Its prefixes are ordinary Discord messages polled by the plugin, not registered application commands.
- HUD/Classy/Profiles Modern minimize/restore and Classy controller behavior passed the user's 2026-10-06 report. Do not extend that acceptance to untested consumers or all full-game restart semantics.

## Historical gameplay source audit

These are source snapshots, not a claim that every head is a release tag target; release workflows can add manifest-only commits.

- [Sentinel `1f703528c428`](https://github.com/MarshalTitan/Sentinel/commit/1f703528c428fc993945aafb85a27bdd0742932e)
- [SentinelCore `300703b360a5`](https://github.com/MarshalTitan/SentinelCore/commit/300703b360a58fb4b73bf7675d31fe8cab4614cd)
- [SRankSentinel `0731a00e9186`](https://github.com/MarshalTitan/SRankSentinel/commit/0731a00e9186ec916718e6c031d4f0b163a6a3e6)
- [PvPSentinel `d47e8b7429c1`](https://github.com/MarshalTitan/PvPSentinel/commit/d47e8b7429c135fec2976c1e980175f33787c4f3)
- [SentinelHUD `e7d53978a282`](https://github.com/MarshalTitan/SentinelHUD/commit/e7d53978a2821ffc4cb6613de4b92511caad415d)
- [ClassySentinel `8763b77a1f8b`](https://github.com/MarshalTitan/ClassySentinel/commit/8763b77a1f8b8fcc4a01845d108715b4431565d7)
- [SentinelProfiles `23610575f0a9`](https://github.com/MarshalTitan/SentinelProfiles/commit/23610575f0a9f20a31f003866cfcb60ea1b4caf8)
- [SentinelRelay `d2401031bd20`](https://github.com/MarshalTitan/SentinelRelay/commit/d2401031bd20430c37d2bc0d64a98aa17c157954)

## Release-infrastructure phase completed

Phase 1 merged in all six child repositories; see [release process](RELEASE_PROCESS.md) and [audit/evidence](docs/RELEASE_INFRASTRUCTURE_AUDIT.md). One pinned CI action in Sentinel maintains child manifests and verifies exact public distribution with optional notification. This introduces no runtime plugin coupling. Classy PR publication and asset replacement were removed; SentinelHunts now has a complete child-manifest path. Published plugin versions and all seven catalog entries were unchanged by Phase 1. Core subsequently advanced to 0.4.0 for isolated Phase 3 foundations.

## Phase 2 live evidence and Phase 3 readiness

The user's 2026-10-06 22:40 America/Toronto report is recorded in [current-build acceptance](TEST_MATRIX.md#current-build-supervised-acceptance). Reported passes: HUD/Classy/Profiles minimize/restore, Classy controller behavior, HUD submarine skipping, and SRank 0.7.54.0 ordinary mount/travel/fluid flight/configured-% tag/reward-wait/return. Exceptions: Profiles PROFILE ACTIONS clipping and ambiguous full-game-restart behavior, SRank history height and away/sideways facing. Narrower responsive UI widths are requested. PvP 0.3.1.23 was not tested; unrelated HUD choices/rewards and exceptional hunt recovery remain open. Screenshots were inaccessible; the written report is the evidence, with its version/context limits recorded.

**Phase 3 foundations are published; consumer adoption remains gated.** Core 0.4.1.0 adds opt-in bounded landing after [PR #4](https://github.com/MarshalTitan/SentinelCore/pull/4), retaining operation ownership until stable physical ground evidence or failure. [SRank PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25) prepares **0.7.61.0**, commit `5e23d52bd750ecbef74d9b0f9ba80c879aee135e`, with exact bundled Core 0.4.1 packages. It remains unmerged/unpublished; public comparison and rollback remain **0.7.54.0**. The 0.7.59.0 probe passed readiness/mount/takeoff/pathfinding/following and user-reported flight cancellation/replacement; 0.7.60.0 now has a scoped physical landing/cancellation/resume PASS: human unmount/landing plus an inspected Landing → Arrived/GroundConfirmed replacement excerpt. No repeated probe is required. The next gate is actual ordinary-hunt approved protected flight followed by unchanged safe landing/tag/kill/return in 0.7.61.0. PvP baseline/migration and UI/facing work remain separate. See [Phase 3 evidence](docs/NAVIGATION_FOUNDATION.md).

Refresh the inventory, outstanding evidence and test results together when a release changes behavior. Do not copy “passed” counts from chat into current acceptance records.


Independent live-state reconciliation at **2026-10-07 16:05 UTC**: [Profiles PR #2](https://github.com/MarshalTitan/SentinelProfiles/pull/2), source `291c3e777f7839463e4ac925ea72135f3e40b71d`, published [0.2.1.3](https://github.com/MarshalTitan/SentinelProfiles/releases/tag/v0.2.1.3). Inspected UI source adds scrollable actions/editor, measured state-control reflow and a 680-logical-pixel minimum in both themes; profile/restart semantics are unchanged. Published asset metadata SHA256 `39695578453ab4ea1a345fdf541fe4e586c9b54982ec3b7f50a49e9e2c771aab` was read, not independently rehashed. Child/central manifest objects match. This is separate from navigation: its [visual/controller acceptance](https://github.com/MarshalTitan/SentinelProfiles/blob/291c3e777f7839463e4ac925ea72135f3e40b71d/docs/UI_VALIDATION.md) remains pending and is not part of the SRank proving procedure. Earlier dated 0.2.1.2 baseline reports remain historical.

## Sentinel Hub MVP — 2026-10-16 UTC

The explicit Hub build request reprioritized the previously deferred control center. **SentinelHub 0.1.0.0 beta** is now published and cataloged from its independent repository; [source/acceptance](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/ACCEPTANCE.md), [release](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.1.0.0).

Implemented: Core Modern/Classic shell, Dashboard, Plugins, Dependencies, Profiles status foundation, inactive Utilities plans, sanitized Hub diagnostics export, Appearance/About and fixed safe consumer settings commands. Installed/loaded/version state comes from public Dalamud discovery. Verified read-only probes cover vnavmesh, Lifestream, RotationSolverReborn and Splatoon. Loaded, responding, mesh-ready and consumer gameplay readiness are deliberately distinct.

**Known limits:** selected/last-applied profile, drift, consumer faults, Relay connection and updates remain unavailable/not queried where no safe public contract exists. No private config/reflection, profile application, game hooks or HUD utility migration is introduced. HUD still owns Anti-AFK/Quest Convenience; camera and visual presentation remain in HUD. Hub absence does not disable any consumer.

Hub alone bundles Core/UI **0.4.1** (published tag/source verified); the six prior plugin projects retain their own 0.3.1 UI pins. Latest public catalog versions inspected for this task are SRank **0.7.56.0**, Profiles **0.2.1.6**, and the other five previous entries unchanged. This publication adds the eighth entry and does not recertify any dated gameplay evidence. PR #25 remains open at `5e23d52bd750ecbef74d9b0f9ba80c879aee135e`; no navigation gate is advanced.

Automated validation and exact release/catalog verification are recorded in [Test matrix](TEST_MATRIX.md#sentinel-hub-mvp--2026-10-16-utc). **In-game acceptance pending.** Next recommended utility is default-OFF Anti-AFK, after dashboard acceptance and explicit single-owner transition design.

## Anti-AFK migration and Hub corrections — 2026-10-16 UTC

The user reported that Hub looks good, retired Sentinel Hunts as a test build for Hub inventory, and authorized migration. This is visual acceptance, not a separately confirmed pass of every MVP check.

Hub **0.2.0.0** removes Sentinel Hunts from its inventory/dependency uses and repairs the installed icon metadata. Cloud audit of the public 0.1 ZIP confirmed its installed manifest lacked IconUrl; the PNG itself was valid. The historical SentinelHunts catalog identity is not removed by this Dashboard-scoped request.

Hub now has an isolated **default-OFF Anti-AFK** engine with explicit optional preference import. HUD **0.8.4.6** retains its engine, saved setting and schema, adding only an optional ownership bridge. Absent/old Hub preserves HUD behavior. A compatible loaded HUD must acknowledge a fresh short claim before Hub writes; legacy/unknown installed HUD blocks Hub. Disable/logout/unload stops Hub's writer before release; HUD retains rollback ownership.

**Supervised Anti-AFK acceptance is pending.** No HUD cleanup, Quest Convenience/submarine/reward migration, camera change or latency engine is included. After the replacement passes the [exact live gate](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/ANTI_AFK_MIGRATION.md), continue the next separate migration under the operating agreement.

## Quest Convenience proving and Anti-AFK PASS — 2026-10-16 UTC

The user replied PASS at **2026-10-16 00:46 America/Toronto** to the latest four-step Anti-AFK checklist: Hub Active/HUD Managed, module OFF returns the retained HUD setting, Hub reload restores ownership, and idle beyond the configured automatic-away interval. The instruction referenced Hub **0.2.0.0** / HUD **0.8.4.6**; versions were not independently restated or inspected in the PASS reply. This closes that scoped supervised gate. It does not certify unreported original checklist cases, independent native instrumentation, all logout/dual-plugin reload races or all future builds. Anti-AFK source/settings are unchanged by Quest migration.

Published/cataloged **Hub 0.3.0.0** and **HUD 0.8.4.7** begin the next independent utility transition. Quest master and subfeatures default OFF/Manual on upgrade; explicit import copies only three public quest preferences and preserves HUD's original values. Loaded compatible HUD must synchronously suspend/acknowledge before Hub acts; installed legacy/unknown HUD blocks Hub. Pending confirmations/rewards clear on handoff, option change, logout/unload or native fault. Ordinary choices remain manual. The accepted submarine/base-addon fix and reward modes/fallbacks are preserved by complete source comparison.

**Quest native acceptance is pending** under [the exact gate](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/QUEST_CONVENIENCE_MIGRATION.md); report the reward mode and any untested scenario. HUD retains both original engines/settings for rollback. No cleanup, latency, camera, visual, hunt, PvP or Core package migration is included.

Source/publication/test evidence is recorded in RELEASE_PROCESS.md and TEST_MATRIX.md. The central candidate copies the two authoritative validated child objects exactly; all six unrelated catalog entries remain unchanged.

## Quest PASS and HUD utility cleanup — 2026-10-16 UTC

The user replied **PASS** at **2026-10-16 01:08 America/Toronto** to the latest Quest Convenience checklist: ordinary dialogue/manual choices, cutscene skipping, manual and chosen automatic rewards, and off/reload ownership behavior. The instruction identified **Hub 0.3.0.0 / HUD 0.8.4.7**; versions were not independently restated. Reward mode was not named and submarine was not separately confirmed. This closes that scoped replacement gate; it does not certify all modes, all original checklist cases, logout/dual-reload races or unreported scenarios. Accepted Hub native code and saved settings are unchanged by cleanup.

**Hub 0.3.1.0 / HUD 0.8.5.1** form the separate utility cleanup stage. HUD removes the Anti-AFK and Quest native services, framework call sites and action controls; its Convenience page shows retained preferences for explicit import. Schema 12, original preference values and v1 IPC import/claim/release contracts remain. Claims validate compatible requesting Hub and bounded tokens but have no native action callback. Hub changes only ownership guidance, metadata and compatibility tests; accepted engine/controller/configuration code and Core/UI pins (Hub 0.4.1, HUD 0.3.1) are unchanged. Camera/visual modules and six unrelated catalog identities remain unchanged.

**Cleanup in-game acceptance is pending.** [Exact procedure and rollback](https://github.com/MarshalTitan/SentinelHUD/blob/main/docs/UTILITY_CLEANUP.md): confirm versions/settings and HUD's migration notice; with Hub utilities enabled prove ordinary text/manual choice; turn utilities OFF and verify manual dialogue/no increasing Hub check counter after 35 seconds; disable Hub while HUD/camera continue working, then re-enable/restore options and reload HUD once. With HUD 0.8.5.0, disabling Hub leaves utility actions OFF instead of resuming old HUD engines. Rollback: turn Hub utilities OFF before restoring HUD 0.8.4.7 and review its retained old preferences. Do not repeat the prior full idle/cutscene/reward checklist for this structural cleanup.

Metadata correction: HUD **0.8.5.0** removed the native engines, but distribution inspection caught stale separate installed/catalog descriptions. **0.8.5.1** corrects those descriptions without changing runtime code or replacing the immutable 0.8.5.0 asset. Package validation now requires exact project/template/catalog/packaged description agreement. The final cleanup test pair uses Hub 0.3.1.0 and HUD 0.8.5.1.
