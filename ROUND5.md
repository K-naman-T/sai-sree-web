# ROUND 5 — client photographs integrated

The client supplied 26 site photographs (`consfilnal-2.zip`). Directives: classify them with
vision and populate ALL of them on the Work page; photographs from the same site/work belong
in one carousel; use a couple on the Home page as targeted hook images in a relevant section.
Plan it as a big task; parallel subagents allowed (deepseek-v4.1-flash / mimo-v2.6 only).
Follow-ups: restart the web server with the Cloudflare link; screenshot-and-review until
perfect; if parallel subagents risk breaking the code, run the fixes normally.

## What was done

- All 26 photographs optimised to WebP (16–362 KB, EXIF stripped, no upscaled frames) as
  `assets/photos/site-01..26.webp`; original filenames and dimensions mapped in
  `assets/photos/site-photos.json`.
- Vision-classified in parallel batches into 9 work groups; captions kept plain and factual
  (`src/data/photos.ts`). Every supplied photograph is used; nothing invented.
- Work page rebuilt as nine carousel groups (`src/components/ui/PhotoCarousel.tsx`): uniform
  3:2 windows, snap scrolling, captions and counter below the frame, alternating band tones,
  plate motif dividers between movement changes.
- Home page Work band gained the hook pair: `site-24` (finished residence and pool) next to
  `site-06` (concrete pour over the embankment) — finish beside process.
- The six web stand-ins were deleted everywhere: files, `src/data/site.ts` exports, credits.
- Dev server restarted on Flex; preview served over the Cloudflare tunnel.
- Screenshot review pass across all routes and both viewports. Two real defects found and
  fixed: mobile carousel ergonomics (caption, controls and dots re-laid for touch) and the
  Home hook-pair offset (tightened). Everything else survived review clean.

## Verify

Full suite re-run after the fixes — `npm run check`, `npm run build`, shots, audit, hero
contrast, shot sanity, dead-space. Evidence in `.r5-ledger.md`.
