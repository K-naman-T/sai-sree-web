/**
 * The header floats over the hero, so its contrast depends on the photograph.
 * For every slide: hide the header, photograph the exact box of each header
 * element, and compute WCAG contrast of the cream type against the mean and the
 * worst (brightest) pixel behind it. This is the audit's open MUST item, now
 * measured against the real photographs instead of the old illustration plates.
 *
 * Run:  node audit/header-contrast.mjs
 */
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://127.0.0.1:5180";
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const OUT = "/tmp/shots/header";
fs.mkdirSync(OUT, { recursive: true });

const CREAM = [0xfc, 0xf8, 0xf1];
const chan = (v) => {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lum = ([r, g, b]) => 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
const contrast = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

function pixelsOf(png) {
  const raw = execFileSync("python3", [
    "-c",
    "import sys,json\nfrom PIL import Image\nim=Image.open(sys.argv[1]).convert('RGB')\nprint(json.dumps([list(p) for p in im.getdata()]))",
    png,
  ]).toString();
  return JSON.parse(raw);
}

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox"] });
const rows = [];

for (const vp of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "phone", width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const count = await page.evaluate(() => {
    const el = document.querySelector(".hero-swiper");
    el.swiper.autoplay?.stop();
    el.swiper.params.autoplay = false;
    return el.swiper.slides.length;
  });

  for (let i = 0; i < count; i++) {
    await page.evaluate((n) => document.querySelector(".hero-swiper").swiper.slideTo(n, 0, false), i);
    await page.waitForTimeout(900);

    const targets = await page.evaluate(() => {
      const box = (el) => {
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height), text: (el.innerText || el.getAttribute("aria-label") || "").trim() };
      };
      const out = [];
      document.querySelectorAll("header a[href='/'], header nav a, header button[aria-label]").forEach((el) => {
        if (el.getBoundingClientRect().width > 0) out.push(box(el));
      });
      return out;
    });

    await page.evaluate(() => (document.querySelector("header").style.visibility = "hidden"));
    for (const t of targets) {
      if (t.width < 2 || t.height < 2) continue;
      const clip = { x: t.x, y: t.y, width: Math.min(t.width, vp.width - t.x), height: t.height };
      const shot = `${OUT}/bg-${vp.name}-${i}-${t.text.replace(/\W+/g, "_") || "el"}.png`;
      await page.screenshot({ path: shot, clip });
      const px = pixelsOf(shot);
      const contrasts = px.map((p) => contrast(CREAM, p));
      rows.push({
        viewport: vp.name,
        slide: i + 1,
        element: t.text.slice(0, 22),
        size: `${t.width}x${t.height}`,
        contrastMean: +contrast(CREAM, px.reduce((a, p) => [a[0] + p[0] / px.length, a[1] + p[1] / px.length, a[2] + p[2] / px.length], [0, 0, 0]).map(Math.round)).toFixed(2),
        contrastWorstPixel: +Math.min(...contrasts).toFixed(2),
        aa: Math.min(...contrasts) >= 4.5,
      });
    }
    await page.evaluate(() => (document.querySelector("header").style.visibility = ""));
  }
  await page.close();
}

const fails = rows.filter((r) => !r.aa);
console.table(rows);
console.log(`\n${fails.length} of ${rows.length} header elements fail AA (4.5:1) behind the current photograph.`);
if (fails.length) console.log("worst:", JSON.stringify(fails.reduce((a, r) => (r.contrastWorstPixel < a.contrastWorstPixel ? r : a))));
await browser.close();
