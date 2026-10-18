/**
 * Measure the hero signature's contrast against the pixels actually behind it.
 *
 * For every slide and viewport: hold the slide, hide the signature, photograph
 * its own box, and compute WCAG contrast of the cream text against the mean and
 * the worst (brightest) pixel in that box. Reported, never assumed.
 *
 * Run:  node audit/signature-contrast.mjs
 */
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://127.0.0.1:5180";
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const OUT = "/tmp/shots/sig";
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 720 },
  { name: "phone", width: 390, height: 844 },
];

// #FCF8F1 — the cream the hero text uses.
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

/** Decode a PNG buffer's pixels via ImageMagick-free path: use PIL through python. */
function pixelsOf(pngPath) {
  const raw = execFileSync("python3", [
    "-c",
    "import sys,json\nfrom PIL import Image\nim=Image.open(sys.argv[1]).convert('RGB')\nprint(json.dumps([list(p) for p in im.getdata()]))",
    pngPath,
  ]).toString();
  return JSON.parse(raw);
}

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox"] });
const rows = [];

for (const vp of VIEWPORTS) {
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
    await page.waitForTimeout(1000);

    // The decorative gold rule is excluded: it is aria-hidden ornament, not text,
    // so its own pixels must not be measured against the cream type.
    const lines = await page.evaluate(() => {
      const read = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height, text: el.innerText };
      };
      return {
        name: read("[data-hero-signature-name]"),
        role: read("[data-hero-signature-role]"),
      };
    });

    await page.evaluate(() => (document.querySelector("[data-hero-signature]").style.visibility = "hidden"));

    for (const [line, box] of Object.entries(lines)) {
      if (!box) continue;
      const clip = {
        x: Math.max(0, Math.floor(box.x) - 3),
        y: Math.max(0, Math.floor(box.y) - 3),
        width: Math.min(vp.width - Math.max(0, Math.floor(box.x) - 3), Math.ceil(box.width) + 6),
        height: Math.min(vp.height - Math.max(0, Math.floor(box.y) - 3), Math.ceil(box.height) + 6),
      };
      const shot = `${OUT}/bg-${vp.name}-${i}-${line}.png`;
      await page.screenshot({ path: shot, clip });

      const px = pixelsOf(shot);
      const contrasts = px.map((p) => contrast(CREAM, p));
      const meanBg = px
        .reduce(
          (a, p) => [a[0] + p[0] / px.length, a[1] + p[1] / px.length, a[2] + p[2] / px.length],
          [0, 0, 0]
        )
        .map(Math.round);
      rows.push({
        viewport: `${vp.name} ${vp.width}x${vp.height}`,
        slide: i + 1,
        line,
        text: box.text,
        box: `${clip.width}x${clip.height}`,
        contrastAtMeanBg: +contrast(CREAM, meanBg).toFixed(2),
        contrastAtWorstPixel: +Math.min(...contrasts).toFixed(2),
        pass4_5: Math.min(...contrasts) >= 4.5,
      });
    }
    await page.evaluate(() => (document.querySelector("[data-hero-signature]").style.visibility = ""));
  }
  await page.close();
}

console.table(rows);
const worst = rows.reduce((a, r) => (r.contrastAtWorstPixel < a.contrastAtWorstPixel ? r : a));
console.log("worst case:", JSON.stringify(worst));
await browser.close();
