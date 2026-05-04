#!/usr/bin/env bash

# Prepare a Next.js standalone build for Plesk.
# Plesk should run the generated root-level server.js after this script completes.

set -Eeuo pipefail
IFS=$'\n\t'

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STANDALONE_DIR="$ROOT_DIR/.next/standalone"
STATIC_DIR="$ROOT_DIR/.next/static"
PUBLIC_DIR="$ROOT_DIR/public"
PLESK_NODE_DIR="/opt/plesk/node/24/bin"

if [[ -x "$PLESK_NODE_DIR/node" && -x "$PLESK_NODE_DIR/npm" && -x "$PLESK_NODE_DIR/npx" ]]; then
  export PATH="$PLESK_NODE_DIR:$PATH"
fi

NODE_BIN="$(command -v node)"
NPM_BIN="$(command -v npm)"
NPX_BIN="$(command -v npx)"

log() {
  printf '\n==> %s\n' "$1"
}

fail() {
  printf '\nERROR: %s\n' "$1" >&2
  exit 1
}

cd "$ROOT_DIR"

log "Starting post-deployment preparation in $ROOT_DIR"
log "Using Node: $NODE_BIN"
log "Using npm: $NPM_BIN"
log "Using npx: $NPX_BIN"

log "Installing npm dependencies"
"$NPM_BIN" install

if [[ -f "$ROOT_DIR/prisma/schema.prisma" ]]; then
  log "Generating Prisma client"
  "$NPX_BIN" prisma generate
else
  log "Skipping Prisma generation because prisma/schema.prisma was not found"
fi

log "Building Next.js standalone application"
"$NPX_BIN" next build

[[ -d "$STANDALONE_DIR" ]] || fail "Standalone build directory was not found: $STANDALONE_DIR"
[[ -f "$STANDALONE_DIR/server.js" ]] || fail "Generated standalone server.js was not found: $STANDALONE_DIR/server.js"
[[ -d "$STANDALONE_DIR/node_modules" ]] || fail "Standalone node_modules directory was not found: $STANDALONE_DIR/node_modules"

log "Copying generated standalone server.js into the project root"
cp -f "$STANDALONE_DIR/server.js" "$ROOT_DIR/server.js"

log "Copying standalone runtime node_modules into the project root"
# This copy is intentionally non-destructive: it merges the standalone runtime
# dependencies into root/node_modules without deleting existing project files.
(
  cd "$STANDALONE_DIR/node_modules"
  tar -cf - .
) | (
  mkdir -p "$ROOT_DIR/node_modules"
  cd "$ROOT_DIR/node_modules"
  tar -xf -
)

if [[ -d "$STANDALONE_DIR/public" ]]; then
  log "Copying public assets from standalone output into the project root"
  (
    cd "$STANDALONE_DIR/public"
    tar -cf - .
  ) | (
    mkdir -p "$PUBLIC_DIR"
    cd "$PUBLIC_DIR"
    tar -xf -
  )
else
  log "Standalone public directory was not found; keeping existing root public directory"
fi

[[ -f "$ROOT_DIR/server.js" ]] || fail "Root server.js was not created"

if [[ -d "$STATIC_DIR" ]]; then
  log "Verified Next static assets at .next/static"
else
  fail "Next static assets were not found at .next/static"
fi

if [[ -d "$PUBLIC_DIR" ]]; then
  log "Verified public assets directory"
else
  log "No public directory found; continuing because it is optional"
fi

log "Post-deployment preparation completed"
log "Plesk startup file should be: server.js"
