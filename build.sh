#!/bin/bash

# Run tsc after this (automatic with `npm run build`)

# Get directory of script no matter where it's run
SCRIPT_DIR="$(git rev-parse --show-toplevel)"

[ -z "$SCRIPT_DIR" ] && echo "Couldn't find script directory" 1>&2 && exit 1

rsync -av --delete $SCRIPT_DIR/src/ $SCRIPT_DIR/dist

# Sourcemaps apparently want this, probablyy can set better w/ config, sourcemaps don't need to point to that directory!
# Sourcemaps need to be w/ file?
