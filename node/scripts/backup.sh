#!/bin/bash

TIMESTAMP=$(date +"%Y-%m-%d-%H%M%S")
BACKUP_DIR="/path/to/backups"
NODE_DATA_DIR="/path/to/node/data"

mkdir -p $BACKUP_DIR
tar -zcvf "$BACKUP_DIR/vechain-node-$TIMESTAMP.tar.gz" $NODE_DATA_DIR
