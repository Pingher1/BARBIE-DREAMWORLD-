#!/bin/bash
echo "Starting zip process..."
cd /Users/philliprichardson/Documents/BarbieWorldApp
zip -r ~/Desktop/BarbieWorldApp_FULL_PROJECT.zip . -x "node_modules/*" -x ".git/*" -x ".DS_Store"
echo "---------------------------------------"
echo "DONE! Check your Desktop for BarbieWorldApp_FULL_PROJECT.zip"
