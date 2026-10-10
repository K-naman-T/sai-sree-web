"""Sanity-check the captured screenshots: size, brightness spread and colour count.

Flags any frame that looks blank (a single flat colour), and reports the hero
frame's darkness (the scrim plus imagery should be clearly darker than paper).

Run: python3 scripts/check_shots.py
"""
import glob
import os
from PIL import Image, ImageStat

PAPER = (0xFB, 0xF7, 0xF0)


def main():
    files = sorted(glob.glob("shots/*.png"))
    if not files:
        print("no screenshots found")
        return
    blanks = []
    print(f"{'file':<34} {'size':<12} {'mean':>6} {'std':>6} {'colors':>8}")
    for path in files:
        img = Image.open(path).convert("RGB")
        stat = ImageStat.Stat(img)
        mean = sum(stat.mean) / 3
        std = sum(stat.stddev) / 3
        raw = img.getcolors(maxcolors=1_000_000)
        # getcolors returns None when the cap is exceeded: that means MORE than a
        # million distinct colours, i.e. richly detailed, the opposite of blank.
        colors = len(raw) if raw is not None else 1_000_000
        name = os.path.basename(path)
        print(f"{name:<34} {str(img.size):<12} {mean:6.1f} {std:6.1f} {colors:8d}")
        if colors < 50 or std < 1.0:
            blanks.append(name)

    hero = "shots/home-desktop.png"
    if os.path.exists(hero):
        img = Image.open(hero).convert("RGB")
        top = img.crop((0, 80, img.width, 460))
        s = ImageStat.Stat(top)
        lum = sum(s.mean) / 3
        paper_lum = sum(PAPER) / 3
        print(
            f"\nhero upper band mean luminance {lum:.1f} vs paper {paper_lum:.1f} "
            f"({'dark hero image present' if lum < paper_lum - 25 else 'WARNING: hero looks flat'})"
        )

    print("\nblank frames:" if blanks else "\nNo blank frames.")
    for b in blanks:
        print("  -", b)


if __name__ == "__main__":
    main()
