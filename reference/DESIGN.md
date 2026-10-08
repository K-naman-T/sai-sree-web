# DESIGN.md: Sai Sree Enterprise site

<!-- Format: Google DESIGN.md (google-labs-code/design.md, Apache-2.0, spec
     version: alpha). Frontmatter tokens are NORMATIVE. The prose explains how to
     apply them. Validate with: npx @google/design.md lint -->

---
version: alpha
name: sai-sree-enterprise
description: Static site for a construction and earthmoving contractor. Warm paper ground, traditional Mysore painting imagery, Rangoli and Kinnala ornament, drawing-office precision.
colors:
  primary: "#9E4A28"
  secondary: "#2E5A3E"
  tertiary: "#B23A28"
  surface: "#F5F0E1"
  surface-alt: "#EFE6D2"
  text: "#2B1D12"
  text-muted: "#6B5638"
  ornament: "#A87F2E"
  hairline: "#C9B99A"
  focus: "#9E4A28"
typography:
  display: { fontFamily: Fraunces, fontSize: 48px, fontWeight: 600, lineHeight: 1.15, letterSpacing: -0.01em }
  h1: { fontFamily: Fraunces, fontSize: 48px, fontWeight: 600, lineHeight: 1.15 }
  h2: { fontFamily: Fraunces, fontSize: 34px, fontWeight: 600, lineHeight: 1.15 }
  body: { fontFamily: Archivo, fontSize: 17px, fontWeight: 400, lineHeight: 1.6 }
  ui: { fontFamily: Archivo, fontSize: 15px, fontWeight: 500, lineHeight: 1.5 }
  mono: { fontFamily: ui-monospace, fontSize: 15px, fontWeight: 400 }
rounded:
  sm: 0px
  md: 0px
  lg: 0px
spacing:
  xs: 8px
  sm: 12px
  md: 28px
  lg: 48px
  xl: 84px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "0px"
    height: 44px
  cell:
    border: "1px solid {colors.hairline}"
    padding: "28px"
---

Dial: ENERGY 2 / RHYTHM 2 / MOTION 1

## Overview

This site is the public face of Sai Sree Enterprise, a construction and
earthmoving contractor working from an earth site, not an office campus. It is
read by people about to spend real money on groundworks, masonry, supply and
machine hire, so it has to look like it knows the ground.

The feeling is a drawing office crossed with an earth site: aged cream paper,
hairline rules like a title block, figurative Mysore painting plates for the human
and machine imagery, and Rangoli or Kinnala geometry in the borders. Measured,
earthy, artisanal, dignified. Never glossy, never a startup landing page.

## Colors

Colour is semantic, not decorative. Each token has one job.

- `--paper` (#F5F0E1) is the page ground. Everything sits on it.
- `--paper-2` (#EFE6D2) is the alternate band ground. Use it to separate two
  adjacent bands of the same kind; never alternate it more than once in a row.
- `--ink` (#2B1D12) is body text, headings and structural linework that must read
  as dark.
- `--ink-2` (#6B5638) is secondary text: captions, the legal line, metadata.
- `--terracotta` (#9E4A28) is the primary signal: links, actions, key rules. It is
  the only colour allowed on an interactive control.
- `--green` (#2E5A3E) is a secondary accent. Spend it sparingly, one use per band.
- `--vermillion` (#B23A28) is rare emphasis only. One use per page at most.
- `--gold` (#A87F2E) is ornament linework only. It is never body text and never a
  control. Frieze and border decoration only.
- `--hairline` (#C9B99A) is every 1px border and rule.

### Measured contrast table

Measured by `python3 tools/contrast_check.py`, which reads `css/tokens.css` and
computes the WCAG 2.x relative-luminance ratio. Body pairs must reach 4.5:1, large
text and UI components 3:1. This table is generated output, not an estimate.

| foreground | on | usage | hex fg | hex bg | ratio | need | result |
|---|---|---|---|---|---|---|---|
| ink | paper | body | #2B1D12 | #F5F0E1 | 14.32:1 | 4.5 | PASS |
| ink | paper-2 | body | #2B1D12 | #EFE6D2 | 13.14:1 | 4.5 | PASS |
| ink-2 | paper | body | #6B5638 | #F5F0E1 | 6.12:1 | 4.5 | PASS |
| ink-2 | paper-2 | body | #6B5638 | #EFE6D2 | 5.61:1 | 4.5 | PASS |
| terracotta | paper | body | #9E4A28 | #F5F0E1 | 5.32:1 | 4.5 | PASS |
| terracotta | paper-2 | body | #9E4A28 | #EFE6D2 | 4.88:1 | 4.5 | PASS |
| green | paper | body | #2E5A3E | #F5F0E1 | 6.96:1 | 4.5 | PASS |
| green | paper-2 | body | #2E5A3E | #EFE6D2 | 6.39:1 | 4.5 | PASS |
| vermillion | paper | body | #B23A28 | #F5F0E1 | 5.22:1 | 4.5 | PASS |
| vermillion | paper-2 | body | #B23A28 | #EFE6D2 | 4.79:1 | 4.5 | PASS |
| paper | terracotta | body | #F5F0E1 | #9E4A28 | 5.32:1 | 4.5 | PASS |
| paper | green | body | #F5F0E1 | #2E5A3E | 6.96:1 | 4.5 | PASS |
| paper | vermillion | body | #F5F0E1 | #B23A28 | 5.22:1 | 4.5 | PASS |
| gold | paper | decorative | #A87F2E | #F5F0E1 | 3.21:1 | n/a | PASS |
| gold | paper-2 | decorative | #A87F2E | #EFE6D2 | 2.95:1 | n/a | PASS |
| hairline | paper | decorative | #C9B99A | #F5F0E1 | 1.69:1 | n/a | PASS |
| hairline | paper-2 | decorative | #C9B99A | #EFE6D2 | 1.55:1 | n/a | PASS |

Token changed after measurement: the supplied terracotta `#B85C38` measured
3.98:1 on `--paper` and 3.66:1 on `--paper-2`, below the 4.5:1 body minimum for
link and action text. It was darkened to `#9E4A28` (5.32:1 and 4.88:1). Every
other token is unchanged from the direction brief.

`--gold` and `--hairline` are decorative: a frieze, a rule, a border. They never
carry text and never mark a control or its state, so WCAG 1.4.11 does not apply to
them. The measured ratios are recorded above for honesty; gold clears 3:1 on paper
and sits just under it on paper-2, which is exactly why it must never be promoted
to text.

## Typography

Two faces, both provisional pending the client repository's locked type set.

- Display and headings: **Fraunces** (variable, weights 400 and 600, optical size
  axis). A warm, slightly old-style serif with high contrast at large sizes; it
  carries the traditional, hand-set quality without tipping into a wedding
  invitation.
- Body and UI: **Archivo** (weights 400, 500, 600). A grotesque with sturdy, even
  colour at small sizes, which keeps dense practical copy readable.

Loaded from Google Fonts via one link tag. Base body is 17px (18px on wide
viewports is acceptable) with line-height 1.6, and the reading measure is capped at
68ch. Provisional: when the client's locked font set arrives, swap `--font-display`
and `--font-body` in `css/tokens.css` and re-measure.

## Layout

- A single centred container, `max-width: 1400px`, page gutter `clamp(18px, 5vw, 28px)`.
- The page is a stack of bands separated by 1px hairlines. A band is `.band`; an
  alternate-ground band adds `.band--paper2`.
- Cells carry 1px hairlines on all sides with 28px internal padding (`.cell`).
  This is the drawing-office grid; keep linework continuous and aligned.
- Layout families: the full-width band (default), a `.cols` auto-fit grid for
  grouped content, and an image-plate band for the painting imagery. A page may
  repeat the full-width band family freely; it may not repeat any other family
  more than once.
- No horizontal overflow at 320px or 390px. Every tap target is at least 44px.

## Elevation & Depth

Flat. No shadows, no raised surfaces. Depth is expressed only through hairlines,
ground alternation and the 1px grid. If something needs to feel foreground, give it
a terracotta rule, not a shadow.

## Shapes

Radius is 0px everywhere: buttons, cells, images, inputs. Corners are square by
design. The only curves on the site live inside the painting plates and the Rangoli
ornament, which is exactly why the UI must not compete with them.

## Components

- **Header lockup** (`.lockup`): one text slot, `Sai Sree Enterprise` today. See
  the Lockup rule below.
- **Primary nav** (`.site-nav`): six flat links, 44px target height, ink, turning
  terracotta on hover with a 2px underline rule.
- **Action** (`.btn`, `.btn--quiet`): sharp, 1px terracotta border, 44px minimum
  height, terracotta fill with paper text (the quiet variant inverts it). No radius,
  no shadow, no gradient.
- **Cell** (`.cell`): the hairline box with 28px padding, the default container for
  a piece of content sharing a row with others.
- **Plate** (`.plate`): a Mysore painting image filling its cell, 1px hairline.
- **Frieze** (`.frieze`): a Rangoli/Kinnala ornament band with hairline rules top
  and bottom. Decorative, `alt=""`.
- **Footer**: lockup, legal name line, and contact slots that render only when the
  client supplies real values.

## Style law: bans

These are user directives for this site. They are absolute.

- **No eyebrow text.** The small uppercase kicker label above a heading is banned
  outright. Headings stand alone.
- No gradient text, no glassmorphism, no glow, no drop-shadow soup, no rounded cards.
- No emoji anywhere in UI or copy. No decorative icon sets.
- No 01/02/03 section markers, no "trusted by" strips, no testimonial frames, no
  filler sentences.
- No em dash anywhere in shipped copy. The seeded gate rule H6 enforces this on
  `.html` and `.css`.
- **Copy voice:** plain short sentences, concrete nouns, no marketing fluff, no
  superlatives, no claim without a source.

## Lockup rule

The header lockup renders the text `Sai Sree Enterprise` (the real registered name)
inside a single element carrying class `.lockup`. A consumer brand name will drop in
later as `<NAME> by Sai Sree Enterprise`; the lockup is built to hold that longer
string without breaking layout (`min-width: 0`, `break-word`, a viewport-scaled font
size, and a header that wraps). Never invent a brand name. Until the client supplies
one, the lockup text stays exactly `Sai Sree Enterprise`.

## Page conventions

Every page author follows this section exactly. Copy the head, nav and footer
verbatim. Deviating means the pages stop matching.

### Head pattern

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Home | Sai Sree Enterprise</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&amp;family=Fraunces:opsz,wght@9..144,400;9..144,600&amp;display=swap">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
</head>
```

Title pattern is `<Page> | Sai Sree Enterprise`. The literal separator is a spaced
vertical bar, not an em dash: the brief bans the em dash and gate rule H6 enforces
the ban on `.html`, so any example that showed a dash is superseded by this line.
One `<h1>` per page; headings in order; one `<main id="main">`; each band is a
`<section>`. Every link is a real `<a href>` to a real page (gate rule H1 blocks
`#` and empty hrefs). A skip link to `#main` is the first element in `<body>` on
every page.

### Nav block (identical in every page)

```html
<header class="site-header">
  <div class="wrap header-inner">
    <a class="lockup" href="index.html">Sai Sree Enterprise</a>
    <nav class="site-nav" aria-label="Primary">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="work.html">Work</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="machinery.html">Machinery</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>
```

Order is fixed: Home, Work, Services, Machinery, About, Contact. The markup is
byte-identical on all six pages.

### Footer block (identical in every page)

```html
<footer class="site-footer">
  <div class="wrap footer-inner">
    <p class="lockup">Sai Sree Enterprise</p>
    <p class="footer-legal">Registered name: Sai Sree Enterprise</p>
    <!-- Contact lines render only when the client supplies real values.
         Until then this block is absent. See docs/CONTENT-MANIFEST.md. -->
  </div>
</footer>
```

No contact element renders with an invented or empty value. Unfilled fields simply
do not appear. A "details pending" line is not allowed.

### Image slots

Reference plates with an `<img>` at the web derivative path
`assets/brand/web/<FILE>.webp` with explicit `width`/`height` attributes and
meaningful `alt` text. Purely decorative plates (friezes, borders) take `alt=""`.

Derivative sizes: heroes `HERO-CREW`, `HERO-MACHINE`, `HERO-MACHINE-V2` and
`HERO-MUDHOUSE` are 1600x900; `HERO-MUDHOUSE-SQ` and the tiles `TILE-CIVIL`,
`TILE-EARTHWORK`, `TILE-SUPPLY`, `TILE-LABOUR`, `TILE-ROAD` are 800x800;
`FRIEZE-5STATIONS` is 2000x312; `BORDER-MOTIF` is 2000x84.

Masters (watermark-repaired, full size) live in `assets/brand/plates/<FILE>.png`
and are never referenced from markup. Each master has a sibling `.json` sidecar
with its generation prompt; ignore the sidecars in markup. Stand-in photographs
in `assets/photos/` are temporary and credited in `docs/PHOTO-CREDITS.md`.

### Unconfirmed client facts

Client facts (phone, WhatsApp number, address, districts served, working hours,
fleet list, registrations) never render as invented values and never as filler text
on screen. If a fact is missing, the element that would hold it does not render at
all. The full fill-list is in `docs/CONTENT-MANIFEST.md`.

## Do's and Don'ts

- Do: keep every corner square, every border 1px, every cell 28px padded.
- Do: spend colour by role. Terracotta for action, gold for ornament, nothing else
  competes for a control.
- Do: let the painting plates carry the imagery and the geometry carry the structure.
- Do: measure contrast with `tools/contrast_check.py` after any colour change.
- Don't: ship an eyebrow label, a rounded card, a shadow, a gradient or an emoji.
- Don't: invent a brand name, a phone number, an address or a fleet figure.
- Don't: point any control at `#` or an empty href; every link resolves.
- Don't ship any Tier B default from `anti-slop-standards` without a written reason
  naming what is specific to this product.
