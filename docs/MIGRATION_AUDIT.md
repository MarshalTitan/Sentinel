# Self-Healing Catalog Migration Audit

Audit date: 2026-10-05

The current public `MarshalTitan/Sentinel/repo.json`, each registered child manifest, and each
advertised GitHub Release ZIP were checked before enabling generation. Release packages were
downloaded and inspected for a non-empty archive, top-level plugin DLL, plugin manifest,
`deps.json`, matching `InternalName`, matching four-part version, and Dalamud API level 15.

| Source repository | InternalName | Child manifest before reconciliation | Central version | Release ZIP | Reconciliation |
|---|---|---:|---:|---|---|
| `SRankSentinel` | `SRankSentinel` | `0.7.49.0` | `0.7.49.0` | Valid | Aligned `LastUpdate` with the current central entry |
| `ClassySentinel` | `ClassySentinel` | `0.8.4.0` | `0.8.4.0` | Valid | Aligned the authoritative description with the current central entry |
| `PvPSentinel` | `PvPSentinel` | Missing | `0.3.1.21` | Valid | Created root `repo.json` from the verified central entry and release |
| `SRankSentinel` | `SentinelHunts` | `0.1.1.0` | `0.1.1.0` | Valid | None |
| `SentinelProfiles` | `SentinelProfiles` | `0.2.1.0` | `0.2.1.0` | Valid | Aligned `LastUpdate` with the current central entry |
| `SentinelRelay` | `SentinelRelay` | `0.5.0.2` | `0.5.0.2` | Valid | None |
| `SentinelHUD` | `SentinelHUD` | `0.7.3.0` | `0.8.3.3` | Valid | Updated the stale child entry to the verified current release and central metadata |

`SentinelCore` was inspected as a shared-library project and deliberately excluded from the
installable plugin registry.

After reconciliation, generation from the child manifests produces a `repo.json` that is
byte-for-byte identical to the pre-migration central catalog. No plugin is downgraded, removed, or
reordered by the first generator run.
