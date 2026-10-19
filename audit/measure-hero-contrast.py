"""Glyph-only contrast: the ink screenshot minus the bare screenshot marks the
pixels the type actually covers, and the bare frame at those same pixels is the
real background. Cream #FCF8F1 is the ink. Mean flatters; the 5th percentile and
the worst glyph pixel are the honest numbers."""
import json
from PIL import Image, ImageChops

CREAM = (0xFC, 0xF8, 0xF1)
AA_NORMAL, AA_LARGE = 4.5, 3.0
LARGE = {"brand", "h1"}

def lum(rgb):
    def ch(c):
        c /= 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def ratio(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

data = json.load(open("/home/syd/projects/sai-sree-web/audit/hero/contrast-boxes.json"))
rows = []

for vp, slides in data.items():
    for slide, payload in slides.items():
        ink = Image.open(payload["file"].replace("bare-", "ink-")).convert("RGB")
        bare = Image.open(payload["file"]).convert("RGB")
        diff = ImageChops.difference(ink, bare)
        for key, box in payload["boxes"].items():
            if not box:
                continue
            x, y = int(box["x"]), int(box["y"])
            w, h = max(1, int(box["width"])), max(1, int(box["height"]))
            region = (x, y, min(x + w, bare.width), min(y + h, bare.height))
            if region[2] <= region[0] or region[3] <= region[1]:
                continue
            d = diff.crop(region).load()
            b = bare.crop(region).load()
            ratios = []
            for yy in range(region[3] - region[1]):
                for xx in range(region[2] - region[0]):
                    if max(d[xx, yy]) > 18:  # a glyph pixel, not an antialias ghost
                        ratios.append(ratio(CREAM, b[xx, yy]))
            if not ratios:
                print(f"  (no glyph pixels found for {vp}/{slide}/{key})")
                continue
            ratios.sort()
            need = AA_LARGE if key in LARGE else AA_NORMAL
            rows.append({
                "vp": vp, "slide": slide, "key": key, "n": len(ratios),
                "mean": sum(ratios) / len(ratios),
                "p5": ratios[int(len(ratios) * 0.05)],
                "worst": ratios[0], "need": need,
            })

print(f"{'vp':6} {'slide':6} {'block':15} {'px':>6} {'mean':>6} {'p5':>6} {'worst':>6} {'need':>5}")
worst_by_key = {}
for r in rows:
    flag = "  <-- FAIL" if r["p5"] < r["need"] else ""
    print(f"{r['vp']:6} {r['slide']:6} {r['key']:15} {r['n']:6} {r['mean']:6.2f} {r['p5']:6.2f} {r['worst']:6.2f} {r['need']:5.1f}{flag}")
    cur = worst_by_key.get(r["key"])
    if cur is None or r["p5"] < cur["p5"]:
        worst_by_key[r["key"]] = r

print("\nWORST CASE PER BLOCK (5th percentile of glyph pixels)")
for k, r in worst_by_key.items():
    print(f"  {k:15} p5 {r['p5']:.2f}  worst {r['worst']:.2f}  needs {r['need']}  ({r['vp']}/{r['slide']})")
