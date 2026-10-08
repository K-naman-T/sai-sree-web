# Content manifest: what the client must supply

Version 0 of the site is deliberately honest-empty. Every element that would hold
an unconfirmed fact is absent from the markup until the real value arrives. This
file is the exact list of what the client needs to send to move v0 from
honest-empty to live, and what renders in the meantime.

Rule: an unconfirmed fact never renders as an invented value and never as filler
text on screen. If the value is missing, the whole element does not render. No
"details pending" line is allowed.

| # | Fact needed | Where it appears | What renders without it |
|---|---|---|---|
| 1 | Phone number (the one the company answers) | Contact page primary action; footer contact block | The contact action and the footer contact block are absent. Contact page shows the form or enquiry route only. |
| 2 | WhatsApp deep-link number | Contact page secondary action | The WhatsApp action is absent. No `.btn` is rendered for it. |
| 3 | Street address and map link | Contact page location block; footer contact block | The location block and footer address line are absent. |
| 4 | Districts and service area | Home and Services pages, in body copy | The service-area sentence is omitted. No map, no list of districts. |
| 5 | Working hours | Contact page; footer contact block | The hours line is absent. Do not write "by appointment" or any stand-in. |
| 6 | Who answers the phone (role, not a personal name) | Contact page, next to the phone action | The line is absent. The phone number can still render on its own. |
| 7 | Fleet list: class, capacity, owned or hired | Machinery page | The machinery table renders with only the rows the client confirms. An empty Machinery page renders its empty state, not placeholder rows. |
| 8 | Real site photographs for the Work page | Work page plates; Home page Work band (band 5) | TEMPORARY STAND-INS: web photographs are rendered now on work.html and the home Work band as placeholders, marked must-replace. They are not photographs of the client's sites. Replace them with the client's own site photographs and remove the stand-in markup. The Mysore painting plates are brand imagery, not evidence of completed projects, and must not be used as if they were. |
| 9 | Registrations the client permits to show (GST, Udyam, licence) | Footer or About page, only as permitted | The registration line is absent. Do not display any registration number the client has not authorised. |
| 10 | Exact registered spelling of the company | Header lockup, footer legal line, page titles | The lockup currently reads `Sai Sree Enterprise`. If the registered spelling differs, it must be corrected everywhere at once, including the `<title>` pattern. |

## Notes for page authors

- Placeholder values (`X`, `NNN`, `example`, angle-bracket tokens) must never reach
  a rendered page.
- A consumer brand name is still deferred. It will arrive as
  `<NAME> by Sai Sree Enterprise` and drops into the single `.lockup` slot. Do not
  invent one.
- When a fact from this table is supplied, add it to the markup and to the relevant
  page, then re-run `python3 tools/slop_gate.py --ci`.
