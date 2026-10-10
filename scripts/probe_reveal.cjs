/* Probe the Work page reveal state: for every image, report its load state and
 * the computed opacity/transform of its BlurFade wrapper after a full scroll
 * sweep. Then capture viewport shots at two group positions to eyeball whether
 * tiles are actually visible on screen. Run with:
 *   NODE_PATH="$(npm root -g)" node scripts/probe_reveal.cjs
 */
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:5173/work", { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);

  // Full scroll sweep, same as shots.cjs.
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);

  const report = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll("figure img").forEach((img) => {
      const figure = img.closest("figure");
      const wrap = figure ? figure.parentElement : null;
      const ws = wrap ? getComputedStyle(wrap) : null;
      out.push({
        src: (img.getAttribute("src") || "").split("/").pop(),
        complete: img.complete,
        nw: img.naturalWidth,
        wrapClass: wrap ? wrap.className : null,
        opacity: ws ? ws.opacity : null,
        transform: ws ? ws.transform : null,
        filter: ws ? ws.filter : null,
      });
    });
    return out;
  });
  console.log("PROBE_JSON " + JSON.stringify(report));

  // Viewport captures at two problem areas (G5 ~3400, G8 ~5500).
  for (const [name, y] of [["g5", 3350], ["g8", 5450]]) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `shots/probe-${name}.png` });
  }
  await browser.close();
  console.log("PROBE_DONE");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
