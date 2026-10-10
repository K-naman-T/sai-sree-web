# ROUND 7 — the Work page as nine composed walls

Directive (verbatim): "FUCKER THATS LIKE A SMALL CAROUSEL IN THE CENTER OF THE SECTION THAT
LOOKS SO UGLY. You can place multiple images together instead of that small of a carousel" /
"think in design terms and use a component if required from skiper ui, magic ui etc" /
"redesign the entire work page if you have to".

## What was done

- The carousel is gone (PhotoCarousel.tsx deleted). Every group now shows **all** of its
  photographs at once as one composed wall: a 12-column editorial grid on large screens,
  full content width, single column below lg.
- A new `PhotoWall` component carries the compositions. Per-group layouts are chosen from
  the photos' own ratios — near-native tile heights, crops held to a mild trim:
  mosaic (6 plates, portrait lead + two rows), duo / duo-flip / duo-cinema / duo-wide
  (the 2-plate groups, staggered or bottom-aligned), rail (3 plates, tops aligned),
  split (tall plate beside a stack), hang (portrait centred among landscapes),
  featured (trio finale). A plain wall is the fallback for any unexpected count.
- Group heads became folio mastheads: title left, blurb right on one baseline row
  (`SectionHeading` gained an optional `aside` slot).
- Plate reveals use the vendored Magic UI `BlurFade` (staggered); hover is a held crop mark.
- An not acceptable page-height budget: each wall's tile heights are viewport-derived clamps, so
  every group section still fits one screen at the desktop test viewport; the hero remains
  the only exempt section.

## Verify

All green — audit 18/18 (viewport gate included), dead-space clean on desktop and mobile
(no flat band >= 90px), shots with no console/page/request errors, no blank frames.
Work page height 8184 -> 7330px on desktop. Evidence in `.r7-ledger.md`.
