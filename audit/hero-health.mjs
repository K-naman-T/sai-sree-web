/**
 * Hero health: the <picture>/art-direction change must not break the carousel.
 * Checks the swap, the heights, autoplay, console errors and what the hero costs.
 *
 * Run:  node audit/hero-health.mjs
 */
import { createRequire } from "node:module";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://127.0.0.1:5180";
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox"] });

for (const vp of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "phone", width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const errors = [];
  const failed = [];
  const plateBytes = new Map();
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("requestfailed", (r) => failed.push(`${r.url()} ${r.failure()?.errorText}`));
  page.on("response", async (r) => {
    const u = new URL(r.url());
    if (u.pathname.startsWith("/plates/") && r.status() === 200) {
      const len = Number(r.headers()["content-length"] || 0);
      if (len) plateBytes.set(u.pathname, len);
    }
  });

  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  const before = await page.evaluate(() => {
    const el = document.querySelector(".hero-swiper");
    const img = document.querySelector(".hero-swiper .swiper-slide-active img");
    const r = img.getBoundingClientRect();
    return { index: el.swiper.realIndex, h: Math.round(r.height), w: Math.round(r.width), src: img.currentSrc };
  });

  await page.waitForTimeout(6500); // autoplay delay is 5200 ms
  const after = await page.evaluate(() => {
    const el = document.querySelector(".hero-swiper");
    const img = document.querySelector(".hero-swiper .swiper-slide-active img");
    const r = img.getBoundingClientRect();
    return { index: el.swiper.realIndex, h: Math.round(r.height), w: Math.round(r.width), src: img.currentSrc };
  });

  const slides = await page.evaluate(() =>
    [...document.querySelectorAll(".hero-swiper .swiper-slide img")].map((i) => i.currentSrc.split("/").pop())
  );

  const kb = (n) => Math.round(n / 1024);
  console.log(
    JSON.stringify(
      {
        viewport: `${vp.name} ${vp.width}x${vp.height}`,
        slide1: { served: before.src.split("/").pop(), rendered: `${before.w}x${before.h}`, viewportH: vp.height },
        after6_5s: { index: after.index, served: after.src.split("/").pop() },
        autoplayAdvanced: after.index !== before.index,
        allSlidesServe: slides,
        heroBytes: [...plateBytes.entries()].map(([p, n]) => `${p.split("/").pop()} ${kb(n)}kB`),
        heroTotalKB: kb([...plateBytes.values()].reduce((a, b) => a + b, 0)),
        consoleErrors: errors,
        failedRequests: failed,
      },
      null,
      1
    )
  );
  await page.close();
}

await browser.close();
