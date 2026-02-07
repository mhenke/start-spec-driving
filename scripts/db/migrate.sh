#!/usr/bin/env bash
set -euo pipefail
echo "Running drizzle migrations (dev)"
# Example: npx drizzle-kit migrate:latest --config ./drizzle.config.ts
if command -v npx >/dev/null 2>&1; then
  echo "Run migrations with: npx drizzle-kit migrate:latest --config ./drizzle.config.ts"
else
  echo "drizzle-kit not installed. Install dependencies to run migrations."
fi
