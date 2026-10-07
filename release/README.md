# Shared release distribution

This is CI infrastructure, not a runtime plugin dependency. Pin `.github/actions/distribute` to an audited full commit SHA in each child workflow. Run only after the child's public release ZIP has passed its package validator.

The action promotes exactly one approved identity in the child's root `repo.json` using its own GITHUB_TOKEN, conditional blob-SHA writes and bounded conflict retries. It preserves siblings (including SentinelHunts), refuses downgrades and concurrent metadata changes, and makes unchanged reruns a no-op. It never writes the central repository. Optional DALAMUD_CATALOG_TOKEN is used only for notification. Verification checks the exact public child and central entry regardless of notification outcome, with a 90-minute deadline for hourly reconciliation and runner delay. A delayed/dropped GitHub schedule can still time out; rerun verification after reconciliation.

Read-only recovery: set `publish-child: 'false'` and leave notification-token empty. Existing public manifests must advertise the requested version. CI exercises all seven entries without write or notification credentials on Linux and Windows. A successful read-only smoke does not prove a future release upload or changed child write; those are separately covered by injected conflict/permission tests and must be observed on the next real release.
