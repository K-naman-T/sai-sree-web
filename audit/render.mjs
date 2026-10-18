/**
 * Render sweep for the Alankara site: real Chromium, real measurements.
 * Writes JSON to audit/render.json and screenshots to audit/shots/.
 * Run:  node audit/render.mjs [baseUrl]
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");

const BASE = process.argv[2] || "http://127.0.0.1:5180";
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const OUT = "/home/syd/projects/sai-sree-web/audit";
const SHOTS = path.join(OUT, "shots");
fs.mkdirSync(SHOTS, { recursive: true });

const ROUTES = ["/", "/work", "/services", "/machinery", "/about", "/contact", "/does-not-exist"];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, dsf: 1 },
  { name: "mobile", width: 390, height: 844, dsf: 2 },
];

const MEASURE = () => {
  const els = (s) => Array.from(document.querySelectorAll(s));
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    const st = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && st.visibility !== "hidden" && st.display !== "none";
  };
  const text = (el) => (el ? (el.textContent || "").replace(/\s+/g, " ").trim() : null);

  // horizontal overflow offenders
  const docOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  const wide = els("body *")
    .filter(vis)
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.right > document.documentElement.clientWidth + 2 || r.left < -2)
    .slice(0, 12)
    .map(({ el, r }) => ({
      tag: el.tagName.toLowerCase(),
      cls: (el.className || "").toString().slice(0, 60),
      left: Math.round(r.left),
      right: Math.round(r.right),
    }));

  // tap targets under 44px (mobile-relevant)
  const small = els("a, button, [role=button], input, select, textarea")
    .filter(vis)
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.width < 44 || r.height < 44)
    .slice(0, 15)
    .map(({ el, r }) => ({
      tag: el.tagName.toLowerCase(),
      label: text(el).slice(0, 40),
      w: Math.round(r.width),
      h: Math.round(r.height),
    }));

  // images
  const imgs = els("img").map((i) => ({
    src: i.currentSrc || i.src,
    alt: i.getAttribute("alt"),
    w: i.getAttribute("width"),
    h: i.getAttribute("height"),
    loading: i.getAttribute("loading"),
    complete: i.complete,
    natural: i.naturalWidth,
    shown: Math.round(i.getBoundingClientRect().width),
  }));

  // links and their destinations
  const links = els("a[href]").map((a) => ({
    text: text(a).slice(0, 44),
    href: a.getAttribute("href"),
    target: a.getAttribute("target"),
    blank: /^https?:\/\//.test(a.getAttribute("href") || ""),
  }));

  const res = performance.getEntriesByType("resource").map((r) => ({
    name: r.name.replace(location.origin, ""),
    type: r.initiatorType,
    kb: Math.round((r.transferSize || r.encodedBodySize || 0) / 1024),
    ms: Math.round(r.duration),
  }));
  const nav = performance.getEntriesByType("navigation")[0];

  return {
    url: location.href,
    title: document.title,
    lang: document.documentElement.lang || null,
    metaDescription: document.querySelector('meta[name=description]')?.content || null,
    metaOG: els("meta[property^='og:'], meta[name^='twitter:']").map((m) => m.getAttribute("property") || m.getAttribute("name")),
    canonical: document.querySelector("link[rel=canonical]")?.href || null,
    favicon: document.querySelector("link[rel~='icon']")?.getAttribute("href") || null,
    headings: els("h1,h2,h3,h4").map((h) => ({ lvl: h.tagName, t: text(h).slice(0, 90) })),
    h1Count: els("h1").length,
    bodyTextLength: document.body.innerText.replace(/\s+/g, " ").length,
    domNodes: document.querySelectorAll("*").length,
    images: imgs,
    brokenImages: imgs.filter((i) => i.complete && i.natural === 0).map((i) => i.src),
    imagesWithoutAlt: imgs.filter((i) => i.alt === null).length,
    imagesEmptyAlt: imgs.filter((i) => i.alt === "").length,
    lazyImages: imgs.filter((i) => i.loading === "lazy").length,
    eagerImages: imgs.filter((i) => i.loading !== "lazy").length,
    imagesWithoutDimensions: imgs.filter((i) => !i.w || !i.h).length,
    docOverflow,
    wideElements: wide,
    smallTapTargets: small,
    links,
    externalLinks: links.filter((l) => l.blank).map((l) => l.href),
    placeholderLinks: links.filter((l) => ["#", "", "javascript:void(0)"].includes(l.href)).map((l) => l.text),
    buttonCount: els("button").length,
    formCount: document.querySelectorAll("form").length,
    inputCount: document.querySelectorAll("input, textarea, select").length,
    timingMs: nav ? { ttfb: Math.round(nav.responseStart), domContentLoaded: Math.round(nav.domContentLoadedEventEnd), load: Math.round(nav.loadEventEnd) } : null,
    resources: { count: res.length, kb: res.reduce((a, r) => a + r.kb, 0), fontResources: res.filter((r) => r.type === "css" || /\.woff2?/.test(r.name)).length },
    slowest: res.sort((a, b) => b.kb - a.kb).slice(0, 8),
  };
};

const results = [];
const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox", "--no-proxy-server"] });
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
    isMobile: vp.name === "mobile",
    hasTouch: vp.name === "mobile",
    userAgent: vp.name === "mobile"
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
      : undefined,
  });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const failed = [];
    page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleErrors.push(`${m.type()}: ${m.text().slice(0, 200)}`); });
    page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 200)));
    page.on("requestfailed", (r) => failed.push(`${r.url().replace(BASE, "")} :: ${r.failure()?.errorText}`));
    let status = null;
    try {
      const resp = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
      status = resp ? resp.status() : null;
      await page.waitForTimeout(1200);
      const m = await page.evaluate(MEASURE);
      const shot = path.join(SHOTS, `${vp.name}-${route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-")}.png`);
      await page.screenshot({ path: shot, fullPage: true });
      results.push({ viewport: vp.name, route, httpStatus: status, shot, consoleErrors, pageErrors, failedRequests: failed, ...m });
      console.log(`${vp.name.padEnd(7)} ${route.padEnd(16)} http=${status} h1=${m.h1Count} imgs=${m.images.length} broken=${m.brokenImages.length} overflow=${m.docOverflow}px text=${m.bodyTextLength}ch load=${m.timingMs?.load}ms kb=${m.resources.kb}`);
    } catch (err) {
      results.push({ viewport: vp.name, route, httpStatus: status, error: String(err).slice(0, 300), consoleErrors, pageErrors, failedRequests: failed });
      console.log(`${vp.name.padEnd(7)} ${route.padEnd(16)} ERROR ${String(err).slice(0, 120)}`);
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(path.join(OUT, "render.json"), JSON.stringify(results, null, 2));
console.log(`\nwrote ${path.join(OUT, "render.json")} with ${results.length} records`);
