# Alankara — website analysis

Site: **Alankara, by Sri Sai Enterprises** (construction and earthmoving, Harohalli / Bengaluru south).
Repo: `github.com/K-naman-T/sai-sree-web`, branch `master`, public.
Analysis date: 2026-10-14. Everything below comes from a command run on this machine or a page
measured in real Chromium. No item is inferred from reading code alone unless it says so.

## 1. What exists and where it runs

| Item | Value |
|---|---|
| Stack | Vite 5.4 + React 18.3 + TypeScript 5.6 + react-router-dom 6.28 + Tailwind CSS 4.1 |
| Motion / UI libs | framer-motion 11, swiper 11, lucide-react, clsx, tailwind-merge |
| Fonts | Fraunces Variable (display), Archivo Variable (body), Marcellus (wordmark) |
| Media | `assets/` via git-LFS: 26 webp photos, 12 webp plates, 4 machine cutouts — 7.8 MB total |
| Build | `npm run build` green: 461 kB JS (145 kB gzip), 49 kB CSS (11.8 kB gzip), 14.5 s |
| Typecheck | `npx tsc --noEmit` green |
| Local preview | http://127.0.0.1:5180 — systemd user unit `sai-sree-web` (`scripts/serve-preview.sh`) |
| Public link (now) | https://sai-sree-web.vercel.app — Vercel production, deployed 2026-10-14 07:00 UTC |
| Tunnel (temporary) | https://mid-sacrifice-interactions-european.trycloudflare.com — dies with this machine |
| Repo state | nothing pushed, nothing committed. `vercel.json` added locally for the deploy only |

Routes: `/` `/work` `/services` `/machinery` `/about` `/contact` plus a catch-all NotFound page.

## 2. Measured page table (real Chromium 1440x900 and 390x844)

| Route | HTTP | H1 | Images | Broken | H-overflow @390 | Text | Load | Transfer at load |
|---|---|---|---|---|---|---|---|---|
| `/` | 200 | 1 | 19 | 0 | 0 px | 2 353 ch | 136 ms | 2 221 kB |
| `/work` | 200 | 1 | 32 | 0 | 0 px | 1 931 ch | 111 ms | 1 862 kB |
| `/services` | 200 | 1 | 13 | 0 | 0 px | 3 399 ch | 100 ms | 368 kB |
| `/machinery` | 200 | 1 | 11 | 0 | 0 px | 852 ch | 118 ms | 722 kB |
| `/about` | 200 | 1 | 7 | 0 | 0 px | 1 396 ch | 89 ms | 0 kB |
| `/contact` | 200 | 1 | 4 | 0 | 0 px | 1 522 ch | 89 ms | 0 kB |
| `/does-not-exist` | 200 | 1 | 1 | 0 | 0 px | 360 ch | 93 ms | — |

Transfer is what the browser pulled at the load scroll position; lazy images add more as the reader
scrolls. No console errors, no page errors, no failed requests on any route. No image is broken.
Every image carries width and height. All images except the hero are `loading="lazy"`.

Accessibility facts measured, not estimated:

- One `h1` per route, no skipped heading levels (home: H1 → H2/H3 → H2…).
- No image has a missing `alt` attribute. Empty `alt=""` appears only on decorative plates.
- The only control under 44x44 px is the visually-hidden "Skip to content" link (1x1 px by design).
- No horizontal overflow at 1440 px or 390 px on any route.
- Text contrast passes WCAG AA everywhere it was sampled (370 text elements): the weakest real pair
  is terracotta `#b4472e` on paper-2 `#f3ebdd` at **4.57:1**, at 11.5–15 px.

## 3. Findings, worst first

### MUST — a customer cannot contact this business

The `/contact` page, and every "Talk to us" call to action on the site, leads here:

- Phone: `+91 9XXXX XXXXX` — masked. `src/data/site.ts:445`
- WhatsApp: "the same number". `src/data/site.ts:451`
- Address: "The street address prints once the office confirms it, with the map." No map. `src/data/site.ts:466`
- No email anywhere. **No contact form anywhere** (measured: 0 forms, 0 inputs on all 7 routes).
- Hours are real: "Monday to Saturday, 9am to 6pm".

So today a visitor can read the site but cannot act on it. The code is built for this: a value with
`pending: true` prints as plain text instead of a dead link (comment at `src/data/site.ts:427-432`).
Only the phone number, the WhatsApp link and the address are needed to switch the site on.

### MUST — the header over the hero does not hold AA contrast

The header is transparent over the hero photo, with cream text and a 1 px dark text-shadow
(`SiteHeader.tsx:17, 32, 60`). I photographed the hero with the text hidden and sampled the pixels
behind each text box:

| Element | Size | Contrast vs mean background | Worst pixel in the box |
|---|---|---|---|
| `ALANKARA` wordmark | 18.9 px | 5.31 | 2.37 |
| `- by Sri Sai Enterprises` | 10 px | 3.08 | 2.75 |
| Nav links (Home…Contact) | 14 px | 2.94 – 3.18 | 1.77 – 1.94 |
| Hero headline | 92 px | 14.87 | 5.02 |
| Hero paragraph | 24 px | 16.74 | 14.04 |

AA needs 4.5:1 for 14 px text. The nav sits at ~3:1 against the average background and under 2:1 on
the lightest pixels. The 10 px tagline is the weakest element on the page. This works today only
because the current hero illustration is dark in that band; a lighter photograph in the same slot
drops the nav to ~1.5:1 (measured with a simulated brighter hero). The headline and paragraph are
safe. A scrim behind the header band, or a solid header, removes the dependency.

### MUST — search engines and link previews see an empty page

Measured against the live URL:

- The HTML of every route is the same shell: `<div id="root"></div>` plus one script tag.
  Title and description in the raw HTML are generic ("Alankara — by Sri Sai Enterprises") on all
  routes; the per-page title is set by JavaScript after load (`useDocumentTitle.ts:6`).
- No `og:` or `twitter:` tags. No `canonical`. No favicon (`/favicon.ico` → 404 on local and live).
- `/robots.txt` → 404. `/sitemap.xml` → 404. No structured data (LocalBusiness/Organization).
- Unknown paths return HTTP 200 with the NotFound page (soft 404) — both on Vercel and locally.

Result: a WhatsApp or Google share of this site shows no preview card, and search engines have very
little to index. For a business whose customers find contractors by search and share links by
WhatsApp, this is the second real gap after contact details.

### MUST — the company is named three different ways

| Name | Where |
|---|---|
| `Sri Sai Enterprises` (plural) | brand lockup `src/data/site.ts:45`, `index.html:8`, `index.html:11` |
| `Sri Sai Enterprise` (singular) | legal/registered line `src/data/site.ts:41`, `About.tsx:115`, footer, CSS header `index.css:4` |
| `Sai Sree Enterprise` (different spelling) | photo licence in `assets/photos/credits.json`, 52 entries |

The client must confirm one legal name and one spelling. Until then the footer and the lockup
disagree on the same screen.

### SHOULD — content that is not published yet

- **Machinery / Fleet list**: "The machine classes, their capacity, and whether each is owned or hired
  are not published yet." The page therefore has no fleet data at all — for a machine-hire business
  this is the main selling surface. The Machinery page is also the thinnest page (852 characters).
- **No prices or rates anywhere.** Hiring is described as "by the hour, by the day, or by the trip"
  but no rate, range or "ask for a quote" anchor exists.
- **About / Registrations** carries only the registered name — no GST/PAN/licence line, no year
  founded, no team, no plant count.
- **No enquiry form and no analytics** on any route.

### SHOULD — image weight and mobile transfer

- Home pulls **2.2 MB** at desktop, **1.3 MB** at 390 px.
- Heaviest single files: `photos/site-24.webp` 359 kB (2000 px), `photos/site-21.webp` 350 kB,
  `plates/HERO-MACHINE.webp` 254 kB, `plates/HERO-CREW.webp` 216 kB, `plates/HERO-MUDHOUSE.webp` 203 kB.
- Images ship at one size (1040–2000 px wide) with no `srcset`/`sizes`, so a phone downloads the
  desktop file and downscales it. Six woff2 font files load, three of them Variable.
- Nothing here is a defect in itself; on Indian mobile data the first screen is the one that matters,
  and the first screen is 4 hero plates totalling ~860 kB.

### PROVENANCE — recorded, not changed (you froze art and wording)

- The 26 site photographs are correctly credited: `assets/photos/credits.json` gives creator
  "Sai Sree Enterprise", licence "Client-supplied; permission of Sai Sree Enterprise", source
  "Client photographs supplied 2026-10-10 (consfilnal-2.zip)", with original filenames. This is good
  practice and should stay.
- The 12 files in `assets/plates/` have **no credits file**. A vision check of
  `plates/HERO-CREW.webp` shows a flat folk-art illustration (decorative painted border, repeated
  stylised figures), not a photograph. Its alt text nevertheless reads as a photograph:
  "Workers raising a rammed earth wall, tamping wet earth into tall wooden formwork with hand rammers
  beside bamboo scaffolding." (`src/data/site.ts:53`). The same pattern applies to the tile plates
  whose alt text describes masonry, levelling and material scenes. The site never claims these are
  photographs of the company's work — but the alt text does, to screen readers and to Google Images.
- Nothing was changed. This is a record for the client conversation.

## 4. What is solid

- The design system is real and consistent: warm paper ground, drawing-office hairlines, Mysore-style
  plates, zero radius, gold reserved for ornament, three named typefaces — all in one token block
  (`src/index.css:9-27`) and applied without exception across pages.
- Route structure, header, footer and CTA wiring are complete: every link on every page resolves
  (measured: no `#`, empty or `javascript:` hrefs anywhere; no external links).
- Honesty is built into the content: pending values print as text, never as dead links; no invented
  numbers, testimonials or badges anywhere in the copy; captions match the credited photos.
- Mobile layout holds: no overflow at 390 px, tap targets respect 44 px, headings are ordered.
- Performance of the code itself is fine: 89–136 ms to load event locally, small DOM (77–364 nodes),
  no layout leaks, no console noise.
- The temporary tunnel and the Vercel deploy both verified: all routes 200, assets 200 with correct
  `image/webp` content type, production alias behind Vercel HSTS.

## 5. Suggested order of work (nothing done yet)

1. Get the phone number, WhatsApp number and address from the office, and one decision on the
   legal name and its spelling. These two unlock the contact page, the footer and the share card.
2. Add favicon, `og:`/`twitter:` tags with a share image, `robots.txt` and `sitemap.xml` — small,
   self-contained, no design change.
3. Fix the header band contrast (scrim or solid header) — the one accessibility failure measured.
4. Add `srcset` sizes for the photos and re-encode the four hero plates.
5. Publish the fleet list and a hire-terms line with rates, when the office has them.

## 6. Deep audits folded in (code + content)

Both audits finished: `audit/code-audit.md` and `audit/content-audit.md`. I re-ran the load-bearing
claims myself; the ones below are confirmed with real output, and two reports are corrected.

Confirmed, and new since section 4:

- **`vercel.json` is untracked** (`git status`: `?? vercel.json`). The live site is fine — I deployed
  it with the CLI, from this working copy. But if Vercel is ever connected to the GitHub repo, the
  build would run without that file and every deep link (`/work`, `/contact`, a WhatsApp share)
  would 404. It must be committed before any repo-based deploy. The rewrite regex itself is correct:
  after `vite build`, `dist/` holds `assets/ photos/ plates/ machines/ index.html`, and all four
  media directories are excluded from the rewrite, so nothing is shadowed. No change needed there.
- **Two internal JSON files publish to the web.** `publicDir: "assets"` copies
  `photos/credits.json` and `photos/site-photos.json` into `dist`. Verified live:
  `https://sai-sree-web.vercel.app/photos/credits.json` → **200, application/json, 8 930 bytes**.
  That file lists the client's original camera filenames, byte counts and the source zip name
  (`consfilnal-2.zip`). Harmless in itself, but it is internal material on a public URL and it is
  one line to exclude.
- **No route code-splitting.** No `React.lazy` or dynamic `import()` anywhere in `src`, so the single
  461 kB (145 kB gzip) chunk ships on every route, including the 852-character Machinery page.
  Swiper is imported only by `src/components/Hero.tsx`; framer-motion by four components. Both are
  in the one chunk.
- **Dependency and dead-code tail.** `lucide-react` is a declared runtime dependency and is imported
  nowhere (verified by grep across `src`). `src/components/skiperui/HoverExpand.tsx` (66 lines) is
  imported nowhere. Both are free to remove, with no design change.
- **No lint or format tooling at all**: no `.eslintrc*`, `eslint.config.*`, `.prettierrc*` or
  `biome.json`; `package.json` has only `dev`, `build`, `preview`, `check`. `tsconfig.json` does run
  strict: `strict`, `noUnusedLocals`, `noUnusedParameters` are all `true`, `noEmit` true, path alias
  `@/*` — so the type discipline is real, and `npx tsc --noEmit` exits 0.
- **Tab title drops the enterprise.** `src/hooks/useDocumentTitle.ts:6` sets
  `<Page> | Alankara`, so the browser tab, the search-result title and any bookmark read only
  "Alankara" — the name a new customer has never heard — while the page header says
  "ALANKARA — by Sri Sai Enterprises".
- **One paragraph states both company names.** `src/pages/Contact.tsx:110-112` renders
  `{companyName}` ("Sri Sai Enterprise") and then `by {brandBy}` ("Sri Sai Enterprises") in the same
  sentence — the clash is visible on one screen, not only across pages.
- **Five claims are marked as unconfirmed in the code and ship anyway**: the working area and hours
  ("Assumed: the engagement's market coverage…" `site.ts:463`, "assumed for the preview"
  `site.ts:457`), the two "What we do" lines ("Provisional wording until the office confirms its
  copy" `site.ts:79`), and the "who answers" line. The documents those comments cite —
  `CONTENT-MANIFEST.md`, `REPORT.md` — are not in the repo (no `.md` file exists in it at all;
  they were removed in commit `ce762fa`).

Corrections to the two reports, so the record is straight:

- The content report reads `vercel.json:7` as "listing" `robots.txt` and `sitemap.xml` as if they
  should exist. That line is the rewrite exclusion, not a claim that the files exist. Both files are
  genuinely absent — my own live checks agree.
- Both reports call out the header-over-hero contrast from source reading only. My pixel
  measurement in section 3 stands as the stronger evidence.
- One audit subagent edited `.gitignore` (adding `.vercel`) while working. I reverted it —
  `git diff` is clean again and no tracked file is modified. `.vercel/`, `audit/` and `scripts/` are
  untracked and stay that way until you say otherwise. `.vercel/` should go into `.gitignore` before
  the first push.

Evidence for this file: `audit/render.json`, `audit/deep.json`, `audit/hero-boxes.json`,
`audit/code-audit.md`, `audit/content-audit.md`, screenshots in `audit/shots/` and `audit/view/`.
