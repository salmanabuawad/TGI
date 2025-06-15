@echo off
setlocal

@REM Sleeping for 3 seconds...
timeout /t 3 /nobreak >nul

set /a rand=%RANDOM% %% 10

if %rand% gtr 7 (
    exit 0
) else (
   exit 1
)