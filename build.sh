#!/bin/bash

# Create dist directory
mkdir -p dist

# Copy all files to dist
cp -r index.html login dashboard signup onboarding assets dist/

# Copy configuration files
cp static.json dist/
cp render.yaml dist/

echo "Build completed! Files are ready in the dist directory."
