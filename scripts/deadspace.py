"""Find large near-empty (flat) horizontal bands in full-page screenshots.

A row is "flat" when its luminance standard deviation is very low (no text,
no image texture). Consecutive flat rows beyond a threshold are reported as
dead space with their y-range and height in CSS px (deviceScaleFactor 1).

Run: python3 scripts/deadspace.py [shots/*-desktop-full.png]
"""
import glob
import os
import sys
from PIL import Image


def analyze(path, min_h=90, std_thresh=6.0, ignore_top=0):
    img = Image.open(path).convert("RGB")
    w, h = img.size
    gray = img.convert("L")
    px = gray.load()
    cols = range(0, w, 2)
    flats = []
    for y in range(ignore_top, h):
        vals = [px[x, y] for x in cols]
        n = len(vals)
        mean = sum(vals) / n
        var = sum((v - mean) ** 2 for v in vals) / n
        flats.append(var ** 0.5 < std_thresh)
    runs = []
    start = None
    for i, f in enumerate(flats):
        y = i + ignore_top
        if f and start is None:
            start = y
        elif not f and start is not None:
            runs.append((start, y - 1))
            start = None
    if start is not None:
        runs.append((start, h - 1))
    big = [(a, b, b - a + 1) for a, b in runs if b - a + 1 >= min_h]
    name = os.path.basename(path)
    print(f"\n{name}  ({w}x{h})")
    if not big:
        print(f"  no flat band >= {min_h}px")
    for a, b, ht in big:
        print(f"  dead band y {a:>5}-{b:<5} h={ht:>4}px ({100.0 * ht / h:4.1f}% of page)")


if __name__ == "__main__":
    args = sys.argv[1:] or sorted(glob.glob("shots/*-desktop-full.png"))
    for p in args:
        analyze(p)
