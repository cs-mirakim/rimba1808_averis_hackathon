@echo off
title Averis Shipping Document Verification Dashboard
color 0A

echo ======================================================================
echo    AVERIS SHIPPING DOCUMENT VERIFICATION ENGINE
echo    Autonomous Triage & Discrepancy Matching System
echo ======================================================================
echo.

:: 1. Navigate to web directory
cd /d "%~dp0web"

:: 2. Check if port 3000 has a leftover process and terminate it safely
echo [1/3] Preparing clean port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo [INFO] Freeing port 3000 from previous process (PID: %%a)...
    taskkill /f /pid %%a >nul 2>&1
)

:: 3. Check node_modules
if not exist "node_modules\" (
    echo [INFO] Installing required web dependencies (first time only)...
    call npm install
    echo.
)

:: 4. Launch browser after a brief delay so Next.js server is ready to receive requests
echo [2/3] Opening browser at http://localhost:3000 in 4 seconds...
start /b cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:3000"

:: 5. Start dev server with Fast Refresh (Auto-Reload)
echo [3/3] Starting Next.js Dev Server with Fast Refresh (Auto-Reload)...
echo.
echo ======================================================================
echo   * System is LIVE! Any file or code changes will AUTO-RELOAD in browser.
echo   * Keep this terminal window open while using the dashboard.
echo   * To stop the server, press Ctrl + C in this window.
echo ======================================================================
echo.

call npx next dev -p 3000

pause
