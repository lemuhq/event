#!/bin/bash

# Switch to Node.js v20
if command -v nvm &> /dev/null; then
  echo "Using nvm to switch to Node.js v20"
  nvm use 20
else
  echo "nvm not found, proceeding with system Node version"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the development server
echo "Starting development server..."
npm run dev 