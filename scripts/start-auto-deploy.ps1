# Start Auto-Deploy Loop
# Runs deployment every 8 minutes

Write-Host "Starting auto-deployment loop (every 8 minutes)..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

$scriptPath = Join-Path $PSScriptRoot "auto-deploy.ps1"
$interval = 480 # 8 minutes in seconds

while ($true) {
    $nextRun = (Get-Date).AddSeconds($interval).ToString("HH:mm:ss")
    
    # Run deployment
    & $scriptPath
    
    # Wait for next cycle
    Write-Host ""
    Write-Host "Next deployment check at: $nextRun" -ForegroundColor Gray
    Write-Host "Waiting..." -ForegroundColor Gray
    Start-Sleep -Seconds $interval
}
