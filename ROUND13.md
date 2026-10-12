# ROUND 13 — the contact-sheet carousel removed from the services page

Directive (verbatim, this round): "remove the carousel under services section"

## What was done

**The "From our own sites" band is gone.**

- The services page's contact-sheet carousel — the row of eight photo panes (one per photographed
  service, number over title on a paper strip, hover/focus opens a pane, swipeable snap rail on
  phones) — is removed, together with the band that carried it: the section heading, the blurb
  ("Every photograph on this site comes from the company's own sites. Open a frame to read that
  service.") and its comment block.
- `src/components/services/PhotoRail.tsx` is deleted, not left unused (the R7 precedent:
  `PhotoCarousel.tsx` was retired the same way). Its import and the `railItems` derivation are
  removed from `Services.tsx`; `grep -rn 'PhotoRail\|RailItem' src` returns nothing.
- `service.evidence` in `src/data/site.ts` is untouched — `ServiceRecord` still renders each
  service's photograph, mount and caption. No photograph is lost: all eight supplied site
  photographs still appear on the page, now once each, inside their own records.

**The services page now runs:** masthead → nine service records → frieze → how a job starts →
talk band. The rail's function (giving the photographs the front seat) is already carried by the
records, photograph-led since the R12c addendum.

## Rulings

- R1: remove the section, not just the swipe behaviour. The band existed for the rail; its copy
  points at the rail ("Open a frame to read that service") and would be dead prose without it.
  Nothing else on the page linked into the rail or its anchors.
- R2: the component file goes with it — no dead module left behind.
- R3: the eight photographs stay on the page via the records; the rail was a duplicate view of
  the same eight images.

## Verify

All PASS (captures in `.r13-ledger.md`):

- `npx tsc --noEmit` clean; `npm run build` clean.
- `scripts/shots.cjs` — no console errors, no page errors, no failed requests, no 4xx/5xx.
- `scripts/audit.cjs` — 18/18 route×viewport (services desktop img 13, mobile/narrow 11; was 21
  desktop at R12c — the eight rail panes retire).
- `scripts/check_shots.py` — no blank frames. `scripts/deadspace.py` — every flat band under the
  128px cap (largest on services: 124px at the masthead seam). `scripts/check_hero_contrast.py`
  — unchanged, PASS.
- Live probe on `/services` (1440): zero "From our own sites" in rendered text, zero rail nav,
  nine records (the `ol > li` count of 14 includes the five step stations), images loading, no
  stale references in `src/`.

## Open items

- Unchanged from R11/R12: contact channels and the fleet list await the office; the
  "Enterprise"/"Enterprises" spelling still waits on the registration papers.
- If the intent was to drop the carousel's behaviour but keep a still, quiet photo row, that is a
  small re-add — a static grid of the same eight photographs, no hover-shrink, no rail.
