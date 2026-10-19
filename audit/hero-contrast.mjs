/**
 * Contrast for the 2026-10-19 hero placement: every text block is sampled over
 * all five plates with the text hidden, so the numbers are the real background.
 *
 *   node audit/hero-contrast.mjs
 *
 * Writes audit/hero/contrast-<vp>.json: mean and worst-pixel contrast ratio for
 * cream #FCF8F1 against the pixels in each box, per slide.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";

const BASE = process.argv[2] || "http://127.0.0.1:5180";
const OUT = "/home/syd/projects/sai-sree-web/audit/hero";
fs.mkdirSync(OUT, { recursive: true });

const TARGETS = {
  headerWordmark: "header span.font-mark",
  presents: "[data-hero-presents]",
  brand: "[data-hero-brand]",
  signatureName: "[data-hero-signature-name]",
  signatureRole: "[data-hero-signature-role]",
  paragraph: "[data-hero-statement]",
  h1: "section h1",
};

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox", "--no-proxy-server"] });
const report = {};

for (const [vpName, vp] of Object.entries({ desk: { width: 1440, height: 900 }, phone: { width: 390, height: 844 } })) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  // Boxes first, with the text in place (visibility keeps layout intact).
  const HIDE = `[data-hero-brand],[data-hero-presents],[data-hero-signature],[data-hero-signature-name],[data-hero-signature-role],section h1,[data-hero-statement]{visibility:hidden!important} header span.font-mark{visibility:hidden!important}`;

  report[vpName] = {};
  for (let slide = 0; slide < 5; slide++) {
    await page.evaluate((i) => {
      const el = document.querySelector(".hero-swiper");
      if (el && el.swiper) el.swiper.autoplay.stop(), el.swiper.slideTo(i, 0);
    }, slide);
    await page.waitForTimeout(900);
    const file = path.join(OUT, `bare-${vpName}-s${slide}.png`);
    const inkFile = path.join(OUT, `ink-${vpName}-s${slide}.png`);
    await page.screenshot({ path: inkFile });
    const hide = await page.addStyleTag({ content: HIDE });
    await page.waitForTimeout(150);
    await page.screenshot({ path: file });
    await hide.evaluate((el) => el.remove());

    const boxes = {};
    for (const [key, sel] of Object.entries(TARGETS)) {
      const el = page.locator(sel).first();
      if ((await el.count()) === 0) continue;
      boxes[key] = await el.boundingBox();
    }
    report[vpName][`slide${slide}`] = { file, boxes };
  }
  await ctx.close();
}

await browser.close();
fs.writeFileSync(path.join(OUT, "contrast-boxes.json"), JSON.stringify(report, null, 1));
console.log("captured", Object.keys(report).map((k) => `${k}:${Object.keys(report[k]).length} slides`).join(" "));
