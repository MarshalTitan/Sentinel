# MarshalTitan Dalamud Plugins

This repository is the public catalog for independently versioned Dalamud plugins maintained by MTitan.

Add this URL under **Dalamud Settings → Experimental → Custom Plugin Repositories**:

```text
https://raw.githubusercontent.com/MarshalTitan/Sentinel/main/repo.json
```

Then open `/xlplugins`, search for the plugin, and choose **Install**.

## Architecture

`repo.json` is a normal JSON array with one object per plugin. Each plugin keeps its source, build workflow, releases, installable ZIP, icon, and independent version in its own GitHub repository. This catalog only advertises those permanent public assets.

The catalog currently contains S Rank Sentinel. Future plugins are added as new objects; they are not bundled with or versioned alongside S Rank Sentinel.

## Migration from the SRankSentinel-specific URL

The old URL remains supported during migration:

```text
https://raw.githubusercontent.com/MarshalTitan/SRankSentinel/main/repo.json
```

To switch without losing settings:

1. Add the new central URL and save Dalamud settings.
2. Confirm S Rank Sentinel appears and has the correct icon/version. A temporary duplicate is expected while both URLs are enabled.
3. Remove only the old SRankSentinel-specific URL, then save and refresh `/xlplugins`.
4. Do not uninstall S Rank Sentinel. Its existing plugin configuration remains in Dalamud and normal updates continue against the same `InternalName`.

## Publishing updates

The **Update Plugin Entry** workflow changes exactly one existing object, selected by its unique `InternalName`. It updates that plugin's versions and release URLs, validates every catalog entry, commits `repo.json`, and confirms the public catalog after GitHub's raw-content cache updates.

For a manual update, run the workflow with the plugin's `InternalName` and new four-part version after its GitHub Release asset is public.

Individual plugin repositories may automate the same operation with a fine-grained token stored only as a GitHub Actions secret. The token must be limited to this repository with **Contents: Read and write** permission. Never put a token in source, logs, a release asset, or `repo.json`.

## Adding another plugin

Create the new plugin in its own repository and publish a valid permanent GitHub Release ZIP first. Add one new catalog object with a unique `InternalName`, its own version and metadata, and URLs pointing to that repository's release asset and icon. Run the validation workflow before enabling automated cross-repository updates from the new plugin project.
