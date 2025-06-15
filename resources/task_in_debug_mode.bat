@echo off
setlocal

@REM Sleeping for 5 seconds...
timeout /t 5 /nobreak >nul

set /a rand=%RANDOM% %% 5

if %rand% gtr 0 (
    exit 0
) else (
   exit 1
)