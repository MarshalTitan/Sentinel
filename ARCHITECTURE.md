# Architecture

Status and version snapshot: [Sentinel Ecosystem](SENTINEL_ECOSYSTEM.md). “Required” below describes the coordination contract; explicitly identified gaps are not implemented capabilities.

## Ownership and dependencies

| Owner | Owns | Must not become |
|---|---|---|
| Sentinel catalog | Registry, generated manifest, validation and reconciliation | Monorepo for plugin implementations or owner of child version metadata |
| SentinelCore | Versioned shared configuration, lifecycle, diagnostics, job metadata, safe IPC and UI primitives | Required installed plugin, live service, or implicit upgrade of every consumer |
| Each plugin | Domain policy, runtime adapters, configuration migration, window lifetime, release and evidence | Private fork of Core palettes, shells or shared widgets |
| Future Hub | Installed plugins/versions, dependency/readiness state, quick-open actions, Profiles status and shared diagnostics | Gameplay automation or a replacement for individual plugins |
| Future Trains | A-rank train domain policy consuming shared navigation | Replacement for SRankSentinel/SentinelHunts or another independent movement stack |

Core generic code targets .NET 10 without Dalamud. Core.Dalamud and Core.UI target Windows/Dalamud API 15 and depend toward the generic library. Each consumer pins and bundles its required packages. See [Core architecture](https://github.com/MarshalTitan/SentinelCore/blob/300703b360a58fb4b73bf7675d31fe8cab4614cd/docs/ARCHITECTURE.md) and [adoption contract](https://github.com/MarshalTitan/SentinelCore/blob/300703b360a58fb4b73bf7675d31fe8cab4614cd/ADOPTION.md). Core currently has no shared world-navigation engine.

## Shared UI

Core 0.3.1 owns Classic and released Modern 2 primitives: compact custom header, fixed left icon rail, optional left secondary navigation, right content, responsive rows, cards/switches/status pills, ambient motion and reduced-motion behavior. Keep a single visible header in Modern, preserve Classic, and retain role/status colors that carry meaning.

Consumers own page definitions, icons, commands, window state, persistence and interactions. Minimize keeps the themed header and expand/close controls, retains expanded dimensions separately, and restores at the current position. A package update alone does not prove correct consumer integration. Verify scale, narrow widths, controller operation and reload in each consumer; no automation behavior changes should be hidden in a UI migration.

## Navigation and combat

**Implemented:** SRank owns hunt queue/travel/tag/recovery with its local vnavmesh and travel adapters. PvP separately owns generated-route validation, bounded recovery, objective adapters, group following and provider coordination. These are distinct implementations, not an existing shared navigation package.

**Required for future extraction:** preserve one movement owner per operation, cancellation on STOP/disposal/context loss, stale-result rejection, bounded retry budgets, physical arrival evidence, and diagnostic reasons. Do not introduce a second controller that competes for the same path. Extract tested common mechanics only after both consumers demonstrate the same contract; keep hunt parking/SS staging and Frontline tactics separate. Cross-plugin arbitration remains planned, not guaranteed. An old operation must never stop or replace its successor's route. SRank is the first proving consumer; PvP migration is blocked until automated tests and a supervised SRank live test pass.

Candidate shared mechanics include current-zone mesh/build readiness, asynchronous pathfinding distinct from following, operation-scoped ownership/cancellation, stale-result rejection, current-waypoint progress and bounded stalls, mount/takeoff, flight availability/replanning, landing projection, bounded recovery and correlation IDs. Study current SRank/PvP and vnavmesh IPC contracts before defining APIs. Public XeldarAlz repositories are architecture references only: do not copy AGPL source into Sentinel; implement Sentinel-owned equivalents independently.

SRank accepts positive kill evidence and distinguishes unresolved hunts from dead hunts; report absence alone is insufficient. Tag confirmation is not personal reward credit. PvP separates strategy/navigation from combat; RSR integration is read-only and actual action execution needs observation. Native MCH has Shadow/Observe and gated Active paths, but does not establish production readiness or automatic-pilot eligibility. Wrath must not be treated as a PvP auto-rotation service.

Current PvP source and [dynamic-follow contract](https://github.com/MarshalTitan/PvPSentinel/blob/d47e8b7429c135fec2976c1e980175f33787c4f3/docs/FRONTLINE_DYNAMIC_FOLLOW.md) outrank older README milestone paragraphs: ordinary RSR-mode combat need not interrupt travel; its Off mode is diagnostic. Onsal/Secure use field-group following while objective semantics remain unresolved.

## Diagnostics and persistence

Core provides bounded buffers, changed/throttled diagnostics, safe IPC results and configuration coordination. Adoption is per consumer; there is no verified ecosystem-wide log collector. PvP additionally emits privacy-sanitized match events/summaries and entry-stage traces. SRank records passive history without allowing history-save failures to interrupt hunting. Relay uses bounded queues, rate limits and protected per-character secrets.

For shared diagnostics, prefer timestamp, plugin/version, operation/correlation ID, previous/new state, reason, external dependency state, physical context and result. Extract into Core only where multiple plugins benefit, and aim for a sanitized Export Diagnostics workflow. Preserve evidence needed to reproduce a failure; exclude credentials, tokens, saved secrets and unnecessary private chat. A shared export/schema is planned work, not a current universal API.

Profiles uses public discovery and isolated native temporary enable/disable commands. It stores selected/last-applied IDs, applies disables before enables, verifies transitions and protects self-unload. Restart persistence of actual loaded states needs a deliberate product decision, not a silent change to native collections.

## Self-healing distribution

The [registry](https://github.com/MarshalTitan/Sentinel/blob/1f703528c428fc993945aafb85a27bdd0742932e/generator/plugins.json) maps InternalName to child repository/branch. Central generation fetches authoritative child manifests, validates entries/assets and preserves registry order. Invalid/unavailable/stale known children retain structurally valid last-known-good entries; a new invalid child or unregistered existing entry aborts generation. Fallback preserves publication metadata, not a guarantee that an old asset remains downloadable.

The [publisher](https://github.com/MarshalTitan/Sentinel/blob/1f703528c428fc993945aafb85a27bdd0742932e/generator/publish-catalog.mjs) uses the current manifest blob SHA, refetches/retries conflicts and verifies public output. Dispatch payloads are notifications, never metadata authority. Notifications are optional accelerators. Scheduled reconciliation is an allowed token-free path; release completion still requires public-catalog verification. See [Release process](RELEASE_PROCESS.md).

## Shared release infrastructure

The commit-pinned [distribution action](.github/actions/distribute/action.yml) is build-time infrastructure in Sentinel, independent of SentinelCore/runtime plugins. After public package validation it uses the child's repository-scoped token to conditionally update only its own approved root-manifest entry, preserve siblings, reject downgrades/concurrent metadata changes, and retry SHA conflicts. Unchanged reruns do not churn LastUpdate. Optional cross-repository credentials are confined to notification; exact public child/central verification always runs and has a 90-minute bound. Linux/Windows tests exercise missing/rejected notification, stale catalog, conflicts and permission failures. No child writes the central manifest; the old direct-entry updater is retired.

## Relay boundary

[Relay architecture](https://github.com/MarshalTitan/SentinelRelay/blob/d2401031bd20430c37d2bc0d64a98aa17c157954/ARCHITECTURE.md) is direct webhook delivery plus optional authenticated REST polling. Channel/user/character binding, freshness, checkpointing, fixed chat allowlists and default-off permissions constrain replies. Screenshots capture only the active FFXIV client area. No arbitrary remote execution, desktop capture, hosted relay dependency or Dreamforge coupling is part of the published design.
