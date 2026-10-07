# Phase 1 release infrastructure audit

Verified 2026-10-07 UTC / 2026-10-06 America/Toronto. PR #2 was already merged before the confirmed Hub/Trains instruction; PR #3 records that follow-up. All plugin work was performed through GitHub and hosted Actions.

## Merged changes

| Repository | PR | Merge/source head |
|---|---|---|
| Sentinel | [baseline direction](https://github.com/MarshalTitan/Sentinel/pull/3), [shared action](https://github.com/MarshalTitan/Sentinel/pull/4) | [9a2161c0acc9](https://github.com/MarshalTitan/Sentinel/commit/9a2161c0acc963b14f6d7dc6fc11cdf0c9e0d1b8) |
| SRankSentinel | [PR #24](https://github.com/MarshalTitan/SRankSentinel/pull/24) | [6ee1a472df34](https://github.com/MarshalTitan/SRankSentinel/commit/6ee1a472df343bfe5c7158eb77801135e439145a) |
| PvPSentinel | [PR #29](https://github.com/MarshalTitan/PvPSentinel/pull/29) | [0971ecdc53f5](https://github.com/MarshalTitan/PvPSentinel/commit/0971ecdc53f5b4b5582295aab1748742164ae522) |
| SentinelHUD | [PR #4](https://github.com/MarshalTitan/SentinelHUD/pull/4) | [a780361acbec](https://github.com/MarshalTitan/SentinelHUD/commit/a780361acbecb8668bd822416ac8a9f97783df99) |
| ClassySentinel | [PR #8](https://github.com/MarshalTitan/ClassySentinel/pull/8) | [694870aa945b](https://github.com/MarshalTitan/ClassySentinel/commit/694870aa945b6ece95cf0b4343fc428eeb521853) |
| SentinelProfiles | [PR #1](https://github.com/MarshalTitan/SentinelProfiles/pull/1) | [01f23e6de333](https://github.com/MarshalTitan/SentinelProfiles/commit/01f23e6de3332a145bd9add846e6c44a0c681698) |
| SentinelRelay | [PR #10](https://github.com/MarshalTitan/SentinelRelay/pull/10) | [d9e7f6fc1662](https://github.com/MarshalTitan/SentinelRelay/commit/d9e7f6fc1662f2e26275888e5a31ea4b9574ca3e) |

The central cleanup/report PR additionally retires the old Update Plugin Entry workflow/script and reconciles the five canonical documents plus README. It does not change registry/repo.json. SentinelCore is unchanged at v0.3.1.0 / package 0.3.1.

- Shared distribution action pin: `4bbc5ce50837b37c8cfaee5c39a075c4f68858ed`. It is CI-only, not runtime coupling.
- Classy: remove PR publisher; keep normal PR build; prohibit asset replacement; validate local/public ZIPs; preserve exact-source retry.
- SRank: prohibit asset replacement, check out event source, validate public package before promotion; remove unused nested workflow/local updater.
- SentinelHunts: complete public ZIP → own root entry → central verification while preserving SRank.
- PvP: public verification no longer depends on notification; own root manifest is promoted consistently after public package validation.
- HUD/Profiles/Relay: replace mandatory notification with optional notification/unconditional verification; ensure child promotion; remove unused HUD waiter/Relay upsert and recurring historical-note mutation.
- Six children: actionlint, PowerShell parser, clobber/token checks and read-only public smoke; normal build/test/package checks retained.
- No plugin C# source, project/package versions, user configuration, saved layouts, identities, registry records or current catalog objects changed.

## Automated evidence

| Scope | Observed successful evidence |
|---|---|
| Shared action + catalog | [37557431806](https://github.com/MarshalTitan/Sentinel/actions/runs/37557431806): 29/29 tests (16 existing generator + 13 distribution); distribution tests and all seven token-free public-entry checks on Linux and Windows; actual composite-action smoke on both. |
| SRank | [build 37557827676](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37557827676): 29/29 state and 32/32 UI/migration/history tests; audits, build and ZIP validation. [release checks 37557827695](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37557827695). |
| SentinelHunts | [37557827613](https://github.com/MarshalTitan/SRankSentinel/actions/runs/37557827613): 12/12 tests, build and package validation. Both hunt identities passed public smoke. |
| PvP | [PR checks](https://github.com/MarshalTitan/PvPSentinel/pull/29/checks): logic tests, build/package, workflow policy and public smoke passed. [Post-merge 37557958982](https://github.com/MarshalTitan/PvPSentinel/actions/runs/37557958982) also revalidated the existing release and completed the shared action against unchanged manifests. |
| HUD | [37557838515](https://github.com/MarshalTitan/SentinelHUD/actions/runs/37557838515): 50/50 core groups, 11/11 Core UI groups, 7/7 native ImGui groups, build/package; [policy/smoke 37557838621](https://github.com/MarshalTitan/SentinelHUD/actions/runs/37557838621). |
| Classy | [PR #8 checks](https://github.com/MarshalTitan/ClassySentinel/pull/8/checks): 17 regression tests, build/new package validator, workflow policy and public smoke. |
| Profiles | [37557843796](https://github.com/MarshalTitan/SentinelProfiles/actions/runs/37557843796): 14 core tests, build/package; [policy/smoke 37557844104](https://github.com/MarshalTitan/SentinelProfiles/actions/runs/37557844104). |
| Relay | [37557849695](https://github.com/MarshalTitan/SentinelRelay/actions/runs/37557849695): 57/57 tests, pin/build/package; [policy/smoke 37557849697](https://github.com/MarshalTitan/SentinelRelay/actions/runs/37557849697). |

The immutable publication branches were reviewed; no PR triggered a new plugin release. The action's mutating promotion logic uses injected conflict/permission tests. PvP's post-merge action was an idempotent existing-version run. No new release upload or changed-version manifest promotion was manufactured for testing. The next genuine release remains that end-to-end observation gate.

## Catalog and secret state

All seven central entries exactly matched their child objects after the merges:

| InternalName | Published/catalog version |
|---|---|
| SRankSentinel | 0.7.54.0 |
| SentinelHunts | 0.1.1.0 |
| PvPSentinel | 0.3.1.23 |
| SentinelHUD | 0.8.4.5 |
| ClassySentinel | 0.8.6.0 |
| SentinelProfiles | 0.2.1.2 |
| SentinelRelay | 0.5.0.5 |

No releases or catalog versions changed. DALAMUD_CATALOG_TOKEN can be removed from any of the six child repositories if hourly notification latency is acceptable; remaining code uses it only as optional notification-token. Do not revoke a shared underlying PAT without checking other uses. The built-in child/central GITHUB_TOKEN permissions remain necessary. No secret inventory was available, no secret values were read, and no secret was deleted.

## Acceptance and next phase

[Current-build acceptance](../TEST_MATRIX.md#current-build-supervised-acceptance) separates engineering fixes, code awaiting game proof, known source gaps and superseded assumptions. It requests one focused cutscene check, one combined UI/restart pass, one Frontline match and one ordinary hunt; natural SS/death/recovery evidence is optional when encountered.

No game test or gameplay fix occurred in Phase 1. Review the user's baseline evidence before implementing navigation changes. The future shared layer must have operation-scoped movement ownership, cancellation/stale-task safety and diagnostics; SRank is first. PvP migration requires automated and supervised SRank proof. Hub consumes ecosystem state and Trains consumes navigation after the foundations are stable.
