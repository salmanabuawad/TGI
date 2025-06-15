@echo off
setlocal

@REM Sleeping for 10 seconds...
timeout /t 10 /nobreak >nul

set /a rand=%RANDOM% %% 10

if %rand% gtr 3 (
    exit 0
) else (
   exit 1
)