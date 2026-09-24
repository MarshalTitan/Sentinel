param(
    [Parameter(Mandatory = $true)]
    [string]$CatalogPath,

    [switch]$VerifyRemoteAssets,

    [string]$ExpectedInternalName = '',

    [string]$ExpectedVersion = ''
)

$ErrorActionPreference = 'Stop'

$entries = @(Get-Content -LiteralPath $CatalogPath -Raw | ConvertFrom-Json)
if ($entries.Count -eq 0) {
    throw 'repo.json must contain at least one plugin entry.'
}

$requiredText = @('Author', 'Name', 'Punchline', 'Description', 'InternalName', 'AssemblyVersion', 'TestingAssemblyVersion', 'RepoUrl', 'DownloadLinkInstall', 'DownloadLinkUpdate', 'DownloadLinkTesting')
$seenInternalNames = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$seenNames = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$temporaryBase = if ([string]::IsNullOrWhiteSpace($env:RUNNER_TEMP)) {
    [System.IO.Path]::GetTempPath()
}
else {
    $env:RUNNER_TEMP
}
$testRoot = Join-Path $temporaryBase ("dalamud-catalog-test-" + [Guid]::NewGuid().ToString('N'))

if ($VerifyRemoteAssets) {
    New-Item -ItemType Directory -Path $testRoot | Out-Null
}

try {
    foreach ($entry in $entries) {
        foreach ($property in $requiredText) {
            if ([string]::IsNullOrWhiteSpace([string]$entry.$property)) {
                throw "Catalog entry is missing required field '$property'."
            }
        }

        if (-not $seenInternalNames.Add([string]$entry.InternalName)) {
            throw "Duplicate InternalName: $($entry.InternalName)"
        }
        if (-not $seenNames.Add([string]$entry.Name)) {
            throw "Duplicate Name: $($entry.Name)"
        }
        if ([string]$entry.AssemblyVersion -notmatch '^\d+\.\d+\.\d+\.\d+$') {
            throw "Invalid AssemblyVersion for $($entry.InternalName): $($entry.AssemblyVersion)"
        }
        if ([string]$entry.TestingAssemblyVersion -notmatch '^\d+\.\d+\.\d+\.\d+$') {
            throw "Invalid TestingAssemblyVersion for $($entry.InternalName): $($entry.TestingAssemblyVersion)"
        }
        if ([int]$entry.DalamudApiLevel -le 0 -or [int]$entry.TestingDalamudApiLevel -le 0) {
            throw "Invalid Dalamud API metadata for $($entry.InternalName)."
        }

        foreach ($property in @('RepoUrl', 'DownloadLinkInstall', 'DownloadLinkUpdate', 'DownloadLinkTesting')) {
            if ([string]$entry.$property -notmatch '^https://') {
                throw "$property must use HTTPS for $($entry.InternalName)."
            }
        }
        if (-not [string]::IsNullOrWhiteSpace([string]$entry.IconUrl) -and [string]$entry.IconUrl -notmatch '^https://') {
            throw "IconUrl must use HTTPS for $($entry.InternalName)."
        }

        foreach ($property in @('DownloadLinkInstall', 'DownloadLinkTesting')) {
            if ([string]$entry.$property -notmatch '^https://github\.com/[^/]+/[^/]+/releases/download/v[^/]+/[^/]+\.zip$') {
                throw "$property is not a permanent GitHub Release ZIP for $($entry.InternalName)."
            }
        }
        if ($entry.DownloadLinkUpdate -ne $entry.DownloadLinkInstall) {
            throw "Install and update URLs must identify the same published ZIP for $($entry.InternalName)."
        }

        if ($VerifyRemoteAssets) {
            $entryRoot = Join-Path $testRoot ([string]$entry.InternalName)
            New-Item -ItemType Directory -Path $entryRoot | Out-Null

            if (-not [string]::IsNullOrWhiteSpace([string]$entry.IconUrl)) {
                $iconPath = Join-Path $entryRoot 'icon.png'
                Invoke-WebRequest -Uri $entry.IconUrl -OutFile $iconPath -MaximumRedirection 10
                $iconBytes = [System.IO.File]::ReadAllBytes($iconPath)
                if ($iconBytes.Length -lt 24 -or $iconBytes[0] -ne 0x89 -or $iconBytes[1] -ne 0x50 -or $iconBytes[2] -ne 0x4E -or $iconBytes[3] -ne 0x47) {
                    throw "IconUrl is not a valid PNG for $($entry.InternalName)."
                }
            }

            $packages = @(
                [pscustomobject]@{
                    Label = 'stable'
                    Url = [string]$entry.DownloadLinkInstall
                    Version = [string]$entry.AssemblyVersion
                    ApiLevel = [int]$entry.DalamudApiLevel
                },
                [pscustomobject]@{
                    Label = 'testing'
                    Url = [string]$entry.DownloadLinkTesting
                    Version = [string]$entry.TestingAssemblyVersion
                    ApiLevel = [int]$entry.TestingDalamudApiLevel
                }
            )

            foreach ($package in $packages) {
                if ($package.Label -eq 'testing' -and
                    $package.Url -eq [string]$entry.DownloadLinkInstall -and
                    $package.Version -eq [string]$entry.AssemblyVersion -and
                    $package.ApiLevel -eq [int]$entry.DalamudApiLevel) {
                    continue
                }

                $variantRoot = Join-Path $entryRoot $package.Label
                New-Item -ItemType Directory -Path $variantRoot | Out-Null
                $packagePath = Join-Path $variantRoot 'plugin.zip'
                Invoke-WebRequest -Uri $package.Url -OutFile $packagePath -MaximumRedirection 10
                $installRoot = Join-Path $variantRoot 'fresh-install'
                Expand-Archive -LiteralPath $packagePath -DestinationPath $installRoot -Force

                foreach ($extension in @('dll', 'json', 'deps.json')) {
                    $requiredFile = "$($entry.InternalName).$extension"
                    if (-not (Test-Path -LiteralPath (Join-Path $installRoot $requiredFile) -PathType Leaf)) {
                        throw "$($package.Label) fresh install for $($entry.InternalName) is missing top-level file $requiredFile."
                    }
                }

                $nestedZip = Get-ChildItem -LiteralPath $installRoot -Recurse -File -Filter '*.zip' | Select-Object -First 1
                if ($null -ne $nestedZip) {
                    throw "$($package.Label) fresh install for $($entry.InternalName) contains a nested ZIP."
                }

                $pluginManifest = Get-Content -LiteralPath (Join-Path $installRoot "$($entry.InternalName).json") -Raw | ConvertFrom-Json
                foreach ($property in @('InternalName', 'Name', 'Author')) {
                    if ([string]$pluginManifest.$property -ne [string]$entry.$property) {
                        throw "$($package.Label) package manifest field '$property' does not match the catalog for $($entry.InternalName)."
                    }
                }
                if ([string]$pluginManifest.AssemblyVersion -ne [string]$package.Version) {
                    throw "$($package.Label) package version for $($entry.InternalName) is $($pluginManifest.AssemblyVersion); expected $($package.Version)."
                }
                if ([int]$pluginManifest.DalamudApiLevel -ne [int]$package.ApiLevel) {
                    throw "$($package.Label) package Dalamud API for $($entry.InternalName) is $($pluginManifest.DalamudApiLevel); expected $($package.ApiLevel)."
                }
            }
        }
    }

    if (-not [string]::IsNullOrWhiteSpace($ExpectedInternalName)) {
        $expected = @($entries | Where-Object { $_.InternalName -eq $ExpectedInternalName })
        if ($expected.Count -ne 1) {
            throw "Expected exactly one '$ExpectedInternalName' entry; found $($expected.Count)."
        }
        if (-not [string]::IsNullOrWhiteSpace($ExpectedVersion) -and $expected[0].AssemblyVersion -ne $ExpectedVersion) {
            throw "$ExpectedInternalName reports $($expected[0].AssemblyVersion); expected $ExpectedVersion."
        }
    }

    Write-Host "Validated $($entries.Count) independently versioned plugin catalog entry/entries."
    if ($VerifyRemoteAssets) {
        Write-Host 'Fresh-install simulation passed for every public stable and testing catalog entry.'
    }
}
finally {
    if ($VerifyRemoteAssets -and (Test-Path -LiteralPath $testRoot)) {
        Remove-Item -LiteralPath $testRoot -Recurse -Force
    }
}
