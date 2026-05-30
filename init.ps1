$ErrorActionPreference = "Stop"

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $rootDir

Write-Host "==> Working directory: $PWD"
Write-Host "==> Syncing dependencies"
pnpm install

Write-Host "==> Running baseline verification"
pnpm test

Write-Host "==> Startup command"
Write-Host "    pnpm run dev"

if ($env:RUN_START_COMMAND -eq "1") {
  Write-Host "==> Starting the app"
  pnpm run dev
}
else {
  Write-Host "Set RUN_START_COMMAND=1 if you want init.ps1 to launch the app directly."
}
