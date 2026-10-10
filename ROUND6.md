# ROUND 6 — viewport-fit rule

Directive (verbatim): "NOW AGAIN, THESE IMAGES ARE TOO FUCKING BIG ON THE SITE, NO SECTION
SHOULD GO BEYOND THE VIEWPORT UNLESS IT HAS TO."

## What was done

- The Work page photo groups become centered "exhibited plates": the whole group column is
  height-capped so the section fits the viewport; images stay 3:2 and uncropped — smaller on
  content-heavy screens, larger on taller ones.
- The About 4:5 plate and the Machinery 16:9 plate get the same treatment (width caps that
  keep their ratios, so no plate is cropped).
- The hero keeps full viewport height and is marked `data-viewport-exempt`; it is the only
  exemption ("unless it has to").
- The audit gains a permanent section-height gate (desktop): every section must fit the
  viewport (fixed 68px header included) unless exempt.

## Verify

Full suite green — `npm run check`, `npm run build`, shots, audit (now 18/18 including the
new gate), hero contrast, shot sanity, dead-space. Evidence in `.r6-ledger.md`.
