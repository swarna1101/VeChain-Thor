#!/usr/bin/env bash

set -e

echo "Running API tests..."

# Set environment variables
source .env

# Run the tests
npm test
