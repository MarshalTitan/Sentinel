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

Core generic code targets .NET 10 without Dalamud. Core.Dalamud and Core.UI target Windows/Dalamud API 15 and depend toward the generic library. Each consumer pins and bundles its required packages. See [Core architecture](https://github.com/MarshalTitan/SentinelCore/blob/300703b360a58fb4b73bf7675d31fe8cab4614cd/docs/ARCHITECTURE.md) and [adoption contract](https://github.com/MarshalTitan/SentinelCore/blob/300703b360a58fb4b73bf7675d31fe8cab4614cd/ADOPTION.md). Core 0.4 adds an opt-in, platform-neutral movement coordinator and diagnostics; it does not own world travel or a runtime service.

## Shared UI

Core 0.3.1 owns Classic and released Modern 2 primitives: compact custom header, fixed left icon rail, optional left secondary navigation, right content, responsive rows, cards/switches/status pills, ambient motion and reduced-motion behavior. Keep a single visible header in Modern, preserve Classic, and retain role/status colors that carry meaning.

Consumers own page definitions, icons, commands, window state, persistence and interactions. Minimize keeps the themed header and expand/close controls, retains expanded dimensions separately, and restores at the current position. A package update alone does not prove correct consumer integration. Verify scale, narrow widths, controller operation and reload in each consumer; no automation behavior changes should be hidden in a UI migration.

Confirmed responsive-UI requirements from the 2026-10-06 acceptance report (planned, not shipped): smaller supported window widths with correct wrapping/reflow and accessible controls; fix Profiles PROFILE ACTIONS clipping; bottom-anchor SRank Clear History controls and let its scrollable SPAWN REPORTS region consume remaining height. Measure Core and consumer minimum-size constraints before changing them. Preserve persisted placement, Classic and controller/keyboard interaction; do not bundle these changes with movement migration.

## Navigation and combat

**Implemented:** SRank owns hunt queue/travel/tag/recovery with its local vnavmesh and travel adapters. PvP separately owns generated-route validation, bounded recovery, objective adapters, group following and provider coordination. Their released travel implementations remain independent. Core 0.4 now contains tested common movement mechanics; SRank's opt-in PR is the first proving adapter.

**Shared contract now implemented, consumer proof pending:** preserve one movement owner per operation, cancellation on STOP/disposal/context loss, stale-result rejection, bounded retry budgets, physical arrival evidence, and diagnostic reasons. Do not introduce a second controller that competes for the same path. Common mechanics were identified from both current implementations; keep hunt parking/SS staging and Frontline tactics separate. Cross-plugin arbitration remains planned, not guaranteed. An old operation must never stop or replace its successor's route. SRank is the first proving consumer; PvP migration is blocked until automated tests and a supervised SRank live test of the new shared implementation pass. The user's pass of existing SRank 0.7.54.0 is the comparison baseline, not fulfillment of this future gate. Core's isolated tests pass; SRank PR #25 preserves the existing path as default and restricts shared movement to an explicit session-only ordinary-approach test.

Core 0.4 shared mechanics include current-zone mesh/build readiness, asynchronous pathfinding distinct from following, operation-scoped ownership/cancellation, stale-result rejection, current-waypoint progress and bounded stalls, mount/takeoff, flight availability/replanning, landing projection, bounded recovery and correlation IDs. The source/IPC study and adapter contract are recorded in [Core navigation design](https://github.com/MarshalTitan/SentinelCore/blob/67e52f5d4afb080042f9e526a6afae7480b01ff0/docs/NAVIGATION.md). Public XeldarAlz repositories are architecture references only: do not copy AGPL source into Sentinel; implement Sentinel-owned equivalents independently.

SRank accepts positive kill evidence and distinguishes unresolved hunts from dead hunts; report absence alone is insufficient. Tag confirmation is not personal reward credit. PvP separates strategy/navigation from combat; RSR integration is read-only and actual action execution needs observation. Native MCH has Shadow/Observe and gated Active paths, but does not establish production readiness or automatic-pilot eligibility. Wrath must not be treated as a PvP auto-rotation service.

Current PvP source and [dynamic-follow contract](https://github.com/MarshalTitan/PvPSentinel/blob/d47e8b7429c135fec2976c1e980175f33787c4f3/docs/FRONTLINE_DYNAMIC_FOLLOW.md) outrank older README milestone paragraphs: ordinary RSR-mode combat need not interrupt travel; its Off mode is diagnostic. Onsal/Secure use field-group following while objective semantics remain unresolved.

## Diagnostics and persistence

Core provides bounded buffers, changed/throttled diagnostics, safe IPC results and configuration coordination. Adoption is per consumer; there is no verified ecosystem-wide log collector. PvP additionally emits privacy-sanitized match events/summaries and entry-stage traces. SRank records passive history without allowing history-save failures to interrupt hunting. Relay uses bounded queues, rate limits and protected per-character secrets.

For shared diagnostics, prefer timestamp, plugin/version, operation/correlation ID, previous/new state, reason, external dependency state, physical context and result. Extract into Core only where multiple plugins benefit, and aim for a sanitized Export Diagnostics workflow. Preserve evidence needed to reproduce a failure; exclude credentials, tokens, saved secrets and unnecessary private chat. Core 0.4 provides an allowlisted, bounded navigation export (`sentinel.navigation.v1`) and typed transition records. It excludes arbitrary messages, exceptions, coordinates, actor IDs, names, config and chat; the older free-text DiagnosticBuffer is not exported. This is a navigation foundation, not yet a universal ecosystem collector.

Profiles uses public discovery and isolated native temporary enable/disable commands. It stores selected/last-applied IDs, applies disables before enables, verifies transitions and protects self-unload. The user reports a full-game-restart limitation and a retained last-applied display; selected-profile persistence versus actual loaded-state reapplication remains to be distinguished. Do not infer loss of saved profiles or silently migrate native collections.

## Self-healing distribution

The [registry](https://github.com/MarshalTitan/Sentinel/blob/1f703528c428fc993945aafb85a27bdd0742932e/generator/plugins.json) maps InternalName to child repository/branch. Central generation fetches authoritative child manifests, validates entries/assets and preserves registry order. Invalid/unavailable/stale known children retain structurally valid last-known-good entries; a new invalid child or unregistered existing entry aborts generation. Fallback preserves publication metadata, not a guarantee that an old asset remains downloadable.

The [publisher](https://github.com/MarshalTitan/Sentinel/blob/1f703528c428fc993945aafb85a27bdd0742932e/generator/publish-catalog.mjs) uses the current manifest blob SHA, refetches/retries conflicts and verifies public output. Dispatch payloads are notifications, never metadata authority. Notifications are optional accelerators. Scheduled reconciliation is an allowed token-free path; release completion still requires public-catalog verification. See [Release process](RELEASE_PROCESS.md).

## Shared release infrastructure

The commit-pinned [distribution action](.github/actions/distribute/action.yml) is build-time infrastructure in Sentinel, independent of SentinelCore/runtime plugins. After public package validation it uses the child's repository-scoped token to conditionally update only its own approved root-manifest entry, preserve siblings, reject downgrades/concurrent metadata changes, and retry SHA conflicts. Unchanged reruns do not churn LastUpdate. Optional cross-repository credentials are confined to notification; exact public child/central verification always runs and has a 90-minute bound. Linux/Windows tests exercise missing/rejected notification, stale catalog, conflicts and permission failures. No child writes the central manifest; the old direct-entry updater is retired.

## Relay boundary

[Relay architecture](https://github.com/MarshalTitan/SentinelRelay/blob/d2401031bd20430c37d2bc0d64a98aa17c157954/ARCHITECTURE.md) is direct webhook delivery plus optional authenticated REST polling. Channel/user/character binding, freshness, checkpointing, fixed chat allowlists and default-off permissions constrain replies. Screenshots capture only the active FFXIV client area. No arbitrary remote execution, desktop capture, hosted relay dependency or Dreamforge coupling is part of the published design.

## First proving adapter boundary

[SRank PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25) uses `/sranknavtest on` while idle. Off/reload restores the legacy default. Only ordinary long approach uses Core; visible-entity/scan-range handoff releases its lease before existing parking/landing/tag/kill/return policy. SS and approximate-coordinate recovery remain outside this proving slice. Failed proving disables Sentinel while retaining the hunt; it never silently counts a legacy fallback as a shared-path pass.

Core owns one operation per adapter on the framework thread. Task completions return data only; old handles cannot stop a successor. An unconfirmed Stop prevents ownership transfer. This is consumer-local ownership, not a cross-plugin lock; another plugin must not command vnavmesh during the supervised test.

Readiness combines a consumer-assigned zone epoch, loading state, stable IsReady and negative BuildProgress. Missing/unknown IPC fails closed. Upstream exposes no mesh-territory ID, so the adapter's observed-readiness inference must be validated during real zoning. Shared landing projection is a bounded primitive; it does not choose hunt parking or change facing.

## Bounded opt-in landing — Core 0.4.1

[Core PR #4](https://github.com/MarshalTitan/SentinelCore/pull/4) adds RequireLanding=false by default and an optional ILandingNavigationAdapter capability without changing existing positional constructors, INavigationAdapter members or previous enum values. Radius arrival starts Landing for opted-in requests; it is not success. Stop only the owned follower and invalidate its query, retain the operation, then request synchronous native landing at bounded intervals. There is no delayed cleanup with authority over a replacement. Cancel/dispose/zone changes revoke ownership; retired handles and late queries cannot stop or replace successors.

Success requires InFlight=false, Grounded=true, destination bounds and stable ground confirmation (0.75s). Grounded=null means unknown. A fixed 20s landing deadline is independent of repeated submissions; drift/dependency loss/timeout fail diagnostically rather than remounting, retrying indefinitely or claiming arrival. The sanitized v1 export gains nullable Grounded physical evidence and typed Landing/GroundConfirmed/timeout/rejection transitions. Native submission is never completion evidence.

SRank 0.7.60.0 enables this only for its disabled/Idle deterministic probe. Its adapter checks flight/mount/combat/follower and local projected-floor bounds before the existing native general action 23; fresh cleared-flight plus stable local height/mesh evidence confirms ground. This physical inference has a scoped 0.7.60.0 probe PASS; actual ordinary-hunt integration remains gated. Existing crowd-aware hunt parking/facing, S/SS, tags and return remain consumer-owned and unchanged. The repeatable armed landing cancellation/resume creates a distinct new lease; it does not resurrect the retired operation. PvP remains unmigrated.

## Approved ordinary parking consumer stage — 2026-10-07

Candidate **0.7.61.0**, commit `a2ded6f2109cfed726de24c9d730a0d13957d7bd`, in [SRank PR #25](https://github.com/MarshalTitan/SRankSentinel/pull/25), extends session opt-in to ordinary **pre-tag protected flight parking** only after the existing path AND landing-ground-connectivity validation. Core receives a one-use immutable approved route; its query phase here accepts prevalidated consumer data rather than issuing a new unprotected query. Fresh entity/zone/path/clearance checks precede following; zero parking retries forbid requery outside approval. Original point selection, crowd safety, preference bookkeeping, alignment/landing revalidation and kill/reset/tag/return semantics remain consumer-owned. Planned landing handoff cancels the Core lease before legacy landing and records the correlated ParkingLandingHandoff event/last Core state. SS, unprotected fallback and post-tag retreat remain legacy. Failure stops proving/Sentinel, retains the hunt and exports; off during shared parking returns to LocateMark for safe legacy resampling.

The user reports physical unmount/landing and confirms cancellation stopped movement and resume landed. Inspected 0.7.60.0 excerpts: ProbeCancelled for `2d7c66c4-9243-41ed-b792-a6ed043477d0` at **15:37:23.812 UTC**; distinct replacement `75ac0f50-ebca-443c-aad4-9c4cfe4c6fc5` recorded **Landing → Arrived / GroundConfirmed** at **15:37:29.918 UTC**, ready/current-zone mesh and Following=false. Classify **PASS — scoped physical landing/cancellation/replacement**, based on the human report plus inspected transition/session excerpts. PhysicalContext/Result fields and the full attachments were not readable/contained in the excerpts; do not claim independent inspection of Grounded/InFlight fields or every cancellation race. No repeat 0.7.60.0 test is required. This closes the isolated mechanics landing gate, not actual shared hunt policy integration.

The shared layer has no hunt center, crowd model, target scoring or tag semantics. Consumer-held approval includes route/zone/entity identity only in memory, is cleared on cancellation and is excluded from sanitized exports. Core's actor remains the sole movement owner; no approval/task continuation can submit a route or stop a successor. Published Core 0.4.1 APIs/packages are sufficient; no Core re-release or unrelated consumer upgrade is needed.

Reviewed priority edges: revoke the old lease before any legacy parking replan/fallback follower; death yields ownership before Raise recovery. Preserve a failed parking rollback marker so explicit off resamples through LocateMark even after halt already cancelled the operation. No automatic fallback is added.

Unconfirmed follower stop during a policy replan blocks any replacement submission and disables Sentinel. Explicit off likewise keeps the parking rollback marker until stop confirmation. This failure behavior is covered in isolated consumer tests.
