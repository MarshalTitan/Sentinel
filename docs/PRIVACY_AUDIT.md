# Public tester-identity cleanup

Completed 18 November 2026. This record intentionally uses generic tester labels.

## Scope and previous work

Audited every public Sentinel repository under MarshalTitan: Sentinel, SentinelCore,
SRankSentinel, PvPSentinel, SentinelHUD, ClassySentinel, SentinelProfiles,
SentinelRelay, SentinelHub, and SentinelRemote. The catalog's separate SentinelHunts
product was included within SRankSentinel. No additional public Sentinel repository
was found.

The previous session had already sanitized the four central testing/release documents,
SRank remote-recovery procedure, Relay remote-control procedure and host examples,
Relay test-instance labels, five MIT attribution lines, Core build attribution, and
Remote widget assertions. It had also sanitized Sentinel PR 33 and Relay PR 11.
Those changes were retained. No MIT permission or warranty terms changed.

## Remaining gap and completed delivery

Direct inspection found no remaining personal labels in default-branch text or
filenames. Expanding NuGet and installable ZIP archives uncovered legacy personal
copyright attribution in Core package metadata and assembly attributes/resources.
The old Core assemblies were still bundled by seven current plugins and vendored
in five source trees. A plain text search of compressed files missed this content.

Published compatible metadata-only Core releases:

| Package release | Source commit | Preserved assembly binding version |
|---|---|---|
| 0.3.1.1 | `2dc7cd22a7337420918a3639f9c91139651ca9e2` | 0.3.1.0 |
| 0.4.1.1 | `e351650789f65304fe5a4ad3bb8cb190e62fe3d3` | 0.4.1.0 |

Both releases use project copyright attribution. Their C# runtime source is identical
to the corresponding previous release. Packages have new immutable versions, recorded
SHA-256/SHA-512 hashes, and verified public downloads. Existing release assets remain
unchanged.

| Plugin | Privacy maintenance version | Core package line |
|---|---|---|
| SRankSentinel | 0.7.72.0 | 0.3.1.1 |
| PvPSentinel | 0.3.1.24 | 0.3.1.1 |
| ClassySentinel | 0.8.6.1 | 0.3.1.1 |
| SentinelProfiles | 0.2.1.15 | 0.3.1.1 |
| SentinelRelay | 0.5.0.9 | 0.3.1.1 |
| SentinelHUD | 0.8.9.4 | 0.3.1.1 |
| SentinelHub | 0.9.0.1 | 0.4.1.1 |

Dependency pins, vendored archives, hashes, lock files, package validators, and the HUD
Core submodule were updated together. Plugin runtime C# source was not changed.
Relay's live update was built from its existing 0.5 maintenance branch, preserving
live behavior while its default branch retains the separate unpublished mobile work.
SentinelHunts required no new release. SentinelRemote's default branch required no
further changes.

Open SRank PR 25, Relay PRs 19/20/21, and Remote PR 2 received forward-only privacy
cleanup of their labels and dependencies where applicable. Their feature scope,
versions, merge state, and publication decisions were retained. Current central
procedure links now use the sanitized Relay default-branch procedure.

## Verification

- Cloned complete repositories and scanned tracked paths and file contents directly,
  independently of GitHub code search. Expanded current vendored packages, Core
  releases, and installable ZIPs; checked UTF-8 and UTF-16 assembly metadata.
- Inspected repository metadata, all issue/PR titles and bodies, issue comments,
  inline comments, review submissions, commit comments, and release descriptions.
  No published wikis or enabled discussions existed. Checked the current icons and
  image references; no tester screenshots were present.
- Built both Core lines and every changed plugin. Core tests, plugin policy/state
  tests, native UI tests where provided, locked restores, package identity/layout
  validation, and source contract audits passed. Active candidate builds and
  applicable regression tests were also checked. No in-game or private Discord
  acceptance is claimed by this maintenance audit.
- No runtime dependency on either original tester's literal identity was found.
  Relay's Content-ID profile keys, character/home-world fields, configuration schema,
  webhooks, channel/user bindings, keywords, notification rules, screenshots, and
  remote-control permissions remain unchanged. Existing serialization, routing,
  authorization, screenshot and SRank-control regressions passed.
- Re-ran the complete case-insensitive identifier set and derived-label searches.
  Current default branches, open candidate heads, current vendored packages, and
  current distributed packages contain zero personal tester-identity matches.

## Validation detail

The final scan covered 215 issue/PR records and 240 release descriptions, with no
remaining metadata matches. Thirty-one expanded current archives (209 entries),
all ten default branches, and all five open candidate heads passed the identity scan.
The eight central entries exactly match their authoritative child objects.

Both Core build/test/package/public-hash workflows and all seven plugin release
workflows passed. Sentinel catalog tests passed 33 cases; token-free public
distribution checks passed. The Remote Android candidate passed analysis, protocol
and widget tests, and APK build.

Existing **unpublished** Relay gamepad proofs remain separate failures: PR 19
([baseline run](https://github.com/MarshalTitan/SentinelRelay/actions/runs/39354566538))
and PR 20
([baseline run](https://github.com/MarshalTitan/SentinelRelay/actions/runs/39369734313))
already failed their input-backend proof before this audit. Current proving runs
still expose a strict packet round-trip failure on Linux and native driver/reboot
availability on Windows. The backend and its proof source were not changed. Local
candidate plugin builds, policy tests, remote foundation tests and input unit tests
passed; their feature release gates remain open. This audit does not certify
physical gamepad input or change those release decisions.

## Historical content retained

Historical references remaining: **YES**. Old commits, historical tag/source
snapshots, closed branch tips, merged-PR commit/diff history, and superseded Core or
plugin package assets retain earlier attribution or testing text. Their locations
include historical LICENSE/build metadata, central testing documents, Relay remote
procedures/test fixtures, and Remote widget assertions. Historical commit messages
also retain earlier labels in Sentinel and SRankSentinel.

No force push, tag movement, old-asset replacement, history deletion, or Git rewrite
was performed. A rewrite is not recommended for routine current-state sanitization:
it would disrupt commit references and release provenance, while existing clones
and forks could still retain the original objects. Stronger historical removal is a
separate owner decision. Any future cherry-pick from an older snapshot should repeat
the privacy scan before publication.
