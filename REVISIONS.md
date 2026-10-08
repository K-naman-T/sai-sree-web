# REVISIONS — apply every item, then re-verify

You built this site (see REPORT.md). A senior art-director review of the screenshots found
the defects below. Fix ALL of them in the Vite app in this directory. Design system, palette,
fonts and content stay as they are. This is a composition and integration pass.

## A. Hero (home-desktop.png / home-mobile.png)
1. **Scrim too heavy.** The plates are the best asset and the dark overlay buries them. Lighten
   it substantially: a targeted, localized gradient behind the TEXT ONLY (left/bottom-left),
   plus a subtle text-shadow to hold contrast. Measure contrast again (scripts/check_hero_contrast.py
   must stay PASS) and lighten as far as the measurement allows. The art must visibly breathe.
2. **Subtext typography.** It reads generic and small against the huge title with awkward
   line breaks ("...and levelling, machine and material supply, and..."). Raise the size one
   step, set a comfortable max-width, and balance the line breaks into a clean rectangular
   block (block spans with deliberate breaks). It should look typeset, not wrapped.
3. **Slider indicators** (the four dashes beside the CTA) read as floating placeholders. Restyle
   as deliberate, brand-made indicators: small sharp marks (0px radius), the active one filled
   terracotta or cream, others hairline; place them with intent (e.g. bottom-right of the hero
   where the dead space is) and label them accessibly.
4. **Dead bottom-right space.** Compose it: either the indicators live there with a thin gold
   rule, or add one restrained line (the five work stations as micro-type, or a scroll cue).
   Do not leave a void.

## B. Services (services-desktop.png)
5. **Plates look pasted.** Remove every drop shadow and white/cream inner border from the art
   plates (the design system bans shadows). Frame them with the hairline treatment used
   elsewhere and integrate them into the band ground.
6. **Balance.** The plate column is massive while the text floats in cream space. Reduce plate
   size, fix a consistent image ratio per row (4:3 or square, same for all 9 rows), align the
   top of each service heading with the top of its plate, and tighten the vertical gaps. Each
   service row should read as one composed cell: plate + heading + description + the
   "What you provide" line, with a steady rhythm down the page.
7. **Dead space.** Alternate the band grounds (paper / paper-2) so rows separate cleanly, and
   keep content columns tight enough that no row looks half-empty on 1440px.

## C. Work (work-desktop.png)
8. **Captions must be visible with their photos in the first screenful.** Scale photos down so
   photo + caption sit together in the grid cell (this is a standing rule: images must not
   dominate, captions must be readable at a glance). Captions at the body/step-1 size, never
   micro-type.
9. **Grid: consistent aspect ratio for all six photos (3:2), more generous gutters** so it
   reads as a curated showcase, not an image dump.

## D. Cross-cutting
10. Sweep every page: no element may look like a floating placeholder; no shadows anywhere;
    0px radius; hairlines only; every image sized so it supports the text instead of
    overpowering it; caption/label type at step-1 or larger.
11. Re-run the FULL verification suite after the edits: `npm run check`, `npm run build`,
    `NODE_PATH="$(npm root -g)" node scripts/shots.cjs`, `node scripts/audit.cjs`,
    `python3 scripts/check_hero_contrast.py`, `python3 scripts/check_shots.py`.
    All must pass and all shots must be regenerated (they are the review artifact).
12. Update REPORT.md with a "Round 2 revisions" section listing what changed.

Finish with: DONE plus the list of changed files.
