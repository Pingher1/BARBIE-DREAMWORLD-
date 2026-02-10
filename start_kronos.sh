#!/bin/bash
cd /Users/philliprichardson/Documents/Kronos-Adversary
# Force port 3000 to be free
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
# Install if needed (should be done but just in case)
# npm install
# Start dev server in background, log output
nohup npm run dev > kronos_start.log 2>&1 &
echo "Started Kronos on port 3000 (PID: $!)"
