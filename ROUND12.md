# ROUND 12 — the services page rebuilt, the contact page given its content

Directive (verbatim, this round): "i need a better redesigned services page, one art and one
real image is looking bad, redesing the page use relevant compoonents from skiper, magic or
aceternity" / "customize them if needed to go well with our design system" / "also need the
contact page to have proper content like the company information, location and all, use
placeholder if needed (if you dont have info), assume if you can".

## What was done

**Services — rebuilt around the photographs.**

- **The rail** (`src/components/services/PhotoRail.tsx`): a contact sheet of the eight site
  photographs the company supplied — one pane per service, number over title on a paper
  strip. The hovered (or focused) pane opens while the rest dim; each pane jumps to its
  record. On phones it is a swipeable snap rail. Mechanics follow Aceternity UI's focus-cards
  (https://ui.aceternity.com/components/focus-cards), rebuilt on plain flex so the house
  rules hold — square corners, hairline borders, no glow.
- **The records** (`src/components/services/ServiceRecord.tsx`): each service now composes
  its two images instead of stacking them. The painted plate carries the column; the
  photograph from the company's own sites is laid onto it like a print pinned to the
  painting — paper mount, hairline, caption beneath, hanging past the plate's edge — and
  drifts a little on scroll (`src/components/aceternity/ParallaxDrift.tsx`, mechanics after
  Aceternity UI's parallax-scroll). Rows alternate media/text left-right, so the page reads
  as rhythm.
- **The glare** (`src/components/magicui/GlareHover.tsx`, Magic UI, https://magicui.design):
  a soft paper sheen on hover, both frames — adapted (no cursor affordance, radius stays 0,
  quiet strength).
- **Skiper's free set** (numbered components: swap widgets, cursor trails, sign-ins) was
  read and passed over: app-UI vocabulary that fights the print language. The "customize"
  ask is answered in the vendored components themselves — all three are cut to the design
  system, credits in their file headers.
- **Rammed earth keeps its status**: the one service the company does not yet photograph —
  its record runs plate-only. Nine records, eight rail panes, by design.

**Contact — given its content (placeholders where values are missing).**

- **Reach the office**: Call and WhatsApp as the action. The number is a masked placeholder
  (`+91 9XXXX XXXXX`) printed as plain text — not a dead link — with the line that it prints
  once the office confirms it; working hours (assumed, Mon-Sat 9am-6pm); "who answers"
  (assumed line); and "when you call, have this ready".
- **The company**: registered and trading lines, what the company does (approved copy),
  "where we work" (assumed from the engagement's market coverage — Bengaluru south, the
  Harohalli corridor, Ramanagara district), and the address held as a note until confirmed.
- The duplicated "how a job starts" steps now live only on Services; contact closes with the
  pull quote and a link onward.
- Everything assumed or masked is listed in CONTENT-MANIFEST.md ("In place, to confirm
  before publish") and flips to live by setting value + href + `pending: false` in
  `src/data/site.ts`.

## Rulings

- R1: photographs first — the rail gives all eight site photographs the front seat; the
  records compose art + photograph as collage rather than dropping either.
- R2: no dead controls — masked placeholders print as text; tel:/wa.me links only when real.
- R3: assumptions only where soft (hours, who answers, the where-we-work line); hard
  identifiers (number, address, map) are never invented.
- R4: all vendored components customized to the system — square corners, hairlines, no glow,
  reduced-motion respected.

## Verify

All PASS (captures in `.r12-ledger.md`): tsc clean; build clean; shots — no console errors,
no page errors, no failed requests, no 4xx/5xx; audit — six routes x three viewports, all ok,
zero horizontal overflow (services and contact at 390); hero contrast unchanged; live probe —
8 rail panes on the right anchors, 9 records / 8 evidence figures, contact masked number
present, zero tel:/wa.me links while pending. Pixel review of the rail, a record composition,
the contact sections and mobile: rail caption strips re-cut after review (stacked number over
title, two lines, uniform height) and the record caption given more air; re-verified.

## Open items

- Contact channels, hours, service area: confirm with the office, then swap the values in
  `src/data/site.ts` (see CONTENT-MANIFEST.md).
- The fleet list (machinery) still awaited.
