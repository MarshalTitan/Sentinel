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
| Profiles PROFILE ACTIONS layout | **FAIL — current user report** | Content is cut off regardless of resizing. Independent UI defect. |
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

Focused next evidence: establish whether export occurred after a plugin/game reload. If needed, capture `/sranknavtest status` during one ordinary long approach and export **before any reload/restart**. Confirm ON with a nonempty operation ID and Pathfinding/Following state; a returned transition history must establish that shared movement actually ran. Do not repeat unrelated UI or already-reported functional checks. SRank PR #25 remains unmerged and PvP migration remains blocked pending this evidence.
