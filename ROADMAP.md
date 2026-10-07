# Roadmap

Baseline: [verified inventory](SENTINEL_ECOSYSTEM.md). The user confirmed this execution order on 2026-10-06 America/Toronto:

1. Sentinel Modern 2 / Core 0.3: published; released consumers retain package 0.3.1.
2. Release/workflow cleanup: implemented and merged across all six children; next genuine release will exercise changed publication end-to-end.
3. Current-build acceptance baseline: initial live results recorded; partial acceptance is sufficient for Phase 3 design/tests, with specific UI/restart/facing and untested gameplay gates retained.
4. Shared navigation and diagnostics foundations: Core 0.4.1.0 published with passing isolated tests; supervised consumer proof pending.
5. SRankSentinel incremental reliability migration: PR #25 prepares session-only opt-in ordinary approach; do not merge/publish before live proof.
6. PvPSentinel Frontline Brain improvements: only after automated and supervised SRank navigation proof.
7. Sentinel Hub: only after shared foundations are stable.
8. Sentinel Trains: consumes proven shared navigation.

Do not start Hub or Trains unless the foundations are stable or the user explicitly reprioritizes them.

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
- **Responsive UI — requested, not implemented:** fix Profiles PROFILE ACTIONS clipping; allow smaller supported widths across consumers with wrapping/reflow and reachable controls; preserve stored sizes/positions, Classic and controller/keyboard behavior. Audit Core shell and consumer limits before lowering minima. In SRank, bottom-anchor Clear History controls and allocate remaining panel height to scrollable SPAWN REPORTS so taller windows expose more than two rows. Keep UI fixes separate from navigation.
- **SRank facing — current reported defect:** ordinary travel, fluid flight, configured-% Tomahawk and reward-wait/return passed, but arrival still faces away or sideways. Investigate the bounded parking/facing policy independently; preserve the accepted tag and movement-after-tag behavior.
- **SRank history/credit:** enabled-expansion recording, reward matching, one report list, clear control and tagged activity presentation are in source. Verify positive receipt correlation in-game; capped currency, missing reward lines and localization can leave a valid tag credit-unconfirmed. Do not equate a kill report with personal credit.
- **Five-map evidence:** prioritize Onsal discovery per the available user request, then resolve remaining Secure semantics and regressions on Worqor/Seal Rock/Shatter. Recognition, destination discovery, objective meaning and tactical acceptance are separate gates.
- **Native MCH:** preserve Shadow-first diagnostics and independent implementation; prove action IDs, defensive preemption and target safety with supervised evidence before expanding automation. Queue/requeue remains disabled pending an explicit tested milestone.

## Sentinel Hub and Sentinel Trains — confirmed future scope

**Hub** is an ecosystem control center, not a replacement for individual plugins. Show installed Sentinel plugins, versions, dependency health, readiness/connection status, quick-open actions, Profiles status and shared diagnostics. Eventually reduce duplicated ecosystem/dependency pages where appropriate. Hub consumes ecosystem state and performs no gameplay automation.

**Trains** is an A-rank hunt-train automation plugin. Intended flow: train/conductor report → world/instance travel → nearest usable aetheryte → conductor/map flag → continuous flight → safe arrival → single tag → next flag. Consume shared Sentinel navigation; do not create another independent movement stack. Preserve SRankSentinel and the existing SentinelHunts identity/catalog entry.

## Current execution gate

The [2026-10-06 live acceptance record](TEST_MATRIX.md#current-build-supervised-acceptance) justified Phase 3. Core 0.4 is now published and tested; [SRank PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25) awaits a **supervised opt-in proving run** before merge or catalog release. This does not close all Phase 2 gates. UI fixes, Profiles full-restart diagnosis, HUD unrelated choices and PvP's untested baseline remain separate work. No blanket migration/release readiness is implied.

Preserve the working SRank travel flow as the reference and rollback path. A new supervised SRank test of the prepared shared implementation is required before broader rollout or PvP migration; today's old-implementation pass cannot satisfy that gate. Obtain the current PvP baseline before modifying its movement. Hub/Trains remain deferred.

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
| Shared landing mechanics | Core 0.4.1.0 published; SRank 0.7.60.0 opt-in candidate CI passed | Supervised bounded physical landing, armed Landing cancellation and new-owner resume; use the current procedure in NAVIGATION_FOUNDATION.md. No repeated 0.7.59.0 test. |
| Controlled ordinary-hunt adoption | Gated on shared landing proof | Resume automatically on returned evidence. Prepare actual shared movement plus unchanged crowd-aware safe parking/tag/kill/return, preserving practical legacy rollback. Keep PR #25 unpublished until applicable gates pass. |
| PvP baseline / shared adoption | Live baseline untouched; migration blocked | Obtain current map-specific baseline and passed supervised SRank adoption before movement migration. |
| Responsive UI / Profiles clipping / SRank history | Separate authorized backlog | Audit/repair in separate changes; never include in navigation proving build. |
| Profiles full-restart semantics / HUD unrelated choices / SRank facing | Narrow live diagnosis outstanding | Use naturally available evidence; preserve existing working behavior. |
| Catalog/release maintenance | Seven entries preserved | Carry token-free verification and routine reconciliation forward without gameplay changes. |
| Hub / Trains | Deferred | Only after foundations stable or explicit reprioritization. |

Live evidence automatically resumes engineering under the operating agreement. Pending human validation does not require pausing independent low-risk work; isolate it so the proving build stays reproducible. This landing candidate supersedes the dated earlier requests above. Successful probe mechanics will not alone close the ordinary-hunt or PvP gates.
