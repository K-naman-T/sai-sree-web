/**
 * One-shot screenshot for the local preview loop.
 * Run:  node audit/shoot.mjs [route] [width] [height] [outfile]
 *   node audit/shoot.mjs /            1440 900  /tmp/shots/home.png
 *   node audit/shoot.mjs / 390 844 /tmp/shots/home-mobile.png
 * Full-page by default; pass FULL=0 for viewport-only.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://127.0.0.1:5180";
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const route = process.argv[2] || "/";
const width = Number(process.argv[3] || 1440);
const height = Number(process.argv[4] || 900);
const out = process.argv[5] || `/tmp/shots/${route.replace(/\W+/g, "_") || "home"}-${width}.png`;
const full = process.env.FULL !== "0";

fs.mkdirSync(path.dirname(out), { recursive: true });

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
await page.goto(BASE + route, { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
await page.evaluate(async () => {
  // settle lazy images and scroll-triggered reveals
  await new Promise((r) => {
    let y = 0;
    const step = () => {
      y += window.innerHeight;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 120);
      else setTimeout(() => { window.scrollTo(0, 0); r(); }, 400);
    };
    step();
  });
});
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(700);
if (await page.evaluate(() => window.scrollY !== 0)) {
  throw new Error(`page did not return to the top (scrollY=${await page.evaluate(() => window.scrollY)})`);
}
await page.screenshot({ path: out, fullPage: full });

const facts = await page.evaluate(() => ({
  title: document.title,
  h1: document.querySelector("h1")?.innerText?.trim() ?? null,
  overflows: document.documentElement.scrollWidth - window.innerWidth,
  docHeight: document.documentElement.scrollHeight,
  broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc),
  images: document.images.length,
}));
console.log(JSON.stringify({ route, width, out, ...facts }, null, 2));
await browser.close();
