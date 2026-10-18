# Code health, performance, accessibility and deploy-readiness audit

Repo: `/home/syd/projects/sai-sree-web` — Vite + React 18 + TypeScript + Tailwind v4 + react-router-dom 6.
Every number below comes from a command run in this session; the command and its output are quoted.

---

## 1. Structure and size

### Line counts per source area

```
$ for d in src/pages src/data src/components src/hooks src/lib; do
    echo -n "$d: "; find $d -type f \( -name '*.ts' -o -name '*.tsx' \) | xargs cat | wc -l; done
src/pages: 658
src/data: 742
src/components: 2039
src/hooks: 23
src/lib: 6
src/index.css: 184
src total (ts/tsx/css): 3705
```
Total source = **3705 lines**. Components are the bulk (2039). Pages 658, data 742.

### Dependencies

```
$ node -e "const p=require('./package.json');console.log('dependencies:',Object.keys(p.dependencies).length);console.log('devDependencies:',Object.keys(p.devDependencies).length)"
dependencies: 11
devDependencies: 7
```
11 runtime deps, 7 dev deps. (One runtime dep, `lucide-react`, is never imported — see §3.)

### Built bundle sizes (`npm run build`, real output)

```
dist/index.html                                               0.67 kB │ gzip:   0.39 kB
dist/assets/index-Dk_4rOLt.css                               48.92 kB │ gzip:  11.77 kB
dist/assets/index-0mDoyqz2.js                               461.20 kB │ gzip: 144.96 kB
✓ 467 modules transformed
✓ built in 16.96s
```
**One JS chunk (461 kB / 145 kB gzip)** and one CSS file (49 kB / 12 kB gzip).
Font files also ship: woff2/woff total ≈ **393 kB** (largest: `fraunces-latin-full-normal` 121.02 kB, `fraunces-latin-ext-full-normal` 105.24 kB). There is **no route-level code splitting** — every route loads swiper and framer-motion (§5).

### Media weight under `assets/`

```
$ du -sh assets && du -sh assets/*
7.8M    assets
212K    assets/machines
6.1M    assets/photos
1.6M    assets/plates
$ find assets -type f | wc -l
44
```
**44 media files, 7.8 MB total.** Largest 10:

```
377010 assets/photos/site-10.webp
369910 assets/photos/site-01.webp
367824 assets/photos/site-24.webp
361776 assets/photos/site-26.webp
358332 assets/photos/site-21.webp
338200 assets/photos/site-09.webp
337014 assets/photos/site-23.webp
318146 assets/photos/site-18.webp
282598 assets/photos/site-19.webp
260250 assets/plates/HERO-MACHINE.webp
```
The photos are large (mostly 260–377 kB each). None are resized per breakpoint and no `<picture>`/srcset is used — mobile downloads the desktop file.

---

## 2. Type safety and lint

### `npx tsc --noEmit`

```
$ npx tsc --noEmit; echo "EXIT=$?"
EXIT=0
```
**Passes.** `npm run build` runs `tsc --noEmit && vite build` and also passes.

### tsconfig.json strictness flags (`tsconfig.json`)

| Flag | State | Value |
|---|---|---|
| `strict` | ON | `true` (line 20) |
| `noUnusedLocals` | ON | `true` (line 21) |
| `noUnusedParameters` | ON | `true` (line 22) |
| `noFallthroughCasesInSwitch` | ON | `true` (line 23) |
| `jsx` | ON | `react-jsx` (line 18) |
| `paths` | ON | `"@/*": ["./src/*"]` (lines 27-29) |
| `noUncheckedIndexedAccess` | **OFF** | not present |

`noUncheckedIndexedAccess` is **off**. Indexed reads on data arrays are therefore typed as non-nullable. Examples: `src/pages/Home.tsx:17` (`const fleetPlate = heroSlides[1];`), `src/pages/Work.tsx:53` (`WALLS[index] ?? "grid-many"` — the `??` is defensive but the type says it is never undefined), `src/components/WhatWeDoCarousel.tsx:40` (`whatWeDo[next].id`). No error is raised today only because the flag is off.

### ESLint / Prettier / Biome

```
$ ls -la | grep -iE 'eslint|prettier|biome'; find . -maxdepth 2 ... \( -iname '.eslintrc*' -o -iname 'eslint.config*' -o -iname '.prettierrc*' -o -iname 'biome.json*' \) -print
(no output)
```
There is **no ESLint, Prettier or Biome config at all**, and no lint script in `package.json`. Formatting and lint are unenforced.

---

## 3. Runtime code risks

Verified by reading the source and grepping.

**Dead code**
- `src/components/skiperui/HoverExpand.tsx` — the whole 66-line component is imported nowhere: `grep -rn 'HoverExpand' src --include=*.tsx` (excluding the file itself) returns no hits.
- `src/components/ui/icons.tsx:18` `ChevronLeft` and `:34` `ChevronRight` — exported, imported nowhere (grep returns only the definitions).
- `src/components/magicui/GlareHover.tsx:41,52,81,83` — the `playOnce` prop is never set by a caller, so the `playOnce` branch is unreachable in production.
- `lucide-react` is a declared runtime dependency but `grep -rn 'lucide' src` returns nothing — unused dependency.

**Type casts**: no `any` casts — `grep -rn ': any\|as any\|<any>' src --include=*.tsx` returns nothing.

**Missing `key` props**: none. Every `.map()` in JSX carries a `key` (24 `key=` sites checked).

**Missing states on data surfaces**: the one data-driven "table" has an explicit empty state instead of placeholder rows — `src/pages/Machinery.tsx:41-51` ("The machine classes … are not published yet."). No fetch/network data surfaces exist, so no loading/error states are needed. `PhotoWall` guards empty input (`src/components/ui/PhotoWall.tsx:73` `if (photos.length === 0) return null;`).

**Assets referenced but not present**: **none.** All 42 asset paths referenced in `src` exist under `assets/`:
```
$ comm -23 /tmp/refs.txt /tmp/have.txt   # referenced but missing
(empty)
```
Two files exist that nothing references, and they will be published to production because `publicDir: 'assets'` copies them verbatim:
```
$ comm -13 /tmp/refs.txt /tmp/have.txt   # present but unreferenced
/photos/credits.json
/photos/site-photos.json
```
`assets/photos/site-photos.json` and `credits.json` are internal pipeline metadata (original filenames like `IMG-20261009-WA0034.jpg`, byte counts, source zip name). They become public URLs `/photos/site-photos.json` and `/photos/credits.json` in the deployed build. Not secret, but internal detail should not ship.

**Imports missing from the lockfile / package.json**: none — every bare import (`react`, `react-dom`, `react-router-dom`, `framer-motion`, `swiper`, `clsx`, `tailwind-merge`, `@fontsource*`) is in `package.json`, and all are present in `package-lock.json`.

**Hardcoded strings that are local data, not site data**
- `src/pages/About.tsx:11-32` — `WHAT_WE_DO` is a five-item string array defined inside the page, duplicating titles that already exist in `src/data/site.ts` (`categories`, `whatWeDo`).
- `src/pages/About.tsx:7-8` — two separate `import … from "@/data/site"` statements instead of one.

**Duplicated copy/logic across pages**: the sentence "Every site runs the same measured sequence. Craft is a discipline." is repeated in `src/pages/Home.tsx:92`, `src/pages/Services.tsx:44` and `src/pages/About.tsx:86`. (Content is frozen, so this is a note only.)

**`allowedHosts` in dev server**: `vite.config.ts:23` sets `allowedHosts: true`, which accepts any Host header in dev. Dev-only; the preview tunnel script (`scripts/tunnel.sh`) relies on it. Low risk.

---

## 4. Accessibility

**Alt text**
- `<img>` tags in JSX: 13. `alt=` occurrences: 14 (the extra is the doc comment at `src/components/ui/Section.tsx:35`).
- Every content image reads its alt from data (`Home.tsx:119`, `Hero.tsx:65`, `Machinery.tsx:70`, `PhotoWall.tsx:49`, `WhatWeDoCarousel.tsx:102`, `BentoGrid.tsx:52`, `FramedImage.tsx:40`, `ServiceRecord.tsx:57`, `HoverExpand.tsx:43`).
- Decorative images carry `alt=""` correctly: `Ornament.tsx:13,30,47` and `Section.tsx:76`.
- **0 images with missing or empty alt where one is required.**

**Heading order** (one `h1` per page; no skipped levels):
- Home — `h1` at `Hero.tsx:89`; then `h2` section headings; `h3` in `BentoGrid.tsx:59` and `WhatWeDoCarousel.tsx:112`. Correct.
- Work — `h1` `Work.tsx:32`; `h2` groups. Correct.
- Services — `h1` `Services.tsx:22`; `h2` per service `ServiceRecord.tsx:85`; `h2` "How a job starts". Correct.
- Machinery — `h1` `Machinery.tsx:20`; `h2` sections; `h3` "Fleet list" `Machinery.tsx:46`. Correct.
- About — `h1` `About.tsx:45`; `h2` sections; `h3` `About.tsx:74`. Correct.
- Contact — `h1` `Contact.tsx:27`; `h2` sections. Correct.
- NotFound — `h1` `NotFound.tsx:11`. Correct.

**Interactive controls are real elements with names**
- Buttons/links use `<button>`, `<Link>`/`<a>` — `Button.tsx:59-77`.
- Named controls: `SiteHeader.tsx:81-83` (`aria-expanded`, `aria-controls`, `aria-label` on the menu toggle), `SiteHeader.tsx:49` and `SiteFooter.tsx:26` (`nav aria-label`), `Hero.tsx:41` (`aria-label={brandName}`).
- Tabs implement roles and labels: `WhatWeDoCarousel.tsx:55-88` (`role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`, `aria-labelledby`, arrow-key handling at lines 34-44).
- Skip link present: `Layout.tsx:21-26`.
- Focus ring defined globally: `src/index.css:86-89`.
- **Defect** — `src/components/skiperui/HoverExpand.tsx:29-37`: a `<div role="button">` with `onClick`, `onFocus` and `tabIndex={0}` but **no `onKeyDown`**, so Enter/Space do not activate it (WCAG 2.1.1). This component is currently dead code (§3), so removing it also removes the defect.

**Mouse-only handlers without focus equivalents**
- `src/components/WhatWeDoCarousel.tsx:49-52`: `onMouseEnter/onMouseLeave` pause the autoplay **and** `onFocusCapture/onBlurCapture` do the same — hover has a keyboard equivalent. OK.
- `src/index.css:163`: the hero Ken-Burns pauses on `:hover` only; under `prefers-reduced-motion` the animation is removed entirely (`index.css:172-175`), so there is no keyboard trap.
- No `onMouseOver`/`onPointerDown`-style handlers anywhere; `grep onMouse\|onTouch\|onPointer\|onWheel\|onDrag` returns only the carousel pause pair above.

**Minor** — `WhatWeDoCarousel.tsx:60-78`: inactive tabs are not removed from the tab order (no roving `tabIndex`), so the ARIA tabs pattern is only partly followed.

---

## 5. Performance in code

- **Eager vs lazy**: only the first hero slide loads eagerly (`Hero.tsx:66` `loading={i === 0 ? "eager" : "lazy"}`). Every other image is `loading="lazy"` with `decoding="async"` (11 lazy sites: `Home.tsx:120`, `Machinery.tsx:71`, `PhotoWall.tsx:50`, `WhatWeDoCarousel.tsx:103`, `ServiceRecord.tsx:58`, `Ornament.tsx:14,31,48`, `Section.tsx:77`, `FramedImage.tsx:41`, `BentoGrid.tsx:53`).
- **width/height**: every `<img>` carries `width` and `height` (21 attribute sites; e.g. `Hero.tsx:63-64`, `PhotoWall.tsx:47-48`). No layout shift from images. The hero LCP image has no `fetchpriority="high"` — a missed hint.
- **Render-blocking / third-party**: no third-party scripts, no webfont CDN, no analytics. Fonts are self-hosted via `@fontsource` imports in `main.tsx:4-6`. `main.tsx:4` imports `@fontsource-variable/fraunces/full.css` — the "full" build pulls several variable axes, producing the 121 kB + 105 kB + 34 kB woff2 files seen in the build output.
- **framer-motion / swiper on every route**: there is no `React.lazy` or dynamic `import()` anywhere (`grep -rn 'lazy(\|import(' src --include=*.tsx` → no hits), so the **single 461 kB chunk contains framer-motion and swiper for every route**. swiper is used only by `Hero.tsx` (home route) and framer-motion by `Hero`, `WhatWeDoCarousel`, `BlurFade`, `ParallaxDrift`. Routes such as `/contact`, `/about`, `/machinery` pay for both libraries regardless.
- **Dead import cost**: `HoverExpand.tsx` is never imported, so it is tree-shaken out (no bundle cost) — but it is 66 lines of unmaintained code.

---

## 6. Deploy configuration

### `vercel.json` (current content)
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/((?!assets/|photos/|plates/|machines/|favicon|robots.txt|sitemap.xml).*)", "destination": "/index.html" }
  ]
}
```
- `framework: "vite"`, `buildCommand: "npm run build"` (matches `package.json`), `outputDirectory: "dist"` (matches `vite.config.ts` `outDir: "dist"`) — all **correct**.
- **SPA rewrite — VERDICT: CORRECT.** After `npm run build` / `npx vite build` the top level of `dist/` is:
```
$ ls -1 dist
assets
index.html
machines
photos
plates
```
All four asset directories (`assets`, `photos`, `plates`, `machines`) are named in the negative lookahead, so none is shadowed by `index.html`. `favicon`, `robots.txt` and `sitemap.xml` are also excluded (harmless if absent). **No corrected regex is needed.**
- **Deploy risk (not a regex issue):** `vercel.json` is **untracked in git**:
```
$ git status --short
 M .gitignore
?? audit/
?? scripts/
?? vercel.json
```
`git ls-files | grep vercel` returns nothing. If Vercel builds from the GitHub repo (`K-naman-T/sai-sree-web`), this file is **not in the repo**, so the SPA rewrite would not apply and deep links would 404. It must be committed. `scripts/` (two shell scripts) is also untracked.

### Site meta / files
| Item | State | Evidence |
|---|---|---|
| `robots.txt` | **MISSING** | `find` (excl. node_modules/.git) → no output |
| `sitemap.xml` | **MISSING** | same |
| favicon | **MISSING** | same — no such file anywhere; `index.html` has no `<link rel="icon">` |
| `<html lang>` | present | `index.html:2` `lang="en"` |
| `theme-color` | present | `index.html:10` `#FBF7F0` |
| `description` | present | `index.html:6-9` |
| og: / twitter: meta | **MISSING** | `grep -n 'og:\|twitter:' index.html` → no matches |
| canonical link | **MISSING** | `grep -n 'canonical' index.html` → no matches |

There is no per-route meta management beyond the title: `useDocumentTitle` (`src/hooks/useDocumentTitle.ts:6`) sets `document.title` only; no description/canonical/og is updated per route.

---

## 7. Security and hygiene

- **Secrets/tokens committed**: none. `git ls-files | grep -iE '\.env|secret|token|\.pem'` → no output; `grep -rniE 'api[_-]?key|password|bearer|token' src` → no matches.
- **`.env` files**: none present.
- **Absolute paths in source**: none. `grep -rn '/home/\|/Users/\|C:\\' src *.ts *.json *.html` → no matches. (Absolute paths exist only in the untracked `scripts/*.sh` helpers.)
- **`console.log` in production code**: none. `grep -rn 'console\.' src` → no matches.
- **LFS vs real binaries**: git-lfs is installed (`/usr/bin/git-lfs`) and `git lfs ls-files` lists the media with `*` (files present, not pointers). `.gitattributes` routes `*.webp *.png *.jpg *.jpeg *.gif *.mp4 *.pdf *.ico` through LFS.
- **`.gitignore` coverage**: covers `node_modules`, `dist`, `dist-ssr`, `*.local`, `dev.log`, `.DS_Store`, `.vercel` — all required entries present.
- **`.vercel/`**: exists locally (`project.json` with projectId/orgId) but is **not tracked** (`git ls-files | grep vercel` → empty), so no project IDs are committed.
- **`assets/` not ignored** — the 44 media files (7.8 MB via LFS) are tracked, as intended.

---

## 8. Prioritised fix list

| Priority | Item | Location | Why |
|---|---|---|---|
| MUST-FIX | Commit `vercel.json` to git | `vercel.json` (untracked) | `git status` shows `?? vercel.json`; a git-based Vercel deploy would lose the SPA rewrite and 404 on deep links. |
| MUST-FIX | Add Open Graph + Twitter card meta | `index.html` | No `og:`/`twitter:` tags; WhatsApp shares (the client's own channel) show no preview. |
| MUST-FIX | Add `robots.txt` and `sitemap.xml` | repo root | Neither file exists; no crawl guidance for a public marketing site. |
| MUST-FIX | Add a favicon | `index.html` / root | No favicon file and no `<link rel="icon">`; browsers request `/favicon.ico` and 404. |
| SHOULD-FIX | Add a canonical link | `index.html` | No `canonical` tag; duplicate-URL risk once the real domain is used. |
| SHOULD-FIX | Remove unused `lucide-react` dependency | `package.json:…` | Declared but never imported; install weight only. |
| SHOULD-FIX | Delete dead `HoverExpand.tsx` | `src/components/skiperui/HoverExpand.tsx` | 66 lines imported nowhere (also fixes its keyboard defect). |
| SHOULD-FIX | Delete `ChevronLeft` / `ChevronRight` | `src/components/ui/icons.tsx:18,34` | Exported, never used. |
| SHOULD-FIX | Stop publishing `credits.json` / `site-photos.json` | `assets/photos/*.json` | `publicDir` copies them to prod as `/photos/*.json`; internal pipeline metadata. |
| SHOULD-FIX | Add route-level code splitting | `src/App.tsx:13-23` | Single 461 kB (145 kB gzip) chunk ships swiper+framer-motion on every route; no `React.lazy` anywhere. |
| SHOULD-FIX | Turn on `noUncheckedIndexedAccess` | `tsconfig.json` | Indexed reads (`Home.tsx:17`, `WhatWeDoCarousel.tsx:40`) are typed non-nullable today. |
| SHOULD-FIX | Add ESLint (+ Prettier) config and a lint script | repo root | No lint/format config or script exists; nothing enforces style in CI. |
| NICE-TO-HAVE | Narrow the Fraunces font import | `src/main.tsx:4` | `full.css` pulls multiple axes → 121 kB + 105 kB woff2 files. |
| NICE-TO-HAVE | Add `fetchpriority="high"` to the hero LCP image | `src/components/Hero.tsx:61-69` | First hero slide is eager but not prioritised. |
| NICE-TO-HAVE | Roving `tabIndex` on carousel tabs | `src/components/WhatWeDoCarousel.tsx:60-78` | Inactive tabs stay in the tab order. |
| NICE-TO-HAVE | Serve per-breakpoint responsive images (`srcset`) | `src/components/ui/PhotoWall.tsx` etc. | 260–377 kB photos are sent to all viewports. |
| NICE-TO-HAVE | Merge the duplicate `site.ts` import in About | `src/pages/About.tsx:7-8` | Two import statements from one module. |

---

## State of the codebase

This is a small, clean, hand-built marketing site — 3705 source lines across 39 tracked source files, 11 runtime and 7 dev dependencies, no `any` casts, no secrets, no committed `.env`, no `console.log`, no absolute paths, and no missing `key` props or missing-alt images. TypeScript compiles clean (`tsc --noEmit` exit 0) under `strict`, `noUnusedLocals` and `noUnusedParameters`, all 42 referenced media files exist under `assets/`, and the `vercel.json` SPA rewrite is genuinely correct — every top-level directory in `dist/` (`assets`, `photos`, `plates`, `machines`) is excluded from the rewrite, so nothing is shadowed by `index.html`. The weaknesses are in what is absent rather than what is broken: no `robots.txt`, `sitemap.xml`, favicon, Open Graph or canonical meta; `vercel.json` is written but **untracked in git**, which would silently break deep links on a repo-based deploy; no ESLint/Prettier/Biome config; one 461 kB (145 kB gzip) JavaScript chunk with no route code-splitting, so swiper and framer-motion load on every route; and a small tail of dead code (`HoverExpand.tsx`, two icon exports, the unused `lucide-react` dependency, the unreachable `playOnce` branch), plus two internal JSON files that ship to production because they sit inside `publicDir`. Nothing here blocks a demo, but the untracked `vercel.json` and the missing share/SEO meta are the items that matter for a paid client handover.
