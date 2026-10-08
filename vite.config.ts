import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// Assets ship from the repo-root `assets/` directory. Pointing Vite's publicDir
// at it means the plates and photos are served at /plates/* and /photos/* in dev
// and copied to the build root, so there is a single source of truth for media.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: "assets",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      // Do not full-reload the app when tooling writes screenshots, scripts or
      // reports. Only src/ and the assets/ public dir should trigger anything.
      ignored: ["**/shots/**", "**/scripts/**", "**/dist/**", "**/dev.log", "**/REPORT.md"],
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
