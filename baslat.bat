@echo off
cd /d "%~dp0"
title KPSSLAB Sunucusu
start http://localhost:3000
call npm run dev
pause