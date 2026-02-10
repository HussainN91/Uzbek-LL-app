$ErrorActionPreference = 'Stop'

$git = 'C:\Program Files\Git\cmd\git.exe'
$repo = 'D:\New folder'

if (-not (Test-Path $git)) {
  Write-Error "Git not found at $git"
}

Set-Location $repo

$status = & $git -C $repo status --porcelain
if (-not $status) {
  Write-Output 'No changes to commit.'
  exit 0
}

& $git -C $repo add -A
$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm'
& $git -C $repo commit -m "Nightly backup $timestamp"
& $git -C $repo push origin HEAD
