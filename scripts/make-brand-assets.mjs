/**
 * Build the brand's share assets from the site's own tokens: the tab icon set and
 * the link-preview card that WhatsApp, Slack and search results show.
 *
 * Rendered in real Chromium with the site's own woff2 faces embedded as data
 * URLs, so the type is the brand's type and nothing is hand-traced. The card
 * carries one of the client's own photographs (the steel-frame hero plate) under
 * the site's own scrim, the wordmark, the line, and the office number.
 *
 * Run:  node scripts/make-brand-assets.mjs
 * Out:  assets/favicon-512.png (source), assets/favicon-32.png,
 *       assets/favicon-192.png, assets/apple-touch-icon.png, assets/favicon.ico,
 *       assets/og-card.png
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");

const ROOT = "/home/syd/projects/sai-sree-web";
const OUT = path.join(ROOT, "assets");
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";

const b64 = (p) => fs.readFileSync(p).toString("base64");
const FONTS = {
  marcellus: b64(path.join(ROOT, "node_modules/@fontsource/marcellus/files/marcellus-latin-400-normal.woff2")),
  fraunces: b64(path.join(ROOT, "node_modules/@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2")),
  archivo: b64(path.join(ROOT, "node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2")),
};
const STEEL = b64(path.join(ROOT, "assets/plates/HERO-STEEL.webp"));

const FACE = `
@font-face{font-family:Marcellus;src:url(data:font/woff2;base64,${FONTS.marcellus}) format('woff2');font-display:block}
@font-face{font-family:Fraunces;src:url(data:font/woff2;base64,${FONTS.fraunces}) format('woff2');font-weight:100 900;font-display:block}
@font-face{font-family:Archivo;src:url(data:font/woff2;base64,${FONTS.archivo}) format('woff2');font-weight:100 900;font-display:block}`;

// The tab icon: the mark reduced to one letter on the house terracotta, square
// corners like everything else, the letter in the paper cream.
const icon = (size) => `<!doctype html><html><head><meta charset="utf-8"><style>${FACE}
  html,body{margin:0;padding:0}
  .mark{width:${size}px;height:${size}px;background:#b4472e;display:flex;align-items:center;justify-content:center;overflow:hidden}
  .mark span{font-family:Marcellus,serif;color:#fbf7f0;font-size:${Math.round(size * 0.74)}px;line-height:1;transform:translateY(${Math.round(size * 0.02)}px)}
  .rule{position:absolute;left:${Math.round(size * 0.18)}px;right:${Math.round(size * 0.18)}px;bottom:${Math.round(size * 0.14)}px;height:${Math.max(1, Math.round(size * 0.035))}px;background:#b8912f}
</style></head><body><div class="mark"><span>A</span><i class="rule"></i></div></body></html>`;

const card = `<!doctype html><html><head><meta charset="utf-8"><style>${FACE}
  html,body{margin:0;padding:0}
  .card{position:relative;width:1200px;height:630px;overflow:hidden;background:#1f1b16}
  .card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:42% 38%;transform:scale(1.06)}
  .scrim{position:absolute;inset:0;background:
    linear-gradient(to top, rgba(18,14,10,.92) 0%, rgba(18,14,10,.86) 42%, rgba(18,14,10,.30) 62%, rgba(18,14,10,0) 78%),
    linear-gradient(to right, rgba(18,14,10,.34) 0%, rgba(18,14,10,0) 62%)}
  .inner{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;
         padding:52px 64px 54px}
  .top{display:flex;align-items:flex-start;justify-content:space-between}
  .lockup{display:flex;flex-direction:column;gap:8px}
  .brand{font-family:Marcellus,serif;color:#fbf7f0;font-size:34px;letter-spacing:.30em;line-height:1;text-transform:uppercase}
  .by{font-family:Archivo,sans-serif;font-weight:600;color:rgba(251,247,240,.92);font-size:15px;letter-spacing:.15em;text-transform:uppercase;line-height:1}
  /* The number is the one thing that must survive a thumbnail, so it sits on
     solid terracotta rather than over the photograph. */
  .phone{font-family:Archivo,sans-serif;font-weight:700;color:#fbf7f0;background:#b4472e;font-size:32px;
         letter-spacing:.02em;padding:19px 26px 21px;line-height:1;white-space:nowrap}
  .bottom{display:flex;flex-direction:column;gap:18px}
  .rule{width:64px;height:3px;background:#b8912f}
  h1{font-family:Fraunces,serif;font-weight:600;color:#fbf7f0;font-size:74px;line-height:1.02;margin:0;letter-spacing:-.02em}
  .sub{font-family:Archivo,sans-serif;font-weight:500;color:rgba(251,247,240,.94);font-size:26px;line-height:1.4;margin:0;max-width:900px}
</style></head><body>
  <div class="card">
    <img src="data:image/webp;base64,${STEEL}" alt="">
    <div class="scrim"></div>
    <div class="inner">
      <div class="top">
        <div class="lockup">
          <span class="brand">Alankara</span>
          <span class="by">- by Sri Sai Enterprises</span>
        </div>
        <span class="phone">+91 82963 19545</span>
      </div>
      <div class="bottom">
        <span class="rule"></span>
        <h1>Construction built as craft.</h1>
        <p class="sub">Construction and earthmoving.</p>
      </div>
    </div>
  </div>
</body></html>`;

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox"] });
const page = await browser.newPage({ deviceScaleFactor: 1 });

async function shoot(html, width, height, out, jpeg = false) {
  await page.setViewportSize({ width, height });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(350);
  // The card ships as JPEG: a preview fetcher gives up on a 760 kB PNG.
  await page.screenshot(jpeg ? { path: out, type: "jpeg", quality: 88 } : { path: out });
  return out;
}

await shoot(icon(1024), 1024, 1024, path.join(OUT, "favicon-512.png"));
await shoot(card, 1200, 630, path.join(OUT, "og-card.jpg"), true);
await browser.close();

// Downscale the icon with PIL: Lanczos from 1024 beats CSS-scaled 32px text, and
// PIL writes the multi-size .ico that browsers ask for by default.
execFileSync("python3", [
  "-c",
  `
from PIL import Image
src = Image.open("${OUT}/favicon-512.png").convert("RGB")
for size in (32, 192):
    src.resize((size, size), Image.LANCZOS).save(f"${OUT}/favicon-{size}.png")
src.resize((180, 180), Image.LANCZOS).save("${OUT}/apple-touch-icon.png")
src.save("${OUT}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("icon set written")
`,
]);

for (const f of ["favicon.ico", "favicon-32.png", "favicon-192.png", "apple-touch-icon.png", "og-card.jpg"]) {
  console.log(f, fs.statSync(path.join(OUT, f)).size, "bytes");
}
