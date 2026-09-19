@echo off
title Averis SDOC - Unified System & Pitch Deck Launcher
color 0A

echo ======================================================================
echo    AVERIS SDOC - TEAM RIMBA 0818 (ALL-IN-ONE SYSTEM LAUNCHER)
echo    Averis x Monash Hackathon 2026 Finals
echo ======================================================================
echo.

set "PATH=C:\Program Files\nodejs;%PATH%"

:: 1. Start Pitch Deck Server (Port 8085) in background
echo [1/3] Starting Pitch Deck Web Server on http://127.0.0.1:8085...
start "Averis SDOC - Pitch Deck Server" /min cmd /c "python -m http.server 8085 --bind 127.0.0.1 --directory ""%~dp0pitch"""

:: 2. Check Next.js dependencies
cd /d "%~dp0web"
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing web dependencies...
    call npm install
)

echo [2/3] Preparing browser tabs...
echo       - Tab 1: Interactive Pitch Deck  (http://127.0.0.1:8085)
echo       - Tab 2: Live Operations Dashboard (http://localhost:3000)
echo.

:: Open both browser tabs after a 2-second buffer so both servers are ready
start "" /b cmd /c "timeout /t 2 /nobreak >nul && start http://127.0.0.1:8085 && start http://localhost:3000"

:: 3. Launch Next.js Dev Server in foreground
echo [3/3] Starting Next.js Live Operations Dashboard...
echo ======================================================================
echo   Both services are LIVE!
echo     * Pitch Deck: http://127.0.0.1:8085
echo     * Dashboard:  http://localhost:3000
echo.
echo   Keep this terminal window open during testing/pitching.
echo   To stop all servers, press Ctrl+C in this window.
echo ======================================================================
echo.

call npm run dev

echo.
echo [INFO] Shutting down background Pitch Deck server...
powershell -Command "Get-NetTCPConnection -LocalPort 8085 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"

echo Server has stopped.
pause
