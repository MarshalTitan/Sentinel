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
