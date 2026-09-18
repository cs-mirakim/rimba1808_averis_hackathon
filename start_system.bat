@echo off
title Averis Shipping Document Verification Dashboard

echo ======================================================================
echo    AVERIS SHIPPING DOCUMENT VERIFICATION ENGINE
echo    Autonomous Triage and Discrepancy Matching System
echo ======================================================================
echo.

cd /d "%~dp0web"

echo [1/2] Opening browser at http://localhost:3000...
start "" http://localhost:3000

echo [2/2] Launching Next.js Dev Server with Auto-Reload...
echo.
echo ======================================================================
echo   System is LIVE! Any file or code changes will AUTO-RELOAD in browser.
echo   Keep this terminal window open while using the dashboard.
echo   To stop the server, press Ctrl+C in this window.
echo ======================================================================
echo.

call npm run dev

echo.
echo Server has stopped.
pause
