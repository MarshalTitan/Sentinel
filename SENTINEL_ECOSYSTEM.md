# Sentinel Ecosystem

Verified **2026-10-17 UTC for HUD/Hub UI cleanup, Profiles server-info publication and catalog inventory**; earlier dated gameplay evidence retains its original scope. This is the coordination index; [Architecture](ARCHITECTURE.md), [Roadmap](ROADMAP.md), [Release process](RELEASE_PROCESS.md), and [Test matrix](TEST_MATRIX.md) own their respective detail.

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
| SRankSentinel | [v0.7.62.0](https://github.com/MarshalTitan/SRankSentinel/releases/tag/v0.7.62.0) (prerelease) | S/SS report intake, same-DC queue/travel, safe parking, one gated tag, positive kill evidence and recovery; companion/history UI. |
| PvPSentinel | [v0.3.1.23](https://github.com/MarshalTitan/PvPSentinel/releases/tag/v0.3.1.23) | Experimental five-map Frontline navigation, diagnostics and combat-provider boundaries. Map recognition does not imply complete objective semantics or in-game acceptance. |
| SentinelHUD | [v0.8.5.2](https://github.com/MarshalTitan/SentinelHUD/releases/tag/v0.8.5.2) | Actor HUD/editor, self marker/highlight, awareness, targeting counter and camera. Utility engines live in Hub; retired Convenience page removed. Compatibility data retained. |
| ClassySentinel | [v0.8.6.0](https://github.com/MarshalTitan/ClassySentinel/releases/tag/v0.8.6.0) (prerelease) | Exact gear-set launcher, dynamic job classification, multiple sets and scoped controller capture. |
| SentinelProfiles | [v0.2.1.7](https://github.com/MarshalTitan/SentinelProfiles/releases/tag/v0.2.1.7) (prerelease) | Manual three-state profiles and drift reporting; separate responsive actions/editor repair published, visual/controller acceptance pending; restart semantics unchanged; optional last-applied/drift server-info display. |
| SentinelRelay | [v0.5.0.7](https://github.com/MarshalTitan/SentinelRelay/releases/tag/v0.5.0.7) | Per-character webhooks, authorized REST-polled replies, hunt rewards, opt-in game-window screenshots and SRank recovery controls; localized territory labels. No hosted backend. |
| SentinelHunts | Historical test, still cataloged as 0.1.1.0 | User retired it from Hub inventory. This Dashboard-scoped removal does not delete its historical catalog/release identity. It is not Sentinel Trains. |
| Sentinel Hub | [v0.5.0.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.5.0.0) beta | Optional control center and passive Mount Collection. Existing scoped utility/latency/reload/live-version-display passes retain their scope. Mount native acceptance is pending; expansion/source coverage is partial and current obtainability stays Unknown. Profiles/Relay runtime status remains unavailable. |
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

## Cleanup PASS and live/dev inventory correction — 2026-10-16 UTC

The user replied **PASS** at **2026-10-16 01:38 America/Toronto** to the four-step utility-cleanup checklist for the preceding instructed pair **Hub 0.3.1.0 / HUD 0.8.5.1**: settings retained, Hub dialogue/manual choices, both modules Off with unchanged Anti-AFK counter, and HUD/camera independence plus Hub re-enable/HUD reload. Versions were not separately restated in the reply. This closes that scoped cleanup gate. The same message reports a separate Hub Plugins inventory defect: the SRank development copy's version was shown instead of installed live **0.7.56.0**. This does not recertify unreported earlier reward modes/submarine scenarios or navigation gates.

**Hub 0.3.1.1** corrects component inventory selection. Dalamud's public IsDev and effective Version identify instances; when both copies exist, the non-dev installation supplies version, load/restriction state and fresh settings-button eligibility regardless of enumeration order. A dev-only installation remains visible with an explicit development label. Versions are read from the selected installation, not hardcoded to 0.7.56.0 or inferred from the remote catalog. Dependency lookup/probes, utility controllers/native algorithms/settings, Core/UI pins, HUD and all SRank source/binaries remain unchanged.

The focused [inventory check](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/LIVE_DEV_DISCOVERY.md) remains: update Hub to 0.3.1.1, /shub → Dashboard → Refresh inventory, then Plugins; with live SRank 0.7.56.0 and dev both installed, expect **0.7.56.0 / Installation: live** and the live loaded/not-loaded state. Dashboard must agree. No repeat utility/idle/cutscene/reward checklist. Rollback is Hub 0.3.1.0; no config deletion or SRank/HUD change. After this correction, Latency/Weaving remains a separate source/measurement/conflict-design stage with default OFF; no compensation/hooks are enabled.

## Latency / Weaving implementation and proving — 2026-10-16 UTC

The user explicitly requested “our version of NoClippy” at **2026-10-16 01:55 America/Toronto**. This authorizes the separate Latency/Weaving implementation/proving stage after scoped utility cleanup acceptance. It does not report a PASS for the still-separate live/dev inventory display check or any native latency behavior.

**Hub 0.4.0.0** implements an independent, default-OFF **Latency / Weaving** module: Off / Measure only / Compensate. It correlates the local actor's latest successful natural-instant Spell/Weaponskill/Ability request with its native response, retaining no pointer across callbacks. A normal intact 0.5–0.8 s server lock, standard predicted lock, plausible countdown and a response within 500 ms are required. Correction is bounded by a fixed 40 ms response buffer and maximum 250 ms reduction; only local remaining AnimationLock is written after the original handler. Natural cast-time actions (including instant-cast effects), nonstandard/long locks, stale/reordered/duplicate/invalid effects, packets, cooldowns and action selection are excluded. No status prediction or packet-send hook is added.

Hooks are created lazily only with an explicit active mode and ready character, and disposed on Off/logout/transition/death/territory/mode changes or conflict. A shared tested transaction forwards Original and its arguments exactly once even when observations fail. Native setup/contention faults latch until Off. Any loaded NoClippy copy blocks; named XivAlexander modules and identifying exports (including renamed proxies) block without override. Full module checks precede eligible response writes; unavailable checks pause, and unexpected lock changes stop the session. Detection is scoped to known identities/exports and invariants, not every possible custom modifier. Diagnostics export only typed state and bounded numbers; no actor/action IDs, module paths, packets or private plugin configuration. HubVersion now derives from Hub's own assembly.

**At publication, native in-game acceptance was pending** under [the exact Measure→Compensate procedure and rollback](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/LATENCY_WEAVING.md). Update Hub 0.4.0.0; /shub → Utilities → Latency / Weaving. Confirm NoClippy conflict blocks, then Off and disable other compensators. At a training dummy with rotation automation off, measure about ten instant actions and confirm samples with zero applied adjustments; only then try normal single/double weaving in Compensate for about a minute. Above 40 ms response, applied counts should grow; low-delay zero correction is valid. Check Off, zoning and one Hub reload. Return version/job/response, counts and felt better/unchanged/worse plus any untested step. If measuring yields zero eligible samples, stop before Compensate and report state/job. Rollback is Off/disable Hub or Hub 0.3.1.1; no configuration deletion. Publication, numerical tests and compilation do not prove native correctness, real conflict detection or improvement.

Accepted Anti-AFK/Quest native code/settings, live/dev selection, Core/UI pins (Hub 0.4.1, HUD 0.3.1), HUD 0.8.5.1 and seven unrelated catalog identities remain unchanged by this stage. Existing hunt/PvP/navigation gates remain separate.

## Latency / Weaving scoped play-test PASS — 2026-10-17 UTC

The user replied “I'd say PASS. I am not exactly sure how it works, but things seem good?” after the Hub 0.4.0.0 proving instructions. The attached screenshot `image(20261017-021946).png` shows **Compensate / Active**, **28 samples / 28 applied adjustments**, **313 ms last / 233 ms average action response**, **250 ms last calculated correction**, and **5,146 ms applied total**. The screenshot does not show the Hub version or job; 0.4.0.0 is the instructed build, not independently visible version evidence.

This records a **scoped normal-play PASS with active compensation and no problem reported**. It is not an explicit better-versus-Off comparison or an independent timing measurement. Known-conflict blocking, Measure-only zero writes, Off stopping counts, excluded-action behavior and zoning were not separately reported and remain unconfirmed under the [focused procedure](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/LATENCY_WEAVING.md). The separate live/dev inventory display check and existing hunt/PvP/navigation gates are unchanged.

Action-response values include server/frame delay, not raw network ping. The module reduces extra local waiting after eligible instant-action responses, retaining a 40 ms buffer and a 250 ms per-action cap; it does not speed cooldowns or invoke actions. The applied total accumulates individual corrections, not demonstrated encounter time saved or damage gain. This evidence update changes documentation only; Hub remains 0.4.0.0 with default-Off settings and unchanged native code/catalog.

Follow-up at **2026-10-16 22:26 America/Toronto (2026-10-17 UTC)**: the user reported “re-enabling everything and reloaded Hub. Everything still seems to work”. This adds a **scoped re-enable / Hub reload PASS** to the normal-play result. The reply does not identify every re-enabled component, restate version/job, provide post-reload counters, or separately confirm zoning/conflict handling. It does not establish that NoClippy/XivAlexander can run alongside Hub compensation; the single-compensator requirement remains. No new fault or regression was reported.

## Hub inventory display PASS and latency clarification — 2026-10-17 UTC

At **2026-10-16 22:32 America/Toronto**, the user confirmed “yup it shows correctly” in response to the focused Hub Plugins check for the installed live **SRankSentinel 0.7.56.0** instead of the development copy. This closes the reported live/dev version-display issue as a scoped user PASS. Hub 0.4.0.0 was the current instructed build; the reply did not separately restate Hub version or certify every inventory permutation, Dashboard/state/quick-open path. Existing automated selection coverage remains separate.

The user also clarified at 22:28 that “everything” meant Hub's own features and that they have **never used NoClippy**. The earlier reload PASS therefore concerns Hub features; real NoClippy conflict blocking remains untested. Installing another compensator is not required to continue independent Hub work.

**Measure only remains available** as the observation-without-writes troubleshooting mode. The user asked whether to retain it; the recommendation is to keep it, with Compensate for normal use. No removal or native behavior change is made. Normal-play/re-enable/reload acceptance remains scoped as above, and remaining latency scenarios and unrelated hunt/PvP/navigation gates are unchanged. This is a documentation-only reconciliation, with no new binary, version, settings or catalog changes.

## Remote SRank controls — experimental, 2026-10-17 UTC

The user supplied a specific remote-control brief. Implemented candidates are **SRank 0.7.62.0**
([PR #28](https://github.com/MarshalTitan/SRankSentinel/pull/28)) and **Relay 0.5.0.6**
([PR #11](https://github.com/MarshalTitan/SentinelRelay/pull/11)); both remain draft/unmerged/unreleased.
These branches start from current live main, not navigation PR #25. Published rollback is
**SRank 0.7.56.0 / Relay 0.5.0.5**. Core latest **0.4.1** was inspected; existing compatible
Core/UI **0.3.1** pins remain unchanged. This task adds no Core release or catalog promotion.

Relay accepts only ordinary text `/srank status`, `/srank skip`, `/srank reset`,
`/srank reset confirm` through the existing authorized REST reader. A separate per-character
**Allow SRankSentinel remote controls** permission defaults OFF and can run without enabling
chat replies or outbound chat destinations. Three fixed versioned IPC functions call the
same extracted SRank UI operations. There is no UI simulation, arbitrary command/IPC,
remote desktop, backend, companion application or mandatory plugin coupling.

**In-game acceptance OPEN:** Wrothy first, with the exact successful experimental pair:
status/UI agreement; safe skip with queue preservation; reset request does nothing until
same-user/channel/character confirmation within 30 seconds; UI-equivalent Ul'dah recovery;
isolation and permission OFF. Elektra remains OFF until separately supervised. No game
actions or private Discord requests were performed by engineering. See the
[paired procedure](https://github.com/MarshalTitan/SentinelRelay/blob/feature/srank-remote-controls/docs/SRANK_REMOTE_CONTROLS.md).
Navigation PR #25, PvP migration and their prior gates remain unchanged.

## Remote controls: authorized normal-update delivery — 2026-10-17 UTC

The user asked to update the live plugins instead of installing dev builds. This
**supersedes the earlier remote-feature dev-only publication hold**, not the required
native acceptance record. SRank **0.7.62.0** ([#28](https://github.com/MarshalTitan/SRankSentinel/pull/28))
and Relay **0.5.0.6** ([#11](https://github.com/MarshalTitan/SentinelRelay/pull/11)) are delivered
through the existing permanent Sentinel catalog. Relay's independent per-character
**Allow SRankSentinel remote controls** permission defaults OFF on new and existing profiles.
Existing UI recovery bodies, hunt policy, chat/screenshot behavior and exact Core/UI
0.3.1 pins remain unchanged. Core 0.4.1 stays published without a new release.

**In-game acceptance remains OPEN.** Update both live plugins normally, keep dev copies
disabled, confirm versions, and enable the new permission for Wrothy only under
Replies & Controls (Classic: Discord Replies), then save. Send ordinary text status,
safe skip, and reset/confirm within 30 seconds; verify UI agreement, retained skip
queue, reset queue clearing, isolation and permission OFF. Elektra remains OFF until
separate acceptance. No game test is fabricated by live distribution.
[Current procedure](https://github.com/MarshalTitan/SentinelRelay/blob/main/docs/SRANK_REMOTE_CONTROLS.md).
Earlier dated candidate/rollback entries above remain historical; the normal-update
instruction here supersedes their dev installation steps.

## Remote controls live result and territory labels — 2026-10-17 UTC

At 2026-10-16 23:39 America/Toronto, the user reported “Everything is working great.”
The supplied screenshot shows SRank 0.7.62.0 status (enabled, Idle, queue 0, territory 250),
a reset request requiring confirmation, then an accepted confirmed reset in ResetToUldah
with queue 0. Record scoped user functional PASS for the live SRank 0.7.62.0 / Relay
0.5.0.6 pair; this does not independently prove active-hunt skip/queue retention, completed
return travel, expiry, cross-character isolation or permission-OFF negative cases.
The earlier silent-command report is superseded by this successful result; its cause
was not independently established.

Relay **0.5.0.7** adds the requested localized map name alongside the territory ID in
status/recovery replies. Resolve the SRank snapshot's territory through local game
TerritoryType/PlaceName data; unknown/missing data retains the numeric ID.
SRank remains **0.7.62.0**, v1 IPC is unchanged, and lookup failure cannot suppress
accepted recovery results or retry an action. Permissions/configuration/Core pins,
hunt policy and navigation are unchanged. Navigation PR #25 stays unpublished and
PvP shared-navigation migration stays blocked.

Update Relay through the normal Sentinel updater, then send one new `/srank status`.
Expect `Territory: <localized map name> (<ID>)`; only wrong/missing names need version,
territory ID and client language. Do not repeat unrelated recovery tests for this
presentation change. Immediate remote-control rollback is permission OFF/save;
the prior Relay 0.5.0.6 immutable release remains available.

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

## Completed utility transfer and Profiles server info — 2026-10-17 UTC

The user confirmed the second tester installed Hub and copied her settings. This closes
the need for the temporary import UI; it is not a new blanket certification of all native
quest/Anti-AFK cases.

- **HUD 0.8.5.2** removes the retired Modern Systems → Convenience entry, Classic tab,
  transfer page and saved-import diagnostic summary. Camera and visual HUD settings remain.
- **Hub 0.4.0.1** removes both utility Import buttons, saved-HUD summaries and transfer/version
  explanations in both themes. Existing utility opt-ins/values, latency behavior and native
  algorithms are unchanged.
- **Profiles 0.2.1.7** adds default-OFF **Show profile in server info bar**: Modern Appearance,
  Classic header. The entry reports the last applied profile, not editor selection.
  `!` indicates live explicit-state drift/missing plugins or apply problems. Applying/none
  are explicit; tooltip explains status and clicking only opens Profiles. It hides on
  logout/Off, respects Dalamud visibility/order, and is removed with its callback on unload.

Keep existing serialized utility preferences, schema and compatibility bridges for old
consumers/rollback. No automatic import, configuration deletion, mandatory new coupling,
Core upgrade or profile apply/restart semantics change. HUD/Profiles retain Core 0.3.1;
Hub retains 0.4.1. Navigation PR #25 and PvP migration gates remain separate.

Focused native observation after normal updates: confirm the retired UI is absent and
Hub values unchanged; enable the Profiles bar, apply a safe normal profile, select another
for editing (bar retains applied name), hover/click, Off/On and reload Profiles once.
Expected: correct applied name or explicit warning, accessible controls, no duplicate/ghost
entry. If hidden, inspect Dalamud's Server Info Bar setting for Sentinel Profiles.
Return failures only with version/theme and concise screenshot/description; no config/secrets.
Immediate rollback: bar option OFF or affected Hub utility OFF; retain saved settings.
Prior immutable HUD 0.8.5.1 / Hub 0.4.0.0 / Profiles 0.2.1.6 remain binary comparison points.

## Passive Mount Collection — 2026-10-17 UTC

The user explicitly authorized implementation/test/publication at 2026-10-17 00:47 America/Toronto. **Hub 0.5.0.0** adds an independent read-only local mount browser, own-character unlocks, search/sort, seats/actions/BGM, known game-sheet acquisition links, market-item eligibility, six Sentinel-authored trial/meta tracks and guarded main-bag totem progress. Player context lookup defaults OFF; clicking its menu action opens the ridden mount in Hub. No target-info hook, tooltip modification, mount summon, item use or exchange.

WhichMount's README was a behavioral reference only; no AGPL implementation/CSV/resources or third-party mount dataset imported. Metadata source/coverage is documented in the [audit](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/MOUNT_COLLECTION_METADATA.md). Release expansion mapping is limited to 47 authored track member/reward keys, unresolved keys stay unknown, and current obtainability is not invented. **Native acceptance pending** under the [four-step checklist and rollback](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/MOUNT_COLLECTION.md). Prior utility settings/native algorithms, Core pins and unrelated hunt/PvP/navigation gates remain unchanged.
