#!/bin/bash

cd /path/to/node

nohup node src/main.js > logs/start.log 2>&1 &
