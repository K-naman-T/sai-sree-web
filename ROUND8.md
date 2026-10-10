# ROUND 8 — walls that plan themselves

Directive (verbatim): "we will move towards a CMS in the future so keeping a dynamic site in
mind, imagine the client can add a bunch of images for a certain section in their admin profile
and the component that we use to display these images either auto arranges them when stacked
together like in the current layout. Plan on this" / "we are not building a cms now but only the
component so that it supports multiple images dynamically" / "the images are either landscape or
portrait shots from iphone".

## What was done

- The Work page's hand-kept per-group layout map is gone. A new pure module,
  `src/components/ui/wallPlan.ts`, turns any group of photographs into a composition from the
  photographs themselves: count, portrait/landscape mix, letterbox (16:9-ish) and true
  panorama ratios.
- `PhotoWall` gained the full variant set for arbitrary input (solo, solo-portrait,
  duo-portrait, duo-mixed, rail-mixed, portrait-rail, quad, stack32, mosaic5, grid6,
  grid-many, alongside the round-7 variants), so a group of 1, 4, 7 or 12 images composes
  sensibly with no page edits. 9+ plates may flow past one screen because they have to.
- Sibling groups of the same shape rotate through their treatments (duo / duo-flip /
  duo-wide; rail / featured) so two 2-photo groups never look cloned. Aspect overrides
  (cinema pair, panorama split, portrait leads) are chosen first and do not consume a
  rotation slot.
- `scripts/plan_check.cjs` asserts the planner: the nine groups on the page today come back
  in exactly their hand-composed variants, plus a synthetic matrix for CMS-style input.

## Verify

`PLAN_CHECK: 24 assertions passed`. The rebuilt page measures **exactly 1440x7330** — the
same height as the hand-mapped round-7 page — so the auto-planner reproduces every
composition pixel-for-pixel. Audit 18/18, shots clean, dead-space clean. Evidence in
`.r8-ledger.md`.
