# Test Matrix

Automation validates deterministic behavior and packaging; it cannot certify game memory, native UI callbacks, path reachability or real combat. Run routine checks on cloud runners; the user supplies in-game acceptance. Baseline versions and source heads: [Sentinel Ecosystem](SENTINEL_ECOSYSTEM.md).

## Required coverage

| Component | Automated coverage / existing harness | In-game acceptance and evidence |
|---|---|---|
| Catalog | Node generator tests; schema, registry, version/URL validation; candidate generation with asset verification; PowerShell Test-Catalog; diff against checked-in catalog | Install/update through the permanent URL; installed version matches intended artifact. No game needed for aggregation itself. |
| Core/UI | Core.Tests and Core.UI.Tests; generic Linux tests; Windows API 15 build/pack; dependency/lifecycle/IPC/layout policies | Consumer rendering at actual scale, theme choice, motion, keyboard/controller, minimize/drag/restore and restart. Renderer tests do not replace this. |
| SRank | StateTests, UiTests; Faloop catalog, travel restore, field recovery and Modern integration audits; package checks | Same-DC intake/dedup, disabled expansions, zoning/mesh wait, two bounded 10-second takeoff cycles, parking/facing, one tag, SS staging, live-entity exit veto, death/raise/Return and reward-credit correlation. |
| PvP | Tests/PvPSentinel.LogicTests.csproj; relationship/lifecycle, route/recovery, provider/native policies and package validation | Five-map cases below; entry/reconnect/respawn, ordinary-combat travel, provider loss, stale path results, STOP, mount retention and obstacle recovery. Native Shadow must cause no target/action writes. |
| HUD | Core.Tests, UI.Tests, Core UI checks, catalog-policy and package tests | Click/context-menu layering, resize/persistence, native target anchor, elevated marker, highlight colors, zoom after death; dialogue/choice boundaries. Cutscene regression remains pending, with user's skip setting off. |
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

Prepared 2026-10-07 UTC. Published builds remain HUD 0.8.4.5, Classy 0.8.6.0, Profiles 0.2.1.2, PvP 0.3.1.23, SRank 0.7.54.0, Relay 0.5.0.5. No new game session was run in Phase 1.

| Classification | Current evidence and limit |
|---|---|
| Verified fixed (engineering) | Classy PR publication/asset clobber, notification-gated public verification and missing SentinelHunts manifest promotion are removed in merged workflows; automated checks passed. This is not gameplay acceptance. |
| Code appears fixed; needs in-game proof | HUD skip-confirmation identity/pointer handling; Modern minimize/expanded-size persistence; Classy invalid saved-reference guards; PvP ordinary-combat travel; SRank flight-start/parking/tag/recovery policies. |
| Known source behavior / remaining gap | Profiles saves selected/last-applied IDs but does not automatically reapply temporary native plugin states at startup. Onsal/Secure objective meaning remains incomplete. No historical movement/crash report was newly reproduced on current builds. |
| Historical assumption no longer applicable | “RSR must report On for automatic travel” conflicts with current readiness source: a loaded, responsive provider is the gate, and mode Off is diagnostic. Older absence of minimize handling is superseded by published implementation; actual UI acceptance is still pending. |

Run these targeted procedures with existing settings; record installed versions first. One restart covers the UI and Profiles cases. Do not deliberately delete gear sets, force a death, or manufacture a hunt reset.

1. **HUD cutscene safety (priority):** keep Skip Dialogue off and reward selection Manual to isolate the test. During a supervised session, enable Skip Cutscenes for one known skippable scene, preferably the submarine scene previously implicated. Expected: one normal skip request/confirmation, scene exits, no crash. Open an unrelated NPC choice afterward: it must remain untouched. Turn skipping off after the test; stop on a hang/crash. Send timestamp, exact scene, HUD cutscene-state/result screenshot, relevant dalamud.log and crash evidence if generated.
2. **Modern/persistence + Classy (one short UI pass):** in each used Sentinel configuration window, select Modern, resize/move, minimize, drag the compact header and restore. Expected: themed header; expanded size restored at the dragged position. Close/reopen; switch Classic and back once where supported. In Classy, R3 opens/cancels, D-pad navigates without changing the game's target, Cross equips the exact selected alternate set and closes; open Gear sets/settings with any already unavailable reference. Expected: no exception. Restart FFXIV once; compare positions, sizes and theme to before screenshots. Send only failures plus which plugins passed.
3. **Profiles during that same restart:** select a named profile, apply it to a harmless plugin you normally toggle, and note selected/last-applied names and actual loaded state. After restart, record those three values separately. Saved names should persist; temporary plugin states need not be reapplied under current design. Send before/after screenshots. Do not treat the latter alone as lost profile data.
4. **PvP (one normal scheduled match first):** keep the current provider/settings. Capture entry, first route, an ordinary combat encounter and natural respawn if it occurs. Expected: correct active-match state, travel continues/resumes despite incidental combat, no persistent wall route or mount loop, and STOP cancels movement. Do not run five full maps just for this baseline; use whichever map is available, then target any failure. Send events.jsonl, summary.json, frontline-entry-stages.log, relevant dalamud.log, map/version and a timestamped short movement clip.
5. **SRank (one ordinary S-rank):** capture zoning/aetheryte arrival through mount/takeoff, flight, safe parking/facing, one real pull/tag and confirmed kill exit. Expected: no repeated start/stop at mesh startup, no duplicate tag on the same pull, no false kill/exit while the mark is alive. If an SS, death/raise or recovery occurs naturally, retain that evidence; otherwise label it not exercised. Send version/world/zone, relevant state/reward log lines and a short clip if movement fails.

The user performs these checks. Keep credentials, tokens and unrelated private chat out of evidence. Mark each result passed, failed or not exercised. A failure should identify one timestamp and expected/actual behavior; broad speculative gameplay fixes remain blocked until this evidence is reviewed. Shared navigation then proceeds as an independent design/test stage, with SRank first; PvP migration still needs the later supervised SRank proving test.
