/**
 * Renders the hero at desktop and phone widths for the 2026-10-19 placement
 * change, and records the bounding box of every hero text block.
 *
 *   node audit/hero-placement-shots.mjs [label] [base]
 *
 * Writes audit/hero/<label>-desk.png, -phone.png and -boxes.json.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";

const label = process.argv[2] || "after";
const BASE = process.argv[3] || "http://127.0.0.1:5180";
const OUT = "/home/syd/projects/sai-sree-web/audit/hero";
fs.mkdirSync(OUT, { recursive: true });

const SELECTORS = {
  header: "header span.font-mark",
  brand: "[data-hero-brand]",
  signature: "[data-hero-signature-name]",
  role: "[data-hero-signature-role]",
  paragraph: "[data-hero-statement]",
  h1: "section h1",
};

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox", "--no-proxy-server"] });
const boxes = {};

for (const [name, vp] of Object.entries({ desk: { width: 1440, height: 900 }, phone: { width: 390, height: 844 } })) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1400); // first slide painted, fonts settled
  await page.screenshot({ path: path.join(OUT, `${label}-${name}.png`) });

  boxes[name] = {};
  for (const [key, sel] of Object.entries(SELECTORS)) {
    const el = page.locator(sel).first();
    if ((await el.count()) === 0) continue;
    const box = await el.boundingBox();
    const text = (await el.textContent())?.trim().slice(0, 60);
    boxes[name][key] = { box, text };
  }
  await ctx.close();
}

await browser.close();
fs.writeFileSync(path.join(OUT, `${label}-boxes.json`), JSON.stringify(boxes, null, 2));
console.log(JSON.stringify(boxes, null, 1));
