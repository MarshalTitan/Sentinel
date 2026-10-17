# Architecture

Status and version snapshot: [Sentinel Ecosystem](SENTINEL_ECOSYSTEM.md). “Required” below describes the coordination contract; explicitly identified gaps are not implemented capabilities.

## Ownership and dependencies

| Owner | Owns | Must not become |
|---|---|---|
| Sentinel catalog | Registry, generated manifest, validation and reconciliation | Monorepo for plugin implementations or owner of child version metadata |
| SentinelCore | Versioned shared configuration, lifecycle, diagnostics, job metadata, safe IPC and UI primitives | Required installed plugin, live service, or implicit upgrade of every consumer |
| Each plugin | Domain policy, runtime adapters, configuration migration, window lifetime, release and evidence | Private fork of Core palettes, shells or shared widgets |
| Sentinel Hub | Optional inventory/dependency/readiness, quick-open actions, Profiles status foundation, diagnostics; future opt-in shared utility engines | Mandatory runtime service or replacement for hunt, Frontline, gear, Profiles, Relay or visual HUD domains |
| Future Trains | A-rank train domain policy consuming shared navigation | Replacement for SRankSentinel/SentinelHunts or another independent movement stack |

Core generic code targets .NET 10 without Dalamud. Core.Dalamud and Core.UI target Windows/Dalamud API 15 and depend toward the generic library. Each consumer pins and bundles its required packages. See [Core architecture](https://github.com/MarshalTitan/SentinelCore/blob/300703b360a58fb4b73bf7675d31fe8cab4614cd/docs/ARCHITECTURE.md) and [adoption contract](https://github.com/MarshalTitan/SentinelCore/blob/300703b360a58fb4b73bf7675d31fe8cab4614cd/ADOPTION.md). Core 0.4 adds an opt-in, platform-neutral movement coordinator and diagnostics; it does not own world travel or a runtime service.

## Shared UI

Core 0.3.1 owns Classic and released Modern 2 primitives: compact custom header, fixed left icon rail, optional left secondary navigation, right content, responsive rows, cards/switches/status pills, ambient motion and reduced-motion behavior. Keep a single visible header in Modern, preserve Classic, and retain role/status colors that carry meaning.

Consumers own page definitions, icons, commands, window state, persistence and interactions. Minimize keeps the themed header and expand/close controls, retains expanded dimensions separately, and restores at the current position. A package update alone does not prove correct consumer integration. Verify scale, narrow widths, controller operation and reload in each consumer; no automation behavior changes should be hidden in a UI migration.

Confirmed responsive-UI requirements from the 2026-10-06 acceptance report (partially shipped independently; Profiles 0.2.1.3 actions/reflow repair awaits live visual/controller proof): smaller supported window widths with correct wrapping/reflow and accessible controls; fix Profiles PROFILE ACTIONS clipping; bottom-anchor SRank Clear History controls and let its scrollable SPAWN REPORTS region consume remaining height. Measure Core and consumer minimum-size constraints before changing them. Preserve persisted placement, Classic and controller/keyboard interaction; do not bundle these changes with movement migration.

## Navigation and combat

**Implemented:** SRank owns hunt queue/travel/tag/recovery with its local vnavmesh and travel adapters. PvP separately owns generated-route validation, bounded recovery, objective adapters, group following and provider coordination. Their released travel implementations remain independent. Core 0.4 now contains tested common movement mechanics; SRank's opt-in PR is the first proving adapter.

**Shared contract now implemented, consumer proof pending:** preserve one movement owner per operation, cancellation on STOP/disposal/context loss, stale-result rejection, bounded retry budgets, physical arrival evidence, and diagnostic reasons. Do not introduce a second controller that competes for the same path. Common mechanics were identified from both current implementations; keep hunt parking/SS staging and Frontline tactics separate. Cross-plugin arbitration remains planned, not guaranteed. An old operation must never stop or replace its successor's route. SRank is the first proving consumer; PvP migration is blocked until automated tests and a supervised SRank live test of the new shared implementation pass. The user's pass of existing SRank 0.7.54.0 is the comparison baseline, not fulfillment of this future gate. Core's isolated tests pass; SRank PR #25 preserves the existing path as default and restricts shared movement to an explicit session-only ordinary-approach test.

Core 0.4 shared mechanics include current-zone mesh/build readiness, asynchronous pathfinding distinct from following, operation-scoped ownership/cancellation, stale-result rejection, current-waypoint progress and bounded stalls, mount/takeoff, flight availability/replanning, landing projection, bounded recovery and correlation IDs. The source/IPC study and adapter contract are recorded in [Core navigation design](https://github.com/MarshalTitan/SentinelCore/blob/67e52f5d4afb080042f9e526a6afae7480b01ff0/docs/NAVIGATION.md). Public XeldarAlz repositories are architecture references only: do not copy AGPL source into Sentinel; implement Sentinel-owned equivalents independently.

SRank accepts positive kill evidence and distinguishes unresolved hunts from dead hunts; report absence alone is insufficient. Tag confirmation is not personal reward credit. PvP separates strategy/navigation from combat; RSR integration is read-only and actual action execution needs observation. Native MCH has Shadow/Observe and gated Active paths, but does not establish production readiness or automatic-pilot eligibility. Wrath must not be treated as a PvP auto-rotation service.

Current PvP source and [dynamic-follow contract](https://github.com/MarshalTitan/PvPSentinel/blob/d47e8b7429c135fec2976c1e980175f33787c4f3/docs/FRONTLINE_DYNAMIC_FOLLOW.md) outrank older README milestone paragraphs: ordinary RSR-mode combat need not interrupt travel; its Off mode is diagnostic. Onsal/Secure use field-group following while objective semantics remain unresolved.

## Diagnostics and persistence

Core provides bounded buffers, changed/throttled diagnostics, safe IPC results and configuration coordination. Adoption is per consumer; there is no verified ecosystem-wide log collector. PvP additionally emits privacy-sanitized match events/summaries and entry-stage traces. SRank records passive history without allowing history-save failures to interrupt hunting. Relay uses bounded queues, rate limits and protected per-character secrets.

For shared diagnostics, prefer timestamp, plugin/version, operation/correlation ID, previous/new state, reason, external dependency state, physical context and result. Extract into Core only where multiple plugins benefit, and aim for a sanitized Export Diagnostics workflow. Preserve evidence needed to reproduce a failure; exclude credentials, tokens, saved secrets and unnecessary private chat. Core 0.4 provides an allowlisted, bounded navigation export (`sentinel.navigation.v1`) and typed transition records. It excludes arbitrary messages, exceptions, coordinates, actor IDs, names, config and chat; the older free-text DiagnosticBuffer is not exported. This is a navigation foundation, not yet a universal ecosystem collector.

Profiles uses public discovery and isolated native temporary enable/disable commands. It stores selected/last-applied IDs, applies disables before enables, verifies transitions and protects self-unload. The user reports a full-game-restart limitation and a retained last-applied display; selected-profile persistence versus actual loaded-state reapplication remains to be distinguished. Do not infer loss of saved profiles or silently migrate native collections.

## Self-healing distribution

The [registry](https://github.com/MarshalTitan/Sentinel/blob/1f703528c428fc993945aafb85a27bdd0742932e/generator/plugins.json) maps InternalName to child repository/branch. Central generation fetches authoritative child manifests, validates entries/assets and preserves registry order. Invalid/unavailable/stale known children retain structurally valid last-known-good entries; a new invalid child or unregistered existing entry aborts generation. Fallback preserves publication metadata, not a guarantee that an old asset remains downloadable.

The [publisher](https://github.com/MarshalTitan/Sentinel/blob/1f703528c428fc993945aafb85a27bdd0742932e/generator/publish-catalog.mjs) uses the current manifest blob SHA, refetches/retries conflicts and verifies public output. Dispatch payloads are notifications, never metadata authority. Notifications are optional accelerators. Scheduled reconciliation is an allowed token-free path; release completion still requires public-catalog verification. See [Release process](RELEASE_PROCESS.md).

## Shared release infrastructure

The commit-pinned [distribution action](.github/actions/distribute/action.yml) is build-time infrastructure in Sentinel, independent of SentinelCore/runtime plugins. After public package validation it uses the child's repository-scoped token to conditionally update only its own approved root-manifest entry, preserve siblings, reject downgrades/concurrent metadata changes, and retry SHA conflicts. Unchanged reruns do not churn LastUpdate. Optional cross-repository credentials are confined to notification; exact public child/central verification always runs and has a 90-minute bound. Linux/Windows tests exercise missing/rejected notification, stale catalog, conflicts and permission failures. No child writes the central manifest; the old direct-entry updater is retired.

## Relay boundary

[Relay architecture](https://github.com/MarshalTitan/SentinelRelay/blob/d2401031bd20430c37d2bc0d64a98aa17c157954/ARCHITECTURE.md) is direct webhook delivery plus optional authenticated REST polling. Channel/user/character binding, freshness, checkpointing, fixed chat allowlists and default-off permissions constrain replies. Screenshots capture only the active FFXIV client area. No arbitrary remote execution, desktop capture, hosted relay dependency or Dreamforge coupling is part of the published design.

## First proving adapter boundary

[SRank PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25) uses `/sranknavtest on` while idle. Off/reload restores the legacy default. Only ordinary long approach uses Core; visible-entity/scan-range handoff releases its lease before existing parking/landing/tag/kill/return policy. SS and approximate-coordinate recovery remain outside this proving slice. Failed proving disables Sentinel while retaining the hunt; it never silently counts a legacy fallback as a shared-path pass.

Core owns one operation per adapter on the framework thread. Task completions return data only; old handles cannot stop a successor. An unconfirmed Stop prevents ownership transfer. This is consumer-local ownership, not a cross-plugin lock; another plugin must not command vnavmesh during the supervised test.

Readiness combines a consumer-assigned zone epoch, loading state, stable IsReady and negative BuildProgress. Missing/unknown IPC fails closed. Upstream exposes no mesh-territory ID, so the adapter's observed-readiness inference must be validated during real zoning. Shared landing projection is a bounded primitive; it does not choose hunt parking or change facing.

## Bounded opt-in landing — Core 0.4.1

[Core PR #4](https://github.com/MarshalTitan/SentinelCore/pull/4) adds RequireLanding=false by default and an optional ILandingNavigationAdapter capability without changing existing positional constructors, INavigationAdapter members or previous enum values. Radius arrival starts Landing for opted-in requests; it is not success. Stop only the owned follower and invalidate its query, retain the operation, then request synchronous native landing at bounded intervals. There is no delayed cleanup with authority over a replacement. Cancel/dispose/zone changes revoke ownership; retired handles and late queries cannot stop or replace successors.

Success requires InFlight=false, Grounded=true, destination bounds and stable ground confirmation (0.75s). Grounded=null means unknown. A fixed 20s landing deadline is independent of repeated submissions; drift/dependency loss/timeout fail diagnostically rather than remounting, retrying indefinitely or claiming arrival. The sanitized v1 export gains nullable Grounded physical evidence and typed Landing/GroundConfirmed/timeout/rejection transitions. Native submission is never completion evidence.

SRank 0.7.60.0 enables this only for its disabled/Idle deterministic probe. Its adapter checks flight/mount/combat/follower and local projected-floor bounds before the existing native general action 23; fresh cleared-flight plus stable local height/mesh evidence confirms ground. This physical inference has a scoped 0.7.60.0 probe PASS; actual ordinary-hunt integration remains gated. Existing crowd-aware hunt parking/facing, S/SS, tags and return remain consumer-owned and unchanged. The repeatable armed landing cancellation/resume creates a distinct new lease; it does not resurrect the retired operation. PvP remains unmigrated.

## Approved ordinary parking consumer stage — 2026-10-07

Candidate **0.7.61.0**, commit `5e23d52bd750ecbef74d9b0f9ba80c879aee135e`, in [SRank PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25), extends session opt-in to ordinary **pre-tag protected flight parking** only after the existing path AND landing-ground-connectivity validation. Core receives a one-use immutable approved route; its query phase here accepts prevalidated consumer data rather than issuing a new unprotected query. Fresh entity/zone/path/clearance checks precede following; zero parking retries forbid requery outside approval. Original point selection, crowd safety, preference bookkeeping, alignment/landing revalidation and kill/reset/tag/return semantics remain consumer-owned. Planned landing handoff cancels the Core lease before legacy landing and records the correlated ParkingLandingHandoff event/last Core state. SS, unprotected fallback and post-tag retreat remain legacy. Failure stops proving/Sentinel, retains the hunt and exports; off during shared parking returns to LocateMark for safe legacy resampling.

The user reports physical unmount/landing and confirms cancellation stopped movement and resume landed. Inspected 0.7.60.0 excerpts: ProbeCancelled for `2d7c66c4-9243-41ed-b792-a6ed043477d0` at **15:37:23.812 UTC**; distinct replacement `75ac0f50-ebca-443c-aad4-9c4cfe4c6fc5` recorded **Landing → Arrived / GroundConfirmed** at **15:37:29.918 UTC**, ready/current-zone mesh and Following=false. Classify **PASS — scoped physical landing/cancellation/replacement**, based on the human report plus inspected transition/session excerpts. PhysicalContext/Result fields and the full attachments were not readable/contained in the excerpts; do not claim independent inspection of Grounded/InFlight fields or every cancellation race. No repeat 0.7.60.0 test is required. This closes the isolated mechanics landing gate, not actual shared hunt policy integration.

The shared layer has no hunt center, crowd model, target scoring or tag semantics. Consumer-held approval includes route/zone/entity identity only in memory, is cleared on cancellation and is excluded from sanitized exports. Core's actor remains the sole movement owner; no approval/task continuation can submit a route or stop a successor. Published Core 0.4.1 APIs/packages are sufficient; no Core re-release or unrelated consumer upgrade is needed.

Reviewed priority edges: revoke the old lease before any legacy parking replan/fallback follower; death yields ownership before Raise recovery. Preserve a failed parking rollback marker so explicit off resamples through LocateMark even after halt already cancelled the operation. No automatic fallback is added.

Unconfirmed follower stop during a policy replan blocks any replacement submission and disables Sentinel. Explicit off likewise keeps the parking rollback marker until stop confirmation. This failure behavior is covered in isolated consumer tests.

Planned Landing and death handoffs also require follower stop confirmation. A failed check disables Sentinel before native landing/recovery can tick, preserves rollback and emits no successful ParkingLandingHandoff. Off resamples through LocateMark after a confirmed stop even when the held domain state is Landing.

## Sentinel Hub MVP — 2026-10-16 UTC

Hub is an optional independent API-15 plugin, `SentinelHub`, command `/shub`. It bundles exact Core/UI 0.4.1 packages; it does not install a Core service or change other consumers' pins. Hub owns its local configuration, inventory/status projections, fixed quick-open router, typed bounded fault journal and `sentinel.hub.v1` export. Its engines are independent of rendering; the Utilities registry contains inactive plans only in 0.1.

Public `InstalledPlugins` observations and source-verified settings commands are sufficient for the MVP. Read-only vnavmesh/Lifestream/RSR/Splatoon probes are isolated per dependency. Discovery failure invalidates observations; unload is rechecked before a settings command. No consumer config reading, private reflection, plugin enabling, profile application, movement, actions or chat transmission is present. Profiles selection/drift and Relay connection remain unknown rather than inferred.

Core remains the canonical owner of palette, styles, application shell, rail, cards, switches, status pills and ambient motion. Hub uses a stable window identity, retains expanded size separately from Modern collapse, supports Classic, and has a 480×500 logical minimum audited against Core and all eight rail destinations. Native rendering and input checks are automated; actual saved placement and controller behavior require in-game acceptance.

Future utilities remain staged: Anti-AFK, then Quest Convenience, then independently implemented Latency/Weaving compensation. Default OFF; explicit single ownership prevents duplicate HUD/Hub behavior. Keep the accepted submarine fix, user choices and unrelated prompts intact. Separate HUD cleanup follows supervised replacement validation. Latency engine/settings belong in Hub; HUD may optionally render its status without requiring Hub. Camera and all visual/editor modules remain in HUD. Optional shared preference contracts should live in Core, with consumer-local fallback.

Distribution bootstrap: authorize Hub's repository/identity in the shared action first; validate and publish the immutable installable ZIP; only then create its child manifest and add the central registry/candidate entry through a central PR. Child workflows never write central repo.json. Publication smoke verifies all currently public registered identities; new candidate identities are covered by the generator's public-asset validation before central publication.

## Anti-AFK optional ownership — 2026-10-16 UTC

Hub 0.2 isolates a synchronous inactivity-timer adapter/engine from UI. It preserves HUD's 10-second check interval and above-30-second threshold, validating finite values. No synthetic input, movement, chat, gameplay action or asynchronous continuation is introduced. Faults stop writes until a bounded retry and remain local to the utility.

Optional primitive IPC v1: HUD ProtocolVersion(int), Preference(bool), TryClaim(session token)->bool and Release(session token)->bool; Hub exposes AntiAfk.Enabled(bool). HUD suspends synchronously and guards the first/hot-reload callback before claim. The private in-memory GUID claim expires after 3 seconds without renewal; other/stale tokens cannot steal/release a replacement. Unknown compatible-peer state fails closed. Hub requires current acknowledgment while HUD is loaded and blocks legacy/unknown installed HUD, including disabled old installations that could be hot-loaded.

No consumer assembly is bundled or required. Tests compile a pinned copy of the actual HUD lease source only into the test runner. Hub absence preserves the retained HUD implementation/config. Explicit Import copies only the public saved boolean. Disabling Hub stops its writer before lease release; missing/abrupt peers are bounded by the lease/request guard. Exports add only enum state and check count, never the claim token or private config.

Quest Convenience and camera stay in HUD. HUD cleanup is explicitly separate and gated on supervised native/IPC/reload acceptance.

## Quest Convenience single-owner stage — Hub 0.3 / HUD 0.8.4.7

Anti-AFK's latest four-step supervised gate has a scoped user PASS; its engine/settings remain unchanged. Quest Convenience is a separate default-OFF module with an independent instance of HUD's existing short lease. Optional primitive IPC v1 exposes protocol version, packed three-preference integer, token-scoped claim/release and Hub's requested-enabled bool. Synchronous suspension clears pending cutscene/reward work before acknowledgment; the per-update request guard covers startup/hot reload. Missing/old Hub retains HUD behavior; unknown compatible-peer state yields. No required consumer assembly or private configuration reads are added.

Hub adapts accepted HUD native service/policies at **758068f68a76d72660fb6e2740f22d592130fdd7** through namespace/config type changes only. CI compares the complete source text, retaining live AgentCutscene addon-ID matching, AtkUnitBase callbacks without derived-layout reads, request-bound confirmation/deadline, manual dialogue choices and original reward ranking/fallback/completion behavior. A pure session wraps synchronous native updates: ownership loss, option change, logout/disposal and errors clear pending state; faults retry no faster than once per second. No task continuation can act after handoff. Logs/exports do not grant ownership.

Master ON owns all three options, including Off/Manual. Import explicitly copies the packed public values, enables only if an imported feature is active, and never rewrites HUD preferences or Anti-AFK. The sanitized export adds only a typed Quest state; native status strings, quest/reward text, settings and tokens are excluded. The bounded local native diagnostic buffer is not exported. Core/UI stays 0.4.1 in Hub and 0.3.1 in HUD.

HUD retains its native fallback pending [supervised replacement acceptance](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/QUEST_CONVENIENCE_MIGRATION.md). Camera/visual UI, navigation and Latency/Weaving ownership are unchanged.

## HUD engine retirement — Hub 0.3.1 / HUD 0.8.5

The user replied **PASS** at **2026-10-16 01:08 America/Toronto** to the latest Quest Convenience checklist: ordinary dialogue/manual choices, cutscene skipping, manual and chosen automatic rewards, and off/reload ownership behavior. The instruction identified **Hub 0.3.0.0 / HUD 0.8.4.7**; versions were not independently restated. Reward mode was not named and submarine was not separately confirmed. This closes that scoped replacement gate; it does not certify all modes, all original checklist cases, logout/dual-reload races or unreported scenarios. Accepted Hub native code and saved settings are unchanged by cleanup.

**Hub 0.3.1.0 / HUD 0.8.5.1** form the separate utility cleanup stage. HUD removes the Anti-AFK and Quest native services, framework call sites and action controls; its Convenience page shows retained preferences for explicit import. Schema 12, original preference values and v1 IPC import/claim/release contracts remain. Claims validate compatible requesting Hub and bounded tokens but have no native action callback. Hub changes only ownership guidance, metadata and compatibility tests; accepted engine/controller/configuration code and Core/UI pins (Hub 0.4.1, HUD 0.3.1) are unchanged. Camera/visual modules and six unrelated catalog identities remain unchanged.

HUD's compatibility bridges retain independent short leases solely for v1 peers. Preference getters read the original serialized values; no import/claim rewrites configuration. Removal of native services means no fallback writer can run when Hub releases its claim. Earlier ownership descriptions above apply to the dated 0.8.4.6/0.8.4.7 builds. Hub's existing requirement for fresh acknowledgment from loaded compatible HUD remains unchanged. Pure historical policy fixtures remain covered; no native action helper remains in cleaned HUD.

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

## Remote recovery access boundary — 2026-10-17 UTC

[SRank #28](https://github.com/MarshalTitan/SRankSentinel/pull/28) owns three fixed v1
string→JSON endpoints: `SRankSentinel.Remote.v1.Status`,
`SRankSentinel.Remote.v1.SkipCurrentKeepQueue`,
`SRankSentinel.Remote.v1.StopResetThroughUldah`. The input is an expected local character
key, never a command/method name. Schema `sentinel.srank.remote.v1` includes Version,
Success, Reason and bounded Status (loaded/enabled/ready, character, state/status text,
territory, active hunt, queue and recovery). Character binding is omitted from JSON.
Status is read-only. Synchronous framework/current-player guards reject unloaded,
wrong-character, initializing/loading, disabled or already-resetting mutations; skip
also requires a current hunt. Exceptions do not cross IPC or expose exception text.

UI and IPC share the exact extracted existing ManualSkip recovery methods. Reset keeps
the original queue-clear semantics and neither action implicitly enables Sentinel.
The original hunt implementation remains under its source-hash audit after only exact
constructor/teardown hooks are removed. No detection/navigation/tag/kill/SS policy changes.

[Relay #11](https://github.com/MarshalTitan/SentinelRelay/pull/11) owns external authorization:
independent default-OFF permission, exact configured channel/user and actual logged-in
character, bot/webhook rejection, bounded age, persisted checkpoint before mutation,
in-memory consumed high-water guard and current-reader generation. Pending reset is
one-shot, bound to character/channel/user/reader generation and expires 30 seconds after
the original Discord timestamp. Reload/pause/logout/settings changes/observed reader
interruption clear intent; newer generations revoke older intent. Player, permission,
source authorization and reader generation are rechecked immediately before IPC.
No asynchronous task retains authority to recover a later character.

Only fixed IPC names are called; incompatible/missing/malformed providers become
unavailable. A failed response delivery never retries an action. Results say recovery
was requested, not physically completed. Existing per-character webhook sends compact
timestamp-free responses with mentions disabled. Typed requested/rejected/confirmed/
executed/failed logs contain correlation ID, operation, configured character, resulting
state and fixed reason, excluding tokens/webhooks/Discord IDs/raw message/full status.

This IPC is a trusted installed-plugin interface, not authentication against malicious
in-process plugins. Local SRank operation never depends on Relay; Relay remains usable
without SRank. The contract is domain-specific and stays in its owning repositories;
published Core/UI pins and navigation proving remain untouched.

## Remote-control live distribution boundary — 2026-10-17 UTC

The user superseded the earlier remote-feature publication hold and selected normal
live updates for SRank 0.7.62.0 / Relay 0.5.0.6. Shipping does not enable controls:
existing/new profiles retain the false default until explicitly saved. Character,
source, reader-generation, replay and confirmation guards remain exactly as tested.
Native acceptance is still pending; publication does not advance movement/PvP gates.

Navigation PR #25 stays at `5e23d52bd750ecbef74d9b0f9ba80c879aee135e` and is not merged.
Any later movement integration must preserve the current published main, including
the 0.7.56 routing fixes and new remote contract, rather than overwriting it with an
older proving branch. No Core upgrade or movement policy changes accompany this release.

## Relay territory presentation — 2026-10-17 UTC

Relay 0.5.0.7 owns map-name presentation for the existing SRank remote-status snapshot.
On the framework thread, resolve the snapshot's numeric Territory using Dalamud's
localized TerritoryType.PlaceName data. Retain the numeric ID and fall back to it if
the row, name or sheet is unavailable. Bound/sanitize the label for Discord.
This adds no IPC fields, domain policy, extra action dispatch, configuration migration,
Core changes or plugin-to-plugin dependency. Lookup exceptions are isolated from the
already accepted action and its result delivery. SRank remains 0.7.62.0/v1.

## Completed utility UI transfer and Profiles DTR — 2026-10-17 UTC

HUD/Hub remove presentation-only migration pages/import controls after both users copied
preferences. Serialized legacy values, v1 bridges and bounded legacy ownership safeguards
remain compatible; native utility engines and existing Hub opt-ins are unchanged.
Hidden HUD legacy content IDs retain their ordinal and render Camera if encountered.

Profiles owns its optional server-info entry through Dalamud's public IDtrBar API.
It reads LastAppliedProfile plus the existing DriftDetector and apply coordinator, never
SelectedProfile as activation. No auto-apply or new Hub status contract is introduced.
A persisted last-applied name is history; the current explicit-state drift warning prevents
it implying successful startup restoration. One stable entry updates at most twice per
second, honors user visibility/order, hides while logged out/Off and removes callback/entry
on disposal. Click opens settings only. Default OFF is additive without schema migration.
This single-consumer adapter belongs in Profiles, not Core or a mandatory Hub service.

## Passive collection ownership — Hub 0.5.0.0, 2026-10-17 UTC

Mount Collection belongs entirely to Hub and has no dependency on other utilities or consumer assemblies. An incremental framework-thread Lumina builder reads Mount/Item/Quest/Achievement/SpecialShop relationships. Sentinel owns six independently authored factual track definitions with official provenance; missing source/expansion/availability remains typed Unknown. Market eligibility is distinct from current market listings; BGM uniqueness is limited to the included mount database. See the [field-by-field audit](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/MOUNT_COLLECTION_METADATA.md).

Public Dalamud unlock/player/current-mount/context/texture APIs provide observations. A separate synchronous adapter copies only four loaded 35-slot main bags; partial/unloaded/invalid/symbolic inventory is unknown. Trial-token costs require recognized currency modes, direct item keys, one ordinary untradable Totem cost, zero collectability and one non-HQ reward. No inferred 99/run count, retainer access or inventory action. Ephemeral own-character snapshots clear on logout/session/territory/readiness/failure. No collection/inventory/other-player IDs enter configuration or diagnostics.

The opt-in context subscription revalidates object, own session, territory, player/mount, setting and lifetime on click, then opens Hub only. No native mount hooks or target-tooltip patching. Appended page ID preserves prior preferences; Core's existing layout option fits nine pages at the unchanged minimum. Utility algorithms/settings and exact Core/UI 0.4.1 remain unchanged.

## Offline mount acquisition enrichment — Hub 0.5.1.0, 2026-10-17 UTC

Mount Collection merges independently traversed local sheets with an embedded, dated FFXIV Collect acquisition/patch snapshot under its creator's explicit reuse invitation. It requires numeric ID plus exact case-insensitive English identity; missing/drifted identities remain unapplied and counted. Major release patches map to expansions; unknown/future/malformed values stay Unknown. Community provenance is explicit and separate from native unlock state and current availability.

GilShopItem parent keys resolve GilShop entries, NQ base prices and explicit quest/achievement/state/festival requirements. Direct-item special-shop costs have currency-mode/type/collectability guards; unresolved aliases remain labeled unresolved and uncounted. Original Edelina and official product URL/title facts augment source display without third-party images/prose. All UI names/icons and character unlock/inventory data remain local.

Source page buttons are explicit user actions with a fixed HTTPS host/path allowlist. There are no API calls during collection browsing or automatic metadata changes. A separate review-only workflow fetches one bounded candidate snapshot and never commits or deploys it. Metadata replacements require permission/provenance review and the ordinary tested release. No target hook, external character query, utility/native algorithm or Core change accompanies this enrichment.
