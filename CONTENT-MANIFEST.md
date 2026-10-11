# CONTENT MANIFEST — what the site awaits from the client

Standing rule: the site publishes only what is true and supplied. Where a detail is still
to come, the site says so plainly or renders nothing — it never invents data. This file
tracks the open items.

## Awaited (render when supplied)

1. **Contact channels** — phone, WhatsApp, email; office or site address; working hours;
   service area. (Contact page; see the note in `src/pages/Contact.tsx`.)
2. **Fleet list** — the machine classes the company runs, their capacity, and whether each
   is owned or hired. (Machinery page, the "Fleet list" box, which currently states the
   details are not published yet.)

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
