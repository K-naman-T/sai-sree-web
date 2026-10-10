# Sai Sree Enterprise — build report

Vite + React 18 + TypeScript (strict) rebuild of the Sai Sree Enterprise site.
Warm, artistic, premium: Mysore-painting art plates and a drawing-office grid carry
the identity; no template look, no banned effects.

## Definition of done — evidence

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 1 | All 6 routes render with real content from `reference/` | PASS | `/`, `/work`, `/services`, `/machinery`, `/about`, `/contact` all return 200 and hold a single `<h1>`; copy matches `reference/*.html` |
| 2 | `npm run build` passes | PASS | `vite build` → 461 modules transformed, `✓ built`; `tsc --noEmit` clean |
| 3 | Dev server on `:5173`, background, log to `dev.log` | PASS | `node .../vite --host 0.0.0.0 --port 5173` listening on 0.0.0.0:5173; output in `dev.log` |
| 4 | Screenshots every page 1440×900 and 390×844 in `shots/` | PASS | 12 named frames (`home-desktop.png` … `contact-mobile.png`) plus full-page frames |
| 5 | This report | PASS | This file |

Additional engineering gates from the brief, all passing:

- `npx tsc --noEmit` — clean.
- `node scripts/audit.cjs` — 18/18 route×viewport combinations pass (desktop 1440,
  mobile 390, narrow 320): no horizontal overflow, exactly one `<h1>`, no broken
  images, every visible `<img>` has explicit width/height and an alt attribute,
  every interactive target ≥ 44px, both webfonts loaded.
- `node scripts/shots.cjs` — "no console errors, no page errors, no failed requests,
  no 4xx/5xx."
- `python3 scripts/check_hero_contrast.py` — worst-case analytic composite over a
  bright plate pixel = **5.17:1**; over pure white = **4.78:1**; measured strip
  beside the rendered text 14–17:1. All ≥ 4.5:1.
- `python3 scripts/check_shots.py` — no blank frames; hero band distinctly dark
  (mean luminance 39.5 vs paper 246.0).

## Hero (locked spec)

- Full-viewport `100dvh` background carousel on `/`.
- Crossfade every 5.2s through `HERO-CREW` → `HERO-MACHINE-V2` → `HERO-MUDHOUSE` →
  `HERO-MACHINE`, with a slow Ken Burns drift (`@keyframes kenburns`).
- Pauses on hover (`pauseOnMouseEnter`); autoplay and drift both disabled under
  `prefers-reduced-motion`.
- Overlaid text over a two-layer shadow gradient scrim (bottom-up + left-side ink):
  H1 `Sai Sree Enterprise`, the brief's sub-line, one cream pill CTA `Get in touch`
  → `/contact`.
- Indicators are focusable buttons; ArrowLeft/ArrowRight on the group step the
  slides. `aria-current` marks the active dot.

## Components used (source + name)

All component code is copied into `src/` and restyled to the brand tokens. No runtime
CDN iframes.

| Source | Component | File | How it is used / restyled |
|---|---|---|---|
| Skiper UI (`skiper47` / Carousel_001, @gurvinder-singh02) | `CarouselCoverflow` | *(removed in Round 2)* | Was the Work page "Finished sites" carousel; superseded by the curated 3:2 grid so captions read with their photos (see Round 2 revisions). |
| Skiper UI (`skiper52` / HoverExpand_001, @gurvinder-singh02) | `HoverExpand` | `src/components/skiperui/HoverExpand.tsx` | Home "Work" strip (desktop ≥ lg). Solid ink title block instead of gradients; keyboard-focusable panels; a plain grid fallback below `lg`. |
| Magic UI (Dillion Verma, via 21st.dev) | `BentoGrid` / `BentoCard` | `src/components/magicui/BentoGrid.tsx` | Home "What we take on" four categories. Square corners, hairline borders, plate imagery, no shadows. |
| Magic UI (Dillion Verma, via 21st.dev) | `BlurFade` | `src/components/magicui/BlurFade.tsx` | Reveal on the category grid and step rails; framer-motion. |
| Magic UI (Dillion Verma, via 21st.dev) | `Marquee` | `src/components/magicui/Marquee.tsx` | `MarqueeBand` service-range strip under the hero. Brand `--duration` / `--gap`, pauses on hover, stops under reduced motion. |
| — (hero carousel, in-house over Swiper) | `Hero` | `src/components/Hero.tsx` | Locked hero spec: fade effect, Ken Burns, scrim, dots, keyboard. |

Supporting brand primitives (in-house): `Button` / `TextLink`, `FramedImage`,
`Section` / `Container`, `SectionHeading`, `StepsRail`, `Ornament` (`Frieze`,
`BorderRule`), `icons`, `SiteHeader`, `SiteFooter`, `Layout`.

## Fonts

- **Display / headings:** Fraunces Variable (`@fontsource-variable/fraunces`, `full.css`).
- **Body / UI:** Archivo Variable (`@fontsource-variable/archivo`).

Both self-hosted via Fontsource (no external font request). Verified loaded at runtime
by `scripts/audit.cjs`.

## Design language

- Palette tokens in `src/index.css` (`@theme`), names kept from `reference/tokens.css`
  with the brief's values: paper `#FBF7F0`, paper-2 `#F3EBDD`, ink `#1F1B16`,
  ink-2 `#6B5D4B`, terracotta `#B4472E`, ochre `#C98A2B`, gold `#B8912F`, green
  `#2E4A3A`, hairline `#DACDB6`, cream `#FCF8F1`.
- Gold is ornament linework only (rules, step dots, marquee diamonds), never body text.
- Every corner is square (0px). Pills/buttons keep square corners too; the hero CTA is
  a sharp cream bar.
- Plates are used generously: framed squares in the category cards, framed 16:9 fleet
  and service plates, `FRIEZE-5STATIONS` as the divider band over the five steps,
  `BORDER-MOTIF` as the thin rule on About and in the footer.
- Banned items are absent: no purple/blue tech gradients, no glassmorphism, no emoji,
  no lorem ipsum, no invented metrics, logos or testimonials.

## Content and the client-facts rule

- Copy is reused from `reference/*.html` (wording kept unless a line read dead; the
  duplicated line in the reference road/drain paragraph was dropped).
- Unconfirmed client facts never render. The Contact page renders no phone, WhatsApp,
  address, hours or service area; the Machinery "Fleet list" renders a short empty
  state with no placeholder rows; the footer renders the lockup and legal name only.
  The fill-list remains `reference/CONTENT-MANIFEST.md`.
- Work photos are the client's own site photographs (supplied 2026-10), captioned by the
  work they show; grouping in `src/data/photos.ts`, provenance in
  `reference/PHOTO-CREDITS.md`.

## Deviations from the brief

1. **Palette source.** The brief both lists hex values and says to port
   `reference/tokens.css`. `reference/tokens.css` / `DESIGN.md` carry an older, darker
   set (paper `#F5F0E1`, terracotta `#9E4A28`). The brief's explicit palette was taken
   as the later instruction and is what ships. Token names are unchanged.
2. **Fonts.** The brief suggested "Fraunces / Newsreader / Instrument Serif" and
   "Inter / Work Sans". Fraunces + Archivo were chosen (Archivo being the reference
   repository's own body face); both are self-hosted.
3. **Extra stand-in frames.** Full-page screenshots (`*-full.png`) are captured in
   addition to the required viewport frames, to make below-the-fold review easier.
4. **Comment-only em dashes.** Em dashes appear only inside source-code attribution
   comments, never in shipped UI copy or page text.

## Round 2 revisions

Applied the senior art-director pass in `REVISIONS.md`. Design system, palette,
fonts and content are unchanged; this was a composition and integration pass.

### Hero (`src/components/Hero.tsx`, `scripts/check_hero_contrast.py`)
- **Scrim lightened and localized.** The two full-bleed heavy gradients were
  replaced by a bottom-anchored band (`to top`: 0.90 → 0.85 → 0.38 → 0) plus a
  faint left bias (`to right`: 0.18 → 0), so the upper and right areas of the
  plates stay clear. A subtle text-shadow holds the type. Upper-band mean
  luminance rose from **39.5 to 90.6** (the art breathes); contrast still PASSes
  (analytic 5.33:1 over an L=0.90 plate pixel, 4.94:1 over pure white; measured
  13.8–15.6:1 beside the rendered text).
- **Subtext typeset.** One type step up (`clamp(1.2rem,1.9vw,1.6rem)`, medium),
  34rem max-width, three deliberate line breaks forming a clean rectangular block.
- **Indicators rebuilt.** Small sharp marks (0px radius): the active one filled
  cream, the others hairline. Moved to the bottom-right with a thin gold rule,
  which also composes the formerly dead corner. `aria-label`, `aria-current` and
  arrow-key control retained; the CTA row is no longer crowded.
- `scripts/check_hero_contrast.py` V/H stops and sample region were updated to the
  new localized scrim and the measured text box (x 3–66%, y 56–82%).

### Services (`src/pages/Services.tsx`, `src/components/ui/FramedImage.tsx`)
- Plates no longer look pasted: the paper mount / cream inner border is gone and
  `FramedImage` is now a single hairline frame flush in the band ground (no shadow).
- The nine services are one composed list: plate column capped at 24rem, a uniform
  **4:3** for all nine rows (measured 382×286 each), heading top-aligned to plate
  top (Δ −1px), tighter vertical padding, row capped at 1120px so no row trails
  into a void.
- Band grounds alternate **paper / paper-2** row by row for clean separation.
- The "What you provide" label was raised from 11.5px micro-type to 15px body.

### Work (`src/pages/Work.tsx`, `CarouselCoverflow.tsx` removed)
- The coverflow carousel was replaced by a curated grid: all six photos at a
  uniform **3:2**, generous gutters, caption directly under each photo at **15px**
  (step-1). The first group's photos *and* captions land in the first screenful.
- The unused `CarouselCoverflow` component and its CSS were deleted (no dead code).

### Cross-cutting
- Sweep across all six routes: **zero box-shadows** and **zero non-zero border
  radii**; hairline borders only.
- Home work-strip fallback grid moved to 3:2 / 15px captions; Bento card copy to
  15px.

### Re-verification (all PASS, shots regenerated)
- `npm run check` — clean. `npm run build` — ✓ built.
- `NODE_PATH="$(npm root -g)" node scripts/shots.cjs` — no console errors, page
  errors or failed requests.
- `node scripts/audit.cjs` — **18/18** route×viewport combinations pass.
- `python3 scripts/check_hero_contrast.py` — 5.33:1 / 4.94:1 analytic; 13.8–15.6:1
  measured. PASS.
- `python3 scripts/check_shots.py` — no blank frames; hero upper band 90.6 vs
  paper 246.

## Round 3 revisions

Applied the surgical art-direction pass in `ROUND3.md`. Design system, palette,
fonts and content are unchanged; this was a plate-integration and hero-polish pass.

### Services (`src/pages/Services.tsx`, `src/components/ui/FramedImage.tsx`)
- **Sticker effect killed.** `FramedImage` no longer adds a mount background or a
  border box: the container is transparent and the plate's own painted cream border
  is the frame, sitting flush on the band ground. Verified at the plate edge, the
  band ground runs straight into the plate's painted border with no hairline, matte
  or chip between.
- **Plate-native ratio.** The window now takes the plate's own aspect ratio (inline
  `aspect-ratio` from the plate's width/height) rather than a forced 4:3, so no
  plate is cropped and its painted frame is complete on all four edges. Home, About
  and Machinery keep their explicit `aspect-[16/9]` windows, which match their 16:9
  plates exactly, so those pages are visually unchanged.
- **Rows top-aligned.** The real cause was half-leading, not the grid: the `h2` box
  top already matched the plate top, but the cap line sat ~9px lower. The heading is
  now `leading-[1.15]` with a `-mt-[0.2em]` optical trim. Measured: heading cap at
  y=457 against plate top y=458 (Δ 1px).
- **Dead gap removed.** The intro band's bottom padding is now
  `pb-8 sm:pb-10 lg:pb-12` (the Work page's rhythm), giving **96px** from the intro
  band to the first plate against a **97px** plate-to-plate rhythm.
- **Plate weight.** Plate column capped at **20rem** (was 24rem), so the text column
  carries equal weight.

### Hero polish (`src/components/Hero.tsx`)
- **Subtext leading** raised from 1.5 to **1.62** (+3.1px desktop / +2.3px mobile);
  the deliberate three-line block is kept.
- **Editorial slide counter** `01 / 04` (micro-type, tabular figures) added beside
  the indicators, bottom-right. The counter and the indicator dashes share one flex
  row, vertically centred, and that row is exactly aligned with the CTA row (same
  top, bottom and centre at 1440). The count is 4, the real number of hero slides;
  the spec's "01 / 05" was illustrative, and a wrong denominator would be a false claim.
- **Nav scrim.** A third, very light top-down scrim (14% max, held across the 68px
  header, fading out by 16% of the hero) sits over the hero so the links hold over
  the plate border. It is zero across the text-contrast sample region.
- **Title kerning** tightened from -0.01em to **-0.02em**.

### Mobile hero
- A mobile-only bottom layer deepens the scrim (0.40 → 0.24 → 0 over the bottom 64%
  of the hero), keeping the art clear in the upper region and feathering through the
  middle. Measured beside the rendered subtext on `home-mobile.png`, the background
  is dark (worst pixel 15.2:1 against the cream text).
- Headline-to-subtext gap increased (24px → 28px) on small screens.
- All changes are scoped under `sm:` / `lg:`; desktop and mobile shots both regenerated.

### Re-verification (all PASS, all 24 shots regenerated)
- `npm run check` — clean. `npm run build` — ✓ built.
- `NODE_PATH="$(npm root -g)" node scripts/shots.cjs` — no console errors, no page
  errors, no failed requests, no 4xx/5xx.
- `NODE_PATH="$(npm root -g)" node scripts/audit.cjs` — **18/18** route×viewport
  combinations pass.
- `python3 scripts/check_hero_contrast.py` — **5.33:1** / **4.94:1** analytic;
  **11.26–14.78:1** measured beside the rendered text (the exact value tracks which
  slide the frame caught). PASS.
- `python3 scripts/check_shots.py` — no blank frames; hero upper band 89.0 vs paper 246.
- Nav labels verified exactly **Home / Work / Services / Machinery / About / Contact**
  on all six routes.

## Round 4 revisions (positioning copy + dead-space composition)

Round 4 carries the locked positioning directive: this company sells art and design in
construction. Factual claims were held exactly as they were; only positioning language was
added. Design system, palette and fonts are unchanged.

### Copy deck applied (verbatim where given)
- **Hero** (`src/components/Hero.tsx`) — H1 unchanged; subtext is now the positioning
  block "Construction built as craft. Art and design sit at the core of everything we build:
  civil works, earthwork and levelling, machine and material supply, and rammed earth and mud
  construction.", typeset into three deliberate lines.
- **What we take on** (`src/data/site.ts`) — four craft-framed card lines, CTA stays VIEW
  SERVICES.
- **The fleet** (`src/pages/Home.tsx`) — "Machines are the instruments. The eye of the
  operator is the difference. Hired by the hour, by the day, or by the trip."
- **How the work runs** — new lead "Every site runs the same measured sequence. Craft is a
  discipline." above the five stations.
- **Work** (`src/pages/Work.tsx`) — lead "Work built to be looked at."; intro "Finished and
  running sites. The proof is in the finish."; captions unchanged.
- **Contact** (`src/pages/Home.tsx`, `src/pages/Contact.tsx`) — "Art and design, built into
  the ground." + "Tell us about your site or a job you are planning, and we will tell you how
  we would build it."; TALK TO US on the home band.
- **Services** (`src/pages/Services.tsx`) — the new page intro, plus all nine service bodies
  rewritten to the formula (what we do plainly + one craft stance), max three sentences.
  Titles and the "What you provide" line are unchanged.
- **About** (`src/pages/About.tsx`) — rebuilt around the philosophy: the belief (art
  aesthetics are how the work is planned and built), what we do, how we run, where, a
  registrations block carrying only confirmed facts, and the closing positioning line.
- **Machinery** (`src/pages/Machinery.tsx`) — the new intro; factual machine terms kept.
- **Footer** (`src/components/layout/SiteFooter.tsx`) — positioning line under the lockup.
- **404** (`src/pages/NotFound.tsx`) — light voice echo.

### Dead-space composition
- `Section` gained optional `wash` (<=8% warm gradient) and `texture` (plate art at 14% in
  text-free zones) layers; `src/index.css` adds the wash/seam utilities.
- A new `MotifBand` (BORDER-MOTIF) and `PullQuote` live in `src/components/ui/Ornament.tsx`;
  `StepsRail` now leads each station with its oversized numeral.
- Lower band rhythm (`py-14 sm:py-16 lg:py-20`) plus motif dividers and gradient washes.
- Measured with the new `scripts/deadspace.py` (per-row luminance variance). Largest flat
  band per page before → after: Home 225px → 119px, Services 233px → 103px (the ~95px bands
  left on Services are the intended row rhythm), About 133px → 128px, Machinery 230px → 96px,
  Work 228px → 102px, Contact 230px → 101px. No dead band above 128px remains.

### Interrupted Round 3 layout items folded in
- Services plates sit flush (own painted border is the frame), rows top-aligned, plate
  column capped at 20rem, intro-to-first-row gap tightened.
- Hero subtext leading raised to 1.72, editorial "01 / 04" counter by the indicators,
  whisper nav scrim (14%) on the hero, title kerning tightened.
- Mobile hero: bottom scrim deepened (0.40 / 0.24) and headline-to-subtext gap widened.
- Nav labels confirmed exact on all six routes: Home / Work / Services / Machinery / About /
  Contact.

### Round 4 re-verification (all PASS, all shots regenerated)
- `npm run check` — clean. `npm run build` — ✓ built.
- `node scripts/shots.cjs` — no console errors, page errors, failed requests or 4xx/5xx.
- `node scripts/audit.cjs` — **18/18** route×viewport combinations pass.
- `python3 scripts/check_hero_contrast.py` — analytic 5.30:1 / 4.91:1; measured h1
  13.7–14.3:1, sub 14.2–15.5:1 (the measured strip varies with the active carousel frame).
  PASS. (Sample region widened to y 55–83% to cover the new text block.)
- `python3 scripts/check_shots.py` — no blank frames; hero upper band 89.0 vs paper 246.

## Round 5 revisions (client photographs)

The client's own site photographs replace every stand-in. Design system, palette, fonts
and the copy deck are unchanged.

### Photography (`assets/photos/`, `src/data/photos.ts`)
- 26 client photographs optimised to WebP (16–362 KB, EXIF stripped, no upscaled
  frames): `site-01..26.webp`; original filenames in `site-photos.json`; provenance in
  `credits.json` (client-supplied). The stand-ins (`standin-01..06`) are deleted
  everywhere — files, data, credits.
- Vision-classified into nine work groups with plain factual captions; every supplied
  photograph is used on the Work page.

### Work page (`src/pages/Work.tsx`, `src/components/ui/PhotoCarousel.tsx`)
- Nine carousel groups in uniform 3:2 windows with snap scrolling, keeping the
  alternating band tones and motif dividers.
- Carousel controls: caption, count and paddles under the frame; below `sm` the caption
  takes its own line and the controls stack beneath it. Paddles and dot hit areas hold
  44px on every viewport; dot marks stay hairline-thin, top-hugging and flush left with
  the frame.
- Group padding tightened so every seam holds the Round 4 dead-band bar: 119px max on
  Work.

### Home page (`src/pages/Home.tsx`)
- The Work band carries the hook pair: `site-24` (finished residence and pool) and
  `site-06` (concrete pour into the foundation) — finish beside process — with the
  stagger offset tightened (96px → 64px).

### Checker corrections (surfaced by this round)
- `check_shots.py`: a >1M-colour image (`getcolors` returns None) no longer reads as
  zero colours / blank.
- `audit.cjs`: the pre-check scan now sweeps every carousel slide horizontally, so
  lazily-loaded slides are loaded and validated instead of misread as broken images.

### Round 5 re-verification (all PASS, all shots regenerated)
- `npm run check` — clean. `npm run build` — ✓ built.
- shots: no console errors, page errors, failed requests or 4xx/5xx.
- audit: **18/18** route×viewport combinations pass.
- hero contrast: analytic **5.30:1 / 4.91:1**; measured h1 13.8–14.3:1, sub 14.1–15.5:1.
- check_shots: no blank frames; hero upper band 89.0 vs paper 246.
- dead-space: largest flat band on Work **119px** (bar: ≤128px); other pages unchanged.

## Reproduce

```bash
npm install
npm run dev                        # :5173, --host 0.0.0.0
npm run build                      # tsc --noEmit && vite build
NODE_PATH="$(npm root -g)" node scripts/audit.cjs
NODE_PATH="$(npm root -g)" node scripts/shots.cjs
python3 scripts/check_hero_contrast.py
python3 scripts/check_shots.py
python3 scripts/deadspace.py          # dead-space measurement (Round 4)
```
