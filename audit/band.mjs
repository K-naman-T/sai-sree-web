/**
 * Records the "What we do" bands as they are now (before any edit).
 * Writes audit/before/<route>.json + audit/before/<route>.png (page with the band marked)
 * and audit/before/<route>-section.png (the band alone).
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";

const label = process.argv[2] || "before";
const BASE = process.argv[3] || "http://127.0.0.1:5180";
const OUT = `/home/syd/projects/sai-sree-web/audit/${label}`;
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox", "--no-proxy-server"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

for (const route of ["/", "/about"]) {
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 160)); });
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  const info = await page.evaluate(() => {
    const heads = Array.from(document.querySelectorAll("h1, h2"));
    const hit = heads.find((h) => h.textContent.trim().toLowerCase() === "what we do");
    const sec = hit ? hit.closest("section") : null;
    const sections = Array.from(document.querySelectorAll("section")).map((s) => {
      const first = s.querySelector("h1, h2, h3");
      return {
        heading: first ? first.textContent.trim().slice(0, 40) : "(no heading)",
        y: Math.round(s.getBoundingClientRect().top + window.scrollY),
        h: Math.round(s.getBoundingClientRect().height),
      };
    });
    return {
      pageHeight: document.documentElement.scrollHeight,
      sections,
      band: sec
        ? {
            heading: hit.textContent.trim(),
            y: Math.round(sec.getBoundingClientRect().top + window.scrollY),
            h: Math.round(sec.getBoundingClientRect().height),
            text: sec.innerText.replace(/\s+/g, " ").slice(0, 400),
            images: Array.from(sec.querySelectorAll("img")).map((i) => ({ src: i.currentSrc, alt: i.alt.slice(0, 60) })),
            tabCount: sec.querySelectorAll('[role="tab"], button').length,
          }
        : null,
    };
  });

  const name = route === "/" ? "home" : route.replace(/^\//, "");
  if (info.band) {
    const el = await page.evaluateHandle((y) => {
      const heads = Array.from(document.querySelectorAll("h1, h2"));
      const hit = heads.find((h) => h.textContent.trim().toLowerCase() === "what we do");
      return hit ? hit.closest("section") : null;
    }, info.band.y);
    const handle = el.asElement();
    if (handle) await handle.screenshot({ path: path.join(OUT, `${name}-section.png`) });
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 60)), info.band.y);
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT, `${name}-context.png`) });
  }
  await page.screenshot({ path: path.join(OUT, `${name}-full.png`), fullPage: true });
  fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify({ route, errors, ...info }, null, 2));
  console.log(`\n=== ${route} ===`);
  console.log(`page height ${info.pageHeight} px | console errors: ${errors.length ? errors : "none"}`);
  for (const s of info.sections) console.log(`   y=${String(s.y).padStart(5)}  h=${String(s.h).padStart(5)}  ${s.heading}`);
  if (info.band) {
    console.log("   BAND:", JSON.stringify({ y: info.band.y, h: info.band.h, tabs: info.band.tabCount }));
    console.log("   BAND TEXT:", info.band.text);
    console.log("   BAND IMAGES:", info.band.images);
  }
  await page.close();
}
await browser.close();
console.log(`\nwrote ${OUT}`);
