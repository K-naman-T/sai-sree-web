/**
 * Numeric check of the home page after the "What we do" removal:
 * the actual pixel gap between the bands that now meet, at 1440 and 390 px,
 * plus overflow and console health. No eyeballing.
 */
import { createRequire } from "node:module";
const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox", "--no-proxy-server"] });
for (const vp of [{ n: "desktop", w: 1440, h: 900, dsf: 1 }, { n: "mobile", w: 390, h: 844, dsf: 2 }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: vp.dsf });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));
  await page.goto("http://127.0.0.1:5180/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const m = await page.evaluate(() => {
    const y = (el) => (el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null);
    const box = (sel) => { const el = document.querySelector(sel); if (!el) return null; const r = el.getBoundingClientRect(); return { top: Math.round(r.top + window.scrollY), bottom: Math.round(r.bottom + window.scrollY), h: Math.round(r.height) }; };
    const byText = (tag, text) => Array.from(document.querySelectorAll(tag)).find((e) => e.textContent.trim().toLowerCase() === text) || null;
    const quote = document.querySelector("blockquote, .font-display");
    const cards = document.querySelectorAll("section")[1];
    const sections = Array.from(document.querySelectorAll("section")).map((s) => {
      const r = s.getBoundingClientRect();
      return { top: Math.round(r.top + window.scrollY), bottom: Math.round(r.bottom + window.scrollY), h: Math.round(r.height) };
    });
    // find the hero-slide and the quote text element precisely
    const quoteEl = Array.from(document.querySelectorAll("*")).find((e) => e.children.length === 0 && e.textContent.trim().startsWith("Art and design sit at the core"));
    const fleetHead = byText("h2", "the fleet");
    const quoteImg = quoteEl ? quoteEl.getBoundingClientRect() : null;
    return {
      sections,
      contiguous: sections.every((s, i) => i === 0 || s.top === sections[i - 1].bottom),
      gaps: sections.slice(1).map((s, i) => s.top - sections[i].bottom),
      quoteText: quoteImg ? { top: Math.round(quoteImg.top + window.scrollY), bottom: Math.round(quoteImg.bottom + window.scrollY) } : null,
      fleetHeadingTop: y(fleetHead),
      fleetBox: box("section:nth-of-type(3)"),
      lastCardBottom: cards ? Math.round(cards.getBoundingClientRect().bottom + window.scrollY) : null,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      pageHeight: document.documentElement.scrollHeight,
      h1Count: document.querySelectorAll("h1").length,
      h2s: Array.from(document.querySelectorAll("h2")).map((h) => h.textContent.trim()),
      images: document.images.length,
      broken: Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0).length,
    };
  });
  console.log(`\n=== ${vp.n} (${vp.w}px) ===`);
  console.log("page height      :", m.pageHeight);
  console.log("sections top/bot :", m.sections.map((s) => `${s.top}-${s.bottom}`).join("  "));
  console.log("gaps between     :", m.gaps.join(", "), m.contiguous ? "(contiguous)" : "(NON-ZERO GAP)");
  console.log("quote text       :", m.quoteText);
  console.log("The fleet heading:", m.fleetHeadingTop, "-> space under quote band:", m.fleetHeadingTop - (m.quoteText ? m.quoteText.bottom : 0), "px");
  console.log("h2 order         :", m.h2s.join(" | "));
  console.log("overflow         :", m.scrollWidth - m.clientWidth, "px  images:", m.images, "broken:", m.broken, "h1:", m.h1Count, "errors:", errs.length ? errs : "none");
  await ctx.close();
}
await browser.close();
