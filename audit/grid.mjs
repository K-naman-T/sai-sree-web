/**
 * Checks the "What we take on" grid after two cards were added:
 * card count, column layout, row tops, whether each card has an image,
 * and screenshots the grid for a visual check. Desktop + mobile.
 */
import { createRequire } from "node:module";
import path from "node:path";
const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const OUT = "/home/syd/projects/sai-sree-web/audit/after";

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox", "--no-proxy-server"] });
for (const vp of [{ n: "desktop", w: 1440, h: 900, dsf: 1 }, { n: "mobile", w: 390, h: 844, dsf: 2 }, { n: "tablet", w: 820, h: 1180, dsf: 1 }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: vp.dsf });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 140)));
  page.on("console", (m) => { if (m.type() === "error" && !m.text().includes("404")) errs.push(m.text().slice(0, 140)); });
  await page.goto("http://127.0.0.1:5180/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const m = await page.evaluate(() => {
    const head = Array.from(document.querySelectorAll("h1, h2")).find((h) => h.textContent.trim().toLowerCase() === "what we take on");
    const sec = head ? head.closest("section") : null;
    const grid = sec ? sec.querySelector("div.grid") : null;
    const cards = grid ? Array.from(grid.children) : [];
    const rows = {};
    const info = cards.map((c) => {
      const r = c.getBoundingClientRect();
      const h3 = c.querySelector("h3");
      const img = c.querySelector("img");
      const frame = c.querySelector("div");
      const top = Math.round(r.top + window.scrollY);
      rows[top] = (rows[top] || 0) + 1;
      return {
        title: h3 ? h3.textContent.trim() : "(no heading)",
        cta: c.querySelector("span")?.textContent.trim(),
        x: Math.round(r.left),
        w: Math.round(r.width),
        h: Math.round(r.height),
        top,
        hasImage: !!img,
        imageSrc: img ? img.currentSrc.split("/").pop() : null,
        frameSize: frame ? `${Math.round(frame.getBoundingClientRect().width)}x${Math.round(frame.getBoundingClientRect().height)}` : null,
        frames: Array.from(c.querySelectorAll("div")).map((d) => `${Math.round(d.getBoundingClientRect().width)}x${Math.round(d.getBoundingClientRect().height)}`),
      };
    });
    return {
      cardCount: cards.length,
      rows,
      rowCount: Object.keys(rows).length,
      columnsPerRow: Object.values(rows),
      cards: info,
      imagesInSection: sec ? sec.querySelectorAll("img").length : 0,
      broken: sec ? Array.from(sec.querySelectorAll("img")).filter((i) => i.complete && i.naturalWidth === 0).length : 0,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      pageHeight: document.documentElement.scrollHeight,
    };
  });

  console.log(`\n=== ${vp.n} ${vp.w}px ===`);
  console.log(`cards ${m.cardCount} | rows ${m.rowCount} | per row ${m.columnsPerRow.join("+")} | images in band ${m.imagesInSection} | broken ${m.broken}`);
  console.log(`page height ${m.pageHeight} | overflow ${m.scrollWidth - m.clientWidth}px | errors ${errs.length ? errs : "none"}`);
  for (const c of m.cards) console.log(`   y=${String(c.top).padStart(5)} x=${String(c.x).padStart(4)} ${String(c.w).padStart(4)}x${c.h}  img=${c.hasImage ? c.imageSrc : "NONE (empty frame " + c.frameSize + ")"}  ${c.title}`);

  if (vp.n !== "tablet") {
    const el = await page.$("section:has(h2) div.grid");
    if (el) await el.screenshot({ path: path.join(OUT, `grid-${vp.n}.png`) });
  }
  await ctx.close();
}
await browser.close();
console.log("\nwrote grid screenshots to", OUT);
