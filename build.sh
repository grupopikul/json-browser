#!/bin/bash

# Get directory of script no matter where it's run
SCRIPT_DIR="$(git rev-parse --show-toplevel)"

[ -z "$SCRIPT_DIR" ] && echo "Couldn't find script directory" 1>&2 && exit 1

rsync -av --delete $SCRIPT_DIR/src/ $SCRIPT_DIR/dist --exclude 'ts/' --exclude 'js/'
rsync -av --delete $SCRIPT_DIR/src/ts $SCRIPT_DIR/dist/js/src/

# Sourcemaps apparently want this, probablyy can set better w/ config, sourcemaps don't need to point to that directory!
# Sourcemaps need to be w/ file?
