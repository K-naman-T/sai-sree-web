# ROUND 4 — positioning copy rewrite + dead-space composition

Two user directives arrived after Round 3 started. They supersede previous copy. A previous
pass (ROUND3.md items) was interrupted early — read the code as-is and make it coherent.

## DIRECTIVE 1 — Positioning (locked, this is the point of the site)
**This company sells art and design in construction. Art aesthetics is what they sell —
art and design sit at the core of EVERYTHING they build.** Every page, every band, every
paragraph must carry this. Tone: confident, warm, plain-spoken craft language. Short
sentences. Never purple, never generic. HARD RULES: no invented facts, numbers, awards,
clients, dates, or registrations. Positioning language is allowed and required; factual
claims stay exactly as they are (verify against docs/CONTENT-MANIFEST.md before adding any).

## The copy deck (use verbatim; adapt only if a line breaks layout, keep the meaning)

HERO (Home):
- Keep H1 "Sai Sree Enterprise".
- Subtext block: "Construction built as craft. Art and design sit at the core of everything
  we build: civil works, earthwork and levelling, machine and material supply, and rammed
  earth and mud construction."
- CTA stays "GET IN TOUCH".

WHAT WE TAKE ON (4 bento cards), each: title + one craft-framed line + "VIEW SERVICES":
1. Civil construction — "Contract work finished like craft: foundations, columns, slabs and
   masonry built to the drawing, and to the eye."
2. Earthwork and levelling — "The ground is the first material. Cut, filled and set to level
   with the precision the build deserves."
3. Machine and material supply — "Machines with an operator and materials chosen for the
   work. Power in service of the finish."
4. Rammed earth and mud construction — "The art form we keep alive: walls formed in lifts
   and finished by hand. Beautiful and permanent."

THE FLEET band: "Machines are the instruments. The eye of the operator is the difference.
Hired by the hour, by the day, or by the trip." CTA "SEE THE MACHINERY".

HOW THE WORK RUNS: keep the five stations. Add the line above them: "Every site runs the
same measured sequence. Craft is a discipline." CTA "SEE THE SERVICES".

WORK: page lead "Work built to be looked at." Intro line: "Finished and running sites. The
proof is in the finish." Captions stay factual as they are.

CONTACT: "Art and design, built into the ground." + "Tell us about your site or a job you
are planning, and we will tell you how we would build it." CTA "TALK TO US".

SERVICES page intro: "Everything we are asked to do carries the same standard: art and design
at the core, from the first cut to the final finish. Here is what can be hired, and how a
job starts."

NINE SERVICE CELLS: keep titles and the "What you provide: drawings, approvals, and site
access." line. Rewrite each body with the formula: [what we do, plainly] + [one clause of
craft/aesthetic stance]. Max 3 sentences. Example: "We take on civil construction work as a
contract. The scope follows the drawings and the specification. Foundations, columns, slabs
and masonry are built on site with the finish the work deserves."

ABOUT page: rebuild the voice around the philosophy. Structure: (a) opening = the belief:
"Art aesthetics are not decoration added at the end. They are how the work is planned and
built." (b) what we do (civil, earthwork, supply, machines, rammed earth — plainly). (c) how
we run (the measured five-station process = craft as discipline). (d) where (Harohalli,
Karnataka). (e) registrations block — ONLY the already-confirmed facts from the manifest
(brand lockup "Sai Sree Enterprise", winged wheel emblem) — never invent Udyam/GST numbers
or founding dates. (f) close with the positioning line.

MACHINERY page intro: "Machines are the instruments; the operator's eye is the difference.
Everything is hired with a skilled hand at the controls — by the hour, by the day, or by the
trip." Keep all factual machine terms.

FOOTER: add the positioning line "Art and design at the core of everything we build."
under the brand lockup.

404: keep, optionally echo the voice.

## DIRECTIVE 2 — Kill empty space (user: "use gradient or some better alternative")
The site currently has large voids. Fill every dead zone with one of these (priority order):
1. **Warm gradient washes** between/inside bands: paper ↔ paper-2 transitions, or a faint
   terracotta/ochre tint (≤8% strength) in text-free zones. Gradients are now allowed as
   background fill (not as decorative flourish on components). Sharp elements still get
   shadowed scrims (homepage exception) where needed.
2. **BORDER-MOTIF thin rules** and **FRIEZE-5STATIONS bands** as section texture/dividers.
3. **Low-opacity plate art** (10-15%) as background texture in text-free areas.
4. **Bigger composition**: pull-quotes from the positioning deck, oversized step numerals,
   asymmetric layouts, tighter columns — the page should feel designed at every scroll stop.
Contrast must still pass everywhere (re-run the hero contrast script; nothing text-bearing
may drop below the AA floor).

## Also fold in the interrupted ROUND3 items (still valid)
- Services plates: no mount background, no border box — the plate's own painted border is the
  frame; sit flush in the band ground (kills the "sticker" look).
- Services rows top-aligned (heading top = plate top), dead gap after intro removed,
  plate column ~20rem max.
- Hero: subtext leading +2-4px; "01 / 05" editorial counter near the slide indicators;
  whisper-scrim (10-15%) behind header links; slightly tightened title kerning.
- Mobile hero: scrim a touch darker at the bottom; more space between headline and subtext.
- Nav labels exactly: Home / Work / Services / Machinery / About / Contact on every page.

## Verify (full suite, regenerate ALL shots)
`npm run check`, `npm run build`, `NODE_PATH="$(npm root -g)" node scripts/shots.cjs`,
`node scripts/audit.cjs`, `python3 scripts/check_hero_contrast.py`, `python3 scripts/check_shots.py`.
All PASS. Update REPORT.md with "Round 4" (copy deck + composition changes).

Finish with: DONE plus the changed-file list.


## LATE CORRECTION (user, supersedes any location line above)
The company operates out of **Harohalli, Karnataka**. Any Dhanbad/Jharkhand phrasing is wrong — use Harohalli, Karnataka everywhere.
