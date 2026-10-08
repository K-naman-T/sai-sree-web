# Build brief — Sai Sree Enterprise website (Vite + React rebuild)

You are building the website for **Sai Sree Enterprise**, an Indian construction,
earthwork and machinery contractor (Jharkhand/Bihar class of work: civil contracts,
earthwork and excavation, site levelling, machine contracts by hour/day/trip,
machinery with operator, material supply, labour supply, road/drain/barrier work,
rammed earth and mud construction).

A plain HTML v0 exists and was judged **visually flat — "the whole design is bad"**.
Your job is the premium rebuild. The bar: artistic, warm, premium — a first read
that makes the company look serious and crafted. NOT a generic template.

## Stack
- Vite + React 18 + TypeScript (strict), react-router-dom (6 routes).
- Tailwind CSS v4 + shadcn-style component conventions (the component sources below assume them).
- No backend. `npm run build` must pass; dev server runs `--host 0.0.0.0 --port 5173` and must be left running at the end.

## Component sources (required)
Pull suitable components from **Skiper UI** (https://ui.skiper-ui.com — shadcn-based animated components) and/or **21st.dev** (https://21st.dev — React component marketplace). Look for: hero with image carousel / fullscreen background slider, text-over-image with gradient scrim, navbar, bento or feature cards, marquee, section headings, footer, step/process list.
Rules: copy component CODE into `src/components/` (never runtime CDN iframes), then restyle to the brand tokens below. Pick what earns its place; do not paste a whole template.

## Hero — locked spec
- Full-viewport (`100dvh`) hero on `/`.
- **Background: multi-image auto-carousel** — crossfade every ~5s through:
  `assets/plates/HERO-CREW.webp`, `HERO-MACHINE-V2.webp`, `HERO-MUDHOUSE.webp`, `HERO-MACHINE.webp`.
  Subtle scale drift (Ken Burns) allowed; pause on hover; stop all motion under `prefers-reduced-motion`.
- **Overlaid text with a shadow gradient scrim** (dark gradient behind the text — bottom-up or left-side, your call, must be strong enough that text contrast passes):
  - H1: `Sai Sree Enterprise`
  - Sub: `Civil construction, earthwork and levelling, machine and material supply, and rammed earth and mud construction.`
  - CTA: `Get in touch` → `/contact` (one primary CTA; pill or sharp bar, terracotta or cream on dark).
- Carousel dots/indicators + keyboard accessible. Text contrast ≥ 4.5:1 (verify computed, not eyeballed).

## Design language
- Warm, artistic, premium. Identity comes from the **Mysore-painting art plates** + warm palette, not from ornament noise.
- Brand palette (port from `reference/tokens.css`, keep names): paper ~#FBF7F0, ink ~#1F1B16, terracotta ~#B4472E, ochre ~#C98A2B, gold ~#B8912F, deep green ~#2E4A3A. Gold = accent linework/borders only, never body text.
- Type: display serif for headings (Fraunces / Newsreader / Instrument Serif class) + clean sans for body (Inter / Work Sans class). Strong hierarchy: hero title large and confident; section titles one clear step down.
- Use the art plates generously: framed plates in service cards, frieze as a section divider band, border motif as thin rules. Cream surfaces, hairline gold/ink borders, **sharp corners (0px radius)** except pills/buttons where a small radius is fine.
- BANNED: purple/blue tech gradients, glassmorphism, emoji, generic stock-template looks, lorem ipsum, invented metrics/logos/testimonials.

## Pages and content (copy comes from `reference/` — reuse wording unless a line reads dead)
1. `/` Home — hero; "What we take on" 4 categories (Civil construction / Earthwork and levelling / Machine and material supply / Rammed earth and mud construction) as cards; fleet band (machines hired by the hour, day or trip, with an operator → link to /machinery); "How the work runs" five steps (Receive the site, Survey and set out, Cut and excavate, Fill and level, Compact and hand over) under the FRIEZE-5STATIONS divider; Work photo strip → /work; Contact band.
2. `/work` — "Finished sites" (standin-01..03) and "Running sites" (standin-04..06) with captions below (captions in `reference/work.html`).
3. `/services` — the 9 services, each with its plate image, description and "What you provide" line (all text in `reference/services.html`).
4. `/machinery` — machinery page copy from `reference/machinery.html` (fleets list is UNCONFIRMED — see facts rule).
5. `/about` — copy from `reference/about.html`.
6. `/contact` — copy from `reference/contact.html` (contact facts are unconfirmed — see facts rule). `docs/CONTENT-MANIFEST.md` lists the client facts we still need.

## CLIENT FACTS RULE (hard)
Unconfirmed client facts (phone, WhatsApp, address, districts served, working hours,
fleet list, registrations) NEVER render as invented values and never as filler text.
Missing fact → the element that would hold it does not render at all.

## Services → plate mapping (in page order)
1 Civil construction contracts → TILE-CIVIL · 2 Earthwork and excavation → HERO-MACHINE-V2 ·
3 Site levelling and preparation → TILE-EARTHWORK · 4 Machine contracts (hour/day/trip) → HERO-MACHINE ·
5 Machinery with operator → HERO-MACHINE-V2 · 6 Material supply → TILE-SUPPLY ·
7 Labour supply and labour contracts → TILE-LABOUR · 8 Road, drain and barrier work → TILE-ROAD ·
9 Rammed earth and mud construction → HERO-MUDHOUSE.
Decorative: FRIEZE-5STATIONS = section divider band over the five steps; BORDER-MOTIF = thin rule.

## Assets (in `assets/`, already in the repo)
- `assets/plates/*.webp` — 12 art plates (see mapping above; HERO-MUDHOUSE-SQ.webp is the square crop for small slots).
- `assets/photos/standin-01..06.jpg` — TEMPORARY stand-in site photos (captions in reference; never caption them as this company's named sites).

## Engineering
- TypeScript strict; `npx tsc --noEmit` clean before finishing.
- Images: explicit width/height (no layout shift), lazy-load below the fold.
- Responsive 320 → 1440 (test 390 too). Zero console errors, zero failed requests.

## Definition of done
1. All 6 routes render with real content from `reference/`.
2. `npm run build` passes.
3. Dev server running on `:5173` (background, log to `dev.log`).
4. **Screenshots of every page at 1440×900 and 390×844 into `shots/`** (the lead agent reviews them visually — use Playwright or `npx playwright screenshot`). Name them `home-desktop.png`, `home-mobile.png`, etc.
5. Short report in `REPORT.md`: components used (source + name), fonts chosen, any deviations from this brief.
