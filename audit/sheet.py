#!/usr/bin/env python3
"""Build the review contact sheets from audit/hero-shots.mjs output.

Run:  python3 audit/sheet.py
Out:  /tmp/shots/sheet-desktop.jpg   (one desktop frame per slide, stacked)
      /tmp/shots/sheet-small.jpg     (phone row over tablet row)
"""
import glob
import os

from PIL import Image, ImageDraw

SHOTS = "/tmp/shots"
NAMES = ["DEMOLITION", "FIELD", "POUR", "STEEL", "STONEWALL"]


def slides(device: str) -> list[tuple[str, Image.Image]]:
    out = []
    for path in sorted(
        glob.glob(f"{SHOTS}/hero-{device}-*.png"),
        key=lambda p: int(p.rsplit("-", 1)[1].split(".")[0]),
    ):
        stem = os.path.basename(path)
        idx = int(stem.rsplit("-", 1)[1].split(".")[0])
        out.append((NAMES[idx] if idx < len(NAMES) else stem, Image.open(path).convert("RGB")))
    return out


def label(draw, xy, text):
    draw.text(xy, text, fill=(255, 255, 255))


def main() -> None:
    bar = 26

    tiles = slides("desktop")
    width = 900
    tiles = [(n, im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)) for n, im in tiles]
    sheet = Image.new("RGB", (width, sum(im.height + bar for _, im in tiles)), (18, 18, 18))
    draw = ImageDraw.Draw(sheet)
    y = 0
    for i, (name, im) in enumerate(tiles):
        label(draw, (10, y + 7), f"SLIDE {i + 1}  {name}  desktop 1440x900")
        sheet.paste(im, (0, y + bar))
        y += bar + im.height
    sheet.save(f"{SHOTS}/sheet-desktop.jpg", quality=85)
    print("sheet-desktop", sheet.size)

    rows = []
    for device, w in (("phone", 258), ("tablet", 258)):
        row = []
        for name, im in slides(device):
            row.append((name, im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)))
        rows.append((device, row))

    width = sum(im.width for _, im in rows[0][1])
    height = sum(max(im.height for _, im in row) + bar + 4 for _, row in rows)
    small = Image.new("RGB", (width, height), (18, 18, 18))
    draw = ImageDraw.Draw(small)
    y = 0
    for device, row in rows:
        label(draw, (8, y + 7), f"{device.upper()} frames (tall crop), slides 1-{len(row)}")
        x = 0
        for name, im in row:
            draw.text((x + 6, y + bar), name[:12], fill=(210, 210, 210))
            small.paste(im, (x, y + bar + 14))
            x += im.width
        y += max(im.height for _, im in row) + bar + 4
    small.save(f"{SHOTS}/sheet-small.jpg", quality=85)
    print("sheet-small", small.size)


if __name__ == "__main__":
    main()
