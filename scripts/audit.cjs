/* Layout, accessibility and asset audit across routes and viewports.
 * Run with: NODE_PATH="$(npm root -g)" node scripts/audit.cjs
 */
const { chromium } = require("playwright");

const BASE = "http://localhost:5173";
const routes = ["/", "/work", "/services", "/machinery", "/about", "/contact"];
const devices = [
  { slug: "desktop", width: 1440, height: 900 },
  { slug: "mobile", width: 390, height: 844 },
  { slug: "narrow", width: 320, height: 720 },
];

async function auditPage(page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    const overflow = de.scrollWidth - de.clientWidth;

    const imgs = Array.from(document.images)
      .filter((i) => i.getBoundingClientRect().width > 0)
      .map((i) => ({
        src: i.currentSrc || i.src,
        nw: i.naturalWidth,
        nh: i.naturalHeight,
        hasW: i.hasAttribute("width"),
        hasH: i.hasAttribute("height"),
        alt: i.getAttribute("alt"),
      }));

    const bodyFont = getComputedStyle(document.body).fontFamily;
    const heroHeading = document.querySelector("h1");
    const heroFont = heroHeading ? getComputedStyle(heroHeading).fontFamily : null;

    const interactive = Array.from(document.querySelectorAll("a, button, [role='button']")).filter(
      (el) => {
        const r = el.getBoundingClientRect();
        // Ignore visually-hidden controls (e.g. the sr-only skip link until focused).
        return r.width > 1 && r.height > 4;
      },
    );
    const small = interactive
      .filter((el) => el.getBoundingClientRect().height < 44)
      .map((el) => ({
        tag: el.tagName,
        text: (el.textContent || "").trim().slice(0, 28),
        h: Math.round(el.getBoundingClientRect().height),
      }));

    return {
      overflow,
      h1: Array.from(document.querySelectorAll("h1")).map((h) => (h.textContent || "").trim()),
      imgCount: imgs.length,
      broken: imgs.filter((i) => i.nw === 0).map((i) => i.src),
      missingFile: imgs.filter((i) => i.nw > 0 && (i.nw < 4 || i.nh < 4)).map((i) => i.src),
      noDims: imgs.filter((i) => !i.hasW || !i.hasH).map((i) => i.src),
      noAlt: imgs.filter((i) => i.alt === null).map((i) => i.src),
      bodyBg: getComputedStyle(document.body).backgroundColor,
      bodyFont,
      heroFont,
      frauncesLoaded: document.fonts.check('16px "Fraunces Variable"'),
      archivoLoaded: document.fonts.check('16px "Archivo Variable"'),
      smallCount: small.length,
      small: small.slice(0, 8),
    };
  });
}

async function main() {
  const browser = await chromium.launch();
  let failures = 0;

  for (const device of devices) {
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
    });
    const page = await context.newPage();

    for (const route of routes) {
      await page.goto(BASE + route, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      // Scroll through the page so lazy images load and reveals settle.
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = "auto";
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(400);
      // Wait for every visible image to finish loading before judging them.
      await page
        .waitForFunction(
          () =>
            Array.from(document.images)
              .filter((i) => i.getBoundingClientRect().width > 0)
              .every((i) => i.complete && i.naturalWidth > 0),
          null,
          { timeout: 10000 },
        )
        .catch(() => {});
      const r = await auditPage(page);
      const problems = [];
      if (r.overflow > 0) problems.push(`horizontal overflow ${r.overflow}px`);
      if (r.h1.length !== 1) problems.push(`h1 count = ${r.h1.length}`);
      if (r.broken.length) problems.push(`broken images: ${r.broken.join(", ")}`);
      if (r.noDims.length) problems.push(`images missing width/height: ${r.noDims.length}`);
      if (r.noAlt.length) problems.push(`images missing alt attribute: ${r.noAlt.length}`);
      if (r.smallCount) problems.push(`${r.smallCount} targets < 44px: ${JSON.stringify(r.small)}`);
      if (!/Fraunces/.test(r.heroFont || "")) problems.push(`hero font not Fraunces: ${r.heroFont}`);
      if (!/Archivo/.test(r.bodyFont)) problems.push(`body font not Archivo: ${r.bodyFont}`);
      if (!r.frauncesLoaded) problems.push("Fraunces Variable webfont not loaded");
      if (!r.archivoLoaded) problems.push("Archivo Variable webfont not loaded");

      const tag = `${device.slug.padEnd(7)} ${route.padEnd(10)}`;
      if (problems.length) {
        failures += 1;
        console.log(`FAIL  ${tag} | img:${r.imgCount} bg:${r.bodyBg}`);
        for (const p of problems) console.log(`        - ${p}`);
      } else {
        console.log(`ok    ${tag} | img:${r.imgCount} bg:${r.bodyBg} h1:"${r.h1[0]}"`);
      }
    }
    await context.close();
  }

  await browser.close();
  console.log(failures ? `\n${failures} page/viewport combinations failed.` : "\nAll audits passed.");
  process.exitCode = failures ? 1 : 0;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
