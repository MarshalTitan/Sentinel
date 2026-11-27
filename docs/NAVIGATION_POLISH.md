# Coordinated navigation polish - 27 November 2026

The supported Sentinel interfaces retain their existing Modern 2 theme and functionality. Shared presentation is delivered through compatible Core 0.4.1.3, with separate plugin PRs, versions and normal release workflows. Core remains a bundled development library, not an installed plugin.

## Published versions

| Repository | Version | Reviewed change | Scope |
|---|---|---|---|
| MarshalTitan/SentinelCore | [0.4.1.3](https://github.com/MarshalTitan/SentinelCore/releases/tag/v0.4.1.3) | [PR](https://github.com/MarshalTitan/SentinelCore/pull/6) | Shared presentation library; generic runtime source unchanged |
| MarshalTitan/SRankSentinel | [0.7.79.0](https://github.com/MarshalTitan/SRankSentinel/releases/tag/v0.7.79.0) | [PR](https://github.com/MarshalTitan/SRankSentinel/pull/44) | Navigation, saved disclosures, mode readiness, rounded History bars |
| MarshalTitan/SentinelHUD | [0.8.9.7](https://github.com/MarshalTitan/SentinelHUD/releases/tag/v0.8.9.7) | [PR](https://github.com/MarshalTitan/SentinelHUD/pull/22) | Existing configuration rail and header |
| MarshalTitan/SentinelHub | [0.9.0.5](https://github.com/MarshalTitan/SentinelHub/releases/tag/v0.9.0.5) | [PR](https://github.com/MarshalTitan/SentinelHub/pull/29) | Main navigation plus compact-window header polish |
| MarshalTitan/SentinelProfiles | [0.2.1.17](https://github.com/MarshalTitan/SentinelProfiles/releases/tag/v0.2.1.17) | [PR](https://github.com/MarshalTitan/SentinelProfiles/pull/18) | Primary/secondary navigation, clear page titles |
| MarshalTitan/ClassySentinel | [0.8.6.3](https://github.com/MarshalTitan/ClassySentinel/releases/tag/v0.8.6.3) | [PR](https://github.com/MarshalTitan/ClassySentinel/pull/10) | Settings shell; compact launcher unchanged |
| MarshalTitan/SentinelRelay | [0.5.0.12](https://github.com/MarshalTitan/SentinelRelay/releases/tag/v0.5.0.12) | [PR](https://github.com/MarshalTitan/SentinelRelay/pull/27) | Stable chat plugin UI; future main candidate aligned separately |

Initial implementation was reviewed in [Core PR5](https://github.com/MarshalTitan/SentinelCore/pull/5), [SRank PR43](https://github.com/MarshalTitan/SRankSentinel/pull/43), [HUD PR21](https://github.com/MarshalTitan/SentinelHUD/pull/21), [Hub PR27](https://github.com/MarshalTitan/SentinelHub/pull/27), [Profiles PR17](https://github.com/MarshalTitan/SentinelProfiles/pull/17), [Classy PR9](https://github.com/MarshalTitan/ClassySentinel/pull/9) and [stable Relay PR26](https://github.com/MarshalTitan/SentinelRelay/pull/26). [Hub PR28](https://github.com/MarshalTitan/SentinelHub/pull/28) removes duplicate context captions from single-page floating windows. Final PRs in the table adopt the Core focus-visible correction: mouse clicks no longer leave a decorative hover circle after pointer exit; keyboard/controller focus stays visible. A native geometry regression failed before the fix and passed afterward. Relay [PR25](https://github.com/MarshalTitan/SentinelRelay/pull/25) and [PR28](https://github.com/MarshalTitan/SentinelRelay/pull/28) align the future main candidate without publishing it. Stable 0.5 is built and published from release-0.5; no mobile-candidate functionality is promoted.

## Shared UI contract

Existing `SentinelModernAppShell`, `SentinelModernIconRail` and `SentinelModernSecondaryNavigation` own the same page definitions, actions and hit areas. Idle icons/rows have no permanent outline. Hover uses soft rounded blue/teal fills through existing motion state; selection persists after hover leaves, focus has a clear outline, and reduced motion remains immediate. Secondary labels wrap at enlarged text scales.

`SentinelModernNavigationPresentation` supplies measured, viewport-clamped tooltip bubbles with 12-by-8 logical padding, rounded corners and translucent charcoal backgrounds. Labels are rendered outside the rail child window so its clip rectangle cannot trim them. Header controls retain their callbacks and comfortable hit areas, use drawn down/up chevrons and a more visible X, and show rounded hover/focus fills. Consumer-owned `IsCollapsed` selects the chevron; it does not control plugin state. Selected-page context appears once in the header; compact single-page windows can suppress it.

`SentinelModernDisclosure` is a shared focusable presentation button. It changes only a caller-owned expanded flag. Plugins continue to own navigation, controls, settings, functional modules and themes. Classic/native title bars and small utility interfaces retain their existing structure.

Core source is [0d59460cc592f1589600e11e4e9e04478667b629](https://github.com/MarshalTitan/SentinelCore/commit/0d59460cc592f1589600e11e4e9e04478667b629). UI package SHA-256: `e24369d5736eb3c10939de6c1e3f7565c06b34943a98dce4df9ec84a9662189c`. Each consumer records immutable SHA-256 pins and release SHA-512 lock values; CI downloads and verifies packages before locked restore and checks packaged assemblies. Existing public constructors/callbacks remain available; all affected consumers are rebuilt and tested. This package adoption does not activate shared movement or merge SRank proving PR25.

## SRank presentation changes

- Expansion Hunting, Data Center Hunting and Tagging remember collapse state. Existing configurations default to expanded. Recovery has no disclosure and sits outside the scrolling settings child at the bottom; existing safety actions and settings remain available.
- The two distance cards collapse independently. Sliders, bounds, values, saving and distance calculations are preserved.
- Normal Tagging contains vnavmesh, Lifestream, HuntAlerts and Sonar once. Movement and World travel are required; at least one configured alert provider is needed. Combat plugins are optional and visually neutral when that mode is off.
- Full Combat Assist reuses those four integrations and shows BossMod plus the two rotation alternatives. The selected-mode summary uses existing read-only readiness signals; opening groups cannot enable plugins, change modes or acquire leases. The existing RSR handoff remains NOT READY because its IPC cannot verify job readiness and exclusive rotation control. This UI work does not change that integration or claim RSR is ready from installation alone.
- The History graph retains its two colours, seven-day grouping, proportions, legend, hover targets, metrics and reports/tagged/confirmed footer. Only outer corners are rounded; stack seams stay flat and gap-free. Spawn Reports remembers its disclosure state without deleting or changing records.

## Validation and limits

| Repository | Automated validation |
|---|---|
| Core | Zero-warning build; 9 generic and 12 UI groups, including 24 native size/UI-scale/text-scale combinations, each checked expanded and collapsed, input callbacks, mouse-pointer-exit focus regression and tooltip viewport containment |
| SRank | Build; 7 remote recovery, 152 state and 53 UI groups; mouse/keyboard/gamepad disclosures, persistence, Recovery bounds, saved placement, History and readiness; unchanged hunt-source audit |
| HUD | Build; 80 core and 19 native UI/configuration groups, plus pinned Core native tests and public package validation |
| Hub | Build; 139 policy groups and native UI suites including 1176 page/state/width/theme/scale cases, floating-window collapse/close and persistence |
| Profiles | Build/package validation; 23 profile behavior, persistence and IPC tests |
| Classy | Build/package validation; 17 controller/gear-set/configuration regressions |
| Relay | Stable build/package validation and 58 policy tests; main candidate 57 tests and remote-foundation CI |
| Catalog | Generator/registry tests, schema and public asset validation, exact child/central readback and Linux/Windows distribution checks |

Actual native ImGui fixture renders were visually inspected for Main, collapsed settings, Distance Profiles, Plugins/tooltips and History. These are renderer fixtures, not screenshots from FFXIV. Actual in-game visual/controller acceptance remains separate; automated evidence is not a blanket claim of gameplay acceptance. SRank retains one existing nullable warning and an existing test reference-comparison warning.

The scope audit found 449 existing C# files unchanged across the audited branch snapshots. SRank Configuration differs only by the UI-preference property; its History aggregation and footer code are identical. Hunt detection, parsing, navigation, World Visit, tagging, combat adapters, queue/SS policy, reward/credit detection and recovery services are unchanged. Relay Content-ID profiles, webhooks, channels, keywords, replies, screenshots and remote controls retain their code and configuration schema. Profiles persistence, HUD runtime overlays and Classy gear-set/controller behavior remain unchanged.

## Intentionally unchanged

No sidebar is added to the compact Classy launcher, quick-switch overlays, gameplay HUD elements or native/modal utility interfaces. Classic remains available. Existing Hub floating windows receive only their shared custom-header polish. Retired SentinelRemote, PvPSentinel, SentinelHunts and MinionFrontline projects are not modified or reintroduced. Unrelated feature/proving PRs remain separate and unmerged.

## Focused in-game visual acceptance

Update the six plugins through the existing Sentinel repository. In each Modern settings window, move over and away from sidebar and header buttons, then navigate with keyboard/controller. Expect borderless idle icons, retained selected-page highlights, fully padded labels, matching header page context and down/up minimize/restore chevrons. Close/reopen and resize at preferred game/UI/text scales; configuration and plugin enabled state must remain unchanged by navigation.

In SRank Main, collapse each settings section and confirm Recovery remains visible; then restore the sections and verify their settings. Collapse each Distance card and Spawn Reports, reopen the window/reload and verify saved disclosure state, unchanged values/history and the original two-colour seven-day graph. On Plugins, opening either group must not change mode or plugin state; Normal Tagging must remain healthy with combat assist off. Report the exact version, page, scale and symptom for a failure. Rollback is the preceding plugin release; do not delete local configuration.
