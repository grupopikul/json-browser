#!/bin/bash

# Get directory of script no matter where it's run
SCRIPT_DIR="$(git rev-parse --show-toplevel)"

[ -z "$SCRIPT_DIR" ] && echo "Couldn't find script directory" 1>&2 && exit 1

rsync -av --delete $SCRIPT_DIR/src/ $SCRIPT_DIR/dist --exclude 'ts/' --exclude 'js/'
