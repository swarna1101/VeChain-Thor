#!/bin/bash

while true
do
  if ! ps aux | grep -v grep | grep "node src/main.js" > /dev/null
  then
    /path/to/node/scripts/start.sh
  fi
  sleep 60
done
