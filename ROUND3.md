# ROUND 3 — surgical art-direction fixes

Round 2 passed Home and Work. Services still fails review, plus hero polish. Apply ALL:

## Services (the failing page)
1. **Kill the "sticker" effect on plates.** The plates' own painted cream margins read as a
   white matte when mounted on `bg-paper-2` with a border. Change `FramedImage`: no mount
   background (transparent) and NO border box around the plate; let the plate's own painted
   border be the frame. The plate must sit flush in its band ground.
2. **Top-align every service row.** The heading top must sit on the same horizontal line as
   its plate top (`items-start` on the grid is not enough if a wrapper centers content —
   find and fix the real cause).
3. **Remove the dead gap** between the page intro paragraph and the first service row
   (currently a large empty band). Tighten to a deliberate section rhythm.
4. **Plate weight**: shrink the plate column a notch (e.g. 24rem -> 20rem max) so the text
   column carries equal weight.

## Hero polish (Home)
5. Subtext leading +2-4px; keep the balanced block.
6. Add an editorial slide counter near the indicators ("01 / 05", micro-type) to anchor the
   bottom-right; indicators aligned with intent (vertically centered with the CTA row or the
   counter group, not floating).
7. Nav: add a very subtle top-down scrim (10-15% max) behind the header area on the hero so
   links stay crisp over the plate border.
8. Title kerning: tighten the space in "Sai Sree Enterprise" slightly (letter-spacing tweak).

## Mobile hero
9. Scrim a touch darker toward the bottom on small screens (subtext currently borderline over
   busy art), keeping the art visible in the upper 2/3.
10. Increase the gap between headline and subtext slightly; keep subtext line breaks rhythmic.

## Verify (same suite as before, regenerate ALL shots)
`npm run check`, `npm run build`, `NODE_PATH="$(npm root -g)" node scripts/shots.cjs`,
`node scripts/audit.cjs`, `python3 scripts/check_hero_contrast.py`, `python3 scripts/check_shots.py`.
All PASS, then update REPORT.md with "Round 3". Also confirm nav labels are exactly
Home / Work / Services / Machinery / About / Contact on every page.

Finish with: DONE plus the changed-file list.
