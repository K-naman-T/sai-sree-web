import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

/**
 * The credits files sit beside the media as the provenance record, so `publicDir`
 * would publish them: they list the client's original camera filenames and the
 * source archive. Strip them from the built site — the record stays in the repo.
 *
 * The originals themselves ship the same way: `photos/originals/` holds the
 * client's camera files, nothing on a page links to them, and a visitor can read
 * them at /photos/originals/<name>. They are delivered in the repo, not on the
 * site, so the build drops the whole directory.
 */
function stripInternalRecords(outDir: string): Plugin {
  const records = ["photos/credits.json", "photos/site-photos.json", "plates/credits.json"];
  /** Directories that carry the client's own source files, never a page asset. */
  const privateDirs = ["photos/originals", "plates/originals"];
  return {
    name: "strip-internal-records",
    apply: "build",
    closeBundle() {
      for (const rel of records) {
        const file = path.join(outDir, rel);
        if (fs.existsSync(file)) fs.rmSync(file, { force: true });
      }
      for (const rel of privateDirs) {
        const dir = path.join(outDir, rel);
        if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
      }
    },
  };
}

// Assets ship from the repo-root `assets/` directory. Pointing Vite's publicDir
// at it means the plates and photos are served at /plates/* and /photos/* in dev
// and copied to the build root, so there is a single source of truth for media.
export default defineConfig({
  plugins: [react(), tailwindcss(), stripInternalRecords("dist")],
  publicDir: "assets",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
