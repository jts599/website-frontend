#!/usr/bin/env bash
# Build the site and publish it to the mediastack machine.
#
# Usage:
#   ./scripts/deploy.sh
#
# Environment overrides:
#   DEPLOY_HOST   remote host    (default: 10.0.10.82)
#   DEPLOY_USER   ssh user      (default: root)
#   DEPLOY_PATH   remote path   (default: /media/data/site)

set -euo pipefail

DEPLOY_HOST="${DEPLOY_HOST:-10.0.10.82}"
DEPLOY_USER="${DEPLOY_USER:-root}"
DEPLOY_PATH="${DEPLOY_PATH:-/media/data/site}"

cd "$(dirname "$0")/.."

echo "==> Building site..."
npm run build

# build-stargazer.mjs may emit extra output; make sure dist exists
if [ ! -d dist ]; then
  echo "ERROR: dist/ not found after build" >&2
  exit 1
fi

echo "==> Publishing dist/ to ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}"
rsync -avz --delete --exclude '.well-known/' \
  -e "ssh" dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"

echo "==> Done: https://joesloyan.dev"
