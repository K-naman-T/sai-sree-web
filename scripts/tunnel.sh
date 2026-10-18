#!/bin/sh
# Public preview link for the sai-sree-web build (no account needed).
# Serves the local vite preview on 127.0.0.1:5180 through a Cloudflare quick tunnel.
# HTTP/2 protocol is forced: this box has outbound QUIC/7844 partly blocked.
# URL is written to /tmp/sai-sree-tunnel.log and changes on every restart.
exec /home/syd/.local/bin/cloudflared tunnel --protocol http2 --url http://127.0.0.1:5180 \
  --no-autoupdate --logfile /tmp/sai-sree-tunnel.log --loglevel info
