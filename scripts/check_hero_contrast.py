"""Compute the WCAG 2.x contrast of the hero text against the scrim as rendered.

Two checks:
  1. Analytic: composite the two scrim gradients over a worst-case bright plate
     pixel and report the brightest background luminance across a grid covering
     the hero text block.
  2. Measured: read the real screenshot and sample the background in a strip
     immediately left and right of the rendered H1 and sub-paragraph boxes.

Run: python3 scripts/check_hero_contrast.py
"""
import json
import os
from PIL import Image

TEXT = (0xFC, 0xF8, 0xF1)  # --cream


def srgb_to_linear(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(rgb):
    r, g, b = (srgb_to_linear(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(l1, l2):
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def lerp_stops(stops, t):
    """stops: [(pos, alpha), ...] ascending position."""
    if t <= stops[0][0]:
        return stops[0][1]
    for (p0, a0), (p1, a1) in zip(stops, stops[1:]):
        if t <= p1:
            f = (t - p0) / (p1 - p0) if p1 > p0 else 0
            return a0 + (a1 - a0) * f
    return stops[-1][1]


# Stops mirror the localized hero scrim in src/components/Hero.tsx:
#   vertical  linear-gradient(to top,   0.90 0%, 0.85 47%, 0.38 58%, 0 68%)
#   horizontal linear-gradient(to right, 0.18 0%, 0.10 40%, 0 66%)
# The vertical layer is indexed by y from the TOP of the hero (0) to the bottom (1).
# A third, top-down nav layer (0.14 at 0%, 0 by 13%) is not modelled: it is zero
# across the sampled text region (y 56..82%), so it cannot change the result.
# A mobile-only bottom layer is likewise outside the desktop sample.
V_STOPS = [(0.0, 0.0), (0.32, 0.0), (0.42, 0.38), (0.53, 0.85), (1.0, 0.90)]
H_STOPS = [(0.0, 0.18), (0.40, 0.10), (0.66, 0.0), (1.0, 0.0)]
SCRIM_RGB = (18, 14, 10)


def analytic(background_luminance=0.90, x_lo=3, x_hi=66, y_lo=56, y_hi=82):
    """Worst and best effective scrim alpha over the hero text block.

    Defaults cover the rendered H1 and sub-paragraph region (x 3..66%, y 56..82%),
    derived from shots/home-hero-boxes.json at 1440x900.
    """
    worst_alpha = 1.0
    best_alpha = 0.0
    for xi in range(x_lo, x_hi + 1):
        a_h = lerp_stops(H_STOPS, xi / 100.0)
        for yi in range(y_lo, y_hi + 1):
            a_v = lerp_stops(V_STOPS, yi / 100.0)
            alpha = 1 - (1 - a_h) * (1 - a_v)
            worst_alpha = min(worst_alpha, alpha)
            best_alpha = max(best_alpha, alpha)
    scrim_l = luminance(SCRIM_RGB)
    bg_l = worst_alpha * scrim_l + (1 - worst_alpha) * background_luminance
    return worst_alpha, best_alpha, bg_l, contrast(luminance(TEXT), bg_l)


def measured():
    img = Image.open("shots/home-desktop.png").convert("RGB")
    w, h = img.size
    with open("shots/home-hero-boxes.json") as fh:
        boxes = json.load(fh)
    px = img.load()

    report = []
    for key in ("h1", "sub"):
        box = boxes.get(key)
        if not box:
            continue
        x0 = max(0, int(box["x"]))
        y0 = max(0, int(box["y"]))
        x1 = min(w - 1, int(box["x"] + box["width"]))
        y1 = min(h - 1, int(box["y"] + box["height"]))
        samples = []
        for (ax0, ax1) in ((x0 - 16, x0 - 4), (x1 + 4, x1 + 16)):
            for x in range(max(0, ax0), min(w, ax1)):
                for y in range(y0, y1):
                    samples.append(px[x, y])
        if not samples:
            continue
        lums = sorted(luminance(s) for s in samples)
        # Worst case for text contrast is the brightest background pixel.
        brightest = lums[-1]
        p95 = lums[int(len(lums) * 0.95)]
        report.append(
            (
                key,
                box["width"],
                box["height"],
                contrast(luminance(TEXT), brightest),
                contrast(luminance(TEXT), p95),
            )
        )
    return report


def main():
    a, a_best, bl, cr = analytic(0.90)
    print("Hero text contrast check (WCAG 2.x)")
    print(f"  text colour: #{TEXT[0]:02X}{TEXT[1]:02X}{TEXT[2]:02X} (--cream)")
    print("  analytic scrim composite over a worst-case plate pixel (L=0.90):")
    print(f"    worst effective scrim alpha = {a:.3f}  (best {a_best:.3f})")
    print(f"    background luminance        = {bl:.3f}")
    print(f"    contrast ratio              = {cr:.2f}:1   {'PASS' if cr >= 4.5 else 'FAIL'}")
    print("  analytic over a pure-white plate pixel (L=1.00):")
    _, _, blw, crw = analytic(1.0)
    print(f"    contrast ratio              = {crw:.2f}:1   {'PASS' if crw >= 4.5 else 'FAIL'}")

    if os.path.exists("shots/home-desktop.png") and os.path.exists("shots/home-hero-boxes.json"):
        print("  measured from shots/home-desktop.png (strip beside the rendered text):")
        for key, bw, bh, cb, cp in measured():
            print(
                f"    {key:<3} box {int(bw)}x{int(bh)}  "
                f"brightest-pixel {cb:.2f}:1   p95 {cp:.2f}:1   "
                f"{'PASS' if cp >= 4.5 else 'FAIL'}"
            )


if __name__ == "__main__":
    main()
