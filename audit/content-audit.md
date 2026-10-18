# Alankara — Content, Claims, SEO and Brand Consistency Audit

Repo: `/home/syd/projects/sai-sree-web`
Live site: https://sai-sree-web.vercel.app/
Method: every line below comes from a file that was read or a command that was run. Each fact carries a `file:line` cite or the URL that was fetched.
Scope: content, claims, naming, contact, SEO, photo provenance, word accessibility, and gaps. The owner has frozen the wording and the art. This report documents and flags. It does not rewrite.

---

## 1. Content inventory

Every user-visible string, grouped by page, then section, then element. Sources: `src/data/site.ts`, `src/data/photos.ts`, `src/pages/*.tsx`, `src/components/**`, `index.html`.

### 1.1 Global chrome

| Page | Section | Element | Exact string | Source |
|---|---|---|---|---|
| all | document head | title tag (server HTML) | `Alankara — by Sri Sai Enterprises` | index.html:11 |
| all | document head | meta description | `Alankara, by Sri Sai Enterprises. Civil construction, earthwork and levelling, machine and material supply, and rammed earth and mud construction.` | index.html:8 |
| all | header lockup | brand name | `Alankara` | src/data/site.ts:44 (rendered src/components/layout/SiteHeader.tsx:37) |
| all | header lockup | by-line | `- by Sri Sai Enterprises` | src/data/site.ts:45 (rendered SiteHeader.tsx:45) |
| all | nav | nav labels | `Home`, `Work`, `Services`, `Machinery`, `About`, `Contact` | src/data/site.ts:32-39 |
| all | footer | brand name | `Alankara` | SiteFooter.tsx:14 |
| all | footer | by-line | `by Sri Sai Enterprises` | SiteFooter.tsx:16 |
| all | footer | positioning line | `Art and design at the core of everything we build.` | SiteFooter.tsx:19 |
| all | footer | registered name | `Registered name: Sri Sai Enterprise` | SiteFooter.tsx:22 (src/data/site.ts:41) |
| all | a11y | skip link | `Skip to content` | Layout.tsx:25 |
| all | document.title (client-set) | route suffix | `<Title> \| Alankara` | src/hooks/useDocumentTitle.ts:6 |

### 1.2 Home (`src/pages/Home.tsx`)

| Section | Element | Exact string | Source |
|---|---|---|---|
| Hero | h1 | `Construction built as craft.` | Hero.tsx:93 |
| Hero | subtext (3 lines) | `Art and design sit at the core of everything we build:` / `civil works, earthwork and levelling, machine and material supply,` / `and rammed earth and mud construction.` | Hero.tsx:99-101 |
| Hero | CTA button | `Tell us about your site` (to `/contact`) | Hero.tsx:106 |
| Marquee band | scrolling items (9) | `Civil construction`, `Earthwork and excavation`, `Site levelling`, `Machine contracts`, `Machinery with operator`, `Material supply`, `Labour supply`, `Road, drain and barrier`, `Rammed earth` | src/data/site.ts:415-425 |
| What we take on | h2 + link | `What we take on` + link `All services` (to `/services`) | Home.tsx:28-29 |
| What we take on | card 1 | `Civil construction` / `Contract work finished like craft: foundations, columns, slabs and masonry built to the drawing, and to the eye.` / cta `View services` | Home.tsx:37 (src/data/site.ts:115-117, BentoGrid.tsx:62) |
| What we take on | card 2 | `Earthwork and levelling` / `The ground is the first material. Cut, filled and set to level with the precision the build deserves.` / `View services` | src/data/site.ts:126-128 |
| What we take on | card 3 | `Machine and material supply` / `Machines with an operator and materials chosen for the work. Power in service of the finish.` / `View services` | src/data/site.ts:137-139 |
| What we take on | card 4 | `Rammed earth and mud construction` / `The art form we keep alive: walls formed in lifts and finished by hand. Beautiful and permanent.` / `View services` | src/data/site.ts:148-150 |
| What we do | h2 | `What we do` | Home.tsx:53 |
| What we do | tab 1 | `Architecture Designs` / `Design work: the building studied, drawn and detailed before the ground is cut.` / caption `Finished residence and pool` | src/data/site.ts:88-95 |
| What we do | tab 2 | `Landscape` / `The ground carried as part of the design: levels, drainage, turf and planting, brought to the finished line.` / caption `Slope finishing and drainage` | src/data/site.ts:100-107 |
| Positioning | pull-quote | `Art and design sit at the core of everything we build.` | Home.tsx:63 |
| The fleet | h2 + body | `The fleet` / `Machines are the instruments. The eye of the operator is the difference. Hired by the hour, by the day, or by the trip.` | Home.tsx:70-73 |
| The fleet | CTA | `See the machinery` (to `/machinery`) | Home.tsx:77 |
| How the work runs | h2 + lede | `How the work runs` / `Every site runs the same measured sequence. Craft is a discipline.` | Home.tsx:90-92 |
| How the work runs | 5 steps | `Receive the site`, `Survey and set out`, `Cut and excavate`, `Fill and level`, `Compact and hand over` | src/data/site.ts:329-335 |
| How the work runs | CTA | `See the services` (to `/services`) | Home.tsx:99 |
| Work | h2 + link | `Work` + link `See the work` (to `/work`) | Home.tsx:107 |
| Work | captions | `Finished residence and pool`; `Concrete pour into the foundation` | src/data/photos.ts:260,267 |
| Talk band | h2 (TalkLine) + body + CTA | `Art and design, built into the ground.` / `Tell us about your site or a job you are planning, and we will tell you how we would build it.` / button `Talk to us` (to `/contact`) | Home.tsx:136-139 (src/components/ui/TalkBand.tsx:27) |

### 1.3 Work (`src/pages/Work.tsx`)

| Section | Element | Exact string | Source |
|---|---|---|---|
| Header | h1 + lede | `Work` / `Work built to be looked at.` / `Finished and running sites. The proof is in the finish.` | Work.tsx:33-39 |
| 8 groups | h2 + blurb (aside) | `Excavation and foundations` / `Cut, reinforced and poured. The work below the ground on a deep foundation.` | src/data/photos.ts:16-17 |
| | | `Earthwork and site preparation` / `Trenching, cutting and grading. The ground set out before the build.` | src/data/photos.ts:64-65 |
| | | `Retaining walls` / `Slopes held and finished — stone terraces and struck concrete.` | src/data/photos.ts:84-85 |
| | | `Demolition and clearing` / `Clearing structures and rubble to make the site ready.` | src/data/photos.ts:104-105 |
| | | `Steel frame and decking` / `Columns and beams raised and set on the slab.` | src/data/photos.ts:124-125 |
| | | `Industrial steel and shed works` / `Trusses raised by crane; the sub-base compacted inside the shed.` | src/data/photos.ts:144-145 |
| | | `Building works` / `Brick, block and frame rising together.` | src/data/photos.ts:171-172 |
| | | `Landscaping and ground finishing` / `Turf and green ground brought to their finished line.` | src/data/photos.ts:198-199 |
| | | `A finished residence` / `Completed work: a tropical residence and its grounds.` | src/data/photos.ts:225-226 |
| Groups | photo captions (21) | `Rebar cage in the foundation pit`, `Wall and slab reinforcement`, `Column cages on the base slab`, `Pour into the reinforcement cage`, `Concrete pour into the foundation`, `Placing concrete at the pit`, `Machine trenching on the plot`, `Land graded and set out`, `Stone retaining wall at the cut`, `Concrete retaining wall at the earthworks`, `Clearing with the backhoe loader`, `Excavators at the demolition`, `Steel frame on the slab`, `Steel columns and beams`, `Steel erection on concrete columns`, `Raising the roof trusses`, `Sub-base compaction inside the shed`, `Brick building under construction`, `Two-storey frame and blockwork`, `Framework and block walls`, `Slope finishing and drainage`, `Finished open ground`, `Laying turf on the slope`, `Finished residence and pool`, `Pool-side view of the residence`, `Pavilions and the finished lawn` | src/data/photos.ts (captions on each object) |
| Talk band | TalkLine + CTA | `Tell us about the site and we will work out the rest.` / `Talk to us` | Work.tsx:64 |

### 1.4 Services (`src/pages/Services.tsx`)

| Section | Element | Exact string | Source |
|---|---|---|---|
| Header | h1 + lede | `Services` / `Everything we are asked to do carries the same standard: art and design at the core, from the first cut to the final finish. Here is what can be hired, and how a job starts.` | Services.tsx:23-27 |
| 9 service records | numbered h2 + body + "What you provide" | see table below | ServiceRecord.tsx:82-89 |
| How a job starts | h2 + lede | `How a job starts` / `Every site runs the same measured sequence. Craft is a discipline.` | Services.tsx:42-44 |
| How a job starts | 5 steps | same 5 steps as home (src/data/site.ts:329-335) | Services.tsx:47 |
| Talk band | quote + CTA | `Tell us about the site and we will work out the rest.` / `Talk to us` | Services.tsx:52 |

Service records (`src/data/site.ts:162-327`). Every record shares the line `What you provide: drawings, approvals, and site access.` (src/data/site.ts:160).

| # | title | body | evidence caption |
|---|---|---|---|
| 01 | `Civil construction contracts` | `We take on civil construction work as a contract. The scope follows the drawings and the specification. Foundations, columns, slabs and masonry are built on site with the finish the work deserves.` | `Brick building under construction` (site-10) |
| 02 | `Earthwork and excavation` | `We cut and remove earth where the drawings call for it. Excavation follows the set-out lines and the levels. The spoil is loaded and carted off, and the cut is left true.` | `Machine trenching on the plot` (site-09) |
| 03 | `Site levelling and preparation` | `We level and prepare ground before building starts. Pegs and string lines mark the levels. The plot is cut and filled until it is flat and set for the build.` | `Land graded and set out` (site-20) |
| 04 | `Machine contracts by hour, day or trip` | `The hire is booked and charged by the hour, the day or the trip. The rate is agreed before the machine is booked. The right machine is matched to the work in hand.` | `Clearing with the backhoe loader` (site-14) |
| 05 | `Machinery with operator` | `Machines are hired out with an operator. The operator runs the machine on the work in hand, with the care the work needs. Machine hours are written in the logbook.` | `Sub-base compaction inside the shed` (site-11) |
| 06 | `Material supply (cement, steel, aggregates, fill earth)` | `Materials are supplied to site as the work needs them, chosen for the job. They are brought in and unloaded on site. Supply can run with the construction or on its own.` | `Placing concrete at the pit` (site-07) |
| 07 | `Labour supply and labour contracts` | `Labour is supplied to site on contract. Teams are placed with the job for the work it needs. The team works on site for the span of the job, and leaves the work to the standard set.` | `Laying turf on the slope` (site-23) |
| 08 | `Road, drain and barrier work` | `We build roads, drains and barriers as part of a site. Formation, drainage lines and barrier runs are set out and built to the drawings. The lines are run true and the levels held.` | `Slope finishing and drainage` (site-21) |
| 09 | `Rammed earth and mud construction` | `Rammed earth is the art form we keep alive. Walls are formed inside formwork, the earth mix placed and compacted in lifts until the wall stands, then the formwork is struck. Mud construction follows the same method, and the wall is finished by hand.` | (no photo evidence; plate HERO-MUDHOUSE) |

### 1.5 Machinery (`src/pages/Machinery.tsx`)

| Section | Element | Exact string | Source |
|---|---|---|---|
| Header | h1 + lede | `Machinery` / `Machines are the instruments; the operator's eye is the difference.` / `Everything is hired with a skilled hand at the controls, by the hour, by the day, or by the trip.` | Machinery.tsx:21-28 |
| Hire terms | h2 + body | `Hire terms` / `Hire is by the hour, by the day, or by the trip. Every machine comes with an operator. The operator runs the machine on the work in hand.` | Machinery.tsx:33-38 |
| Hire terms | fleet empty-state | `Fleet list` / `The machine classes, their capacity, and whether each is owned or hired are not published yet.` | Machinery.tsx:46-49 |
| Machines at work | h2 + captions | `Machines at work` / `Sub-base compaction inside the shed`, `Excavators at the demolition`, `Clearing with the backhoe loader` | Machinery.tsx:84 (src/data/site.ts:341-363) |
| Talk band | TalkLine + CTA | `Book a machine for the work in hand.` / `Hire a machine` (to `/contact`) | Machinery.tsx:91 |

### 1.6 About (`src/pages/About.tsx`)

| Section | Element | Exact string | Source |
|---|---|---|---|
| Header | h1 + pull-quote + body | `About` / `Art aesthetics are not decoration added at the end. They are how the work is planned and built.` / `Sri Sai Enterprise is a construction and earthmoving company. Art and design sit at the core of everything we build, from the first cut to the final finish.` | About.tsx:46-56 |
| What we do | h2 + 5 items | `Civil construction` / `Contract work built to the drawings and the specification.`; `Earthwork and levelling` / `Ground cut, filled and set to level.`; `Machine and material supply` / `Machines with an operator, and materials brought to site.`; `Machinery with an operator` / `Hired by the hour, by the day, or by the trip.`; `Rammed earth and mud construction` / `Walls formed in lifts and finished by hand.` | About.tsx:11-32, 70-77 |
| How we run | h2 + lede + body | `How we run` / `Every site runs the same measured sequence. Craft is a discipline.` / `Material goes to the site. Attendance is taken at the site. Machine hours are written in the logbook. The week is checked against the diesel and the bills.` | About.tsx:84-92 |
| Where | h2 + body | `Where` / `We work out of Harohalli, Karnataka.` | About.tsx:100-106 |
| Registrations | h2 + body | `Registrations` / `Registered name: Sri Sai Enterprise.` | About.tsx:109-115 |
| Talk band | TalkLine + CTA | `Art and design at the core of everything we build.` / `Talk to us` | About.tsx:121 |

### 1.7 Contact (`src/pages/Contact.tsx`)

| Section | Element | Exact string | Source |
|---|---|---|---|
| Header | h1 + lede | `Contact` / `Art and design, built into the ground.` / `Tell us about your site or a job you are planning, and we will tell you how we would build it.` | Contact.tsx:28-36 |
| Reach the office | h2 | `Reach the office` | Contact.tsx:43 |
| Reach the office | Call channel | label `Call` / value `+91 9XXXX XXXXX` / detail `The number prints here once the office confirms it.` | src/data/site.ts:444-447 |
| Reach the office | WhatsApp channel | label `WhatsApp` / value `the same number` / detail `Messages reach the same phone.` | src/data/site.ts:450-453 |
| Reach the office | checklist h2 | `When you call, have this ready` | Contact.tsx:70 |
| Reach the office | checklist items (4) | `Where the site is, and what the land is like today`; `What the work is: a building, a cut, a supply, a hire`; `Any drawings you have, or a sketch`; `When you want to start` | src/data/site.ts:467-472 |
| Reach the office | hours | `Working hours` / `Monday to Saturday, 9am to 6pm.` / `Closed on Sunday.` | Contact.tsx:86-89 (src/data/site.ts:459-460) |
| Reach the office | who answers | `Who answers` / `Someone from the office answers, not a machine. If the line is busy, send the details on WhatsApp.` | Contact.tsx:93-96 (src/data/site.ts:461-462) |
| The company | h2 + body | `The company` / `Sri Sai Enterprise is a construction and earthmoving company. Art and design sit at the core of everything we build, from the first cut to the final finish. The work is built under the name Alankara, by Sri Sai Enterprises.` | Contact.tsx:106-113 |
| The company | where we work | `Where we work` / `The office works across Bengaluru south, the Harohalli corridor and Ramanagara district. Tell us where your site is; if it is within reach, we will come and see it.` | Contact.tsx:116-120 (src/data/site.ts:464-465; value at Contact.tsx:119) |
| The company | address note | `The street address prints once the office confirms it, with the map.` | Contact.tsx:122-123 (src/data/site.ts:466) |
| The company | side links | `About the company` (to `/about`); `What can be hired` (to `/services`); `The machines` (to `/machinery`) | Contact.tsx:130-137 |
| Talk band | quote + CTA | `Tell us about the site and we will work out the rest.` / `See the services we run` (to `/services`) | Contact.tsx:144 |

### 1.8 Not found (`src/pages/NotFound.tsx`)

| Element | Exact string | Source |
|---|---|---|
| h1 + body | `Page not found` / `The page you looked for is not here. The work is on the other pages.` | NotFound.tsx:12-15 |
| CTA | `Back to the home page` (to `/`) | NotFound.tsx:18 |

### 1.9 Alt text (user-visible to assistive tech)

Every `Plate` and `SitePhoto` carries descriptive alt text (`src/data/site.ts:53,59,65,71,94,106,...`; `src/data/photos.ts`). Decorative art carries `alt=""` (`src/data/site.ts:405,412`; `Ornament.tsx:13,30,47`; `Section.tsx:76`). The alt text is not in scope for the claim audit but is quoted in §6.

---

## 2. Claims audit

Each claim the site makes, and whether the repo holds a source for it. "Source in repo" means a data field, comment, or document that backs the claim. The `CONTENT-MANIFEST.md` and `REPORT.md` that several comments cite **do not exist** in the repo. The last commit is `ce762fa chore: remove round logs, ledgers, one-off scripts and scratch docs`. So the cited authority is gone.

| # | Claim | Where | Source in repo? |
|---|---|---|---|
| C1 | `Art and design sit at the core of everything we build.` (positioning) | site.ts:44 context; Hero.tsx:99; Home.tsx:63; SiteFooter.tsx:19; About.tsx:56 | No external source. It is the brand line. No comment marks it provisional. |
| C2 | `The art form we keep alive` (rammed earth) | site.ts:150, 318 | No source. No comment marks it provisional. Superlative with no backing. |
| C3 | `Beautiful and permanent.` | site.ts:150 | No source. Unqualified superlative. |
| C4 | Service scope: 9 service lines (civil, earthwork, levelling, machine contracts, machinery with operator, material supply, labour supply, road/drain/barrier, rammed earth) | site.ts:162-327 | Scope comes from the design brief, not from the client. site.ts:14 comment says `Page order 1..9, matches the plate mapping in the brief.` No client confirmation of the scope in the repo. |
| C5 | Working area: `The office works across Bengaluru south, the Harohalli corridor and Ramanagara district.` | site.ts:465 | Marked provisional. site.ts:463 comment: `/** Assumed: the engagement's market coverage is the company's working corridor. */`. No client confirmation. |
| C6 | `We work out of Harohalli, Karnataka.` | About.tsx:105 | Marked provisional. About.tsx:101-103 comment: `{/* Location line per the Round 4 directive. The Content Manifest marks the district/service area unconfirmed: remove this line if the client does not authorise it (CONTENT-MANIFEST.md #4). */}`. The cited manifest does not exist. |
| C7 | Hours: `Monday to Saturday, 9am to 6pm` and `Closed on Sunday.` | site.ts:459-460 | Marked assumed. site.ts:457 comment: `/** Office facts. The starred values are assumed for the preview and await the office's confirmation. */`. |
| C8 | `Someone from the office answers, not a machine. If the line is busy, send the details on WhatsApp.` | site.ts:462 | Marked assumed (same comment, site.ts:457). The WhatsApp number does not exist yet (see §4). |
| C9 | `Registered name: Sri Sai Enterprise.` | About.tsx:115; SiteFooter.tsx:22 | No registration document in the repo. The About.tsx:112-114 comment says registration numbers appear only when supplied: `{/* Only confirmed facts render. Registration numbers (GST, Udyam, licence) appear here only when the client supplies and authorises them; no number is invented (CONTENT-MANIFEST.md #9). */}`. The name is asserted; the number is not. |
| C10 | `Every machine comes with an operator.` / `Machinery with operator` | Machinery.tsx:37; site.ts:241-242 | No source. An absolute claim. |
| C11 | `Every site runs the same measured sequence.` (5-step process) | Home.tsx:92; About.tsx:86; Services.tsx:44 | No source. Process is asserted as universal. |
| C12 | `The rate is agreed before the machine is booked.` | site.ts:223 | No source. Commercial term. |
| C13 | `Machine hours are written in the logbook.` | site.ts:242; About.tsx:90-91 | No source. |
| C14 | `The week is checked against the diesel and the bills.` | About.tsx:91-92 | No source. |
| C15 | `Machines are the instruments. The eye of the operator is the difference.` | Home.tsx:72-73 | Brand line, not a fact. No source. |
| C16 | Past-tense work claims: `Finished and running sites. The proof is in the finish.` | Work.tsx:39 | Backed loosely by the client photos (site-24 to site-26 show finished work). The claim itself has no document. |
| C17 | Fleet table: `The machine classes, their capacity, and whether each is owned or hired are not published yet.` | Machinery.tsx:47-49 | This is an honest empty state. Machinery.tsx:41-43 comment: `{/* The fleet table renders only once the client confirms the machine classes, capacity and owned-or-hired detail. Until then the empty state below stands in, with no placeholder rows. */}`. Backed and deliberate. |
| C18 | `What you provide: drawings, approvals, and site access.` | site.ts:160 | No client source. A scope statement. |

Provisional markers found in code and data (quoted):

- site.ts:79 — `/** One line beside the name. Provisional wording until the office confirms its copy. */` (applies to `whatWeDo` lines at site.ts:89, 101).
- site.ts:428-431 — `* Contact details. A value still to be confirmed by the office keeps a * masked placeholder and ``pending: true``...`
- site.ts:436-437 — `/** Shown under the value; says plainly where a pending value stands. */`
- site.ts:457 — `/** Office facts. The starred values are assumed for the preview and await the office's confirmation. */`
- site.ts:463 — `/** Assumed: the engagement's market coverage is the company's working corridor. */`
- About.tsx:101-103 and About.tsx:112-114 — the two comments quoted at C6 and C9.
- `pending: true` set on both contact channels (site.ts:447, 454).
- photos.ts:3-7 — `/** The client's own site photographs (supplied 2026-10)... every frame is from the company's own sites. Captions are kept plain and factual. */`. This is the provenance claim behind the photo captions.
- site.ts:20 — `/** A real photograph of this work on the company's own sites, where one exists. */` (applies to `evidence`).

Summary: five claims carry an explicit provisional/assumed marker (C5, C6, C7, C8, and the `whatWeDo` lines). Twelve claims carry no source at all (C1–C4, C9 name, C10, C11, C12, C13, C14, C15, C18). Two claims are honest, sourced empty states (C17) or photo-backed (C16).

---

## 3. Naming and identity consistency

Three spellings are in play. They do not agree.

| Name | Count in repo | Where |
|---|---|---|
| `Alankara` | 5 | site.ts:44; useDocumentTitle.ts:3,6; index.html:8,11 |
| `Sri Sai Enterprises` (plural) | 3 | site.ts:45 (brandBy); index.html:8,11 |
| `Sri Sai Enterprise` (singular) | 3 | site.ts:41 (companyName); About.tsx:55; About.tsx:115 |
| `Sai Sree Enterprise` | 52 | assets/photos/credits.json, `license` and `creator` on all 26 entries (e.g. lines 8-9) |

Findings, with the singular/plural split called out:

1. **Singular vs plural.** The brand lockup says `Alankara` over `- by Sri Sai Enterprises` (plural) — SiteHeader.tsx:37,45; SiteFooter.tsx:14,16. The registered-name line says `Registered name: Sri Sai Enterprise` (singular) — SiteFooter.tsx:22, About.tsx:115, from companyName at site.ts:41. The same page (Contact) uses both: line 110 renders `Sri Sai Enterprise` (companyName) and line 112 renders `by Sri Sai Enterprises` (brandBy). So one page states the company two ways. Cite: site.ts:41 vs site.ts:45; Contact.tsx:110 vs Contact.tsx:112.
2. **Title tag vs brand lockup.** The server `<title>` is `Alankara — by Sri Sai Enterprises` (index.html:11) using plural. The header lockup uses the same plural (SiteHeader.tsx:45). These two agree. But the client-side route title is set by `useDocumentTitle` to `<Title> | Alankara` (useDocumentTitle.ts:6), which drops the enterprise name. So the served title says `... — by Sri Sai Enterprises` and, after hydration, the title becomes e.g. `Contact | Alankara`. The enterprise name disappears from the title on hydration.
3. **A third spelling, in the photo credits.** Every credit uses `Sai Sree Enterprise` (52 occurrences, credits.json). The site itself never uses `Sai Sree`. So the repo holds two different company names: `Sri Sai (Enterprises|Enterprise)` on the site, `Sai Sree Enterprise` in the provenance file.
4. **`SKS`, `SRS`, `SSE`** — zero occurrences anywhere in the repo (grep of `*.ts`, `*.tsx`, `*.json`, `*.html`, `*.md` outside node_modules and dist returned no matches).
5. **Live rendered text.** The live SPA serves an empty `#root` (see §5). The copy lives in the bundle `https://sai-sree-web.vercel.app/assets/index-BCcCNCww.js`, which contains `Alankara` (2×), `Sri Sai Enterprises` (1×), and the same source strings. I could not hydrate the live page in a browser (the tool returned `browser.use_real_profile is on, but could not read the 'brave' profile's login data`), so the rendered-text check is from the bundle plus the source, not from a hydrated DOM.

Plain statement of which name is used where:
- `Alankara` — the brand name. Header (SiteHeader.tsx:37), footer (SiteFooter.tsx:14), title suffix (useDocumentTitle.ts:6), meta (index.html:8,11).
- `Sri Sai Enterprises` (plural) — the by-line. Header (SiteHeader.tsx:45), footer (SiteFooter.tsx:16), title and description (index.html:8,11), and Contact body (Contact.tsx:112).
- `Sri Sai Enterprise` (singular) — the "registered name". Footer (SiteFooter.tsx:22), About body (About.tsx:55,115), Contact body (Contact.tsx:110).
- `Sai Sree Enterprise` — the photo-credit creator and licence holder only (credits.json).

---

## 4. Contact completeness

The contact data is deliberately incomplete. Here is exactly what a visitor gets today.

**On the live `/contact` page** (source: src/pages/Contact.tsx, driven by src/data/site.ts):

- Two contact channels, both `pending: true` (site.ts:447, 454):
  - `Call` → value `+91 9XXXX XXXXX` (site.ts:445), detail `The number prints here once the office confirms it.` (site.ts:446). Because `pending` is true, the page prints the value as plain text, not a link — Contact.tsx:52-55. **There is no `tel:` link.**
  - `WhatsApp` → value `the same number` (site.ts:451), detail `Messages reach the same phone.` (site.ts:452). Also plain text, not a link. **There is no `wa.me` link.**
- No email address anywhere. **There is no `mailto:` link.**
- No street address. The page prints only `The street address prints once the office confirms it, with the map.` (site.ts:466, rendered Contact.tsx:123). **There is no address and no map.**
- No contact form. No `<form>` and no input field in Contact.tsx.
- Internal links only: `About the company`, `What can be hired`, `The machines` (Contact.tsx:130-137), plus the nav and footer.
- A working-hours block (site.ts:459-460) and a "Who answers" block (site.ts:461-462).

**On the home "Talk to us" band** (src/pages/Home.tsx:135-141):

- One button, `Talk to us`, which links to `/contact` (TalkBand default `to="/contact"`, TalkBand.tsx:28).
- No phone number, no email, no form on the home page.
- The same pattern holds on Work (Work.tsx:63), Services (Services.tsx:51), Machinery (Machinery.tsx:90), and About (About.tsx:120). Every closing action routes to `/contact`.

Distinct contact channels reachable from the whole site: `tel:` links = 0. `mailto:` links = 0. WhatsApp deep links = 0. Contact forms = 0. Addresses = 0. Maps = 0. The only contact paths are internal links to the `/contact` page, which itself prints a masked number and a placeholder for the number, the address, and the map.

**Plain statement: a real customer cannot contact this business through the site today.** The `Call` and `WhatsApp` values are masked placeholders (`+91 9XXXX XXXXX`, `the same number`) rendered as dead plain text, and no email, address, map, or form exists. The design is deliberate: site.ts:428-431 says a pending value "keeps a masked placeholder and `pending: true`: the Contact page prints it as plain text, never as a dead link."

---

## 5. SEO and social

Checked against the live origin and the source, on 2026-10-14.

| Item | Status | Evidence |
|---|---|---|
| `<title>` per route | **Missing (one shared title only).** | Source `index.html:11` sets one title. The live server returns the same `<title>` for `/`, `/services`, `/contact`: `Alankara — by Sri Sai Enterprises`. Route titles are set only client-side after hydration (useDocumentTitle.ts:6), so a crawler that does not run JS sees no route title. |
| Meta description per route | **Missing (one shared description only).** | `index.html:8`. Same string returned for every route (curl of `/contact` shows the same description). |
| `og:` tags (Open Graph) | **Missing.** | grep for `og:` in `index.html` and `src` returned no matches. |
| `twitter:` tags | **Missing.** | grep for `twitter:` returned no matches. |
| `canonical` link | **Missing.** | grep for `canonical` returned no matches. |
| `robots.txt` | **Missing.** | `curl https://sai-sree-web.vercel.app/robots.txt` → HTTP 404. (vercel.json:7 lists `robots.txt` in the rewrite exclusion, so a file was planned but is not present.) |
| `sitemap.xml` | **Missing.** | `curl https://sai-sree-web.vercel.app/sitemap.xml` → HTTP 404. (vercel.json:7 lists `sitemap.xml` in the exclusion; no such file exists.) |
| Structured data (LocalBusiness / Organization / JSON-LD) | **Missing.** | grep for `application/ld` and `schema` in `index.html` and `src` returned no matches. |
| Heading hierarchy per page | **One `<h1>` per page, correct on the source.** | `SectionHeading as="h1"` on each page: Home uses `Hero` h1 `Construction built as craft.` (Hero.tsx:89); Work (Work.tsx:32), Services (Services.tsx:22), Machinery (Machinery.tsx:20), About (About.tsx:45), Contact (Contact.tsx:27), NotFound (NotFound.tsx:11). Section headings render as `<h2>` (`SectionHeading` default `as="h2"`, SectionHeading.tsx:18). Card titles render as `<h3>` (BentoGrid.tsx:59, About.tsx:74, WhatWeDoCarousel.tsx:112). Order is sound in the source. On the live site the hierarchy is not in the served HTML at all (empty root). |
| Can each route be indexed (crawler view)? | **No. The deep routes serve no content.** | `curl -s -L https://sai-sree-web.vercel.app/services` returns the SPA shell only: `<div id="root"></div>` with no `<h1>`, no `og:`, no `twitter:`, no `canonical`, no JSON-LD. Count of `<h1|og:|twitter:|canonical|application/ld` in the `/services` HTML = 0. |
| Rendered-text check (live) | **Bundle-only.** | `https://sai-sree-web.vercel.app/assets/index-BCcCNCww.js` (461,201 bytes) contains the site copy (`Construction built as craft`, `Talk to us`, `Sri Sai Enterprises`, `Alankara`, `Harohalli`, `9XXXX`, `Monday to Saturday`). The copy is client-rendered. A browser could not be launched to hydrate the DOM (tool error: `browser.use_real_profile is on, but could not read the 'brave' profile's login data`). |

Net effect: the site is a single-title SPA. Deep links return a page whose crawler-visible body is empty, with no canonical, no robots file, no sitemap, no Open Graph or Twitter cards, and no structured data. Social shares of any URL show the site-wide title and description only. Search engines that do not execute JavaScript will index nothing beyond the shared head.

---

## 6. Photo provenance and captions

Source: `assets/photos/credits.json` (26 entries, one per `site-01.webp` .. `site-26.webp`).

Credit fields, confirmed present on every entry: `file`, `orig`, `width`, `height`, `caption`, `license`, `creator`, `source`.

- `license` — one value on all 26 entries: `Client-supplied; permission of Sai Sree Enterprise`.
- `creator` — one value on all 26 entries: `Sai Sree Enterprise`.
- `source` — one value on all 26 entries: `Client photographs supplied 2026-10-10 (consfilnal-2.zip)`.
- `orig` — the original WhatsApp filename per photo, e.g. site-01 → `IMG-20261009-WA0034.jpg` (credits.json:4).

Captions in credits.json (all 26): `Stone retaining wall at the cut` (site-01), `Rebar cage in the foundation pit` (02), `Wall and slab reinforcement` (03), `Column cages on the base slab` (04), `Pour into the reinforcement cage` (05), `Concrete pour into the foundation` (06), `Placing concrete at the pit` (07), `Concrete retaining wall at the earthworks` (08), `Machine trenching on the plot` (09), `Brick building under construction` (10), `Sub-base compaction inside the shed` (11), `Steel frame on the slab` (12), `Steel columns and beams` (13), `Clearing with the backhoe loader` (14), `Excavators at the demolition` (15), `Two-storey frame and blockwork` (16), `Framework and block walls` (17), `Steel erection on concrete columns` (18), `Raising the roof trusses` (19), `Land graded and set out` (20), `Slope finishing and drainage` (21), `Finished open ground` (22), `Laying turf on the slope` (23), `Finished residence and pool` (24), `Pool-side view of the residence` (25), `Pavilions and the finished lawn` (26).

Cross-checks (run in code):

- Images used in `src/data/photos.ts` and `src/data/site.ts`: 26 `/photos/site-NN.webp` references. **Missing files: none.** **Files present but never referenced: none** (all 26 are used, all are credited).
- Refs without a credit entry: **none.**
- **Caption mismatches between the site and credits.json: none.** Every caption rendered from photos.ts and site.ts equals the `caption` in the credit entry for the same file. (Verified by matching `src` to `file` and comparing strings.)
- **The plates (`assets/plates/*`) have no credit file.** The 12 plates are `BORDER-MOTIF.webp`, `FRIEZE-5STATIONS.webp`, `HERO-CREW.webp`, `HERO-MACHINE-V2.webp`, `HERO-MACHINE.webp`, `HERO-MUDHOUSE-SQ.webp`, `HERO-MUDHOUSE.webp`, `TILE-CIVIL.webp`, `TILE-EARTHWORK.webp`, `TILE-LABOUR.webp`, `TILE-ROAD.webp`, `TILE-SUPPLY.webp`. No `credits.json` sits in `assets/plates/`; the only credit file in `assets/` is `assets/photos/credits.json`. So the plates have **no licence, creator, or source recorded**. This includes the four hero plates (site.ts:48-73), the four category plates (site.ts:113-158), the service plates, the frieze, and the border motif.

Two further provenance flags, quoted:

1. `photos.ts:3-7` claims: `* The client's own site photographs (supplied 2026-10)... every frame is from the company's own sites. Captions are kept plain and factual.` This claim covers `/photos/site-*.webp` only. It does not cover the plates, which are the images used as hero, category, and service art.
2. The hero alt text reads as a photograph of real work, but the file is a flat illustration. `HERO-CREW.webp` carries the alt `Workers raising a rammed earth wall, tamping wet earth into tall wooden formwork with hand rammers beside bamboo scaffolding.` (site.ts:53, also `About.tsx` texture via `heroSlides[0]`). A vision check already established that this plate is a flat folk-art **illustration**, not a photograph. The alt text therefore describes a scene the image does not show. The `photos.ts` provenance claim ("every frame is from the company's own sites") does not apply to this plate, and no credit entry covers it.

---

## 7. Accessibility of the words

Reading level and sentence length of the longest body paragraphs (counts run in code):

| Text | Chars | Words | Sentences | Avg words/sentence | Source |
|---|---|---|---|---|---|
| Rammed earth service body | 249 | 44 | 3 | 14.7 | site.ts:318 |
| Contact company paragraph | 223 | 40 | 3 | 13.3 | Contact.tsx:109-113 |
| Civil construction service body | 196 | 32 | 3 | 10.7 | site.ts:166 |
| Services intro | 173 | 35 | 2 | 17.5 | Services.tsx:26-27 |
| Hero subtext | 160 | 26 | 1 | 26.0 | Hero.tsx:99-101 |
| About governance paragraph | 155 | 28 | 4 | 7.0 | About.tsx:89-92 |

Notes:

- The Hero subtext (Hero.tsx:99-101) is one 26-word sentence. It is broken into three visual lines, but it reads as a single sentence and finishes with a four-item list.
- Most sentences are short. The governance paragraph (About.tsx:89-92) is four sentences at 7 words each — clean for a non-native reader.
- The style is deliberately clipped and literary ("Craft is a discipline", "The proof is in the finish", "Beautiful and permanent"). This is brand voice, not plain instruction.

Jargon a Bengaluru construction client may not read fluently:

- `rammed earth`, `formwork`, `struck` (the formwork is struck), `in lifts` — site.ts:318, 150. `struck` and `in lifts` are trade terms.
- `formation` (roads), `barrier runs`, `the levels held` — site.ts:299.
- `sub-base compaction` — site.ts:347.
- `elevation`/`grade` avoided, but `set out`, `pegs and string lines`, `set-out lines` — site.ts:204, 185.
- `tie holes`, `blinding slab` — appear only in alt text, not in visible copy (site.ts:98, photos.ts:30). Alt text is read by screen readers, so this still reaches some clients.
- `the art form we keep alive`, `Art aesthetics are not decoration added at the end` — About.tsx:51. Abstract for a builder client.
- `fill earth`, `aggregates` — site.ts:260. Standard, but worth noting.

Voice: `we` vs `the office`.

- Visible body copy uses `we`/`our` throughout: Hero.tsx:99, site.ts:166, 185, 204, 223, 242, 261, 280, 299, 318.
- Two visible strings use `the office` instead of `we`: Contact.tsx:119 `The office works across Bengaluru south...` (from site.ts:465) and Contact.tsx:96 `Someone from the office answers...` (from site.ts:462). Also site.ts:446/466 use `the office` in the placeholder detail lines (`...once the office confirms it`). So within one block of the Contact page the copy shifts between `the office` and `we`. The heading is `Reach the office` (Contact.tsx:43), which frames `the office` as the subject, then the body says `we`. This is the main voice inconsistency.

English / Indian-English style:

- The copy is written in a clipped, deliberately British-leaning editorial register (single-word sentences, em-dashes, `struck` as a verb). It reads as agency English, not Indian-English.
- One phrase worth a note: `Beautiful and permanent.` (site.ts:150) is an unqualified absolute that reads as promotional.
- No Indian-English infelicities (no "kindly", "same", "do the needful") were found in visible copy.
- Dates in text use the Indian day-month order: `2026-10` (photos.ts:5), `2026-10-10` (credits.json source). Consistent.

---

## 8. Prioritised content-gap list

One line each. `file:line` cited.

### MUST (a client would notice, or be harmed by it)

1. No way to contact the business: masked phone `+91 9XXXX XXXXX` and no `tel:`, `mailto:`, form, address, or map — src/data/site.ts:445; src/pages/Contact.tsx:52-55.
2. Working-area claim is assumed, not confirmed, and is published anyway — src/data/site.ts:463-465; also About.tsx:101-106 (`Harohalli`).
3. Singular/plural brand conflict on one page: `Sri Sai Enterprise` vs `by Sri Sai Enterprises` in the Contact body — src/pages/Contact.tsx:110 vs :112 (src/data/site.ts:41 vs :45).
4. Deep routes serve an empty `#root`, so no route is indexable and no route has its own title/description — index.html:5-12; vercel.json:7; curl of `/services` returns 0 headings.
5. `Sai Sree Enterprise` (credits) vs `Sri Sai Enterprise(s)` (site) — two company names in the repo — assets/photos/credits.json:9 vs src/data/site.ts:41.
6. `HERO-CREW.webp` is an illustration but its alt text describes a photograph of real workers — src/data/site.ts:53.
7. The 12 plates in `assets/plates/` carry no licence, creator, or source — assets/plates/* (no credits file).
8. Hours (`Mon–Sat 9–6`) are assumed and published — src/data/site.ts:457-460.

### SHOULD

9. Missing `robots.txt` (live 404) and `sitemap.xml` (live 404) though vercel.json:7 lists both.
10. Missing Open Graph and Twitter card tags — index.html (no `og:`/`twitter:`).
11. Missing canonical link on all routes — index.html; no `canonical` in src.
12. No structured data (LocalBusiness/Organization) — index.html; no JSON-LD in src.
13. Route titles overwrite the enterprise name: `<Title> | Alankara` drops `Sri Sai Enterprises` — src/hooks/useDocumentTitle.ts:6.
14. `the office` vs `we` voice shift inside the Contact page — src/pages/Contact.tsx:96, :119 vs :110-112.
15. Fleet list is empty by design but reads as unfinished: `...are not published yet.` — src/pages/Machinery.tsx:47-49.
16. `The art form we keep alive` and `Beautiful and permanent.` are unsourced superlatives — src/data/site.ts:150, 318.
17. `whatWeDo` lines are marked provisional and ship as-is — src/data/site.ts:79, 89, 101.
18. `CONTENT-MANIFEST.md` and `REPORT.md`, cited in comments as the authority for several claims, do not exist — src/data/site.ts:431; src/pages/About.tsx:103,114; src/components/Hero.tsx:24.

### NICE

19. Trade jargon (`struck`, `in lifts`, `formation`, `sub-base compaction`) may not read fluently for the client — src/data/site.ts:299, 318, 347.
20. Hero subtext is one 26-word sentence — src/components/Hero.tsx:99-101.
21. `ServiceRecord.tsx` comment cites `R12c` (a round reference) with no glossary in the repo — src/components/services/ServiceRecord.tsx:23.
22. Marquee repeats service names that also appear in nav and cards, which slightly dilutes keyword focus — src/data/site.ts:415-425.
23. The `Registered name` line promises registration numbers that never render — src/pages/About.tsx:112-115.
24. `NotFound` title `Page not found` joins the `| Alankara` suffix and reads oddly — src/pages/NotFound.tsx:7.

---

## State of the content

The Alankara site is a well-built, careful, single-title SPA whose visible copy is complete, consistent in tone, and unusually disciplined — 473 lines of data drive every page, the heading order is sound in the source, alt text is descriptive, and the photo captions match their credit file exactly. The problems are not in the writing. They are in what the writing stands on and what the site does with it. The company name is written three ways and one page states two of them; the photo provenance file names a fourth spelling (`Sai Sree Enterprise`) that never appears on the site. The plates that serve as hero, category, and service art carry no licence at all, and the lead hero plate is an illustration whose alt text claims a photograph. Five claims are explicitly marked assumed or provisional in code and ship anyway — the working area, the hours, the "who answers" line, and the two "What we do" lines — while a dozen more (the "art form we keep alive", "every machine comes with an operator", the universal five-step process) carry no source, and the `CONTENT-MANIFEST.md` several comments cite as their authority was deleted in the last commit. Search is effectively dark: every deep route returns an empty `#root`, there is no robots.txt, no sitemap.xml, no canonical, no Open Graph or Twitter card, and no structured data, so a crawler that does not run JavaScript indexes nothing but a shared title and description. Most seriously, the contact data is deliberately incomplete and no contact path exists at all — the phone and WhatsApp values are masked placeholders rendered as dead text, and there is no email, address, map, or form. As it stands, a visitor can read the work but cannot reach the business, and the copy says a lot that the repo cannot yet prove.
