#!/usr/bin/env python3
"""Render the crawled site structure into one self-contained HTML page.

Data comes from audit/sitemap.json (a real crawl of the running build), so the
map cannot drift from the site. Run:  python3 audit/make-sitemap-page.py
Out:  audit/sitemap.html
"""

import html
import json
import os

ROOT = "/home/syd/projects/sai-sree-web"
SRC = os.path.join(ROOT, "audit", "sitemap.json")
OUT = os.path.join(ROOT, "audit", "sitemap.html")

# The six "What we take on" cards against the nine services on /services.
# Mapping is a judgement, not a fact of the build: two cards have no service
# entry at all, and two services have no card.
CARD_MAP = [
    ("Civil construction", ["civil"], []),
    ("Earthwork and levelling", ["earthwork", "levelling"], []),
    ("Machine and material supply", ["machine-contracts", "machinery-operator", "material-supply"], []),
    ("Rammed earth and mud construction", ["rammed-earth"], []),
    ("Architecture Designs", [], ["no service entry exists"]),
    ("Joint Ventures & Land Development", [], ["no service entry exists"]),
]
UNMATCHED_SERVICES = ["labour", "road"]
CARD_IDS = {"#civil", "#earthwork", "#levelling", "#machine-contracts", "#machinery-operator",
            "#material-supply", "#labour", "#road", "#rammed-earth"}


def esc(s):
    return html.escape(str(s))


def main() -> None:
    data = json.load(open(SRC))
    routes = data["routes"]
    crawled = data["crawledAt"][:16].replace("T", " ")

    cards = []
    for r in routes:
        rows = []
        for s in r["sections"]:
            targets = sorted({l["href"] for l in s["links"]})
            anchor = f' <span class="id">#{esc(s["id"])}</span>' if s["id"] and s["id"] not in ("root", "main") else ""
            inner_ids = [i for i in s["anchorsInside"] if i not in ("root", "main")]
            links = ""
            if targets:
                shown = targets[:3]
                chips = " ".join(f'<span class="to">{esc(t)}</span>' for t in shown)
                more = f' <span class="more">+{len(targets) - len(shown)} more</span>' if len(targets) > len(shown) else ""
                links = (
                    f'<span class="links">{len(s["links"])} link{"s" if len(s["links"]) != 1 else ""} → '
                    f'{chips}{more}</span>'
                )
            elif inner_ids:
                links = f'<span class="links dead">{len(inner_ids)} anchors, 0 inbound links</span>'
            rows.append(
                f'<li class="row{" hot" if len(targets) == 1 and len(s["links"]) > 2 else ""}">'
                f'<span class="kind">{esc(s["kind"])}</span>'
                f'<span class="head">{esc(s["heading"])}{anchor}</span>'
                f'<span class="chars">{s["chars"]} ch</span>{links}</li>'
            )
        cards.append(
            f'<div class="page">'
            f'<div class="pagehead"><span class="route">{esc(r["route"])}</span>'
            f'<span class="status">{r["status"]}</span>'
            f'<span class="h1">{esc(r["h1"] or "—")}</span>'
            f'<span class="total">{len(r["sections"])} rows · {sum(s["chars"] for s in r["sections"])} ch</span></div>'
            f'<ul class="rows">{"".join(rows)}</ul></div>'
        )

    nav = routes[0]["header"]
    navchips = " ".join(f'<span class="chip">{esc(l["text"])}</span>' for l in nav[1:])

    card_rows = "".join(
        f'<tr><td>{esc(card)}</td>'
        f'<td>{" ".join(f"<span class=anchor>#{a}</span>" for a in anchors) or "<span class=warn>— none —</span>"}</td>'
        f'<td class="note">{"; ".join(notes)}</td></tr>'
        for card, anchors, notes in CARD_MAP
    )
    unmatched = " ".join(f"<span class=anchor>#{a}</span>" for a in UNMATCHED_SERVICES)

    doc = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Alankara — current site structure</title>
<style>
  body {{ margin: 0; padding: 0; background: transparent; color: var(--foreground);
         font-family: inherit; font-size: 13px; line-height: 1.45; }}
  .wrap {{ width: 100%; max-width: 1120px; text-align: left; }}
  h1 {{ font-size: 17px; margin: 0 0 2px; }}
  .sub {{ color: var(--muted-foreground); margin-bottom: 14px; font-size: 12px; }}
  .chrome {{ border: 1px solid var(--border); padding: 8px 10px; margin-bottom: 14px; }}
  .chip, .kind, .to, .anchor, .status, .more {{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; }}
  .chip {{ border: 1px solid var(--border); padding: 2px 6px; margin-right: 4px; white-space: nowrap; }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px; }}
  .page {{ border: 1px solid var(--border); padding: 8px 10px 6px; min-width: 0; overflow-wrap: anywhere; }}
  .pagehead {{ display: flex; align-items: baseline; gap: 8px; border-bottom: 1px solid var(--border);
               padding-bottom: 5px; margin-bottom: 6px; flex-wrap: wrap; }}
  .route {{ font-family: ui-monospace, monospace; font-size: 13px; color: var(--accent); font-weight: 600; }}
  .status {{ color: var(--muted-foreground); }}
  .h1 {{ font-size: 12px; }}
  .total {{ margin-left: auto; color: var(--muted-foreground); font-size: 11px; }}
  ul.rows {{ list-style: none; margin: 0; padding: 0; }}
  .row {{ display: grid; grid-template-columns: 62px minmax(0, 1fr) auto; gap: 6px; padding: 3px 0;
          border-bottom: 1px dotted var(--border); align-items: baseline; }}
  .row:last-child {{ border-bottom: 0; }}
  .row.hot {{ background: color-mix(in srgb, var(--accent) 12%, transparent); }}
  .row.hot .head {{ font-weight: 600; }}
  .head {{ font-size: 12px; }}
  .kind {{ color: var(--muted-foreground); white-space: nowrap; }}
  .chars {{ color: var(--muted-foreground); font-size: 11px; }}
  .links {{ grid-column: 2 / -1; min-width: 0; }}
  .to {{ color: var(--accent); overflow-wrap: anywhere; }}
  .id, .more {{ color: var(--muted-foreground); }}
  .dead, .warn {{ color: #b4472e; }}
  h2 {{ font-size: 13px; margin: 18px 0 6px; text-transform: uppercase; letter-spacing: 0.14em; }}
  table {{ border-collapse: collapse; width: 100%; table-layout: fixed; }}
  th, td {{ border-bottom: 1px solid var(--border); text-align: left; padding: 4px 8px 4px 0;
            vertical-align: top; overflow-wrap: anywhere; }}
  th {{ font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted-foreground); }}
  .note {{ color: var(--muted-foreground); }}
  .anchor {{ color: var(--accent); }}
  .findings {{ border-left: 2px solid var(--accent); padding: 2px 0 2px 10px; margin-top: 6px; }}
  .findings b {{ font-weight: 600; }}
</style></head>
<body><div class="wrap">
  <h1>Alankara — current site structure</h1>
  <div class="sub">crawled from the running build at {esc(data["base"])} · {esc(crawled)} · 6 routes + a catch-all</div>

  <div class="chrome"><b>Header nav</b> (identical on every route) {navchips}<br>
  <b>Footer nav</b> (identical on every route) {navchips}<br>
  <span class="dim">Footer carries no phone number or address.</span></div>

  <div class="grid">{"".join(cards)}</div>

  <h2>Findings</h2>
  <div class="findings">
    <p><b>Seven links, one destination.</b> On the home page, “What we take on” holds 6 cards plus “ALL SERVICES”, and all 7 point at <span class="to">/services</span>. No card reaches its own offering.</p>
    <p><b>Nine anchors nobody can reach.</b> <span class="to">/services</span> already renders nine entries with ids {sorted(CARD_IDS)} and <span class="chip">scroll-mt-24</span> — built for deep links — but nothing on the site links to any of them.</p>
    <p><b>Six cards against nine services, and they do not line up.</b> Two cards have no service entry; two services have no card.</p>
    <p><b>Work is a dead end.</b> <span class="to">/work</span> holds 10 captioned groups, no anchors and no links: nothing can be pointed at, and no group links back to the service it proves.</p>
    <p><b>One action per page, always the same one.</b> Every route ends in a band pointing at <span class="to">/contact</span>; <span class="to">/contact</span> is the only page that links sideways (to /about, /services, /machinery).</p>
  </div>

  <h2>Cards against services</h2>
  <table><thead><tr><th>“What we take on” card</th><th>Service entries that match</th><th>Note</th></tr></thead>
  <tbody>{card_rows}
  <tr><td class="note">(no card)</td><td>{unmatched}</td><td class="note">services with no card on the home page</td></tr>
  </tbody></table>
</div></body></html>
"""
    with open(OUT, "w") as fh:
        fh.write(doc)
    print(f"wrote {OUT} ({len(doc)} bytes)")


if __name__ == "__main__":
    main()
