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

$requiredText = @('Author', 'Name', 'Punchline', 'Description', 'InternalName', 'AssemblyVersion', 'RepoUrl', 'IconUrl', 'DownloadLinkInstall', 'DownloadLinkUpdate')
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
        if ([string]$entry.TestingAssemblyVersion -ne [string]$entry.AssemblyVersion) {
            throw "TestingAssemblyVersion must match AssemblyVersion for $($entry.InternalName)."
        }
        if ([int]$entry.DalamudApiLevel -le 0 -or [int]$entry.TestingDalamudApiLevel -ne [int]$entry.DalamudApiLevel) {
            throw "Invalid Dalamud API metadata for $($entry.InternalName)."
        }

        foreach ($property in @('RepoUrl', 'IconUrl', 'DownloadLinkInstall', 'DownloadLinkUpdate', 'DownloadLinkTesting')) {
            if ([string]$entry.$property -notmatch '^https://') {
                throw "$property must use HTTPS for $($entry.InternalName)."
            }
        }

        if ([string]$entry.DownloadLinkInstall -notmatch '^https://github\.com/[^/]+/[^/]+/releases/download/v[^/]+/[^/]+\.zip$') {
            throw "Install URL is not a permanent GitHub Release ZIP for $($entry.InternalName)."
        }
        if ($entry.DownloadLinkUpdate -ne $entry.DownloadLinkInstall -or $entry.DownloadLinkTesting -ne $entry.DownloadLinkInstall) {
            throw "Install, update, and testing URLs must identify the same published ZIP for $($entry.InternalName)."
        }

        if ($VerifyRemoteAssets) {
            $entryRoot = Join-Path $testRoot ([string]$entry.InternalName)
            New-Item -ItemType Directory -Path $entryRoot | Out-Null

            $iconPath = Join-Path $entryRoot 'icon.png'
            Invoke-WebRequest -Uri $entry.IconUrl -OutFile $iconPath -MaximumRedirection 10
            $iconBytes = [System.IO.File]::ReadAllBytes($iconPath)
            if ($iconBytes.Length -lt 24 -or $iconBytes[0] -ne 0x89 -or $iconBytes[1] -ne 0x50 -or $iconBytes[2] -ne 0x4E -or $iconBytes[3] -ne 0x47) {
                throw "IconUrl is not a valid PNG for $($entry.InternalName)."
            }

            $packagePath = Join-Path $entryRoot 'plugin.zip'
            Invoke-WebRequest -Uri $entry.DownloadLinkInstall -OutFile $packagePath -MaximumRedirection 10
            $installRoot = Join-Path $entryRoot 'fresh-install'
            Expand-Archive -LiteralPath $packagePath -DestinationPath $installRoot -Force

            foreach ($extension in @('dll', 'json', 'deps.json')) {
                $requiredFile = "$($entry.InternalName).$extension"
                if (-not (Test-Path -LiteralPath (Join-Path $installRoot $requiredFile) -PathType Leaf)) {
                    throw "Fresh install for $($entry.InternalName) is missing top-level file $requiredFile."
                }
            }

            $nestedZip = Get-ChildItem -LiteralPath $installRoot -Recurse -File -Filter '*.zip' | Select-Object -First 1
            if ($null -ne $nestedZip) {
                throw "Fresh install for $($entry.InternalName) contains a nested ZIP."
            }

            $pluginManifest = Get-Content -LiteralPath (Join-Path $installRoot "$($entry.InternalName).json") -Raw | ConvertFrom-Json
            foreach ($property in @('InternalName', 'Name', 'Author', 'AssemblyVersion', 'DalamudApiLevel')) {
                if ([string]$pluginManifest.$property -ne [string]$entry.$property) {
                    throw "Package manifest field '$property' does not match the catalog for $($entry.InternalName)."
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
        Write-Host 'Fresh-install simulation passed for every public catalog entry.'
    }
}
finally {
    if ($VerifyRemoteAssets -and (Test-Path -LiteralPath $testRoot)) {
        Remove-Item -LiteralPath $testRoot -Recurse -Force
    }
}
