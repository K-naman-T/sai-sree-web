/**
 * Measures the real contrast of the transparent header and hero text on the home page:
 * hides the text, screenshots the background underneath, then reports the luminance
 * behind each text box (sampled in audit/sample.py).
 * Writes audit/hero-boxes.json + audit/shots/home-hero-underlay.png
 */
import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const OUT = "/home/syd/projects/sai-sree-web/audit";

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox", "--no-proxy-server"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://127.0.0.1:5180/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000); // let the hero swiper settle on a slide

const boxes = await page.evaluate(() => {
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const st = getComputedStyle(el);
    return {
      text: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 46),
      x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
      color: st.color, fontSize: st.fontSize, fontWeight: st.fontWeight,
      shadow: st.textShadow.slice(0, 60),
    };
  };
  const out = { header: {}, hero: {}, slide: null };
  const header = document.querySelector("header");
  const wordmark = header.querySelector("a span");
  out.header.wordmark = rect(wordmark);
  out.header.tagline = rect(header.querySelector("a span:nth-child(2)"));
  out.header.navLinks = Array.from(header.querySelectorAll("nav a")).map(rect);
  const main = document.querySelector("main") || document.body;
  const h1 = document.querySelector("h1");
  out.hero.h1 = rect(h1);
  const section = h1 ? h1.closest("section, div") : null;
  const paras = section ? Array.from(section.querySelectorAll("p")) : [];
  out.hero.paragraph = rect(paras[0]);
  const btn = section ? section.querySelector("a[href='/contact'], button") : null;
  out.hero.button = rect(btn);
  const slide = document.querySelector(".hero-swiper .swiper-slide-active img");
  out.slide = slide ? { src: slide.currentSrc || slide.src, complete: slide.complete, natural: slide.naturalWidth } : null;
  // hide the text so the background underneath can be photographed
  const hide = [wordmark, header.querySelector("a span:nth-child(2)"), ...header.querySelectorAll("nav a"), h1, ...paras, btn];
  hide.forEach((el) => { if (el) el.style.visibility = "hidden"; });
  return out;
});

await page.screenshot({ path: `${OUT}/shots/home-hero-underlay.png`, fullPage: false });
await page.waitForTimeout(300);
// second pass: a different hero slide, to show the contrast varies per slide
await page.evaluate(() => {
  const s = document.querySelector(".hero-swiper .swiper-slide-active img");
  if (s) s.style.filter = "brightness(1.8) saturate(0.6)";
});
await page.screenshot({ path: `${OUT}/shots/home-hero-underlay-bright.png`, fullPage: false });

fs.writeFileSync(`${OUT}/hero-boxes.json`, JSON.stringify(boxes, null, 2));
console.log(JSON.stringify(boxes, null, 2));
await browser.close();
