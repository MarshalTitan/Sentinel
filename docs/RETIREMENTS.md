# Retired projects - 21 November 2026

## Current supported inventory

SRankSentinel, ClassySentinel, SentinelProfiles, SentinelRelay, SentinelHUD and SentinelHub remain supported installable plugins. SentinelCore remains a development library. SRankSentinel's normal v0.7.x releases are unaffected.

## Withdrawn projects

| Project | Retirement action | Historical material |
|---|---|---|
| PvPSentinel | Central registry/feed entry removed; direct owning feed empty; publication workflows removed | Repository source, old release records and engineering notes retained as unsupported history |
| SentinelHunts | Both feed entries removed; dedicated build/release workflows and package validator removed; install manifest removed; packaging disabled | Experimental source remains under SRankSentinel/SentinelHunts for reference only |
| SentinelRemote | No central entry or GitHub releases existed; Android artifact workflow removed; standalone client onboarding withdrawn | Repository and protocol/widget source retained as unsupported history |
| MinionFrontline | Already private, absent from catalog, with no releases; abandoned test workflow removed | Private source and notes retained; MINION itself is unchanged |

The three explicitly obsolete experimental Hunts releases and their SentinelHunts.zip assets are withdrawn: v0.1.1.0-sentinelhunts, v0.1.0.0-sentinelhunts and sentinelhunts-v0.1.0.0. Matching Hunts CI installation artifacts are also retired. Their Git tags remain historical source pointers; no normal SRank release/tag is changed.

## Prevention and existing installations

The catalog rejects retired identities in registry and catalog validation, including case variants and last-known-good fallback attempts. The current distribution ownership allowlist contains only supported projects. Retired default-branch publication workflows have been removed. Archiving PvPSentinel, SentinelRemote and MinionFrontline in GitHub Settings is the remaining administrative step; the connector does not provide repository archive/delete controls. Repositories are preserved rather than deleted.

Existing installations are not automatically uninstalled. Old PvPSentinel release files are historical downloads, not a supported feed; its current direct repo.json is empty. Supported Profiles still discovers installed plugins dynamically, so an already-installed unsupported plugin can remain visible as a user-managed entry without being advertised or installed by Sentinel.

HUD 0.8.9.5 removes the retired Frontline companion card and branded help text. Hub 0.9.0.2 removes the same component, quick-open actions, and its dedicated RotationSolver dependency check. All other HUD/Hub behavior and configurations are preserved. Relay's runtime, per-character routing, screenshots and remote recovery remain unchanged. Relay-owned desktop/host names and persisted keys containing SentinelRemote are retained for compatibility; they are not the retired Android repository.

## Historical references retained

Earlier dated canonical records, Core baseline/navigation comparisons, source namespaces and negative retirement tests remain where they explain engineering history or prevent accidental reintroduction. Retirement notices explicitly supersede old installation/publication instructions. Relay remote architecture/setup notes are labelled as engineering history where they refer to the retired Android client; no Relay runtime capability is removed.
