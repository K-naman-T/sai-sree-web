# ROUND 14 — the "What we do" carousel added to the home page

Directive (verbatim, this round): "one the home page, there's 2 new sections to be added ,
'what we do' section carousel . their names would be 'Architecture Designs' and 'Landsacape' ."

Follow-up correction (verbatim): "dont read the clients note , its not clear enough" — the
handwritten note images on the client channel are not a source for copy; this round builds
from the directive alone.

## What was done

**The home page gets a "What we do" band, between "What we take on" and the positioning
quote.**

- It is a carousel, one slide per design service: a photograph from the company's own sites
  in a paper mount on the left, the name and one line beside it on the right.
- Two slides, both named by the client — **Architecture Designs** (photograph: the finished
  residence and pool) and **Landscape** (photograph: slope finishing and drainage). Both
  photographs are from the client's own supplied set; no art plates in this band.
- Navigation: the two names above the frame are the tabs — 44px targets, arrow-key support,
  the active one carried by a terracotta underline. The carousel advances on its own every
  7 seconds, pauses on hover or focus, and holds still under `prefers-reduced-motion`. No
  counters and no arrows (the R12b house call).
- Data: `whatWeDo` in `src/data/site.ts` — a third slide is one data edit.
  Component: `src/components/WhatWeDoCarousel.tsx`, hand-rolled as a grid stack (no slider
  library) so slides share one cell: the frame height is the tallest slide's, with no jump
  between slides and nothing absolutely positioned under the capture gates.
- The band carries the `seam-to-paper2` wash into the quote band below; its top padding is
  tightened so the seam with the band above stays under the dead-space cap
  (145px → 121px, cap 128px).

## Rulings

- R1: one band, two slides. The directive names one section ("What we do ... carousel") and
  two entries; the entries are slides of that carousel, not two separate bands.
- R2: no copy from the client's handwritten notes. The one line under each name is written
  to the site voice, provisional, and flagged in the content manifest; nothing unconfirmed
  is presented as the office's words. Both swap in one data edit.
- R3: photographs are the company's own (site-24, site-21). The band shows no art plate.
- R4: the tabs are the only control, and they are live (they switch the slide); no counters
  or arrows are drawn, per the R12b client call on carousel chrome.

## Verify

All PASS (captures in `.r14-ledger.md`):

- `npx tsc --noEmit` clean; `npm run build` clean.
- `scripts/shots.cjs` — no console errors, no page errors, no failed requests, no 4xx/5xx.
- `scripts/audit.cjs` — 18/18 route×viewport. Home image count 17 → 19 desktop (one per
  slide); no section exceeds the viewport (the new band measures 774px at 1440×900).
- `scripts/check_shots.py` — no blank frames. `scripts/deadspace.py` — home desktop flat
  bands 119 / 116 / 121px (all under the 128px cap); mobile bands ≤112px.
- `scripts/check_hero_contrast.py` — unchanged, PASS.
- Live probe — heading "What we do", two tabs at 44px with `aria-selected` switching on
  click, two panels, one image per slide, no horizontal overflow at 390px.

## Open items

- **Confirmed copy** for both services, and any process or detail the office wants shown:
  swaps in through `whatWeDo` (one data edit).
- Whether these two also become records on the Services page, and whether they are hireable
  the same way the other services are.
- The requested "2" slides are in; the carousel takes any number — say the word and a third
  name is a one-line addition.
