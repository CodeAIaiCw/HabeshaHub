#!/usr/bin/env bash
set -e
echo "Node: $(node -v || true)"
echo "npm: $(npm -v || true)"
echo "Docker: $(docker -v || true)"
