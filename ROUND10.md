# ROUND 10 — real photographs, the machine frieze, the brand mark, a sharper call

Directive (verbatim, this round): "need some real images in services and machinery page as
well ... Put a mix of artistic and real images ... And also the name of the company is
Alankara (by Sai sree enterprises, written in the bottom right of the hero section and also
mentioned in the footer)" / "and need a better CTA too" / "also use alankara in the header
and the hero section of homepage". (The custom-CMS request was answered
with a plan at `.hermes/plans/2026-10-10_212609-sai-sree-cms.md`; build not in this round.)

Method note: model work runs on the heavy-work host, not the build VM; background removal on
an online service was authorised only as a fallback if that output disappointed (it did not).

## What was done

- **Services** (`src/pages/Services.tsx`): each service row's column now stacks the plate,
  then one real client photograph in a hairline window, then its caption — the same column
  width for both elements (measured: every window x=160, w=320, exact). Photographs chosen
  from the client's own set per service (site-10, -09, -20, -14, -11, -07, -23, -21). Rammed
  earth ships without one — the client's set does not carry that work, and another service's
  photo is not reused for it.
- **Machinery** (`src/pages/Machinery.tsx`): the framed stand-in art is gone. Two bands now:
  (1) the fleet frieze — four studio cutouts (excavator, backhoe, tipper, compactor) standing
  on one hairline, class-level only, no labels and no captions, so the page cannot state a
  fleet beyond the "Fleet list" box; (2) "Machines at work" — three of the client's own
  photographs (site-11, -15, -14) as a rail with captions.
- **The machine cutouts** (`assets/machines/`, declared temporary in CONTENT-MANIFEST.md):
  compactor keyed from its studio plate; excavator and 3DX backhoe matted semantically on the
  heavy-work host (rembg); tipper is the manufacturer's own cutout with its baked ground
  shadow stripped so the row stands on one line with no shadows. Threshold keying was tried
  first and scrapped on evidence (holes at the machines' low-saturation light zones, mirror-
  reflection ghosts) — see the ledger.
- **The mark** — Alankara, by Sai Sree Enterprises: the masthead, the home hero's headline,
  the hero's bottom-right corner mark (below the slider indicators, inside the scrim's ≥0.85
  composite zone under the same text-shadow hold as the headline), the footer lead block
  (name, byline, tagline) and the browser-tab titles now all carry Alankara. The registered
  name stays in the footer's legal line, About's registered line, and the photo credits.
- **CTA copy** sharpened over the R9 system: hero action names the visitor's move ("Tell us
  about your site"); every page closes on one action — "Talk to us" standard, "Hire a
  machine" on Machinery. No contact route is invented: the channels remain pending client
  data, so `CONTENT-MANIFEST.md` (the file the Contact page's note refers to) was restored
  and now also tracks the temporary machine art.

## The artifact found on the way

Full-page reviews at downscale are unreliable: two passes "found" plate/window width
mismatches in Services that the DOM disproved (every window x=160, w=320 — exact; the plates
sit in the same 320px column). Rule kept for future rounds: the suite's measurements decide
layout questions; prose reviews are advisory. Same discipline for cutouts — a machine ships
only after it survives review at display size.

## Verify

All PASS on the final build (evidence in `.r10-ledger.md`): audit **18/18** incl. the
section-fit gate; shots regenerated — no console errors, page errors, failed requests or
4xx/5xx, no blank frames; hero contrast 5.30:1 analytic worst case (4.91:1 over a pure-white
pixel), measured beside the rendered text 13.7–16.2:1; dead-space: every page within the
standing ≤128px bar — Work clean, Machinery 105px (the final pass caught a 161px band the
frieze had introduced — two stacked section pads — and fixed it), Home 116px, About 117px,
Contact 102px, Services 98–100px per row. Reviews: frieze "deliberate and well spaced,
catalog-like"; mobile frieze fits on the hairline, "nothing broken at 390px"; hero mark "sits
cleanly, no collision"; footer hierarchy "clear"; Services captions legible at full
resolution.
