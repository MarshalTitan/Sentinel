# Phase 3 — shared navigation and diagnostics evidence

Verified 2026-10-07 UTC. Engineering foundations are complete enough for a controlled SRank proving run. **Live validation is the next gate; broader adoption is not approved.**

## Changes and publication

| Repository | Change | State |
|---|---|---|
| SentinelCore | [PR #2](https://github.com/MarshalTitan/SentinelCore/pull/2); merge `67e52f5d4afb080042f9e526a6afae7480b01ff0` | Published [0.4.0.0](https://github.com/MarshalTitan/SentinelCore/releases/tag/v0.4.0.0), NuGet 0.4.0 |
| SentinelCore landing | [PR #4](https://github.com/MarshalTitan/SentinelCore/pull/4); merge `e6527400680cddc39803321792b7c3b02fb0501d` | Published [0.4.1.0](https://github.com/MarshalTitan/SentinelCore/releases/tag/v0.4.1.0), NuGet 0.4.1; bounded opt-in landing, compatible defaults |
| SentinelCore CI | [PR #3](https://github.com/MarshalTitan/SentinelCore/pull/3) | Merged after Linux/Windows CI passed; batched native command errors now fail immediately, with no release/version change |
| SRankSentinel | [PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25); candidate `a2ded6f2109cfed726de24c9d730a0d13957d7bd` | Unmerged 0.7.61.0 CI-only proving build; default legacy, session opt-in |
| Sentinel | This canonical reconciliation | Documents only; no catalog mutation |
| PvP/HUD/Classy/Profiles/Relay/Hunts | No Phase 3 source or package changes | Existing releases preserved |

[Core contract](https://github.com/MarshalTitan/SentinelCore/blob/67e52f5d4afb080042f9e526a6afae7480b01ff0/docs/NAVIGATION.md) records the source comparison, public reference provenance, common mechanics and integration limitations. Existing Core APIs and UI source are unchanged. No AGPL implementation was copied: XeldarAlz public READMEs/licenses were used only for capability/architecture context.

## Test evidence

- [Core final PR build](https://github.com/MarshalTitan/SentinelCore/actions/runs/37569570801): Linux generic tests and Windows generic/UI build/tests/package checks passed.
- [Core release](https://github.com/MarshalTitan/SentinelCore/actions/runs/37569682234): 9/9 generic groups (including 9 navigation scenario groups), 11/11 UI groups; build had zero warnings/errors. Published then downloaded/verified all three libraries.
- [SRank build](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37569981786): 29/29 state tests, 32/32 UI/migration/history tests, consumer proving-hook tests, existing source audits and exact package validation passed; zero warnings/errors.
- SRank workflow-policy and read-only public-distribution checks passed for SRank and Hunts; the sibling Hunts build passed. Tests preserve the accepted legacy source hash after removing only the exact reviewed proving/history insertions.
- Core tests exercise ownership replacement, retired handles, cancellation/disposal, late faults/results, zone epochs/build readiness, drift/endpoints, bounded timeouts/retries, waypoint stalls, mount/flight transitions, landing projection, sanitized export/capacity and stop/thread failures.

## Core public package integrity

Release source: `67e52f5d4afb080042f9e526a6afae7480b01ff0`. The release includes package-hashes.json with SHA256 and SHA512.

| Package | SHA256 |
|---|---|
| MarshalTitan.SentinelCore.0.4.0.nupkg | `54f1db25163447d5bcd9b2e5653df7ba9913a65391f196055983c4e5fefeb1a9` |
| MarshalTitan.SentinelCore.Dalamud.0.4.0.nupkg | `39ab067f34a2316ca3b47ec41584d4c5ac4aca3dfe9945eeefc5ea77776bc61a` |
| MarshalTitan.SentinelCore.UI.0.4.0.nupkg | `a9b502c695632c6585bb08ed0bee9bbd075f0be99873ca4db1653b33cb52471c` |

Core release infrastructure now accepts a reviewed main version change or matching tag, tests before publication, refuses asset replacement and verifies public hashes. No catalog entry is created.

## Current supervised ordinary-hunt test and rollback

The 0.7.60.0 physical landing/cancellation/resume gate passed by human report and inspected transition excerpt. **No repeated probe is required.** This current section supersedes dated test requests below.

Use **SRankSentinel 0.7.61.0**, bundled unchanged published **Core 0.4.1**. [Download the exact successful PR #25 Build artifact](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37649251491/artifacts/11496436059) from source `a2ded6f2109cfed726de24c9d730a0d13957d7bd`; its outer ZIP contains latest.zip. Extract latest.zip into the separate dev-plugin directory while the previous candidate is unloaded, replace it and load SRankSentinel.dll. Confirm 0.7.61.0. Keep the public copy disabled and other movement automation stopped.

1. Idle with no hunt/movement, run `/sranknavtest on`. Keep existing parking/tag settings, enable main Sentinel, and choose one ordinary live report needing zoning/flight, preferably with the mark still near full HP. Avoid SS for this gate.
2. Observe zone load → ready mesh → mount/takeoff → continuous flight. Require **SHARED protected parking started** and same-ID **SHARED protected parking handoff ... state=Following**. Existing safe landing must physically unmount/land, then tag once at the configured threshold, retain normal retreat, observe positive kill/reward wait and return to Ul'dah.
3. Once Idle run `/sranknavtest off`. Return PASS/FAIL for travel, landing, tag and return plus those two short shared chat lines. Failure only: timestamp, last diagnostic transitions and a short clip/description.

A created operation that never reaches Following does not satisfy the gate. If no shared eligible route starts, send chat/status/final domain states; do not alter safe settings or repeat spawns blindly. No second STOP hunt or UI retest is required: accepted mechanics and new isolated priority/ownership tests cover those stages within their stated limits.

Failure disables proving/Sentinel and retains the hunt. Export then off; explicitly enable legacy only after confirmed stop. Off during parking returns to LocateMark for protected resampling. If stop is unconfirmed, keep automation disabled, stop vnavmesh and retry off. Full rollback: unload candidate and re-enable public **0.7.54.0**; never run both copies. Config/positions/layouts are unchanged. Full [candidate procedure](https://github.com/MarshalTitan/SRankSentinel/blob/a2ded6f2109cfed726de24c9d730a0d13957d7bd/docs/NAVIGATION_PROVING.md).

## Limits and remaining gates

- vnavmesh has no public mesh-territory identity API. Stable readiness after an observed zone epoch is an inference; zoning proof is mandatory.
- Ownership is local to this consumer/backend, not an inter-plugin movement lock.
- Core 0.4.1 opt-in bounded Landing has a scoped 0.7.60.0 physical probe PASS. Ordinary-hunt crowd-aware parking/landing and facing remain unchanged consumer policy; its 0.7.61.0 shared-route integration is the next live gate.
- Normal SRank scan-range/visible-entity handoff, tag/kill/return and cancellation/rollback require real FFXIV evidence. SS, death and exceptional recovery were not newly tested.
- PvP has neither a baseline live result nor a shared migration. Its adoption stays blocked until supervised SRank proof, then its own baseline/design/testing.
- Profiles/UI/history resizing, HUD unrelated-choice proof, Hub and Trains are outside this phase.

## Catalog verification

All seven public central objects exactly matched their authoritative child objects after this work: SRank 0.7.54.0, Hunts 0.1.1.0, PvP 0.3.1.23, HUD 0.8.4.5, Classy 0.8.6.0, Profiles 0.2.1.2 and Relay 0.5.0.5. No plugin release or catalog promotion occurred. The SRank PR is deliberately unmerged because its version change would trigger publication.

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

## Current landing implementation and publication — 2026-10-07

The 0.7.59.0 observed movement/cancellation/replacement passes are retained; landing remains OPEN until the new candidate's physical evidence returns. Core 0.4.1 retains the operation after follower stop, invalidates its query, bounds synchronous native requests and requires stable positive ground evidence rather than radius/submission. Unknown ground is not success. Cancellation/disposal, drift, zone/dependency loss and fixed timeout revoke or fail diagnostically; retired handles/late paths cannot control replacements. Existing request constructors, adapter API and enum values remain compatible; RequireLanding defaults false. The export gains nullable Grounded without credentials, coordinates, config or chat.

[Core PR CI 37642555100](https://github.com/MarshalTitan/SentinelCore/actions/runs/37642555100) and [release 37643419684](https://github.com/MarshalTitan/SentinelCore/actions/runs/37643419684) passed: 13 navigation scenario groups, 9/9 generic groups, 11/11 UI groups and public integrity verification. New tests cover stable/unknown/unstable ground, rejection/20s timeout, drift/dependency loss, cancellation after submission, zoning/disposal, replacement and late results; legacy destination arrival stays unchanged.

Candidate [Build 37643748882](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37643748882) passed 29 state tests, 32 UI/history tests, landing consumer/ownership evidence tests, legacy source audits and exact published-package/bundled-DLL checks with zero build warnings/errors. [Release policy 37643748886](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37643748886) and [SentinelHunts build 37643748870](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37643748870) also passed. [Download 0.7.60.0](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37643748882/artifacts/11492119907).

### Core 0.4.1 public package integrity

Source `e6527400680cddc39803321792b7c3b02fb0501d`; public release manifest records SHA256/SHA512. Release downloaded and verified all three public libraries; consumer locks pin published SHA512 and ZIP validation checks bundled assembly hashes.

| Package | SHA256 |
|---|---|
| MarshalTitan.SentinelCore.0.4.1.nupkg | `10b14a37577bd78b528d9bad03848b5cb5c3f6c3f4fa7dff4de966f8e5b34771` |
| MarshalTitan.SentinelCore.Dalamud.0.4.1.nupkg | `46220e8bbacb073f65c49866450ca16fb7abac6da334a2f2ea6b5983a6f98189` |
| MarshalTitan.SentinelCore.UI.0.4.1.nupkg | `1ec7841311316994d4f71350b499c3f718d36179e1565f0d7316270063c6baea` |

SRank PR #25 remains unmerged/unpublished; no child or central plugin promotion occurred. Public SRank 0.7.54.0 remains accepted. PvP stays blocked; UI/Profile/history/facing changes are not in this candidate. After the new landing evidence returns, engineering resumes automatically to the next source-supported gate; the subsequent actual shared ordinary-hunt safe landing/tag/kill/return proof remains required.

## Physical landing proof and approved hunt route stage — 2026-10-07

The user reports physical unmount/landing and confirms cancellation stopped movement and resume landed. Inspected 0.7.60.0 excerpts: ProbeCancelled for `2d7c66c4-9243-41ed-b792-a6ed043477d0` at **15:37:23.812 UTC**; distinct replacement `75ac0f50-ebca-443c-aad4-9c4cfe4c6fc5` recorded **Landing → Arrived / GroundConfirmed** at **15:37:29.918 UTC**, ready/current-zone mesh and Following=false. Classify **PASS — scoped physical landing/cancellation/replacement**, based on the human report plus inspected transition/session excerpts. PhysicalContext/Result fields and the full attachments were not readable/contained in the excerpts; do not claim independent inspection of Grounded/InFlight fields or every cancellation race. No repeat 0.7.60.0 test is required. This closes the isolated mechanics landing gate, not actual shared hunt policy integration.

Candidate **0.7.61.0**, commit `a2ded6f2109cfed726de24c9d730a0d13957d7bd`, in [SRank PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25), extends session opt-in to ordinary **pre-tag protected flight parking** only after the existing path AND landing-ground-connectivity validation. Core receives a one-use immutable approved route; its query phase here accepts prevalidated consumer data rather than issuing a new unprotected query. Fresh entity/zone/path/clearance checks precede following; zero parking retries forbid requery outside approval. Original point selection, crowd safety, preference bookkeeping, alignment/landing revalidation and kill/reset/tag/return semantics remain consumer-owned. Planned landing handoff cancels the Core lease before legacy landing and records the correlated ParkingLandingHandoff event/last Core state. SS, unprotected fallback and post-tag retreat remain legacy. Failure stops proving/Sentinel, retains the hunt and exports; off during shared parking returns to LocateMark for safe legacy resampling.

This stage reuses Core 0.4.1 without adding gameplay policy to the generic library. Actual-hunt Core movement and the old consumer landing/tag/kill/return remain the next supervised gate. Keep PR #25 unmerged/unpublished, all seven public entries preserved, and PvP blocked.


Final **0.7.61.0** candidate validation at `a2ded6f2109cfed726de24c9d730a0d13957d7bd`: [Build 37649251491](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37649251491), [SentinelHunts 37649251486](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37649251486), and [release-infrastructure checks 37649251477](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37649251477) all passed. Build reports 29/29 state and 32/32 UI/migration/history test groups, including approved-parking and landing ownership tests, source audits and exact Core dependency/package validation; compilation had zero warnings/errors. CI action runtime deprecation notices are separate from compilation. [Exact proving artifact 11496436059](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37649251491/artifacts/11496436059), outer archive SHA256 `8b020fe349195906dc60639c523f71d9c927f6a708d339429c018bb643c9f7bb`; public plugin release/catalog remain unchanged.
