/**
 * Shot every hero slide, at desktop and phone, with autoplay stopped.
 * Proves which frame <picture> actually served, not just that a file exists.
 *
 * Run:  node audit/hero-shots.mjs [baseUrl]
 * Out:  /tmp/shots/hero-<viewport>-<n>.png
 */
import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");

const BASE = process.argv[2] || "http://127.0.0.1:5180";
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const OUT = "/tmp/shots";
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "phone", width: 390, height: 844 },
];

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox"] });
const report = [];

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  // Stop the 5.2s autoplay so every slide can be held still and shot.
  await page.evaluate(() => {
    const el = document.querySelector(".hero-swiper");
    if (el && el.swiper) {
      el.swiper.autoplay?.stop();
      el.swiper.params.autoplay = false;
    }
  });

  const count = await page.evaluate(() => {
    const el = document.querySelector(".hero-swiper");
    return el && el.swiper ? el.swiper.slides.length : 0;
  });

  for (let i = 0; i < count; i++) {
    await page.evaluate((n) => {
      const el = document.querySelector(".hero-swiper");
      el.swiper.slideTo(n, 0, false);
    }, i);
    await page.waitForTimeout(1100); // crossfade 900ms + settle
    const out = `${OUT}/hero-${vp.name}-${i}.png`;
    await page.screenshot({ path: out });
    const facts = await page.evaluate((n) => {
      const slide = document.querySelectorAll(".hero-swiper .swiper-slide")[n];
      const img = slide.querySelector("img");
      const topline = slide.querySelector("h1");
      return {
        servedSrc: img.currentSrc.replace(location.origin, ""),
        natural: `${img.naturalWidth}x${img.naturalHeight}`,
        rendered: `${Math.round(img.getBoundingClientRect().width)}x${Math.round(img.getBoundingClientRect().height)}`,
        alt: (img.alt || "").slice(0, 60),
        topline: (topline ? topline.innerText : document.querySelector("h1")?.innerText || "").slice(0, 40),
      };
    }, i);
    report.push({ viewport: vp.name, slide: i, out, ...facts });
  }
  await page.close();
}

console.log(JSON.stringify(report, null, 1));
await browser.close();
