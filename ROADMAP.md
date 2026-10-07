# Roadmap

Baseline: [verified inventory](SENTINEL_ECOSYSTEM.md). The user confirmed this execution order on 2026-10-06 America/Toronto:

1. Sentinel Modern 2 / Core 0.3: already published (current package 0.3.1).
2. Release/workflow cleanup: implemented and merged across all six children; next genuine release will exercise changed publication end-to-end.
3. Current-build acceptance baseline: targeted supervised checks, not blanket historical bug fixing.
4. Shared navigation and diagnostics foundations: understand existing contracts before extraction.
5. SRankSentinel incremental reliability migration: first proving consumer.
6. PvPSentinel Frontline Brain improvements: only after automated and supervised SRank navigation proof.
7. Sentinel Hub: only after shared foundations are stable.
8. Sentinel Trains: consumes proven shared navigation.

Do not start Hub or Trains unless the foundations are stable or the user explicitly reprioritizes them.

## P0 — Preserve live behavior and obtain current evidence

| Track | Evidence/status | Next deliverable and exit gate |
|---|---|---|
| HUD cutscene safety | User reported submarine-cutscene crashes and disabled skipping; current code contains scoped confirmation/retry handling. Current-build live closure not established. | Inspect crash evidence against current code; keep user's skip setting off until a controlled retest is agreed. No generic confirmation of unrelated choices. |
| Frontline travel | Published dynamic follow, ordinary-combat travel and mount retention supersede older behavior; collision, respawn and entry-crash reports need current-build confirmation. | Supervised map-specific logs/video; classify genuine regression versus older build. STOP, death/results cancellation and no repeated failed corridor are mandatory. |
| Configuration/UI | Modern 2 and minimize fixes are published; prior position, null gear-set and minimize reports must not be marked automatically closed. | Current-build theme/minimize/restart/controller checks across consumers; preserve saved layouts, gear-set references and profiles. |
| Catalog health | Seven child/central entries match; successful scheduled reconciliation observed. | Continue checking release-to-catalog completion and warnings; preserve every approved entry, including SentinelHunts. |

## P1 — Close verified gaps

- **Release enforcement — completed:** shared action, optional notification/unconditional exact verification, PR-safe Classy publication, immutable assets, all seven child promotion paths, legacy cleanup and policy CI are merged. Tests/smoke and remaining next-release evidence are in the [audit](docs/RELEASE_INFRASTRUCTURE_AUDIT.md). No new plugin release was needed.
- **Profiles restart semantics:** saved profiles/selection exist, but native temporary loaded-state overrides reset. User requested last-selected profile persistence across restart. Determine whether the remaining need is restoring selection, explicitly opted-in reapplication after discovery stabilizes, or native collection integration. Do not describe continuous enforcement or persistent native collections as shipped.
- **SRank history/credit:** enabled-expansion recording, reward matching, one report list, clear control and tagged activity presentation are in source. Verify positive receipt correlation in-game; capped currency, missing reward lines and localization can leave a valid tag credit-unconfirmed. Do not equate a kill report with personal credit.
- **Five-map evidence:** prioritize Onsal discovery per the available user request, then resolve remaining Secure semantics and regressions on Worqor/Seal Rock/Shatter. Recognition, destination discovery, objective meaning and tactical acceptance are separate gates.
- **Native MCH:** preserve Shadow-first diagnostics and independent implementation; prove action IDs, defensive preemption and target safety with supervised evidence before expanding automation. Queue/requeue remains disabled pending an explicit tested milestone.

## Sentinel Hub and Sentinel Trains — confirmed future scope

**Hub** is an ecosystem control center, not a replacement for individual plugins. Show installed Sentinel plugins, versions, dependency health, readiness/connection status, quick-open actions, Profiles status and shared diagnostics. Eventually reduce duplicated ecosystem/dependency pages where appropriate. Hub consumes ecosystem state and performs no gameplay automation.

**Trains** is an A-rank hunt-train automation plugin. Intended flow: train/conductor report → world/instance travel → nearest usable aetheryte → conductor/map flag → continuous flight → safe arrival → single tag → next flag. Consume shared Sentinel navigation; do not create another independent movement stack. Preserve SRankSentinel and the existing SentinelHunts identity/catalog entry.

## Current execution gate

Phase 2 source review and the focused acceptance checklist are prepared in [Test matrix](TEST_MATRIX.md#current-build-supervised-acceptance). User evidence is still required for native cutscene callbacks, rendering/persistence and live movement. Do not publish speculative gameplay fixes. Profiles' lack of startup reapplication is a verified source behavior, distinct from loss of its saved profile IDs. Core/navigation work follows baseline review; PvP migration additionally requires a supervised SRank proving test.

## P2 — Shared foundations after evidence

Plan a small shared navigation contract and consistent diagnostic export only where tested duplication justifies extraction. Retain plugin-owned strategy and optional integrations; Core must remain independently consumable libraries. Add new Core APIs with compatibility tests, release them, then migrate consumers individually.

SRank migration must preserve hunt parking, S/SS staging, one tag per real pull, positive reset/death evidence and recovery. Prove zone-mesh readiness, mount/takeoff, continuous flight and usable-aetheryte selection before broad rollout.

Future Frontline Brain work includes allied proximity clustering, meaningful field groups, switch hysteresis, smoothed centroids/velocity and short lead, mounted-group and enemy awareness, formation/role positioning, destination commitment/repath cooldown, bounded perpendicular recovery and target scoring. Preserve map safety policies; recognition does not prove objective semantics. All Frontline changes require supervised acceptance.

Close roadmap items only with a source/release link plus automated evidence and, where required, the user's in-game result. Record outstanding testing even when code is already published. The separate MINION project is not a dependency or proof of Dalamud readiness.
