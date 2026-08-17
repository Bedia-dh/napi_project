# One-time restructuring script for the Payload CMS integration.
#
# Why this exists: Payload's Next.js integration requires the admin dashboard
# (app/(payload)/...) to have its own independent root <html>/<body>, separate
# from the public site's root layout. Next.js only allows that when there is
# NO top-level app/layout.tsx -- every route must live inside a route group
# that owns its own layout. This script moves the site's existing pages into
# app/(frontend)/ and removes the old top-level layout, so both groups can
# coexist. The app/(payload)/... admin files were already created for you.
#
# Run this ONCE, from the project root:
#   powershell -ExecutionPolicy Bypass -File scripts/migrate-frontend-group.ps1

$ErrorActionPreference = "Stop"
$appDir = Join-Path $PSScriptRoot "..\app"
$frontendDir = Join-Path $appDir "(frontend)"

if (Test-Path (Join-Path $frontendDir "layout.tsx")) {
    Write-Host "app/(frontend)/layout.tsx already exists -- migration looks like it already ran. Aborting." -ForegroundColor Yellow
    exit 0
}

New-Item -ItemType Directory -Force -Path $frontendDir | Out-Null

# Top-level files/folders that belong to the public site and must move
# into app/(frontend)/. Deliberately NOT included: api/ (custom route
# handlers work fine outside any route group) and (payload)/ (already
# in its own group).
$itemsToMove = @(
    "layout.tsx",
    "globals.css",
    "page.tsx",
    "favicon.ico",
    "about",
    "contact",
    "events",
    "get-involved",
    "programs",
    "research"
)

foreach ($item in $itemsToMove) {
    $src = Join-Path $appDir $item
    if (Test-Path $src) {
        Write-Host "Moving $item -> app/(frontend)/$item"
        Move-Item -Path $src -Destination $frontendDir -Force
    } else {
        Write-Host "Skipping $item (not found, may have already moved)" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "Done. app/ should now contain only: api/, (frontend)/, (payload)/" -ForegroundColor Green
Write-Host "Next steps:"
Write-Host "  1. npm install"
Write-Host "  2. Copy .env.example to .env.local and fill in DATABASE_URI + PAYLOAD_SECRET"
Write-Host "  3. npm run dev"
Write-Host "  4. Visit /admin to create your first admin user"
Write-Host "  5. npm run seed  (populates MongoDB with the real NAPI content)"
