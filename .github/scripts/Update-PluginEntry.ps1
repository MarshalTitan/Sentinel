param(
    [Parameter(Mandatory = $true)]
    [string]$ManifestPath,

    [Parameter(Mandatory = $true)]
    [string]$InternalName,

    [Parameter(Mandatory = $true)]
    [string]$Version,

    [string]$ReleaseAssetUrl = ''
)

$ErrorActionPreference = 'Stop'

if ($Version -notmatch '^\d+\.\d+\.\d+\.\d+$') {
    throw "Version must contain four numeric components: $Version"
}

$entries = @(Get-Content -LiteralPath $ManifestPath -Raw | ConvertFrom-Json)
$matches = @($entries | Where-Object { $_.InternalName -eq $InternalName })
if ($matches.Count -ne 1) {
    throw "Expected exactly one '$InternalName' entry; found $($matches.Count)."
}

$entry = $matches[0]
if ([string]::IsNullOrWhiteSpace($ReleaseAssetUrl)) {
    $currentUrl = [string]$entry.DownloadLinkInstall
    if ($currentUrl -notmatch '^https://github\.com/[^/]+/[^/]+/releases/download/v[^/]+/[^/]+\.zip$') {
        throw "Cannot derive the next release URL from '$currentUrl'. Supply ReleaseAssetUrl explicitly."
    }

    $ReleaseAssetUrl = $currentUrl -replace '/releases/download/v[^/]+/', "/releases/download/v$Version/"
}

if ($ReleaseAssetUrl -notmatch '^https://github\.com/[^/]+/[^/]+/releases/download/v[^/]+/[^/]+\.zip$') {
    throw "ReleaseAssetUrl must be a permanent public GitHub Release ZIP URL: $ReleaseAssetUrl"
}

$entry.AssemblyVersion = $Version
$entry.TestingAssemblyVersion = $Version
$entry.DownloadLinkInstall = $ReleaseAssetUrl
$entry.DownloadLinkUpdate = $ReleaseAssetUrl
$entry.DownloadLinkTesting = $ReleaseAssetUrl
$entry.LastUpdate = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()

$json = ConvertTo-Json -InputObject @($entries) -Depth 30
$resolvedPath = (Resolve-Path -LiteralPath $ManifestPath).Path
[System.IO.File]::WriteAllText($resolvedPath, $json + [Environment]::NewLine, [System.Text.UTF8Encoding]::new($false))

Write-Host "Updated only $InternalName to $Version."
