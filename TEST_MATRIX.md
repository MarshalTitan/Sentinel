# Test Matrix

Automation validates deterministic behavior and packaging; it cannot certify game memory, native UI callbacks, path reachability or real combat. Run routine checks on cloud runners; the user supplies in-game acceptance. Baseline versions and source heads: [Sentinel Ecosystem](SENTINEL_ECOSYSTEM.md).

## Required coverage

| Component | Automated coverage / existing harness | In-game acceptance and evidence |
|---|---|---|
| Catalog | Node generator tests; schema, registry, version/URL validation; candidate generation with asset verification; PowerShell Test-Catalog; diff against checked-in catalog | Install/update through the permanent URL; installed version matches intended artifact. No game needed for aggregation itself. |
| Core/UI | Core.Tests (including navigation ownership/readiness/cancellation/stale-path/budget/progress/flight/export scenarios) and Core.UI.Tests; generic Linux tests; Windows API 15 build/pack | Consumer rendering at actual scale, theme choice, motion, keyboard/controller, minimize/drag/restore and restart. Renderer tests do not replace this. |
| SRank | StateTests, UiTests; Faloop catalog, travel restore, field recovery and Modern integration audits; package checks | Same-DC intake/dedup, disabled expansions, zoning/mesh wait, two bounded 10-second takeoff cycles, parking/facing, one tag, SS staging, live-entity exit veto, death/raise/Return and reward-credit correlation. |
| PvP | Tests/PvPSentinel.LogicTests.csproj; relationship/lifecycle, route/recovery, provider/native policies and package validation | Five-map cases below; entry/reconnect/respawn, ordinary-combat travel, provider loss, stale path results, STOP, mount retention and obstacle recovery. Native Shadow must cause no target/action writes. |
| HUD | Core.Tests, UI.Tests, Core UI checks, catalog-policy and package tests | Click/context-menu layering, resize/persistence, native target anchor, elevated marker, highlight colors, zoom after death; dialogue/choice boundaries. Submarine skipping passed the user's 2026-10-06 retest; unrelated choice/reward behavior remains untested. |
| Classy | tests/ClassySentinel.PositionTests plus Core hash/build checks | R3 open/cancel, D-pad/Cross/Circle capture only during selection, no target interference, exact alternate gear set, missing/renamed/reused references, settings/minimize and restart position. |
| Profiles | SentinelProfiles.Core.Tests and package checks | Disable-before-enable, Leave Alone, missing/unsupported plugins, self-unload protection, failures/drift, selected/last-applied persistence. Separately demonstrate actual loaded states after restart. |
| Relay | Core.Tests, Core pin and package validators; existing LIVE_TEST_CHECKLIST.md | Two independent character profiles, opt-in filters, real reward delivery, authorized reply observed by another client, denied wrong user/channel/stale replay, pause/resume, screenshot isolation and cooldown. Never include secrets in evidence. |

Do not claim all scenario rows are already automated: harness names identify existing entry points; new failure-specific cases must be added where absent. Published binaries and passing policy tests are not live acceptance.

## Frontline map gates

| Map | Current source capability | Outstanding supervised gate |
|---|---|---|
| Worqor Chirteh | Objective pilot; named Triumph phases; field-group fallback | Already-running match recognition, claimed-team semantics, snowman/central obstacle routes and post-respawn reacquisition |
| Seal Rock | Supported objective aggregation/pilot; unresolved ranks/team mapping remain bounded | Map-marker visibility without manual map opening, objective approach/walls, no guessed unsupported ownership |
| Shatter | Persistent ice objectives, objective pilot and clearance approach policy | Entry crash regression, crystal collision clearance, ice-combat travel and mount/dismount stability |
| Onsal Hakair | Discovery destinations and allied field-group following | Priority discovery: correlate raw markers/objects with actual node state/ownership; prove spawn departure and full-match continuity |
| Borderland Ruins (Secure) | Discovery destinations/physical observations and field-group following | Resolve objective meaning from evidence; verify selected destination resumes despite incidental/stale combat and repeated nearby enemies |

Current automatic travel requires loaded, responsive RSR; its reported Off mode is not itself a blocker. Manual and provider-specific gates differ. Queue/requeue stays disabled. Do not infer all five maps are strategically complete from adapter presence.

## Evidence record and pass rules

Every test record needs plugin version/source, Dalamud/game build, configuration/mode, map/world/instance when relevant, expected versus actual behavior, timestamp and artifact links. Label **passed**, **failed**, **blocked**, or **not run**; include who performed the in-game test.

For PvP collect events.jsonl, summary.json, dalamud.log and frontline-entry-stages.log, with short timestamp-correlated video for movement failures. For hunts capture target/context, state transition, tag/kill/reward evidence and recovery outcome. For UI include theme/scale and before/after restart screenshots. Reproduce against the installed artifact, not just a local build.

A release gate passes only when required automated checks pass and material in-game risks are closed or explicitly recorded as pending supervised acceptance. Avoid optional broad retesting for documentation-only changes.

## Evidence inspected during this documentation audit

These are existing GitHub runs inspected on 2026-10-07 UTC, not new local runs or proof of user testing:

| Repository | Successful observed run |
|---|---|
| Sentinel | [37535995876](https://github.com/MarshalTitan/Sentinel/actions/runs/37535995876) |
| SentinelCore | [37401830717](https://github.com/MarshalTitan/SentinelCore/actions/runs/37401830717) |
| SRankSentinel | [37473830642](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37473830642) |
| PvPSentinel | [37421725173](https://github.com/MarshalTitan/PvPSentinel/actions/runs/37421725173) |
| SentinelHUD | [37421814162](https://github.com/MarshalTitan/SentinelHUD/actions/runs/37421814162) |
| ClassySentinel | [37421793021](https://github.com/MarshalTitan/ClassySentinel/actions/runs/37421793021) |
| SentinelProfiles | [37421631249](https://github.com/MarshalTitan/SentinelProfiles/actions/runs/37421631249) |
| SentinelRelay | [37423768012](https://github.com/MarshalTitan/SentinelRelay/actions/runs/37423768012) |

SRank's publication run precedes a manifest-only head commit. Classy's listed run is a PR-triggered publisher that checks out main, not proof it tested that PR's source. The audit compared all seven child/central manifest objects, inspected release records/assets and relevant source/workflows. Independent binary hash recomputation and new in-game tests were not performed. Baseline PR #2 and scope PR #3 validation passed before merge. Current Phase 1 CI evidence is in the [release audit](docs/RELEASE_INFRASTRUCTURE_AUDIT.md).

## Current-build supervised acceptance

Updated from the user's **2026-10-06 22:40 America/Toronto / 2026-10-07 02:40 UTC** live report. Evidence is the user's written account; the architect did not run the game. Five attached screenshots could not be opened in this session and are not claimed as visually reviewed. No log/video, precise failure timestamp, world/zone/mark, game/Dalamud build or UI scale was supplied. This does not invalidate the reported scenario passes, but limits reproduction and wider conclusions.

SRank **0.7.54.0** was explicitly tested; PvP **0.3.1.23** was explicitly not touched. HUD/Classy/Profiles were named as tested, but their installed versions were not restated. Their unchanged published baselines are HUD 0.8.4.5, Classy 0.8.6.0 and Profiles 0.2.1.2. Relay 0.5.0.5 and SentinelHunts 0.1.1.0 were not reported tested. Live source heads, releases and central manifest were rechecked with no version change.

| Scenario | Result | Evidence / scope |
|---|---|---|
| HUD, Classy, Profiles Modern minimize/restore | **PASS — user-reported** | User reports it works for these three plugins. Do not extend to SRank, PvP or Relay UI acceptance. |
| UI position/size through restart | **PASS overall, with exceptions/limits** | User labels UI/restart PASS and reports Profiles clipping instead of a position reset. Exact restart type and each stored dimension were not enumerated; no blanket full-game persistence closure. |
| Classy controller operation | **PASS — user-reported** | Controller behavior works. Invalid/unavailable saved-reference settings case was not specifically exercised. |
| Profiles last-applied display | **PASS — user-reported** | Last-applied is shown after restart. This does not establish automatic reapplication. |
| Profiles full-game-restart semantics | **OPEN — user-reported limitation** | “Keeps Profiles proper until full game restart.” It is unclear whether the selected UI profile, actual loaded plugin states, or both change. Do not label saved profiles lost or selected-profile persistence passed. |
| Profiles PROFILE ACTIONS layout | **Historical baseline FAIL; 0.2.1.3 code fix needs in-game proof** | User reported clipping regardless of resizing. Independent actions/reflow repair now published; no new visual/controller PASS supplied. |
| All Sentinel UI minimum widths | **REQUESTED improvement** | Permit narrower windows with correct text wrapping/reflow and accessible controls. No minimum width/UI scale measurement supplied. |
| SRank SPAWN REPORTS layout | **FAIL / requested correction** | Only two rows visible even when panel height grows. Anchor Clear History controls at the bottom; give remaining height to a scrollable report region. |
| SRank mount, path load and travel | **PASS — user-reported** | Mounts, loads travel path and navigates to the mark. Separate post-teleport field was blank; do not claim every zoning/mesh-startup issue closed. |
| SRank flight continuity | **PASS — user-reported** | “Fluid flight.” Preserve this as the pre-migration reference. |
| SRank parking/facing | **FAIL for facing** | Still faces away most times, sometimes sideways. Arrival occurred, but safe/crowd clearance was not separately measured. Keep the facing correction consumer-owned and isolated from shared navigation extraction. |
| SRank tag / movement afterward | **PASS — user-reported** | Tomahawk at configured percentage, then moves away. One ordinary-pull observation; reset/re-pull and duplicate-tag edge cases remain untested. |
| SRank kill/reward wait/return | **PASS — user-reported** | Waits a few seconds after kill for chat rewards, then returns to Ul'Dah. This does not independently prove history credit matching or all positive-death/reset vetoes. |
| SRank SS, death/raise and exceptional recovery | **NOT EXERCISED / not reported** | No evidence supplied for these cases; do not force them just for baseline collection. |
| HUD submarine cutscene skipping | **PASS — user-reported** | “Subs” skips successfully now. Close the reported submarine-skip regression for this observed scenario; do not generalize to every cutscene. |
| HUD unrelated NPC choices / rewards | **NOT TESTED** | User has not done an NPC with rewards. No pass claimed for choice isolation or reward handling. |
| PvP entry/follow/combat/mount/respawn/STOP | **NOT TESTED** | User explicitly did not touch PvP 0.3.1.23. All map-specific acceptance gates remain open. |

### Classification after this evidence

- **Verified by reported live observation:** the specific Modern, controller, submarine-skip and ordinary SRank scenarios marked PASS above. These are not newly implemented fixes in this documentation change.
- **Code appears fixed, still awaiting relevant game proof:** unexercised Classy saved-reference settings path, other cutscenes/choice boundaries, PvP movement and SRank recovery/reset edge cases.
- **Current reported defects/limitations:** Profiles action clipping/full-game-restart behavior, SRank report-list sizing and facing. Narrower responsive windows are a confirmed feature request, not an implemented capability.
- **Historical assumptions superseded:** the blanket submarine-skip failure and generic minimize failure no longer describe the tested scenarios. “RSR must report On for travel” remains inconsistent with current source, but PvP runtime acceptance is still unknown.

### Phase 3 readiness and remaining checks

**GO for shared contract design, additive diagnostics and isolated automated implementation/tests.** The baseline is sufficient to begin without waiting for the unrelated UI fixes or an available Frontline match. Phase 2 is partially accepted, not universally complete.

1. Study current SRank/PvP movement and actual vnavmesh IPC semantics; public XeldarAlz code is architecture-only reference, with no AGPL source copying.
2. Define one movement owner per operation, cancellation/ownership generations, stale-result rejection, pathfinding versus following, waypoint progress and bounded recovery. Establish sanitized correlation/state diagnostics.
3. Test delayed path completion after cancel/replacement, zoning during mesh build, build-ready mismatch, stalls and mount/flight transitions with fake adapters before attaching the layer to live movement.
4. Introduce SRank incrementally with the existing path preserved as a rollback option. Its current travel/tag/reward-return flow is the reference, not evidence that a future shared implementation works.
5. Require a **new supervised SRank test of the migrated build** before broad migration or any PvP movement migration. PvP also needs its own existing-build baseline and subsequent supervised changed-build testing. Hub/Trains stay later in the approved order.

Only these focused follow-ups are needed now; do not repeat completed checks wholesale:

- **Profiles, next full game restart:** capture selected profile name, last-applied name and actual enabled plugin states before/after. Report which one changes; this separates UI selection from temporary-state reapplication.
- **HUD, next ordinary choice/reward opportunity:** verify the choice remains untouched with skipping enabled and record reward-selection mode. Leave reward automation Manual when isolating choice behavior. No need to repeat the passed submarine scene unless a change affects it.
- **PvP, when available:** one normal match, recording map/version, entry, follow, incidental combat, natural respawn and STOP. Supply events.jsonl, summary.json, frontline-entry-stages.log and relevant dalamud.log; add a timestamped clip for movement failures.
- **SRank facing, next ordinary hunt:** short arrival-to-facing clip with mark/zone and preferred parking settings. No broad flight/tag retest is needed until navigation changes. SS/death/recovery can be recorded if naturally encountered.
- **UI repair evidence:** screenshot plus UI scale and window dimensions if available for Profiles clipping and SRank history growth; no screenshot-only diagnosis is claimed from the inaccessible attachments.

Keep tokens, saved secrets and unrelated private chat out of diagnostic evidence.

## Phase 3 foundation and proving gate — 2026-10-07 UTC

Core [PR #2](https://github.com/MarshalTitan/SentinelCore/pull/2) merged and published as 0.4.0.0. [Final PR CI](https://github.com/MarshalTitan/SentinelCore/actions/runs/37569570801) passed generic Linux and full Windows tests/build/package checks. Navigation scenarios cover replacement ownership, late/cancelled/faulted tasks, disposal, same-territory zone epochs, build/readiness mismatch and settle, start drift/invalid endpoints, query/readiness/operation deadlines, finite retry budgets, sideways-vs-waypoint progress, mount/takeoff/flight changes, landing bounds, export allowlisting/capacity, stop failure and thread affinity. Existing generic and UI tests still pass. [Release CI](https://github.com/MarshalTitan/SentinelCore/actions/runs/37569682234) also passed and verified all three public packages.

SRank [PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25), version 0.7.55.0, is a controlled CI artifact with session-only opt-in. Its new consumer test checks default legacy dispatch, retained ownership during approach, release before hunt-policy handoff, retired-handle isolation and absence of persisted proving configuration. [SRank CI 37569981786](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37569981786) passed 29 state tests, 32 UI/migration/history tests, the new consumer-hook tests, all baseline audits, zero-warning build and package/hash validation. Workflow policy, both public distribution checks and the sibling Hunts build also passed. Neither automated success nor Core publication changes the user-reported 0.7.54.0 acceptance record above.

**Required live gate:** use the [exact proving procedure](https://github.com/MarshalTitan/SRankSentinel/blob/phase3/navigation-proving/docs/NAVIGATION_PROVING.md). One ordinary S-rank needing zoning and flight: enable `/sranknavtest on` while idle, observe zone load → stable mesh → mount → takeoff → continuous flight → existing landing → single configured tag → kill/reward wait/Ul'dah return. Then exercise STOP during a second pending/active route and explicit legacy rollback; no late task may interrupt the replacement. Reload must show proving OFF. Export `/sranknavtest export` and return navigation-proving.json, per-stage PASS/FAIL, plugin/vnavmesh versions, world/zone/instance/mark and failure timestamp/clip. Do not include secrets or unrelated chat.

No independently attributable shared-path live result exists yet; see the user follow-up below. The mesh-territory identity limitation, flight/mount behavior and safe handoff require this observation. Facing is still the separate reported defect. PvP is unchanged and blocked from shared navigation adoption until this SRank gate passes and its own baseline is captured. UI/Profile/history work and Hub/Trains remain separate.

### User follow-up — 2026-10-07 00:47 America/Toronto

The user reports **“Everything worked”** after the proving instructions and pasted the complete export: `{"Schema":"sentinel.navigation.v1","Entries":[]}`. Record this as a user-reported functional pass, with **shared-path execution unconfirmed**, not a navigation failure or a completed migration gate. Installed version/context and export timing relative to reload were not restated.

Live source verification shows diagnostics are held only in memory for the plugin instance. A successful Core Begin records Started immediately; off and normal completion do not clear the buffer. Reload creates a new instance, and enabling proving without starting a shared operation can produce an empty export. SRank can also resolve an already-visible mark before entering the shared approach. The empty file alone cannot distinguish these situations or prove an export defect.

Initial follow-up (superseded by the confirmed command sequence below): establish whether export occurred after a plugin/game reload. If needed, capture `/sranknavtest status` during one ordinary long approach and export **before any reload/restart**. Confirm ON with a nonempty operation ID and Pathfinding/Following state; a returned transition history must establish that shared movement actually ran. Do not repeat unrelated UI or already-reported functional checks. SRank PR #25 remains unmerged and PvP migration remains blocked pending this evidence.

### Confirmed command sequence — 2026-10-07 01:05 America/Toronto

The user supplied chat responses: **00:57 ON for this session**, **01:03 OFF / Legacy travel restored**, then **01:03 Sanitized export**, again with zero Entries. Activation was accepted; turning it off does not clear diagnostics. Do not attribute this report to a missed activation step or assume reload caused it. The exact hunt-state path is still unknown. A successful Core Begin would record Started immediately, but the original exporter captures neither activation nor legacy state transitions. This is a confirmed observability gap, not evidence of a broken flight path.

SRank PR #25 now prepares **0.7.56.0**, commit `9bead74bd1a14b24fd2bd24e0bb4fadc4d56eae7`, with bounded session observations, plugin/instance identity, hunt-state transitions and a real shared-operation count. It announces **SHARED operation started**, warns explicitly when none started, and automatically exports on off/halt. Original Core Entries remain genuine operation transitions; session observations do not fabricate shared-movement acceptance. Export I/O failures cannot change movement. No routing, parking, facing, tag, UI or saved-configuration policy changed.

Focused next test after CI: load the new PR artifact, enable proving while idle and run one ordinary report. Look for SHARED operation started. Turn proving off and send the generated JSON even if the announcement never appeared; the session states will identify the path taken. Export before unloading. No broader retest or PvP migration is authorized by the empty export; the user's successful functional observation remains recorded.

[Candidate CI 37574717238](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37574717238) passed: 29 state tests, 32 UI/migration/history tests, ownership/handoff and new session-evidence tests, zero build warnings/errors, package/hash checks, workflow policy, both public distribution checks and sibling Hunts build. [Download 0.7.56.0](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37574717238/artifacts/11462286124). Replace the previous dev candidate; keep the public installed copy disabled. PR #25 remains unmerged.

### Resolved zero-operation trace — 2026-10-07 01:18 America/Toronto

The user pasted a complete **0.7.56.0** export from the 01:13–01:16 session. Activation and export worked: Enabled at 01:13:05, Disabled/Exported at 01:16:48, zero shared operations and no Core Entries. Deleting the previous JSON was unrelated; export overwrites the file.

The recorded path was world visit → territory teleport → player readiness → WaitForMesh → PrepareApproachDestination (**01:14:09.321**) → LocateMark (**01:14:09.592**) → MoveToSafePoint → Landing → SafeWait → TagApproach → GroundRetreat → SafeWait → ResetToUldah → Idle. There was no ApproachAlertCoordinates or shared operation. These are state-transition observations, not independent proof of a successful tag, kill or safe physical landing; the user's earlier functional PASS remains separate evidence.

Source at `9bead74bd1a14b24fd2bd24e0bb4fadc4d56eae7` checks TrySwitchToVisibleMarkDuringApproach before shared readiness/start in PrepareApproachDestination. A detected live mark can transition directly to LocateMark; a Core arrival would necessarily have recorded an operation. **Source-supported diagnosis: early visible-entity handoff bypassed shared long approach, and existing hunt movement handled this run.** This is expected compatibility behavior, not a failed shared route or lost diagnostic data. The new session exporter is demonstrated working for this case.

Next required live coverage is one ordinary S-rank whose report requires a long approach before the entity becomes detectable from the arrival aetheryte. Keep **the same 0.7.56.0 build**, enable proving while idle, and look for SHARED operation started. If that message appears, complete the hunt, then off/export; provide the JSON and functional outcome. STOP/rollback must also be demonstrated against an actual shared operation before broad adoption. If the mark is immediately detectable again, that hunt does not exercise shared approach; do not change working detection/parking policy merely to force the test. No reinstall, JSON deletion, UI retest or new build is needed. PR #25 stays unmerged; PvP adoption remains blocked.

### Repeated bypass — 2026-10-07 01:59 America/Toronto

The second 0.7.56.0 export retains both hunts in the same plugin instance. Proving was enabled at 05:22:47 UTC; the second hunt reached PrepareApproachDestination at 05:53:58.6948083 and LocateMark at 05:53:59.0004724 (0.306 seconds). It then recorded MoveToSafePoint, Landing, SafeWait, TagApproach, GroundRetreat, SafeWait, PostKillSsGrace, ResetToUldah and Idle before off/export at 05:59:13. OperationsStarted remains 0, SharedOperationObserved is false, and Core Entries is empty. Activation and retained session export are demonstrated; shared movement was not exercised. State names alone do not certify physical outcomes or reward credit.

Source review explains why flight does not imply shared-path coverage: FindMark resolves a matching battle NPC from the object table without a camera-visibility or distance gate. TickLocateMark hands off to BeginSafeParking; TryStartNextParkingRoute owns the existing direct/protected parking route. The proving integration only covers the earlier coordinate approach. Both traces are consistent with the intended early entity handoff, not user error or deleted diagnostics.

**Supersedes the request above to keep waiting for a naturally longer hunt.** Another spawn is not a reliable way to exercise this narrow integration. No additional live run is requested on this evidence; proving is confirmed OFF. Before the next supervised request, prepare and test a repeatable explicit movement probe or a controlled integration that reaches the actual movement branch while retaining all consumer-owned protected-route and landing checks. A standalone probe would establish only mechanics; it cannot substitute for the required end-to-end hunt and cancellation/rollback gate. Do not suppress mark detection or bypass parking safety to manufacture coverage. PR #25 remains unmerged, the public 0.7.54.0 baseline remains the comparison, and PvP adoption remains blocked.

### Deterministic probe candidate — 2026-10-07

SRank PR #25 now prepares **0.7.58.0** at `a21b63e5b8daeefb26233414fdd687010fe04b7e`. [Build 37638092751](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37638092751), [release-infrastructure checks 37638092518](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37638092518) and the sibling [SentinelHunts build 37638092629](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37638092629) passed. The [0.7.58.0 artifact](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37638092751/artifacts/11490662620) remains PR-only.

The candidate adds a session-only deterministic anchor-and-return probe. With main SRank automation disabled and Idle, the user sets a projected destination on clear outdoor ground, teleports away and back to the same territory/world/instance, and runs a Core-owned flight of at least 80 yalms. A second run is cancelled during Pathfinding or Following, then replaced. The probe refuses combat, an active hunt, external movement, wrong context, short/non-finite routes and unavailable flight; enabling Sentinel or leaving Idle cancels it. Destination coordinates stay in memory and are excluded from configuration and sanitized export. Reload and off clear the destination.

This provides repeatable evidence for zone/build readiness, mount, takeoff, async pathfinding, continuous following, arrival, cancellation and stale-task isolation without waiting for an S-rank. It does not certify hunt parking, facing, tagging, kill evidence or return. Exact commands and failure evidence are in [NAVIGATION_PROVING.md](https://github.com/MarshalTitan/SRankSentinel/blob/phase3/navigation-proving/docs/NAVIGATION_PROVING.md). PR #25 remains unmerged; the public 0.7.54.0 baseline and catalog are unchanged. PvP adoption remains blocked until the probe passes and the later controlled hunt integration reaches shared movement.

### Probe setup correction — 2026-10-07 10:33 America/Toronto

On 0.7.57.0 the user enabled proving while Idle and received the combined “mesh not ready or point could not be projected” response on repeated `probe set` attempts; status showed no operation, an unset destination and zero shared operations. No movement began. That message did not distinguish readiness from floor projection, and idle setup did not continuously sample the readiness gate.

PR #25 now prepares **0.7.58.0** at `a21b63e5b8daeefb26233414fdd687010fe04b7e`. `probe set` polls every framework tick for up to 30 seconds while the player remains landed and still. It reports loading, mesh readiness, build progress, current-zone readiness and flight availability without coordinates, then distinguishes a ready-mesh floor-projection failure. Pending setup cancels on unsafe state changes. [Build 37638092751](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37638092751), [release-infrastructure checks 37638092518](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37638092518) and [SentinelHunts build 37638092629](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37638092629) passed. Use the [0.7.58.0 artifact](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37638092751/artifacts/11490662620) for the next attempt. No plugin release or catalog change occurred.

### Grounded floor-query correction — 2026-10-07 10:44 America/Toronto

The 0.7.58.0 probe confirmed a healthy dependency state: `loading=False`, `meshReady=True`, `buildProgress=-1`, `currentZoneReady=True`, and `flight=Available`. Destination setup then failed specifically because no floor point was returned within eight yalms; status remained Idle with no operation and no movement began.

Upstream vnavmesh `FindPointOnFloor` selects mesh points at or below the query Y. Querying at the exact grounded character Y can reject a mesh surface fractionally above the actor origin. PR #25 now prepares **0.7.59.0** at `f68ebb794cff1c2486d19d68ab7e85c3cce02156`: the probe queries two yalms above the character, saves the returned ground point, and accepts it only within eight yalms horizontally and three yalms vertically of the character. Tests cover the raised query and finite local bounds. [Build 37639525511](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37639525511), [release-infrastructure checks 37639525627](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37639525627), and [SentinelHunts build 37639525676](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37639525676) passed. Use the [0.7.59.0 artifact](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37639525511/artifacts/11490874477). No plugin release or catalog change occurred.

### First confirmed shared flight — 2026-10-07 10:56 America/Toronto

The user supplied the complete 0.7.59.0 JSON and reports successful travel while still technically flying at ground level. Operation `d9a2eb1a-7c3b-4c3b-a6a6-cc3f6e0aa975`, territory 1191, zone epoch 3, ran from 14:53:45.899 UTC to 14:54:22.760 UTC. It recorded WaitingForMesh → Recovering (DependencyWait, not a retry) → Mounting → TakingOff → Pathfinding → Following → Arrived/Success, with zero retries. CurrentZone became true after about 2.06 seconds; pathfinding took about 0.52 seconds and Following about 29.39 seconds. The session records one genuine operation and SharedOperationObserved=true. Movement, startup and readiness are accepted for this observed probe; no retry or recovery transition occurred during flight. The supplied pasted JSON is the inspected evidence; the attached screenshot was not visually reviewed.

**Arrival is not landing:** the final physical context has Mounted=true and InFlight=true. Core's current destination-radius arrival and the probe's success branch do not request or confirm a separate landing. This is a demonstrated limitation of the proving procedure, not proof of grounded arrival. Keep landing validation and the later consumer-owned hunt parking/landing handoff open; do not label the entire phase or end-to-end hunt gate passed.

Next focused test on the same 0.7.59.0 build: manually land, return to the saved zone/world/instance aetheryte while SRank remains disabled and Idle, run `probe run`, then `probe cancel` during Pathfinding or Following. Confirm stop, immediately run a replacement `probe run`, and observe no late stop/route replacement. Finish with `off` and return the retained export. Do not reload or clear the saved destination before this test. No new build is required for cancellation evidence. PR #25 remains unmerged/unreleased and PvP adoption remains blocked.

### Live cancellation and replacement — 2026-10-07 11:03 America/Toronto

On the same 0.7.59.0 candidate, the user reports that cancelling stopped the flight path and running again resumed travel successfully. Pasted 11:01 chat confirms “SHARED probe cancelled and follower stop confirmed”, replacement operation `b4c9c237-270c-4179-9f0d-35b647217733`, replacement arrival/export, and OFF with three shared operations in the instance. Record **PASS — user-reported** for active-flight cancellation and successful replacement without a reported late interruption. This does not independently prove a cancelled, still-pending query completed late or every cancellation race; those remain covered by isolated automated tests.

The user again reports incomplete physical landing. Combined with the prior inspected export's InFlight=true at Arrived, landing remains **OPEN — explicit landing/ground confirmation absent from the probe**. No repeated 0.7.59.0 probe is requested. Proving OFF and legacy restoration are confirmed by pasted chat. The new JSON, screenshot and text attachments could not be authorized/resolved by the attachment reader; they are not claimed inspected. The written report and pasted command output are sufficient to record this scoped live result. Full retained JSON may be pasted later for independent transition review; do not repeat the movement test merely to work around attachment access.

Next engineering gate: specify and test an explicit bounded landing handoff with cancellation, retained movement ownership, ground-state confirmation and a failure timeout before requesting new live evidence. Do not equate a destination radius with landing or add unconditional dismount to manufacture success. Keep consumer-owned SRank safe/crowd parking authoritative. The subsequent controlled hunt integration must still demonstrate actual shared movement plus existing landing/tag/kill/return policy. PR #25 remains unmerged/unreleased and PvP adoption remains blocked.

## Bounded landing candidate — 2026-10-07

Current source: Core [PR #4](https://github.com/MarshalTitan/SentinelCore/pull/4), release **0.4.1.0**; SRank [PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25), candidate **0.7.60.0** at `122db6c6a4ba5222512f1deec18b471077115c31`. This section supersedes earlier next-test instructions.

| Evidence | Classification |
|---|---|
| 0.7.59.0 readiness/mount/takeoff/query/continuous follow | PASS for inspected genuine probe; zero retries |
| 0.7.59.0 flight cancellation / immediate replacement | PASS user-reported, pasted follower-stop/replacement chat; pending-query race not claimed live-proven |
| 0.7.59.0 landing | OPEN: Arrived while InFlight=true; destination radius did not prove landing |
| Core 0.4.1 landing lifecycle | Automated PASS: 13 navigation scenario groups; stable ground success, unknown/unstable/vertically invalid ground, native rejection, fixed timeout, drift, dependency loss, cancellation/disposal/zoning, replacement and late results; default arrival/legacy adapters compatible |
| SRank 0.7.60.0 probe landing | Implemented; live physical landing and cancellation/resume pending |
| Shared actual hunt landing/tag/kill/return | Still pending after mechanics proof; two prior hunts were legacy-only |
| PvP movement baseline / shared migration | Baseline untouched; migration blocked |

[Core PR CI](https://github.com/MarshalTitan/SentinelCore/actions/runs/37642555100) passed Linux generic and Windows generic/UI build/test/package checks. [Release CI](https://github.com/MarshalTitan/SentinelCore/actions/runs/37643419684) passed all tests and public package verification. Cancellation during Landing revokes the lease even after an action submission in automated tests; no late task or retired handle may act on its replacement.

Next required live evidence is **only the new landing gate** in [NAVIGATION_FOUNDATION.md](docs/NAVIGATION_FOUNDATION.md): armed Landing cancellation followed by a distinct near-destination resume operation and physical ground confirmation. Return PASS/FAIL and the final JSON Entries establishing Cancelled then GroundConfirmed with Grounded=true/InFlight=false. Timestamp/short clip is needed only on failure. Do not repeat 0.7.59.0 movement tests or wait for an S-rank spawn. Real native action acceptance/ground-state inference remains unproven until this evidence returns.

Candidate [Build 37643748882](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37643748882) passed 29 state tests, 32 UI/history tests, landing consumer/ownership evidence tests, legacy source audits and exact published-package/bundled-DLL checks with zero build warnings/errors. [Release policy 37643748886](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37643748886) and [SentinelHunts build 37643748870](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37643748870) also passed. [Download 0.7.60.0](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37643748882/artifacts/11492119907).

## Physical landing PASS / controlled hunt candidate — 2026-10-07 11:43 America/Toronto

The user reports physical unmount/landing and confirms cancellation stopped movement and resume landed. Inspected 0.7.60.0 excerpts: ProbeCancelled for `2d7c66c4-9243-41ed-b792-a6ed043477d0` at **15:37:23.812 UTC**; distinct replacement `75ac0f50-ebca-443c-aad4-9c4cfe4c6fc5` recorded **Landing → Arrived / GroundConfirmed** at **15:37:29.918 UTC**, ready/current-zone mesh and Following=false. Classify **PASS — scoped physical landing/cancellation/replacement**, based on the human report plus inspected transition/session excerpts. PhysicalContext/Result fields and the full attachments were not readable/contained in the excerpts; do not claim independent inspection of Grounded/InFlight fields or every cancellation race. No repeat 0.7.60.0 test is required. This closes the isolated mechanics landing gate, not actual shared hunt policy integration.

Candidate **0.7.61.0**, commit `5e23d52bd750ecbef74d9b0f9ba80c879aee135e`, in [SRank PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25), extends session opt-in to ordinary **pre-tag protected flight parking** only after the existing path AND landing-ground-connectivity validation. Core receives a one-use immutable approved route; its query phase here accepts prevalidated consumer data rather than issuing a new unprotected query. Fresh entity/zone/path/clearance checks precede following; zero parking retries forbid requery outside approval. Original point selection, crowd safety, preference bookkeeping, alignment/landing revalidation and kill/reset/tag/return semantics remain consumer-owned. Planned landing handoff cancels the Core lease before legacy landing and records the correlated ParkingLandingHandoff event/last Core state. SS, unprotected fallback and post-tag retreat remain legacy. Failure stops proving/Sentinel, retains the hunt and exports; off during shared parking returns to LocateMark for safe legacy resampling.

| Check | Classification / next gate |
|---|---|
| Observed shared movement startup/following | Prior 0.7.59.0 scoped PASS retained |
| Isolated physical landing, cancellation and resumed replacement | 0.7.60.0 scoped PASS; no repeated probe |
| Approved ordinary protected parking implementation | 0.7.61.0 candidate; actual Core Following and correlated landing handoff need supervision |
| Existing hunt safe landing, tag, positive kill/return with shared route | OPEN in new candidate; accepted legacy comparison retained |
| Other cancellation races / invalid route / unsafe query fallback | Isolated automated tests; do not claim complete live coverage |
| PvP baseline / migration | Still untouched / blocked |

New consumer tests exercise eligible/ineligible scope, immutable one-use path copies, modified-path rejection, zone/cancel/ground-mode rejection, no shared requery, ownership retained during MoveToSafePoint, revoked for Landing/Tag/Locate/Aggro/Reset, correlated handoff evidence and retired handle isolation. The existing source audit restores only three exact parking hooks before hashing the accepted hunt implementation; candidate/preference/tag/landing algorithms remain unchanged. Required live return is stage PASS/FAIL plus same-ID started/handoff chat with state=Following. On failure, return the timestamp and last diagnostic transitions/short clip. See NAVIGATION_FOUNDATION.md for build and rollback.

The consumer review additionally tests confirmed-stop policy replan and unconfirmed-stop refusal: a failed stop disables Sentinel, returns a blocked handoff and retains explicit parking rollback; no replacement route is submitted. A retry of off clears that rollback marker only after stop confirmation.


Final **0.7.61.0** candidate validation at `5e23d52bd750ecbef74d9b0f9ba80c879aee135e`: [Build 37650647078](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37650647078), [SentinelHunts 37650647629](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37650647629), and [release-infrastructure checks 37650647338](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37650647338) all passed. Build reports 29/29 state and 32/32 UI/migration/history test groups, plus isolated approved-parking and landing ownership tests, source audits and exact Core dependency/package validation; compilation had zero warnings/errors. CI action runtime deprecation notices are separate from compilation. [Exact proving artifact 11495698917](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37650647078/artifacts/11495698917), outer archive SHA256 `f95353b63849fc6e99dcec9c252ed7eae1f90e1a490f475f656495bff402462c`; public plugin release/catalog remain unchanged.


Independent live-state reconciliation at **2026-10-07 16:05 UTC**: [Profiles PR #2](https://github.com/MarshalTitan/SentinelProfiles/pull/2), source `291c3e777f7839463e4ac925ea72135f3e40b71d`, published [0.2.1.3](https://github.com/MarshalTitan/SentinelProfiles/releases/tag/v0.2.1.3). Inspected UI source adds scrollable actions/editor, measured state-control reflow and a 680-logical-pixel minimum in both themes; profile/restart semantics are unchanged. Published asset metadata SHA256 `39695578453ab4ea1a345fdf541fe4e586c9b54982ec3b7f50a49e9e2c771aab` was read, not independently rehashed. Child/central manifest objects match. This is separate from navigation: its [visual/controller acceptance](https://github.com/MarshalTitan/SentinelProfiles/blob/291c3e777f7839463e4ac925ea72135f3e40b71d/docs/UI_VALIDATION.md) remains pending and is not part of the SRank proving procedure. Earlier dated 0.2.1.2 baseline reports remain historical.

The final consumer tests also refuse unconfirmed native Landing handoff without emitting a successful handoff event; the parking rollback marker remains until confirmed off. A coordinator poisoned by an unconfirmed stop cannot be revived by Begin; separate failure fixtures preserve that fail-closed behavior.

## Sentinel Hub MVP — 2026-10-16 UTC

| Validation | Evidence / classification |
|---|---|
| Pure policy/command/persistence/privacy/utility boundaries | 21 automated groups: missing/disabled/restricted/unknown discovery, aliases, verified probes, versions, exact quick-open dispatch and errors, Hub-absence status independence, configuration round-trip, typed bounded faults, export allowlist and inactive utilities |
| Native UI | 480 rendered page/state/width/theme/scale cases; minimum 480×500, wide layouts, Classic/Modern, loaded/missing/disabled/restricted/unknown/unavailable/not-ready; balanced styles, rail geometry, collapse/restore and keyboard/controller switch activation |
| Build/package | Zero compiler warnings/errors; exact Core/UI 0.4.1 hash/lock verification, installable identity/API/version and bundled-DLL equality; no consumer assemblies bundled; PowerShell syntax parsed |
| Distribution | Immutable source-linked 0.1.0.0 ZIP publicly downloaded, validated and hash-compared with CI artifact; authoritative child and exact central entry verified; eight entries present, with all seven prior objects unchanged |
| Actual game behavior | **PENDING** — public API discovery, loaded-state transitions, consumer window commands, saved placement/reload, keyboard/controller and disabling Hub while consumers keep working |
| HUD utilities / gameplay | Unchanged. No Anti-AFK, Quest Convenience, latency engine or consumer cleanup was implemented. Existing hunt/PvP proving gates are unaffected. |

Exact build/release/source evidence follows. Automated absence/dependency checks establish the architecture and status model, not live game behavior.

Shortest gate: install catalog Hub **0.1.0.0**, open `/shub`; compare inventory/dependencies; open consumer settings; resize/minimize/restore/switch theme and reload; run `/shub export` and check sanitized content; disable Hub and confirm existing Sentinel plugins continue normally. [Full exact checklist and rollback](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/ACCEPTANCE.md). Return PASS/FAIL with step/symptom; screenshots/log evidence only for failures. No hunt or Frontline run is requested for this control-center gate.

Publication evidence: [Hub source `ac1e7411788b`](https://github.com/MarshalTitan/SentinelHub/commit/ac1e7411788ba89b973073576d421a9c2a024127), [PR #1](https://github.com/MarshalTitan/SentinelHub/pull/1), [PR validation](https://github.com/MarshalTitan/SentinelHub/actions/runs/38846223646), [release/distribution run](https://github.com/MarshalTitan/SentinelHub/actions/runs/38846452080), [public release](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.1.0.0). ZIP SHA256: `7ee080adf3cec91e92f4b106aa0720ddf925a023ddb1a258da74a177ed0c0690` (public release metadata and workflow public-download comparison). [Central PR #20](https://github.com/MarshalTitan/Sentinel/pull/20) merged as `6bf497a8b45567386d06bb415a75ec767980d5e0`. Independent public raw child/central readback at 2026-10-16 03:44 UTC confirmed exact Hub 0.1.0.0 equality, eight total entries and all seven prior objects unchanged. [Post-merge central CI 38846833272](https://github.com/MarshalTitan/Sentinel/actions/runs/38846833272) passed generator/assets and Linux/Windows distribution checks.

Source-independence audit: Core and all six existing plugin heads were unchanged throughout this task; no consumer or navigation PR was modified. Source inspection confirmed SRank PR #25 remains open at `5e23d52bd750ecbef74d9b0f9ba80c879aee135e`. Their prior game gates are unaffected.

## Anti-AFK migration proving — 2026-10-16 UTC

| Evidence | Classification |
|---|---|
| Hub visual acceptance | User: “It looks good”; migration authorized. No blanket pass of all MVP checklist steps |
| Icon | Public 0.1 ZIP audit: installed manifest missing IconUrl; public PNG valid. New package requires IconUrl/RepoUrl |
| Hub policy/ownership | 27 automated groups pass, including default-OFF upgrades, legacy/unknown/login/ack gates, no writes off, rate/finite thresholds, bounded faults, explicit preference, token exclusion and actual pinned HUD lease simulation |
| Hub UI/package | 480 existing native cases + 42 Anti-AFK state/theme/scale cases; package/Core/icon validation and zero compiler warnings/errors |
| HUD compatibility | 51 Core groups, 11 pinned UI groups, 7 native UI groups; zero warnings/errors; existing engine/preference/schema retained |
| Native/IPC acceptance | PENDING: actual timer behavior, startup callback order, lease handoff, off/unload/reload, logout/login and return to retained HUD preference |
| HUD cleanup/Quest Convenience | Not implemented; unrelated prompts, accepted submarine handling, rewards, camera and visual modules untouched |

Exact test: update Hub 0.2.0.0 + HUD 0.8.4.6; confirm default Off and icon; enable/import and check Hub Active/HUD Managed; turn Hub off and reload each plugin, verifying one owner/retained HUD preference; logout/login; test idle longer than the configured automatic-away interval with Hub On, then both preferences Off for the same interval. The check counter alone is not proof. Run sanitized export if needed. [Full procedure/rollback](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/ANTI_AFK_MIGRATION.md).

Source/tests: [Hub PR #2](https://github.com/MarshalTitan/SentinelHub/pull/2), [Hub cloud validation](https://github.com/MarshalTitan/SentinelHub/actions/runs/38850172799), [HUD PR #5](https://github.com/MarshalTitan/SentinelHUD/pull/5), [HUD compatibility tests](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38849521851). Both public packages validated; source/hash evidence follows.

Publication evidence: Hub source `884fa0d7512111d61128cfd1b8378d8fcbbc8166`, [0.2.0.0 release](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.2.0.0), [cloud release run](https://github.com/MarshalTitan/SentinelHub/actions/runs/38850365423); public ZIP SHA256 `03cf0905bafc58e9c4a99554648aea105007864787da3a0374dd65011f80bb35`. HUD source `8be0102d9d438407eb3ca9ce30fd6817589074e4`, [0.8.4.6 release](https://github.com/MarshalTitan/SentinelHUD/releases/tag/v0.8.4.6), [release run](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38850004862); public ZIP SHA256 `016becfc8824355421fedeb15d963bc4acefe55991b70ed473f296880482c8fa`. Both public package validation steps passed before child promotion. Exact public central readback is required before reporting task completion.


Independent public raw readback at **2026-10-16 04:32 UTC** confirmed exact authoritative child/central objects for Hub **0.2.0.0** and HUD **0.8.4.6**, eight total entries and all six unrelated objects unchanged. [Central PR #23](https://github.com/MarshalTitan/Sentinel/pull/23) passed generator/public-assets and Linux/Windows checks and merged as `afa082021a8a19be178d3650e6362ec71f4e4dee`. [Strict post-merge validation](https://github.com/MarshalTitan/Sentinel/actions/runs/38851108841) verifies every identity without candidate deferral. In-game Anti-AFK acceptance remains pending.

## Anti-AFK PASS and Quest Convenience proving — 2026-10-16 UTC

The user replied PASS at **2026-10-16 00:46 America/Toronto** to the latest four-step Anti-AFK checklist: Hub Active/HUD Managed, module OFF returns the retained HUD setting, Hub reload restores ownership, and idle beyond the configured automatic-away interval. The instruction referenced Hub **0.2.0.0** / HUD **0.8.4.6**; versions were not independently restated or inspected in the PASS reply. This closes that scoped supervised gate. It does not certify unreported original checklist cases, independent native instrumentation, all logout/dual-plugin reload races or all future builds. Anti-AFK source/settings are unchanged by Quest migration.

| Validation | Evidence / classification |
|---|---|
| Hub Quest policies/lifecycle | Initial [38852926583](https://github.com/MarshalTitan/SentinelHub/actions/runs/38852926583), source 39318a4bf3c8c3adb0e36612ceb22aacf36b974b: **35 groups PASS**, retaining Anti-AFK/inventory/privacy coverage and adding default-OFF upgrade/import, supported-HUD/login/acknowledgment, pending-work revocation, fault backoff, actual pinned HUD wire/independent-lease simulation, prompt ID/deadline and reward modes/fallbacks |
| Hub native rendering | **810 cases PASS**: 480 existing page cases + 42 Anti-AFK + 288 Quest state/import/reward-mode/theme/scale; existing keyboard/controller/collapse/restore checks retained |
| Native/policy preservation | Complete source equality with accepted HUD 758068f68a76d72660fb6e2740f22d592130fdd7 PASS, namespace/config adaptation only; no new gameplay algorithm. Zero compiler warnings/errors; scripts, exact Core/UI 0.4.1 and package identity/icon/bundled bytes PASS |
| HUD bridge | [PR #6](https://github.com/MarshalTitan/SentinelHUD/pull/6), bcc21e44c83fac60c14b1318eddc0a58d7ab4bf9, build/tests [38852669218](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38852669218), infrastructure [38852669157](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38852669157) PASS; native service only gains owner/suspend wrapper, original preferences/schema retained |
| Quest native behavior | **PENDING**: real dialogue/choice/unrelated prompt, dedicated skip including submarine when available, Manual plus one named automatic reward mode, ownership/off/reload/logout and retained fallback |
| Other features | Anti-AFK source/settings unchanged; no HUD engine removal, camera/visual/latency/navigation changes |

[Exact build/settings/procedure/rollback](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/QUEST_CONVENIENCE_MIGRATION.md): update Hub 0.3.0.0 + HUD 0.8.4.7; /shub → Utilities → Quest Convenience; verify default OFF and independent saved Anti-AFK. Configure/import and enable; expect Hub Active/HUD Managed. Test ordinary text advances while choices/Yes-No remain manual, a skippable scene and submarine when available, Manual reward then one desired automatic mode, and off/dual-plugin reload/logout. Export must exclude quest/reward text/settings/token. Return PASS/FAIL with reward mode and untested cases; failures need step/time/symptom. Disable Quest in Hub to restore HUD. Do not claim untested modes or every old MVP scenario passed.

HUD PR logs confirm **52/52 Core**, **11/11 pinned Core UI** and **7/7 native UI** groups PASS with zero compiler warnings/errors. Final Hub PR [38853135394](https://github.com/MarshalTitan/SentinelHub/actions/runs/38853135394) passed at `279e5d1a9e5c1762b1a1b5d7a3c5456d598b06b4`; source after merge is `ae8f4a9be9d6d3adbe867970136075ff90f72505`. Supervised native Quest evidence remains pending, regardless of publication.

Publication evidence: [Hub PR #4](https://github.com/MarshalTitan/SentinelHub/pull/4), [source ae8f4a9be9d6](https://github.com/MarshalTitan/SentinelHub/commit/ae8f4a9be9d6d3adbe867970136075ff90f72505), [main/release 38853259121](https://github.com/MarshalTitan/SentinelHub/actions/runs/38853259121), [0.3.0.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.3.0.0); public ZIP SHA256 `823d55b2a0ce68b7082b4eb0454bff0cbe9dd49a8cf629e0ca6f6233e40af85f`. HUD [source f4f135f94895](https://github.com/MarshalTitan/SentinelHUD/commit/f4f135f94895615cfbbdfdf04a3e71936d2205e1), [release 38852990176](https://github.com/MarshalTitan/SentinelHUD/actions/runs/38852990176), [0.8.4.7](https://github.com/MarshalTitan/SentinelHUD/releases/tag/v0.8.4.7), public ZIP SHA256 `a43a27fd5f46a3224d0d1100654dc9ab597c7f6eff94653e3e815c661c20779b`. Both public ZIP-validation steps passed before child promotion; Hub additionally hash-compared its public ZIP with the validated artifact. Exact public central equality and post-merge distribution checks are required before reporting availability complete.

## Quest replacement PASS and separate cleanup — 2026-10-16 UTC

The user replied **PASS** at **2026-10-16 01:08 America/Toronto** to the latest Quest Convenience checklist: ordinary dialogue/manual choices, cutscene skipping, manual and chosen automatic rewards, and off/reload ownership behavior. The instruction identified **Hub 0.3.0.0 / HUD 0.8.4.7**; versions were not independently restated. Reward mode was not named and submarine was not separately confirmed. This closes that scoped replacement gate; it does not certify all modes, all original checklist cases, logout/dual-reload races or unreported scenarios. Accepted Hub native code and saved settings are unchanged by cleanup.

**Hub 0.3.1.0 / HUD 0.8.5.1** form the separate utility cleanup stage. HUD removes the Anti-AFK and Quest native services, framework call sites and action controls; its Convenience page shows retained preferences for explicit import. Schema 12, original preference values and v1 IPC import/claim/release contracts remain. Claims validate compatible requesting Hub and bounded tokens but have no native action callback. Hub changes only ownership guidance, metadata and compatibility tests; accepted engine/controller/configuration code and Core/UI pins (Hub 0.4.1, HUD 0.3.1) are unchanged. Camera/visual modules and six unrelated catalog identities remain unchanged.

**Cleanup in-game acceptance is pending.** [Exact procedure and rollback](https://github.com/MarshalTitan/SentinelHUD/blob/main/docs/UTILITY_CLEANUP.md): confirm versions/settings and HUD's migration notice; with Hub utilities enabled prove ordinary text/manual choice; turn utilities OFF and verify manual dialogue/no increasing Hub check counter after 35 seconds; disable Hub while HUD/camera continue working, then re-enable/restore options and reload HUD once. With HUD 0.8.5.0, disabling Hub leaves utility actions OFF instead of resuming old HUD engines. Rollback: turn Hub utilities OFF before restoring HUD 0.8.4.7 and review its retained old preferences. Do not repeat the prior full idle/cutscene/reward checklist for this structural cleanup.

A successful build/package/catalog is not native acceptance of this new ownership boundary.

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

## Remote SRank controls candidate — 2026-10-17 UTC

Implemented **SRank 0.7.62.0 / Relay 0.5.0.6** are not published or accepted in-game.
Public comparison/rollback is SRank **0.7.56.0** / Relay **0.5.0.5**.
See [SRank #28](https://github.com/MarshalTitan/SRankSentinel/pull/28) and
[Relay #11](https://github.com/MarshalTitan/SentinelRelay/pull/11).

| Automated scope | Coverage |
|---|---|
| SRank contract | Read-only status, private binding omission, fixed shared-delegate dispatch, character/thread/readiness/enabled/recovery/current-hunt guards, unsupported/disposed provider and sanitized failure |
| UI/IPC parity | Exact original skip/reset bodies shared by UI/IPC; existing hunt source hash and travel/field-recovery audits retained |
| Relay parsing/authorization | Four exact messages; no arbitrary/raw/multiline/parameter passthrough; default-OFF independent permission; wrong user/channel/character, paused, bot/webhook, stale/future/invalid IDs rejected |
| Reset/replay | Request without action, 30s one-shot confirmation, expiry based on Discord request time, cross-binding refusal, clear/reload/permission/reader-generation revocation, consumed high-water and persisted checkpoint |
| Results/privacy | Version/schema validation, missing/malformed/oversized/incompatible provider, null hunt, unknown-reason sanitation, no timestamp/mentions; action never retries after response failure |
| Regression/package | Existing Relay chat/reward/screenshot/config tests, SRank state/native UI/source tests, Core pins and installable ZIP validation |

**Supervised gate OPEN; no native recovery or Discord access claimed tested.** Use the exact
paired artifacts pinned below; unload old candidates, extract inner latest.zip into the
separate dev directories, keep public/other-dev copies disabled and confirm versions.
In Wrothy's Relay profile retain its existing webhook/bot/channel/user, enable **Allow
SRankSentinel remote controls** under Replies & Controls and save; chat replies need not
be enabled. Wait for reader Connected.

1. Ordinary text `/srank status` in #relay-wrothy: version/enabled/state/status/hunt/queue
   agree with SRank UI. Missing/old provider returns unavailable, not invented status.
2. In a safe active hunt with SRank enabled, `/srank skip`: exact manual skip behavior
   through Ul'dah, remaining queue preserved.
3. In a safe situation, `/srank reset`: no game action; `/srank reset confirm` within
   30s: exact manual reset (queue cleared, normal enabled state retained). A second/late
   confirmation does nothing.
4. Elektra permission remains OFF; Wrothy channel cannot operate her client. Turn Wrothy
   permission OFF/save: no private status or recovery. Test Elektra separately later.

Return PASS/FAIL for status, skip/queue, reset/confirmation, isolation and permission OFF.
Only failures need timestamp, versions, concise response and sanitized RemoteControl log
lines; never send credentials/config. Screenshot is optional and independent.
Rollback: permission OFF/save, unload both dev copies, re-enable public SRank 0.7.56.0 /
Relay 0.5.0.5. No config deletion. Full
[procedure](https://github.com/MarshalTitan/SentinelRelay/blob/feature/srank-remote-controls/docs/SRANK_REMOTE_CONTROLS.md).
Keep both PRs draft/unreleased and navigation/PvP gates separate until required evidence.

### Exact candidate source, CI and downloads

- **SRank 0.7.62.0** source `92975ab0977ccd108e5c1f04cfa377d807d7a2cc`;
  [Build 38997500072](https://github.com/MarshalTitan/SRankSentinel/actions/runs/38997500072)
  PASS: 7/7 isolated recovery tests, 35/35 state tests, 35/35 native UI/migration/history,
  original hunt hash/travel/field-recovery audits, fixed UI/IPC equivalence, exact
  Core 0.3.1 package and bundled-library validation; zero compilation warnings/errors.
  [Policy 38997500035](https://github.com/MarshalTitan/SRankSentinel/actions/runs/38997500035) PASS.
  [Exact download](https://github.com/MarshalTitan/SRankSentinel/actions/runs/38997500072/artifacts/12088100327);
  outer ZIP SHA256 `65fc090117c0c0175db2e2fc95d4d65786d50b842fe6a61d64345e5c0bf5362c`.
- **Relay 0.5.0.6** source `da6b6ee6304c39cba46a1c73bb9d8081d4f7e922`;
  [Build 38997402332](https://github.com/MarshalTitan/SentinelRelay/actions/runs/38997402332)
  PASS: 57/57 existing tests plus 11/11 remote groups, product/package/Core 0.3.1
  validation; zero compilation warnings/errors.
  [Policy 38997402343](https://github.com/MarshalTitan/SentinelRelay/actions/runs/38997402343) PASS.
  [Exact download](https://github.com/MarshalTitan/SentinelRelay/actions/runs/38997402332/artifacts/12088200115);
  outer ZIP SHA256 `52fd38a44ea9c775a4b5160d6e568acb2563e53cae2af1b647675ea5710b56b7`.

The initial SRank runs exposed audit-file relocation and a line-ending matcher error
after extraction; both were corrected without relaxing source hash or original
recovery checks. The final artifacts above supersede those failed heads.
No build is proof of native in-game recovery or private Discord access. Final branch
diffs contain 13 SRank and 14 Relay files; no hunt algorithms, Core pins, stable
manifests or navigation proving branch are edited.

[SentinelHunts sibling build 38997500080](https://github.com/MarshalTitan/SRankSentinel/actions/runs/38997500080) also passed at the exact final SRank head. Its source, release and catalog entry remain unchanged.

## Remote controls normal-updater gate — 2026-10-17 UTC

The user requested live versions rather than dev installs. This supersedes the preceding
dev-only publication hold/install procedure for **SRank 0.7.62.0 / Relay 0.5.0.6**.
It supplies **no additional native PASS evidence**. The same source guards/default OFF
and functional gate apply; existing navigation/PvP tests remain separate.

1. Update both plugins through the normal Sentinel repository in Dalamud, keep all dev
   copies disabled, and confirm SRank 0.7.62.0 / Relay 0.5.0.6.
2. For Wrothy only, `/srelay` → Replies & Controls (Classic: Discord Replies) →
   **Allow SRankSentinel remote controls**, then **Save Reply Permissions**.
   Keep the existing webhook/bot/channel/user binding; wait for reader Connected.
3. Ordinary Discord text in #relay-wrothy: `/srank status` must agree with UI.
   With a safe enabled active hunt, `/srank skip` must preserve queued hunts and
   perform the exact manual recovery.
4. `/srank reset` must do nothing until `/srank reset confirm` within 30 seconds.
   Expect exact manual reset/queue clearing; second/expired confirmations do nothing.
   Elektra's permission remains OFF; Wrothy requests cannot operate her client.
5. Permission OFF/save must stop remote state/results/actions. Return stage PASS/FAIL;
   failures only need timestamp, versions and sanitized response/RemoteControl log lines.

Immediate rollback: permission OFF/save. For a binary rollback, unload the new versions
and use preserved prior SRank 0.7.56.0 / Relay 0.5.0.5 releases. Do not delete config.

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

### Relay 0.5.0.7 automated and native scope

Existing Relay core/security/replay/reset tests remain required. Added isolated formatter
coverage verifies non-English names plus IDs, null/empty/whitespace numeric fallback,
sanitized mention text and bounded labels without changing the IPC result.
Product build and exact Core 0.3.1/package checks verify the Dalamud data adapter.
Native localized name lookup remains unconfirmed until the one-message observation above.
No full hunt/reset/skip retest is required for this presentation-only patch.

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

### Automated scope and limits

- HUD: 53/53 Core, 11/11 pinned Core UI, 7/7 native minimize/restore groups and package tests.
  Only UI/navigation/text, version and build/release metadata change; utility engines and
  compatibility protocols are unchanged. The initial stale expected-version failure was
  corrected by reading the project version, not relaxing validation.
- Hub: 50 policy groups; native UI includes 672 page/state/width/theme/scale, 198 latency,
  288 Quest and 42 Anti-AFK cases, plus exact native-source/fixture and package validation.
- Profiles: 18 core tests, including last-applied versus selected, drift/partial failure,
  applying/none, restart without reapply, deletion, bounded names and default-OFF/serialization.
  Full plugin/package build validates public DTR API usage; actual native bar visibility,
  interaction, logout and unload/reload remain subject to the focused observation above.

The existing functional acceptance evidence remains scoped. This UI cleanup does not
close unrelated HUD choice/reward cases, latency conflict cases, profile restart behavior
or the shared-navigation actual-hunt proving gate.

### Release/source evidence

| Component | Reviewed PR / CI | Merge/release source | Publication run |
|---|---|---|---|
| HUD 0.8.5.2 | [#9](https://github.com/MarshalTitan/SentinelHUD/pull/9), [39002232807](https://github.com/MarshalTitan/SentinelHUD/actions/runs/39002232807) | `d8cf780f9617ed31604958b7881c9dc6d87b7fd1` | [39002351508](https://github.com/MarshalTitan/SentinelHUD/actions/runs/39002351508) |
| Hub 0.4.0.1 | [#11](https://github.com/MarshalTitan/SentinelHub/pull/11), [39002076076](https://github.com/MarshalTitan/SentinelHub/actions/runs/39002076076) | `c721cd218b1b599a6b16264a996465d2c8c49d83` | [39002185524](https://github.com/MarshalTitan/SentinelHub/actions/runs/39002185524) |
| Profiles 0.2.1.7 | [#8](https://github.com/MarshalTitan/SentinelProfiles/pull/8), [39002152017](https://github.com/MarshalTitan/SentinelProfiles/actions/runs/39002152017) | `5f6f2f6fce5cb41bd9ec67cb5e616fcfa52da92b` | [39002258261](https://github.com/MarshalTitan/SentinelProfiles/actions/runs/39002258261) |

All reviewed product builds completed with zero warnings/errors and required package checks.
Publication repeats required suites and public ZIP validation. GitHub release metadata
SHA256 (read, not independently recomputed by the architect):

- HUD SentinelHUD.zip: `053d82d7d32d0d79fd6be19b1695fce64d9c4ea6ff21891637a2585bbc5ae522`
- Hub SentinelHub.zip: `2679b328886347838a599fcfa5532adc7cc46cedb0554f2afee490b3827befb2`
- Profiles SentinelProfiles.zip: `508d16b4ec7e70000739849fc95bafb0a3524e749899dd3fff67de64eb3a297b`

Exact public child/central objects match all three versions at central source
`71b5db9da10eaaaa4c03c3d1561b94a4650a6e34`; eight entries remain, with all five
unrelated entries unchanged, including SentinelHunts. This proves delivery, not native
server-info visibility or a new all-utilities gameplay PASS.

## Mount Collection — 2026-10-17 UTC

**Published Hub 0.5.0.0; native acceptance PENDING.** [Hub #12](https://github.com/MarshalTitan/SentinelHub/pull/12), tested head `0f2e0a225cdce0b678f13ee44062a4b3e4667e23`, [final PR CI 39004931436](https://github.com/MarshalTitan/SentinelHub/actions/runs/39004931436) PASS; exact-tree release source `3c2a5a50dd3bc937bb45ffc648a676eb825f2140`. Release [39005065871](https://github.com/MarshalTitan/SentinelHub/actions/runs/39005065871) repeats the suites/package/public-byte checks.

**67 policy groups** = 50 prior + 17 Mount Collection groups: enum/default-Off context compatibility; candidate/item-action eligibility; tri-state filters; localized/English/item/source search; stable sorting; completion denominators; exact/missing/ambiguous track resolution; six original factual definitions/provenance; simple exchange modes/alias/collectability bounds; main-bag split stacks and partial/invalid/symbolic containers; own-character invalidation; stale/disabled/disposed context tickets. **1,364 native UI cases** = 756 page/state/width/theme/scale + 42 Anti-AFK + 288 Quest + 198 latency + 80 populated mount browser/details/character/loading cases. Existing keyboard/controller, minimize/restore, stack/scroll/no-settings-mutation and exact accepted Quest-source checks passed. Product compile: zero warnings/errors.

The database comes from local game sheets; expansion mapping is a limited Sentinel-owned layer (47 authored track member/reward keys). Unknown sources/expansion/current obtainability remain unknown, market eligibility is not a listing, and BGM sharing is only among included mounts. No WhichMount code/data/resource import; no target-info hook/tooltip modification. [Audit/provenance](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/MOUNT_COLLECTION_METADATA.md).

Shortest [in-game gate](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/MOUNT_COLLECTION.md):
1. Search known owned/missing mounts; compare ownership/overall denominator with Mount Guide and try filters/sort. Observe logout/character switching if convenient; report untested.
2. Check narrow-window details and expand a track; verify known seats/actions/BGM. Mapped-only expansion counts/Unknown are expected.
3. If carrying a displayed trial totem, compare four-main-bag quantity and vendor cost; move a stack and refresh to rule out duplicate counts. Otherwise mark untested.
4. Enable player context lookup, open a nearby mounted player's mount; check unmounted/Off and reload Hub once. Expect correct details, no duplicate entry/crash or utility regression.

Return PASS/FAIL, version/theme, bad mount/item ID and untested steps. No native result is fabricated by CI/publication. Rollback: context lookup OFF, disable Hub or prior immutable 0.4.0.1; retain config. Existing utility/hunt/PvP/navigation gates keep their earlier scope.

## Mount acquisition enrichment — Hub 0.5.1.0, 2026-10-17 UTC

**Reported defect, not a mount PASS:** the user showed Chrysomallos (#317), Chrysomallos Horn (#39484), displaying Unknown acquisition while Edelina's shop offered it for 50,000,000 gil. The fix adds the missing local gil-shop path and an original official vendor/location record, plus broader acquisition/patch coverage.

[Hub #13](https://github.com/MarshalTitan/SentinelHub/pull/13), tested head `7851d24e282b3338d1a278871fcc55a457900c61`, [PR validation 39006872306](https://github.com/MarshalTitan/SentinelHub/actions/runs/39006872306) PASS: **75 policy groups, 1364 native UI cases and installable ZIP validation**. Release source `34ca50bebeed0c2367b2c79929505f33f8ec3a27` has the exact tested tree `eaa07764eb834c25a94784a16676d7c5467adfba`. [Hub v0.5.1.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.5.1.0), [normal release workflow 39006972086](https://github.com/MarshalTitan/SentinelHub/actions/runs/39006972086).

Eight new policy groups validate all 356 embedded acquisition records and 45 official store mappings, identity drift rejection, patch/expansion mapping including 3.55a/b, store versus collector/promotion/event categories, source URL guards, Chrysomallos/Edelina/50-million-gil regression, unresolved/HQ price behavior, safe exchange cost labels and source search/filtering without availability inference. The existing 80 mount UI cases now render long community/vendor/cost text, source-page controls and snapshot/mismatch labels across themes/widths/scales; the total remains 1364. No utility/native source or Core change is hidden in this update.

**Supervised acceptance PENDING.** Update normally and:
1. Search Chrysomallos; compare Edelina, Mor Dhona (X:22.1, Y:4.8), 50,000,000 gil with the shop's horn, without purchasing. Both source details and local gil-shop evidence should appear.
2. Inspect one known trial mount's duty/exchange source. Filter Online Store and open Sleipnir's official product page. Collector/promotion rewards must retain their separate category; a seasonal mount must retain its event/date text without an active-event claim.
3. Read snapshot/local coverage and expansion counts, compare owned/missing state with Mount Guide, then perform any untested main-bag token/context/reload checks in [Hub's checklist](https://github.com/MarshalTitan/SentinelHub/blob/main/docs/MOUNT_COLLECTION.md). No duplicate menu entry or utility regression.

Source records may be stale or conditional; current availability remains Not checked. CI does not prove vendor accessibility, current regional store stock, exact live Mount Guide denominator, native inventory layout or context behavior. Keep prior independent acceptance gates open at their recorded scope.

## Fashion Accessories and shared player identification — Hub 0.6.0.0, 2026-10-18 UTC

The user described the already implemented Mounts module as successful; no new combined-flow result has been reported. **Fashion and the new shared context flow are native-acceptance PENDING.**

[Hub #14](https://github.com/MarshalTitan/SentinelHub/pull/14), tested head `a5a26e86ec278c8d89c9d07e2fe7beb631dc7213`, [PR CI 39140216877](https://github.com/MarshalTitan/SentinelHub/actions/runs/39140216877) PASS: **87 policy groups, 1648 native UI cases, typed reader fixtures against FFXIVClientStructs 7.57.0.9386 and installable package validation**. Exact-tree release source `6dd61dc9926edd5e1205426ba94d67715085d87e` / tree `72610af673a9f126b0f2cbd70f545d8b1b95ce27`. [Hub v0.6.0.0](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.6.0.0), [normal release workflow 39140412825](https://github.com/MarshalTitan/SentinelHub/actions/runs/39140412825).

Twelve new policy groups cover all 52 independently audited current IDs; invalid/duplicate/retired rows; action-20086 item links and market/trade unknowns; own unlock/missing-key/session/failure behavior; source identity/event/store/unknown data; dated official availability expiry; search/sort; market/category/cash/expansion filters; active/none/unknown/unloaded/transformed resolution; bounded numeric tickets, queue replacement/clear and option/identity/session/territory/age/disposal rejection; and Mount-only versus Fashion-enabled menu-offer rules.

The actual typed field reader is tested using owned native fixture memory, including active ID versus saved auto-umbrella, transformation/loading state, wrong-thread rejection before dereference and entity mismatch. Current fixture binding is **7.57.0.9386**. UI totals: 840 generic cases across ten pages, 42 Anti-AFK, 288 Quest, 198 Latency, 80 Mount, 80 Fashion and 120 shared identification results = **1648**, plus keyboard/controller appearance and collapse/restore/stack checks. New UI tests retain the existing narrow minimum and default/saved opt-ins. No utility algorithm, Mount data/token code or Core pin changed.

Supervised checklist:
1. Enable Fashion identification, right-click another player with an active accessory, select Sentinel Hub: Identify player. Verify correct name/icon/ID; try a parasol and wings/pack if available.
2. Compare your own unlocked/locked state with Fashion Accessories in-game. Inspect a familiar acquisition source/category, patch/expansion and unlock-item/market eligibility. Unknown is acceptable only where evidence is not verified.
3. Identify again after the player removes it. Expect None active and no old accessory detail presented as current. Stale/loading/transformed actors should be unavailable.
4. Keep Mount lookup enabled and identify a mounted player. Correct Mount information should still open, with only one Hub action when both options are enabled. Reload once; no duplicate entry or effect on other utilities.
5. Expand filters and inspect details at minimum width in your theme. Controls remain reachable; minimize/restore keeps the layout.

Return PASS/FAIL, Hub version/theme, accessory IDs/types and untested cases. These checks establish actual game recognition; policy/fixture/publication results cannot substitute for them. No equip/use/exchange action is available in Hub.
