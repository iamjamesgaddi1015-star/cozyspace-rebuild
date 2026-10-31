@echo off
setlocal
cd /d "%~dp0"
echo Starting CozySpace. Use the local address printed below.
node scripts/server.mjs
pause
