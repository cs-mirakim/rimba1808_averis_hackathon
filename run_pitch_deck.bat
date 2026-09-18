@echo off
title Averis SDOC - Team Rimba 0818 Interactive Pitch Deck
color 0A

echo ======================================================================
echo           AVERIS SDOC - TEAM RIMBA 0818 PITCH DECK LAUNCHER
echo      Averis x Monash Hackathon 2026 Finals Presentation Slides
echo ======================================================================
echo.

cd /d "%~dp0\pitch"

if exist "package.json" (
    echo [INFO] Detected Node.js / Vite Pitch Deck app. Starting server...
    start "" "http://localhost:5173"
    npm run dev
) else (
    echo [INFO] Starting Lightweight Pitch Deck Web Server...
    start "" "http://localhost:8080"
    python -m http.server 8080 --directory "%~dp0pitch"
)

pause
