#!/usr/bin/env bash

set -e

echo "Starting API server..."

# Set environment variables
source .env

# Start the server
npm start
