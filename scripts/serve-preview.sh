#!/bin/sh
# Serve the sai-sree-web site locally for preview.
# Build first: use `vite preview` (production build in dist/) on a fixed port.
# Bound to 0.0.0.0 so the preview is reachable both on this box (127.0.0.1) and
# over Tailscale (100.85.37.21) from another device.
cd /home/syd/projects/sai-sree-web || exit 1
exec ./node_modules/.bin/vite preview --host 0.0.0.0 --port 5180 --strictPort
