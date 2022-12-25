#!/usr/bin/env bash

set -e

echo "Stopping API server..."

# Set environment variables
source .env

# Stop the server
npm stop
