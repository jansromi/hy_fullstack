#!/bin/bash

# Check if the "assets" folder exists, and if so, delete it
if [ -d "assets" ]; then
    rm -r assets
    echo "Deleted 'assets' folder."
fi

# Delete all .css files in the current directory
find . -type f -name "*.css" -exec rm {} +
echo "Deleted all .css files."

echo "Cleanup complete."
