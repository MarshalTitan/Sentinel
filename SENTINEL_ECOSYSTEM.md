# Sentinel Ecosystem

Verified **2026-10-07 UTC / 2026-10-06 America/Toronto**. This is the coordination index; [Architecture](ARCHITECTURE.md), [Roadmap](ROADMAP.md), [Release process](RELEASE_PROCESS.md), and [Test matrix](TEST_MATRIX.md) own their respective detail.

## Operating agreement and evidence

The user steers priorities and performs in-game acceptance. The architect coordinates the entire ecosystem and carries routine implementation, automated testing, PR creation/merge, release and catalog verification through automatically within the agreed scope. Stop only for destructive ambiguity, unavailable permissions, or required in-game validation; continue independent work that is not blocked. Use cloud execution/GitHub for routine work; use the user's PC only when live game access or testing requires it. Preserve independent plugin repositories, existing behavior, configurations, identities, and explicit opt-ins unless the user explicitly requests the change.

Break work into reviewable stages: verify current source/releases and evidence; define the narrow change and compatibility constraints; implement and run relevant automated checks; obtain required in-game acceptance; publish and verify child/central manifests; reconcile these five documents. Keep published functionality, implemented candidates, planned work, reported issues and pending validation distinct. Update the applicable documents whenever verified reality changes during ecosystem work; record blockers with the exact evidence or decision needed.

**Published** means an accessible release/catalog artifact, not proof of in-game correctness. **Implemented** means inspected source; **planned** means work still to do; **reported issue** means user evidence without a verified current-build closure; **unverified** means evidence is missing. Source-of-truth order: live repository source; published releases/assets; live workflows/manifests; canonical ecosystem Markdown; current active chats; historical chats. Resolve source-versus-release differences explicitly; an implemented head is not automatically a published binary.

The user confirmed Hub/Trains scope and the broad execution order on 2026-10-06 America/Toronto; those decisions are recorded in [Roadmap](ROADMAP.md). Earlier incomplete chat retrieval no longer blocks this scope.

## Verified inventory

All six active plugin projects reference Core UI package **0.3.1**. All seven central catalog objects exactly matched their child manifest objects at this audit.

| Component | Published identity | Responsibility and current boundary |
|---|---|---|
| SentinelCore | [v0.3.1.0](https://github.com/MarshalTitan/SentinelCore/releases/tag/v0.3.1.0); NuGet 0.3.1 | Opt-in generic, Dalamud and UI libraries; Modern 2 is released. No installable Core plugin or catalog entry. |
| Central Sentinel | [catalog snapshot](https://github.com/MarshalTitan/Sentinel/blob/1f703528c428fc993945aafb85a27bdd0742932e/repo.json) | Approved registry, deterministic aggregation, validation, last-known-good fallback and automated reconciliation. |
| SRankSentinel | [v0.7.54.0](https://github.com/MarshalTitan/SRankSentinel/releases/tag/v0.7.54.0) (prerelease) | S/SS report intake, same-DC queue/travel, safe parking, one gated tag, positive kill evidence and recovery; companion/history UI. |
| PvPSentinel | [v0.3.1.23](https://github.com/MarshalTitan/PvPSentinel/releases/tag/v0.3.1.23) | Experimental five-map Frontline navigation, diagnostics and combat-provider boundaries. Map recognition does not imply complete objective semantics or in-game acceptance. |
| SentinelHUD | [v0.8.4.5](https://github.com/MarshalTitan/SentinelHUD/releases/tag/v0.8.4.5) | Actor HUD/editor, self marker/highlight, awareness, targeting counter, camera and opt-in convenience; companion status is informational. |
| ClassySentinel | [v0.8.6.0](https://github.com/MarshalTitan/ClassySentinel/releases/tag/v0.8.6.0) (prerelease) | Exact gear-set launcher, dynamic job classification, multiple sets and scoped controller capture. |
| SentinelProfiles | [v0.2.1.2](https://github.com/MarshalTitan/SentinelProfiles/releases/tag/v0.2.1.2) (prerelease) | Manual Enable / Leave Alone / Disable profiles and drift reporting; saved profiles do not make temporary Dalamud overrides persistent. |
| SentinelRelay | [v0.5.0.5](https://github.com/MarshalTitan/SentinelRelay/releases/tag/v0.5.0.5) | Per-character webhooks, authorized REST-polled replies, hunt rewards and opt-in game-window screenshots; no hosted backend. |
| SentinelHunts | [v0.1.1.0-sentinelhunts](https://github.com/MarshalTitan/SRankSentinel/releases/tag/v0.1.1.0-sentinelhunts) (cataloged) | Separate existing beta owned by SRankSentinel's repository; preserve its entry. It is not Sentinel Trains. |
| Sentinel Hub | Planned; scope confirmed | Ecosystem control center consuming plugin/version/dependency/readiness, Profiles and diagnostics state; quick-open actions, no gameplay automation. |
| Sentinel Trains | Planned; scope confirmed | Independent A-rank train automation consuming future shared navigation; does not replace SRankSentinel or SentinelHunts. |

GitHub's stable-only latest-release endpoint returned 404 for SRank, Classy and Profiles; release lists and exact catalog tags verified their prereleases instead. Never interpret that 404 as “unpublished.”

## Important reconciliations

- Core's current baseline is **0.3.1**, tag **v0.3.1.0**, commit `300703b360a58fb4b73bf7675d31fe8cab4614cd`. UI package release-metadata SHA-256: `e1a9ce4e1ce36042c0fcd53f4c23874d918640be10eef16c21f1cd436c6ba747`. This audit read GitHub's digest; it did not independently download/hash the package.
- SRank source includes direct Faloop integration as well as HuntAlerts/Sonar despite older introductory descriptions. Personal reward credit is distinct from report/tag/kill evidence; [Plugin.History.cs](https://github.com/MarshalTitan/SRankSentinel/blob/0731a00e9186ec916718e6c031d4f0b163a6a3e6/Plugin.History.cs) gates receipt matching and enabled-expansion recording.
- PvP [readiness code](https://github.com/MarshalTitan/PvPSentinel/blob/d47e8b7429c135fec2976c1e980175f33787c4f3/Strategy/FrontlinePilotReadiness.cs) permits travel with responsive, loaded RSR even when its mode reports Off. Generic external/native modes do not satisfy the current automatic-pilot connection gate. Queue/requeue remains disabled.
- Relay's earlier hosted-service/slash-command architecture is superseded. Its prefixes are ordinary Discord messages polled by the plugin, not registered application commands.
- Published minimize fixes exist for HUD, PvP and Profiles; Classy has themed collapse code. Retest the actual installed versions before reopening old reports or declaring them resolved.

## Audited gameplay source heads

These are source snapshots, not a claim that every head is a release tag target; release workflows can add manifest-only commits.

- [Sentinel `1f703528c428`](https://github.com/MarshalTitan/Sentinel/commit/1f703528c428fc993945aafb85a27bdd0742932e)
- [SentinelCore `300703b360a5`](https://github.com/MarshalTitan/SentinelCore/commit/300703b360a58fb4b73bf7675d31fe8cab4614cd)
- [SRankSentinel `0731a00e9186`](https://github.com/MarshalTitan/SRankSentinel/commit/0731a00e9186ec916718e6c031d4f0b163a6a3e6)
- [PvPSentinel `d47e8b7429c1`](https://github.com/MarshalTitan/PvPSentinel/commit/d47e8b7429c135fec2976c1e980175f33787c4f3)
- [SentinelHUD `e7d53978a282`](https://github.com/MarshalTitan/SentinelHUD/commit/e7d53978a2821ffc4cb6613de4b92511caad415d)
- [ClassySentinel `8763b77a1f8b`](https://github.com/MarshalTitan/ClassySentinel/commit/8763b77a1f8b8fcc4a01845d108715b4431565d7)
- [SentinelProfiles `23610575f0a9`](https://github.com/MarshalTitan/SentinelProfiles/commit/23610575f0a9f20a31f003866cfcb60ea1b4caf8)
- [SentinelRelay `d2401031bd20`](https://github.com/MarshalTitan/SentinelRelay/commit/d2401031bd20430c37d2bc0d64a98aa17c157954)

## Release-infrastructure phase completed

Phase 1 merged in all six child repositories; see [release process](RELEASE_PROCESS.md) and [audit/evidence](docs/RELEASE_INFRASTRUCTURE_AUDIT.md). One pinned CI action in Sentinel maintains child manifests and verifies exact public distribution with optional notification. This introduces no runtime plugin coupling. Classy PR publication and asset replacement were removed; SentinelHunts now has a complete child-manifest path. Published plugin versions and all seven catalog entries are unchanged; SentinelCore remains 0.3.1.

Next gate: the focused [current-build acceptance checklist](TEST_MATRIX.md#current-build-supervised-acceptance). No new in-game acceptance or gameplay fix is claimed. Shared navigation implementation/consumer migration has not started.

Refresh the inventory, outstanding evidence and test results together when a release changes behavior. Do not copy “passed” counts from chat into current acceptance records.
