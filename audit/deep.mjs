/**
 * Deep pass: locate the 404 request, dump per-route visible text,
 * and collect colour pairs for a contrast audit.
 * Writes audit/deep.json + audit/text/<route>.txt
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");

const BASE = process.argv[2] || "http://127.0.0.1:5180";
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const OUT = "/home/syd/projects/sai-sree-web/audit";
const TEXT = path.join(OUT, "text");
fs.mkdirSync(TEXT, { recursive: true });

const ROUTES = ["/", "/work", "/services", "/machinery", "/about", "/contact", "/does-not-exist"];

const COLORS = () => {
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, b, a = "1"] = m[1].split(/[,/ ]+/).filter(Boolean);
    return { r: +r, g: +g, b: +b, a: +a };
  };
  const out = [];
  for (const el of document.querySelectorAll("body *")) {
    const t = Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join("");
    if (!t) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    const st = getComputedStyle(el);
    if (st.visibility === "hidden" || st.opacity === "0") continue;
    const fg = parse(st.color);
    let node = el, bg = null, bgImage = null;
    while (node && node !== document.documentElement.parentElement) {
      const s = getComputedStyle(node);
      const c = parse(s.backgroundColor);
      if (c && c.a > 0.9) { bg = c; break; }
      if (s.backgroundImage && s.backgroundImage !== "none" && !bgImage) bgImage = s.backgroundImage.slice(0, 80);
      node = node.parentElement;
    }
    if (!bg) bg = { r: 255, g: 255, b: 255, a: 1 };
    out.push({
      text: t.slice(0, 60),
      cls: (el.className || "").toString().slice(0, 50),
      tag: el.tagName.toLowerCase(),
      fontSize: +st.fontSize.replace("px", ""),
      fontWeight: st.fontWeight,
      fg, bg, bgImage,
    });
  }
  return out;
};

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox", "--no-proxy-server"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const deep = {};

for (const route of ROUTES) {
  const page = await ctx.newPage();
  const notFound = [];
  page.on("response", (r) => { if (r.status() >= 400) notFound.push(`${r.status()} ${r.url()}`); });
  await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(900);
  const text = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync(path.join(TEXT, `${route === "/" ? "home" : route.replace(/^\//, "")}.txt`), text);
  deep[route] = {
    httpErrors: notFound,
    colors: await page.evaluate(COLORS),
    // broken internal links: every internal href is fetched by the browser on click, so probe them
    internalHrefs: await page.evaluate(() =>
      Array.from(new Set(Array.from(document.querySelectorAll("a[href]")).map((a) => a.getAttribute("href"))))
    ),
  };
  console.log(route, "errors:", notFound, "colour pairs:", deep[route].colors.length);
  await page.close();
}

await browser.close();
fs.writeFileSync(path.join(OUT, "deep.json"), JSON.stringify(deep, null, 2));
console.log("wrote audit/deep.json");
