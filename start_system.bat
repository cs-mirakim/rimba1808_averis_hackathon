@echo off
title Averis Shipping Document Verification Dashboard
color 0A

echo ======================================================================
echo    AVERIS SHIPPING DOCUMENT VERIFICATION ENGINE
echo    Autonomous Triage and Discrepancy Matching System
echo ======================================================================
echo.

set "PATH=C:\Program Files\nodejs;%PATH%"

cd /d "%~dp0web"

if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing web dependencies...
    call npm install
)

echo [INFO] Starting Next.js Web Server...
echo [INFO] Dashboard will open automatically at http://localhost:3000
echo.
echo ======================================================================
echo   System is LIVE! Any file or code changes will AUTO-RELOAD.
echo   Keep this terminal window open while using the dashboard.
echo   To stop the server, press Ctrl+C in this window.
echo ======================================================================
echo.

:: Open browser with a slight delay so Next.js server initializes first
start "" /b cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"

call npm run dev

echo.
echo Server has stopped.
pause
