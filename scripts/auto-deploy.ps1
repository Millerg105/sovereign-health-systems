# Auto-Deploy Script for Sovereign Health Systems
# Runs every 5-10 minutes to push changes to live domain

$ErrorActionPreference = "Continue"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Auto-Deploy to sovereignhs.co.uk" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check for changes
Write-Host "[1/4] Checking for changes..." -ForegroundColor Yellow
$status = git status --porcelain
if (-not $status) {
    Write-Host "✓ No changes detected - skipping deployment" -ForegroundColor Green
    exit 0
}

# Stage all changes
Write-Host "[2/4] Staging changes..." -ForegroundColor Yellow
git add .
Write-Host "✓ Changes staged" -ForegroundColor Green

# Commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Auto-deploy: $timestamp"
Write-Host "[3/4] Committing changes..." -ForegroundColor Yellow
git commit -m "$commitMessage"
Write-Host "✓ Changes committed" -ForegroundColor Green

# Push to main branch
Write-Host "[4/4] Pushing to GitHub (triggers Vercel deployment)..." -ForegroundColor Yellow
git push origin main
Write-Host "✓ Pushed to GitHub successfully" -ForegroundColor Green

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ Auto-deploy complete!" -ForegroundColor Green
Write-Host "Vercel will deploy to sovereignhs.co.uk automatically" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
