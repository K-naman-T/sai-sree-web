# ROUND 11 — the lockup, the corrected name, the restated hero

Directive (verbatim, this round): "update the website on flex to use that specific font and
spacing for Alankara across the website, only the navbar will have it, and the hero section
bottom right has just ' - by sai sree enterprises'" / "and therefore we need a new hero text
and subtext" / "correction - the name is sri sai not sai sree, and put - by sri sai enterprises
below Alankara in the header only, place and position well".

## What was done

- **The header lockup** (`src/components/layout/SiteHeader.tsx`): the masthead is now the
  client's own two-line layout, on every page. The wordmark ALANKARA is set in Marcellus — the
  face the header type specimen recommends for the wordmark, and the face its own header pages
  are drawn in — in tracked capitals at 0.30em, the specimen's exact value. Under it, the
  enterprise line "- by Sri Sai Enterprises" in Archivo tracked caps (0.18em), left edges
  equal (x=48), the two lines width-matched (163px both at desktop), the block centred in the
  68px bar (lockup content centre 34.25 vs bar centre 34). Over the hero the lockup carries
  the hero's text-shadow at 90% cream; scrolled (paper ground) it is ink at 80%. The face is
  one token — `--font-mark` in `src/index.css` — so another face of the specimen's shortlist
  (Cinzel, Teko, Fraunces) is a one-line swap when the client picks one.
- **The name correction**: Sai Sree -> Sri Sai across `src/`, `index.html` and
  `CONTENT-MANIFEST.md` (9 occurrences replaced, zero remaining; every route scanned for the
  stale spelling). The 7 October proposal document was prepared under the old spelling and
  cannot be rewritten; documents from here carry Sri Sai. Singular or plural ("Enterprise" /
  "Enterprises") still waits on the registration papers.
- **The hero restated** (`src/components/Hero.tsx`): the corner signature is retired — the
  enterprise line lives in the header lockup only, per the correction. The headline no longer
  repeats the name; it states what the company does — "Construction built as craft." — with
  a balanced two-line wrap, and the subtext leads with the site's existing art-and-design
  line: "Art and design sit at the core of everything we build: civil works, earthwork and
  levelling, machine and material supply, and rammed earth and mud construction." No new
  claims: all copy reuses approved site language, nothing invented.

## Verify

All PASS on the final build (captures in `.r11-ledger.md`): tsc clean; build clean (dist
ships marcellus-latin-400); shots — no console errors, no page errors, no failed requests,
no 4xx/5xx; hero contrast unchanged (analytic 5.30:1 worst case, 4.91:1 over a pure-white
pixel; measured h1 5.50:1, sub 14.13:1); audit across six routes x three viewports; live
probe — Marcellus loaded, lockup measured, no stale name anywhere.

## Review notes

The first pixel pass flagged the enterprise line as washing out over the photographic hero
(small tracked caps over busy art): fixed in-round with the text-shadow hold and 90% cream
over the hero, 80% ink on paper. The lockup remains a 44px tap target; the enterprise line runs at 10px in both viewports, its tracking tuned so the width still matches the wordmark.
