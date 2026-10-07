# Roadmap

Baseline: [verified inventory](SENTINEL_ECOSYSTEM.md). Priority levels below are the architect's proposed execution order, not recovered commitments from unavailable chats. Routine fixes can proceed within their scope; product decisions are called out explicitly.

## P0 — Preserve live behavior and obtain current evidence

| Track | Evidence/status | Next deliverable and exit gate |
|---|---|---|
| HUD cutscene safety | User reported submarine-cutscene crashes and disabled skipping; current code contains scoped confirmation/retry handling. Current-build live closure not established. | Inspect crash evidence against current code; keep user's skip setting off until a controlled retest is agreed. No generic confirmation of unrelated choices. |
| Frontline travel | Published dynamic follow, ordinary-combat travel and mount retention supersede older behavior; collision, respawn and entry-crash reports need current-build confirmation. | Supervised map-specific logs/video; classify genuine regression versus older build. STOP, death/results cancellation and no repeated failed corridor are mandatory. |
| Configuration/UI | Modern 2 and minimize fixes are published; prior position, null gear-set and minimize reports must not be marked automatically closed. | Current-build theme/minimize/restart/controller checks across consumers; preserve saved layouts, gear-set references and profiles. |
| Catalog health | Seven child/central entries match; successful scheduled reconciliation observed. | Continue checking release-to-catalog completion and warnings; preserve every approved entry, including SentinelHunts. |

## P1 — Close verified gaps

- **Release enforcement:** align Classy and PvP with mandatory dispatch/public-catalog verification. Their workflows currently warn and skip notification when the token is missing. Separate Classy's PR validation from publication and remove routine same-tag asset replacement. These are identified gaps; this documentation PR does not change workflows.
- **Profiles restart semantics:** saved profiles/selection exist, but native temporary loaded-state overrides reset. User requested last-selected profile persistence across restart. Determine whether the remaining need is restoring selection, explicitly opted-in reapplication after discovery stabilizes, or native collection integration. Do not describe continuous enforcement or persistent native collections as shipped.
- **SRank history/credit:** enabled-expansion recording, reward matching, one report list, clear control and tagged activity presentation are in source. Verify positive receipt correlation in-game; capped currency, missing reward lines and localization can leave a valid tag credit-unconfirmed. Do not equate a kill report with personal credit.
- **Five-map evidence:** prioritize Onsal discovery per the available user request, then resolve remaining Secure semantics and regressions on Worqor/Seal Rock/Shatter. Recognition, destination discovery, objective meaning and tactical acceptance are separate gates.
- **Native MCH:** preserve Shadow-first diagnostics and independent implementation; prove action IDs, defensive preemption and target safety with supervised evidence before expanding automation. Queue/requeue remains disabled pending an explicit tested milestone.

## Sentinel Hub and Sentinel Trains — priority planning tracks

Both are requested ecosystem priorities. The exact FFXIV Bot Questions discussion was unavailable through project-memory retrieval. Exact-name repository probes returned 404 and neither appears in the audited registry; that does not prove no private or differently named work exists.

Before implementation, recover/confirm each track's purpose, MVP, repository/identity, relative priority, optional dependencies and acceptance scenarios. Hub's relationship to existing plugin-status pages and Profiles needs a boundary decision. Trains' relationship to SRankSentinel and the separately cataloged SentinelHunts needs a boundary decision. Do not silently rename or replace those existing plugins.

**Decision needed:** provide the relevant Hub/Trains chat excerpt or confirm their intended scope and order. Scope verification is the immediate next step for these tracks; no invented feature list or schedule is treated as canon.

## P2 — Shared foundations after evidence

Plan a small shared navigation contract and consistent diagnostic export only where tested duplication justifies extraction. Retain plugin-owned strategy and optional integrations; Core must remain independently consumable libraries. Add new Core APIs with compatibility tests, release them, then migrate consumers individually.

Close roadmap items only with a source/release link plus automated evidence and, where required, the user's in-game result. Record outstanding testing even when code is already published. The separate MINION project is not a dependency or proof of Dalamud readiness.
