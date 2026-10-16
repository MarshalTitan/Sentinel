# Roadmap

Baseline: [verified inventory](SENTINEL_ECOSYSTEM.md). The user confirmed this execution order on 2026-10-06 America/Toronto:

1. Sentinel Modern 2 / Core 0.3: published; released consumers retain package 0.3.1.
2. Release/workflow cleanup: implemented and merged across all six children; next genuine release will exercise changed publication end-to-end.
3. Current-build acceptance baseline: initial live results recorded; partial acceptance is sufficient for Phase 3 design/tests, with specific UI/restart/facing and untested gameplay gates retained.
4. Shared navigation and diagnostics foundations: Core 0.4.1.0 published with passing isolated tests; supervised consumer proof pending.
5. SRankSentinel incremental reliability migration: PR #25 prepares session-only opt-in ordinary approach; do not merge/publish before live proof.
6. PvPSentinel Frontline Brain improvements: only after automated and supervised SRank navigation proof.
7. Sentinel Hub: explicitly reprioritized by the 2026-10-16 MVP brief; see current Hub section.
8. Sentinel Trains: consumes proven shared navigation.

Hub was explicitly reprioritized by the 2026-10-16 MVP brief. Trains remains deferred until its shared-navigation prerequisites are proven.

## P0 — Preserve live behavior and obtain current evidence

| Track | Evidence/status | Next deliverable and exit gate |
|---|---|---|
| HUD cutscene safety | User's submarine skipping retest PASS on 2026-10-06; other choice/reward behavior not tested. | Preserve the working skip path; check unrelated choice isolation at the next normal opportunity. No blanket all-cutscene acceptance. |
| Frontline travel | Published dynamic follow, ordinary-combat travel and mount retention supersede older behavior; collision, respawn and entry-crash reports need current-build confirmation. | Supervised map-specific logs/video; classify genuine regression versus older build. STOP, death/results cancellation and no repeated failed corridor are mandatory. |
| Configuration/UI | HUD/Classy/Profiles minimize/restore and Classy controller PASS by user report; Profiles actions clipping and full-game-restart limitation remain. | Isolated UI work: narrower responsive widths, Profiles action layout and SRank history height; preserve saved layouts and input behavior. Distinguish selected profile from active plugin states after full restart. |
| Catalog health | Seven child/central entries match; successful scheduled reconciliation observed. | Continue checking release-to-catalog completion and warnings; preserve every approved entry, including SentinelHunts. |

## P1 — Close verified gaps

- **Release enforcement — completed:** shared action, optional notification/unconditional exact verification, PR-safe Classy publication, immutable assets, all seven child promotion paths, legacy cleanup and policy CI are merged. Tests/smoke and remaining next-release evidence are in the [audit](docs/RELEASE_INFRASTRUCTURE_AUDIT.md). No new plugin release was needed.
- **Profiles restart semantics — still open:** user reports profiles remain proper until a full game restart, while last-applied is displayed. This does not identify whether selection, active plugin states or both change. Compare these separately before changing startup behavior; saved profiles must not be declared lost. No silent continuous enforcement/native collection migration.
- **Responsive UI — Profiles 0.2.1.3 shipped independently; visual/controller proof pending, other consumers still backlog:** fix Profiles PROFILE ACTIONS clipping; allow smaller supported widths across consumers with wrapping/reflow and reachable controls; preserve stored sizes/positions, Classic and controller/keyboard behavior. Audit Core shell and consumer limits before lowering minima. In SRank, bottom-anchor Clear History controls and allocate remaining panel height to scrollable SPAWN REPORTS so taller windows expose more than two rows. Keep UI fixes separate from navigation.
- **SRank facing — current reported defect:** ordinary travel, fluid flight, configured-% Tomahawk and reward-wait/return passed, but arrival still faces away or sideways. Investigate the bounded parking/facing policy independently; preserve the accepted tag and movement-after-tag behavior.
- **SRank history/credit:** enabled-expansion recording, reward matching, one report list, clear control and tagged activity presentation are in source. Verify positive receipt correlation in-game; capped currency, missing reward lines and localization can leave a valid tag credit-unconfirmed. Do not equate a kill report with personal credit.
- **Five-map evidence:** prioritize Onsal discovery per the available user request, then resolve remaining Secure semantics and regressions on Worqor/Seal Rock/Shatter. Recognition, destination discovery, objective meaning and tactical acceptance are separate gates.
- **Native MCH:** preserve Shadow-first diagnostics and independent implementation; prove action IDs, defensive preemption and target safety with supervised evidence before expanding automation. Queue/requeue remains disabled pending an explicit tested milestone.

## Sentinel Hub and Sentinel Trains — confirmed future scope

**Hub** is an ecosystem control center, not a replacement for individual plugins. Show installed Sentinel plugins, versions, dependency health, readiness/connection status, quick-open actions, Profiles status and shared diagnostics. Eventually reduce duplicated ecosystem/dependency pages where appropriate. Hub 0.1 consumes ecosystem state and performs no gameplay actions. Future opt-in nonvisual utilities follow separate migration gates.

**Trains** is an A-rank hunt-train automation plugin. Intended flow: train/conductor report → world/instance travel → nearest usable aetheryte → conductor/map flag → continuous flight → safe arrival → single tag → next flag. Consume shared Sentinel navigation; do not create another independent movement stack. Preserve SRankSentinel and the existing SentinelHunts identity/catalog entry.

## Current execution gate

The [2026-10-06 live acceptance record](TEST_MATRIX.md#current-build-supervised-acceptance) justified Phase 3. Core 0.4 is now published and tested; [SRank PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25) awaits a **supervised opt-in proving run** before merge or catalog release. This does not close all Phase 2 gates. UI fixes, Profiles full-restart diagnosis, HUD unrelated choices and PvP's untested baseline remain separate work. No blanket migration/release readiness is implied.

Preserve the working SRank travel flow as the reference and rollback path. A new supervised SRank test of the prepared shared implementation is required before broader rollout or PvP migration; today's old-implementation pass cannot satisfy that gate. Obtain the current PvP baseline before modifying its movement. The historical Hub deferral is superseded by the 2026-10-16 MVP brief; Trains remains deferred.

## P2 — Shared foundations after evidence

Implemented in Core 0.4: operation ownership/cancellation, stale-result rejection, zone/build readiness, distinct query/follow phases, waypoint-progress stalls, bounded retries, mount/takeoff/flight changes, landing projection and sanitized correlated diagnostics. Existing Core APIs and UI source remain compatible. Core PR #2 is merged/released; SRank PR #25 is the controlled proving candidate. See [foundation evidence and gate](docs/NAVIGATION_FOUNDATION.md). Retain plugin-owned strategy and independent consumption.

SRank migration must preserve hunt parking, S/SS staging, one tag per real pull, positive reset/death evidence and recovery. Prove zone-mesh readiness, mount/takeoff, continuous flight and usable-aetheryte selection before broad rollout.

Future Frontline Brain work includes allied proximity clustering, meaningful field groups, switch hysteresis, smoothed centroids/velocity and short lead, mounted-group and enemy awareness, formation/role positioning, destination commitment/repath cooldown, bounded perpendicular recovery and target scoring. Preserve map safety policies; recognition does not prove objective semantics. All Frontline changes require supervised acceptance.

Close roadmap items only with a source/release link plus automated evidence and, where required, the user's in-game result. Record outstanding testing even when code is already published. The separate MINION project is not a dependency or proof of Dalamud readiness.

### Proving coverage correction — 2026-10-07

Two 0.7.56.0 hunts exercised the legacy visible-mark/parking branch with zero shared operations; the session exporter retained both. Stop requesting repeated natural spawns as the next test. First prepare repeatable controlled coverage of shared movement without weakening mark detection, protected parking or landing policy. A mechanics-only probe cannot close the end-to-end hunt gate. No further user test is requested until that procedure is ready; PR #25 stays unmerged and PvP migration remains blocked. See [the evidence record](TEST_MATRIX.md#repeated-bypass--2026-10-07-0159-americatoronto).

### Deterministic proving candidate — 2026-10-07

SRank PR #25 now prepares 0.7.59.0 with a session-only anchor-and-return probe. CI, release-infrastructure checks and the sibling SentinelHunts build pass. The next supervised gate no longer depends on an S-rank spawn: prove zoning readiness, required flight, arrival, cancellation and immediate replacement in a safe outdoor zone. This mechanics probe does not close the later end-to-end hunt gate. Keep PR #25 unreleased and PvP migration blocked until the required evidence passes.

### Shared flight evidence — 2026-10-07 10:56 America/Toronto

The first genuine Core operation on SRank 0.7.59.0 completed readiness, mount, takeoff, pathfinding and following with zero retries; the user reports successful travel. Final InFlight=true means landing remains open. Next prove cancellation and immediate replacement on the same build, then address the controlled hunt landing/handoff gate. No release or PvP migration is authorized by this partial pass. See TEST_MATRIX.md for the exact evidence.

### Cancellation evidence and landing gate — 2026-10-07 11:03 America/Toronto

The user reports successful flight-path cancellation and replacement on 0.7.59.0; pasted chat confirms stop, replacement arrival and OFF with three shared operations. Record this scoped live pass without claiming independent review of the inaccessible new attachments or a pending-query race. Landing remains open. Stop repeating this probe; prepare an explicit bounded landing handoff with ground confirmation and cancellation tests before the next supervised request. Preserve SRank's crowd-aware parking policy and the outstanding end-to-end hunt gate. No PR #25 release or PvP migration yet.

## Active work queue — 2026-10-07

| Priority / track | State | Next action / gate |
|---|---|---|
| Shared landing mechanics | Scoped 0.7.60.0 live PASS; Core 0.4.1 remains published | Closed isolated landing/cancellation/resume gate. Do not repeat the probe. |
| Controlled ordinary-hunt adoption | 0.7.61.0 approved protected parking candidate; final build/Hunts/policy CI passed | Supervise one actual shared ordinary pre-tag route and unchanged safe landing/tag/kill/return. Keep PR #25 unpublished; returned evidence automatically resumes engineering. |
| PvP baseline / shared adoption | Live baseline untouched; migration blocked | Obtain current map-specific baseline and passed supervised SRank adoption before movement migration. |
| Responsive UI / Profiles clipping / SRank history | Profiles 0.2.1.3 published separately; visual proof pending; other consumers backlog | Audit/repair in separate changes; never include in navigation proving build. |
| Profiles full-restart semantics / HUD unrelated choices / SRank facing | Narrow live diagnosis outstanding | Use naturally available evidence; preserve existing working behavior. |
| Catalog/release maintenance | Seven entries preserved | Carry token-free verification and routine reconciliation forward without gameplay changes. |
| Hub / Trains | Hub 0.1.0.0 published by explicit reprioritization; Trains deferred | Hub dashboard acceptance; Trains still depends on proven navigation. |

Live evidence automatically resumes engineering under the operating agreement. Pending human validation does not require pausing independent low-risk work; isolate it so the proving build stays reproducible. This landing candidate supersedes the dated earlier requests above. Successful probe mechanics will not alone close the ordinary-hunt or PvP gates.

## Landing PASS and ordinary-hunt gate — 2026-10-07 11:43 America/Toronto

The user reports physical unmount/landing and confirms cancellation stopped movement and resume landed. Inspected 0.7.60.0 excerpts: ProbeCancelled for `2d7c66c4-9243-41ed-b792-a6ed043477d0` at **15:37:23.812 UTC**; distinct replacement `75ac0f50-ebca-443c-aad4-9c4cfe4c6fc5` recorded **Landing → Arrived / GroundConfirmed** at **15:37:29.918 UTC**, ready/current-zone mesh and Following=false. Classify **PASS — scoped physical landing/cancellation/replacement**, based on the human report plus inspected transition/session excerpts. PhysicalContext/Result fields and the full attachments were not readable/contained in the excerpts; do not claim independent inspection of Grounded/InFlight fields or every cancellation race. No repeat 0.7.60.0 test is required. This closes the isolated mechanics landing gate, not actual shared hunt policy integration.

Candidate **0.7.61.0**, commit `5e23d52bd750ecbef74d9b0f9ba80c879aee135e`, in [SRank PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25), extends session opt-in to ordinary **pre-tag protected flight parking** only after the existing path AND landing-ground-connectivity validation. Core receives a one-use immutable approved route; its query phase here accepts prevalidated consumer data rather than issuing a new unprotected query. Fresh entity/zone/path/clearance checks precede following; zero parking retries forbid requery outside approval. Original point selection, crowd safety, preference bookkeeping, alignment/landing revalidation and kill/reset/tag/return semantics remain consumer-owned. Planned landing handoff cancels the Core lease before legacy landing and records the correlated ParkingLandingHandoff event/last Core state. SS, unprotected fallback and post-tag retreat remain legacy. Failure stops proving/Sentinel, retains the hunt and exports; off during shared parking returns to LocateMark for safe legacy resampling.

Next real-game gate: one ordinary report on the new candidate, shared protected parking **Following** and same-ID safe landing handoff, physical landing, one configured-threshold tag, normal retreat, positive kill/reward wait and Ul'dah return. No new probe or duplicate UI acceptance is requested. Use NAVIGATION_FOUNDATION.md for the verified artifact, shortest procedure and rollback. PvP remains blocked until this supervised integration and its own current-build baseline pass. Other low-risk backlog work must stay in separate PRs/builds.

## Sentinel Hub MVP — 2026-10-16 UTC

**Explicit reprioritization:** the user's Hub build brief supersedes the earlier Hub-only deferral. Trains and shared-navigation acceptance remain gated separately. No SRank/PvP gameplay or HUD utility migration is included.

| Track | Current state | Next gate |
|---|---|---|
| Hub 0.1.0.0 | Published/cataloged optional MVP; automated validation clean | [Supervised acceptance](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/ACCEPTANCE.md): inventory, quick-open, narrow UI/minimize/reload, diagnostics, consumers with Hub disabled |
| Hub status contracts | Installation/load/version and verified dependency responses implemented; Profiles selection/drift, Relay connection and consumer fault aggregation unavailable | Add documented, versioned, read-only contracts in owning consumers before displaying richer state |
| Anti-AFK | Planned/inactive; HUD remains owner | After MVP acceptance, default-OFF Hub engine, explicit duplicate-owner prevention and practical preference migration; supervised validation before separate HUD cleanup |
| Quest Convenience | Planned/inactive; HUD remains owner | Isolated module preserving accepted submarine handling, explicit choices, unrelated prompts and bounded failures; supervised dialogue/cutscene/reward evidence before cleanup |
| Latency/Weaving | Future; no engine, hooks or compensation in MVP | Independent design, measurements, bounded opt-in compensation and conflict detection for NoClippy/XivAlexander where reliable; default OFF |
| Shared appearance | Hub-local theme/reduced motion implemented | Optional Core-owned shared contract only if consumers keep independent local fallback |
| Trains/navigation proving | Unchanged by Hub | Existing separate acceptance gates remain authoritative |

Recommended next implementation after the human Hub acceptance gate: **Anti-AFK single-owner migration**. Hub publication is not evidence that existing hunt or Frontline migration gates have passed.

## Current migration gate — 2026-10-16 UTC

| Track | Current state | Next action |
|---|---|---|
| Hub inventory | Hub 0.3.1.1 prefers installed live component over duplicate dev; icon metadata remains validated | Focused live SRank 0.7.56.0 version/state display check |
| Anti-AFK | Scoped four-step user PASS, 2026-10-16 00:46 America/Toronto; source/settings unchanged | Preserve accepted behavior; unreported scenarios remain distinct; fallback cleanup is a separate change |
| HUD utility cleanup | Scoped four-step user PASS at 01:38 America/Toronto for instructed Hub 0.3.1.0 / HUD 0.8.5.1; preferences/schema/IPC retained | Closed cleanup gate; preserve accepted utilities, no repeat full test |
| Quest Convenience | Scoped latest-checklist user PASS at 01:08 America/Toronto; reward mode unspecified, submarine not separately confirmed | Preserve accepted Hub native code/settings; no repeat full replacement test for structural cleanup |
| Latency/Weaving | Inactive plan | Later independent design/measurement/conflict proving |
| Hunt/PvP/Core navigation | Unchanged | Existing separate proving gates |

The Anti-AFK and Quest PASS reports automatically authorized separate HUD cleanup. The subsequent scoped cleanup PASS closes that runtime gate; the separate live/dev inventory correction below is current. No repeat full Anti-AFK idle/cutscene/reward checklist is requested for unchanged Hub algorithms. After cleanup acceptance, prepare Latency/Weaving's separate source/measurement/conflict design; do not silently enable compensation or add hooks without that proving stage.

## Anti-AFK acceptance scope — 2026-10-16 UTC

The user replied PASS at **2026-10-16 00:46 America/Toronto** to the latest four-step Anti-AFK checklist: Hub Active/HUD Managed, module OFF returns the retained HUD setting, Hub reload restores ownership, and idle beyond the configured automatic-away interval. The instruction referenced Hub **0.2.0.0** / HUD **0.8.4.6**; versions were not independently restated or inspected in the PASS reply. This closes that scoped supervised gate. It does not certify unreported original checklist cases, independent native instrumentation, all logout/dual-plugin reload races or all future builds. Anti-AFK source/settings are unchanged by Quest migration.

Quest policy/source/native-UI/package checks passed; publication is proving availability, not native acceptance. No other consumer/navigation gate is advanced.

## Quest acceptance and separate cleanup gate — 2026-10-16 UTC

The user replied **PASS** at **2026-10-16 01:08 America/Toronto** to the latest Quest Convenience checklist: ordinary dialogue/manual choices, cutscene skipping, manual and chosen automatic rewards, and off/reload ownership behavior. The instruction identified **Hub 0.3.0.0 / HUD 0.8.4.7**; versions were not independently restated. Reward mode was not named and submarine was not separately confirmed. This closes that scoped replacement gate; it does not certify all modes, all original checklist cases, logout/dual-reload races or unreported scenarios. Accepted Hub native code and saved settings are unchanged by cleanup.

**Hub 0.3.1.0 / HUD 0.8.5.1** form the separate utility cleanup stage. HUD removes the Anti-AFK and Quest native services, framework call sites and action controls; its Convenience page shows retained preferences for explicit import. Schema 12, original preference values and v1 IPC import/claim/release contracts remain. Claims validate compatible requesting Hub and bounded tokens but have no native action callback. Hub changes only ownership guidance, metadata and compatibility tests; accepted engine/controller/configuration code and Core/UI pins (Hub 0.4.1, HUD 0.3.1) are unchanged. Camera/visual modules and six unrelated catalog identities remain unchanged.

**Cleanup in-game acceptance is pending.** [Exact procedure and rollback](https://github.com/MarshalTitan/SentinelHUD/blob/main/docs/UTILITY_CLEANUP.md): confirm versions/settings and HUD's migration notice; with Hub utilities enabled prove ordinary text/manual choice; turn utilities OFF and verify manual dialogue/no increasing Hub check counter after 35 seconds; disable Hub while HUD/camera continue working, then re-enable/restore options and reload HUD once. With HUD 0.8.5.0, disabling Hub leaves utility actions OFF instead of resuming old HUD engines. Rollback: turn Hub utilities OFF before restoring HUD 0.8.4.7 and review its retained old preferences. Do not repeat the prior full idle/cutscene/reward checklist for this structural cleanup.

Metadata correction: HUD **0.8.5.0** removed the native engines, but distribution inspection caught stale separate installed/catalog descriptions. **0.8.5.1** corrects those descriptions without changing runtime code or replacing the immutable 0.8.5.0 asset. Package validation now requires exact project/template/catalog/packaged description agreement. The final cleanup test pair uses Hub 0.3.1.0 and HUD 0.8.5.1.

## Cleanup PASS and live/dev inventory correction — 2026-10-16 UTC

The user replied **PASS** at **2026-10-16 01:38 America/Toronto** to the four-step utility-cleanup checklist for the preceding instructed pair **Hub 0.3.1.0 / HUD 0.8.5.1**: settings retained, Hub dialogue/manual choices, both modules Off with unchanged Anti-AFK counter, and HUD/camera independence plus Hub re-enable/HUD reload. Versions were not separately restated in the reply. This closes that scoped cleanup gate. The same message reports a separate Hub Plugins inventory defect: the SRank development copy's version was shown instead of installed live **0.7.56.0**. This does not recertify unreported earlier reward modes/submarine scenarios or navigation gates.

**Hub 0.3.1.1** corrects component inventory selection. Dalamud's public IsDev and effective Version identify instances; when both copies exist, the non-dev installation supplies version, load/restriction state and fresh settings-button eligibility regardless of enumeration order. A dev-only installation remains visible with an explicit development label. Versions are read from the selected installation, not hardcoded to 0.7.56.0 or inferred from the remote catalog. Dependency lookup/probes, utility controllers/native algorithms/settings, Core/UI pins, HUD and all SRank source/binaries remain unchanged.

The focused [inventory check](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/LIVE_DEV_DISCOVERY.md) remains: update Hub to 0.3.1.1, /shub → Dashboard → Refresh inventory, then Plugins; with live SRank 0.7.56.0 and dev both installed, expect **0.7.56.0 / Installation: live** and the live loaded/not-loaded state. Dashboard must agree. No repeat utility/idle/cutscene/reward checklist. Rollback is Hub 0.3.1.0; no config deletion or SRank/HUD change. After this correction, Latency/Weaving remains a separate source/measurement/conflict-design stage with default OFF; no compensation/hooks are enabled.
