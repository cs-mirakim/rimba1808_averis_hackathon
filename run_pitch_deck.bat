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
    echo [INFO] Opening Interactive Pitch Deck directly in your browser...
    start "" "%~dp0pitch\index.html"
    echo [SUCCESS] Presentation slides opened!
    echo.
    echo [INFO] Serving web slides at: http://127.0.0.1:8085
    echo [NOTE] Leave this window open during your pitch presentation.
    echo [NOTE] Press Ctrl+C to close the server when you are done.
    echo.
    python -m http.server 8085 --bind 127.0.0.1 --directory "%~dp0pitch"
)

pause
