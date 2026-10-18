/**
 * Crawl the built site and record its real structure: every route, its
 * sections, and every internal link with the text that carries it.
 *
 * Run:  node audit/sitemap.mjs [baseUrl]
 * Out:  audit/sitemap.json  and a table on stdout
 */
import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire("/home/syd/.hermes/hermes-agent/package.json");
const { chromium } = require("playwright");

const BASE = process.argv[2] || "http://127.0.0.1:5180";
const EXEC = "/home/syd/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const OUT = "/home/syd/projects/sai-sree-web/audit/sitemap.json";

const ROUTES = ["/", "/work", "/services", "/machinery", "/about", "/contact", "/no-such-page"];

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const routes = [];

for (const route of ROUTES) {
  const resp = await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
  const data = await page.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    // Content rows are not always <section>: the Services page is one <ol> of
    // nine <li> entries. Take sections, and any list item or article that
    // carries a heading or an id of its own.
    const candidates = [...main.querySelectorAll("section, li, article")].filter((el) => {
      if (el.closest("header, footer, nav")) return false;
      if (el.tagName === "LI" && el.closest("nav")) return false;
      const text = el.innerText.replace(/\s+/g, " ").trim();
      const hasHeading = !!el.querySelector("h1, h2, h3, h4");
      // Closing bands carry no heading but do carry the page's action link.
      const hasLink = !!el.querySelector("a[href]") && text.length > 40;
      return text.length > 40 && (hasHeading || hasLink);
    });
    // drop rows nested inside another row (keep the outermost)
    const rows = candidates.filter((el) => !candidates.some((other) => other !== el && other.contains(el)));
    const sections = rows.map((s) => {
      const h = s.querySelector("h1, h2, h3, h4");
      const links = [...s.querySelectorAll("a[href]")].map((a) => ({
        text: a.innerText.replace(/\s+/g, " ").trim().slice(0, 48),
        href: a.getAttribute("href"),
      }));
      return {
        kind: s.tagName.toLowerCase(),
        heading: h ? h.innerText.replace(/\s+/g, " ").trim().slice(0, 60) : "(no heading)",
        id: s.id || null,
        anchorsInside: [...s.querySelectorAll("[id]")].map((e) => e.id).filter((i) => !i.startsWith("radix")),
        links,
        chars: s.innerText.replace(/\s+/g, " ").trim().length,
      };
    });
    const header = [...document.querySelectorAll("header a[href]")].map((a) => ({
      text: a.innerText.replace(/\s+/g, " ").trim(),
      href: a.getAttribute("href"),
    }));
    const footer = [...document.querySelectorAll("footer a[href]")].map((a) => ({
      text: a.innerText.replace(/\s+/g, " ").trim(),
      href: a.getAttribute("href"),
    }));
    return {
      title: document.title,
      h1: document.querySelector("h1")?.innerText.trim() ?? null,
      header,
      footer,
      sections,
      idsOnRoute: [...document.querySelectorAll("[id]")].map((e) => e.id).filter((i) => !i.startsWith("radix")),
    };
  });

  const allLinks = data.sections.flatMap((s) => s.links);
  routes.push({ route, status: resp.status(), ...data, linkCount: allLinks.length });
  console.log(
    `${route.padEnd(16)} ${resp.status()}  h1="${(data.h1 || "-").slice(0, 34).padEnd(34)}" sections=${String(data.sections.length).padStart(2)} links=${String(allLinks.length).padStart(3)} ids=${data.idsOnRoute.length}`
  );
  for (const s of data.sections) {
    const targets = [...new Set(s.links.map((l) => l.href))];
    console.log(
      `    · ${s.heading.padEnd(46)} ${String(s.links.length).padStart(2)} links -> ${targets.join(", ") || "none"}`
    );
  }
}

fs.writeFileSync(OUT, JSON.stringify({ base: BASE, crawledAt: new Date().toISOString(), routes }, null, 2));
console.log(`\nwrote ${OUT}`);
await browser.close();
