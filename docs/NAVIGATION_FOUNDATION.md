# Phase 3 — shared navigation and diagnostics evidence

Verified 2026-10-07 UTC. Engineering foundations are complete enough for a controlled SRank proving run. **Live validation is the next gate; broader adoption is not approved.**

## Changes and publication

| Repository | Change | State |
|---|---|---|
| SentinelCore | [PR #2](https://github.com/MarshalTitan/SentinelCore/pull/2); merge `67e52f5d4afb080042f9e526a6afae7480b01ff0` | Published [0.4.0.0](https://github.com/MarshalTitan/SentinelCore/releases/tag/v0.4.0.0), NuGet 0.4.0 |
| SentinelCore CI | [PR #3](https://github.com/MarshalTitan/SentinelCore/pull/3) | Merged after Linux/Windows CI passed; batched native command errors now fail immediately, with no release/version change |
| SRankSentinel | [PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25); candidate `9bead74bd1a14b24fd2bd24e0bb4fadc4d56eae7` | Unmerged 0.7.56.0 CI-only proving build; default legacy, session opt-in |
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

## Controlled SRank test and rollback

[Download the proving artifact](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37574717238/artifacts/11462286124).
The artifact's outer ZIP contains latest.zip; unpack that into a separate dev-plugin directory, disable the installed SRank copy, and load SRankSentinel.dll. Do not run two copies or another movement automation.

1. While idle, run `/sranknavtest on`. Choose an ordinary S-rank needing zoning and flight.
2. Observe zone load → stable current-zone mesh/build readiness → mount → confirmed takeoff → continuous flight.
3. Observe the existing landing/parking → one configured-threshold tag → kill/reward wait → Ul'dah return.
4. On a second approach, disable Sentinel/STOP during query or following. Confirm movement stops; run `/sranknavtest off`, explicitly re-enable and confirm legacy travel is not interrupted by late work. Reload must show proving OFF.
5. Run `/sranknavtest export`. Return navigation-proving.json (path printed in chat), per-stage PASS/FAIL, plugin/vnavmesh versions, world/zone/instance/mark and a failure timestamp/short clip.

Full [procedure](https://github.com/MarshalTitan/SRankSentinel/blob/957d1dba5111dae70b00554d0ba9f81e1b86b60c/docs/NAVIGATION_PROVING.md). Failed proving disables Sentinel while retaining the hunt; rollback is explicit. If follower stop is unconfirmed, rollback remains held. Unload the dev build and re-enable the accepted 0.7.54.0 installation to restore the published baseline.

## Limits and remaining gates

- vnavmesh has no public mesh-territory identity API. Stable readiness after an observed zone epoch is an inference; zoning proof is mandatory.
- Ownership is local to this consumer/backend, not an inter-plugin movement lock.
- Core landing projection is implemented/tested; this proving slice keeps SRank's existing parking/landing policy and adapter. Its facing defect is separate.
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
