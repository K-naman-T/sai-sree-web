# CONTENT MANIFEST — what the site awaits from the client

Standing rule: the site publishes only what is true and supplied. Where a detail is still
to come, the site says so plainly or holds a clearly marked placeholder; it never invents
hard values. This file tracks the open items and every assumption.

## Awaited (render when supplied)

1. **Contact channels** — the phone and WhatsApp numbers, the office address and the map.
   (The Contact page now renders masked placeholders and notes where these stand; the real
   values swap in through `contactChannels` / `contactFacts` in `src/data/site.ts`.)
2. **Fleet list** — the machine classes the company runs, their capacity, and whether each
   is owned or hired. (Machinery page, the "Fleet list" box, which currently states the
   details are not published yet.)

## In place, to confirm before publish (Contact page)

These render on the Contact page for the preview. Each is either a masked
placeholder or an assumption from the engagement's record; none is a confirmed
office value yet.

- **Call / WhatsApp** — masked (`+91 9XXXX XXXXX`), printed as plain text so
  nothing is a dead link. Confirm, then set the value, `href` and
  `pending: false` in `contactChannels`.
- **Working hours** — assumed: Monday to Saturday, 9am to 6pm; closed Sunday.
- **Who answers** — assumed line ("someone from the office answers...").
- **Where we work** — assumed from the engagement's market coverage: Bengaluru
  south, the Harohalli corridor, Ramanagara district.
- **Address and map** — held as a note on the page ("prints once the office
  confirms it").

## Supplied and in use

- **Names** — Sri Sai Enterprise (company name, header and footer); Alankara, by Sri Sai
  Enterprises (header lockup; footer lead). See `brandName` / `brandBy` in `src/data/site.ts`. The company name was corrected to Sri Sai by the client, 11 October 2026 (was Sai Sree).
- **Site photographs** — the client's own photographs (supplied 2026-10). See
  `src/data/photos.ts`; files in `assets/photos/`.
- **Copy** — the nine service descriptions, steps, and page copy as written in this round set.

## Standing notes

- The **studio cutouts of machine classes** on the Machinery page (excavator, backhoe,
  tipper, compactor; `assets/machines/`) are manufacturer product images used as temporary
  art, with the client's knowledge. Replace with photographs of the company's own machines
  when supplied.
- **Plates** (`assets/plates/`) are illustrative artwork and decorative; they never depict
  the company's sites.
