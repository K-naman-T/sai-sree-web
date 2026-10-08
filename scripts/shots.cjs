/* Capture screenshots of every route at desktop and mobile sizes, and record
 * console errors / failed requests. Run with:
 *   NODE_PATH="$(npm root -g)" node scripts/shots.cjs
 */
const { chromium } = require("playwright");
const { mkdirSync, writeFileSync } = require("node:fs");

const BASE = "http://localhost:5173";

const routes = [
  { slug: "home", path: "/" },
  { slug: "work", path: "/work" },
  { slug: "services", path: "/services" },
  { slug: "machinery", path: "/machinery" },
  { slug: "about", path: "/about" },
  { slug: "contact", path: "/contact" },
];

const devices = [
  { slug: "desktop", width: 1440, height: 900, isMobile: false },
  { slug: "mobile", width: 390, height: 844, isMobile: true },
];

async function main() {
  mkdirSync("shots", { recursive: true });
  const browser = await chromium.launch();
  const problems = [];

  for (const device of devices) {
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      deviceScaleFactor: 1,
      isMobile: device.isMobile,
      hasTouch: device.isMobile,
    });
    const page = await context.newPage();
    const errors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
    });
    page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
    page.on("requestfailed", (req) =>
      errors.push(`requestfailed: ${req.url()} (${req.failure() && req.failure().errorText})`),
    );
    page.on("response", (res) => {
      if (res.status() >= 400) errors.push(`http ${res.status()}: ${res.url()}`);
    });

    for (const route of routes) {
      await page.goto(BASE + route.path, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1100);

      await page.screenshot({ path: `shots/${route.slug}-${device.slug}.png` });

      // On the home desktop frame, record the hero text boxes for the contrast check.
      if (route.slug === "home" && device.slug === "desktop") {
        const boxes = await page.evaluate(() => {
          const h1 = document.querySelector("h1");
          const sub = h1 && h1.nextElementSibling;
          return {
            h1: h1 ? h1.getBoundingClientRect().toJSON() : null,
            sub: sub ? sub.getBoundingClientRect().toJSON() : null,
          };
        });
        writeFileSync("shots/home-hero-boxes.json", JSON.stringify(boxes, null, 2));
      }

      // Scroll sweep so in-view reveals settle, then a full-page frame.
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = "auto";
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 150));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(400);
      await page.screenshot({
        path: `shots/${route.slug}-${device.slug}-full.png`,
        fullPage: true,
      });
      await page.evaluate(() => window.scrollTo(0, 0));
    }

    if (errors.length) problems.push(`--- ${device.slug} ---\n${errors.join("\n")}`);
    await context.close();
  }

  await browser.close();
  if (problems.length) {
    console.log("PROBLEMS FOUND:\n\n" + problems.join("\n\n"));
    process.exitCode = 1;
  } else {
    console.log("OK: no console errors, no page errors, no failed requests, no 4xx/5xx.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
