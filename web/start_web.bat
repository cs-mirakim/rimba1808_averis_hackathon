@echo off
title Averis Shipping Document Verification Dashboard
color 0A

echo ======================================================================
echo    AVERIS SHIPPING DOCUMENT VERIFICATION ENGINE
echo    Autonomous Triage & Discrepancy Matching System
echo ======================================================================
echo.

cd /d "%~dp0"

if not exist "node_modules\" (
    echo [INFO] First time setup: Installing dependencies...
    call npm install
    echo.
)

echo [1/2] Opening browser at http://localhost:3000 in 3 seconds...
start /b cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3000"

echo [2/2] Launching Next.js Dev Server with Fast Refresh (Auto-Reload)...
echo.
echo ======================================================================
echo   * System is LIVE! Any file or code changes will AUTO-RELOAD in browser.
echo   * Press Ctrl + C in this window to stop the server.
echo ======================================================================
echo.

call npm run dev

pause
