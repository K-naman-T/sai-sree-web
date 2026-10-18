#!/usr/bin/env python3
"""Cut the client's photographs into hero plates.

The hero is a full-viewport band. Its real shape differs by device: 1440x900 on
a laptop is 1.60:1, a phone at 390x844 is 0.46:1. One landscape photograph
cannot serve both, so every source is cut twice from the same subject: a 16:9
frame for wide screens and a 9:16 frame for phones. Nothing is generated, drawn
or retouched; both frames are crops of the client's own photograph, and the
crop box is recorded in assets/plates/credits.json.

Each crop is the largest window of the target ratio that fits inside the source
(cover semantics), placed by a focal point in source fractions, then clamped to
the frame. Output is never upscaled past the source's own pixels.

Run:  python3 scripts/make-hero-plates.py
In:   assets/photos/originals/  (client photographs, as supplied)
Out:  assets/plates/HERO-*.webp, assets/plates/credits.json
"""

from __future__ import annotations

import json
import os
import sys

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "assets", "photos", "originals")
OUT_DIR = os.path.join(ROOT, "assets", "plates")

DESKTOP_RATIO = 16 / 9
PHONE_RATIO = 9 / 16
# 2560 wide: a 16:9 plate is stretched across a 2560-wide laptop panel (and a
# 1280-wide window at DPR 2) before it starts to soften. Sources smaller than
# this are still never upscaled, so a low-resolution photograph stays at its own
# size and simply is not asked for by the manifest.
DESKTOP_MAX_W = 2560
PHONE_MAX_W = 1080
# A phone frame narrower than this is upscaled on a phone screen, so the frame
# gives up its tighter crop before it gives up pixels.
PHONE_MIN_W = 480

SOURCES = "Client photographs supplied 2026-10-15 (WhatsApp originals)"
SOURCES_R16 = "Client photographs supplied 2026-10-17 (WhatsApp originals)"
LICENSE = "Client-supplied; permission of Sai Sree Enterprise"
CREATOR = "Sai Sree Enterprise"

# name, original file, focal point per frame (0..1 of the source), caption.
# Focal points come from the measured luminance profile of each photograph (the
# band where the work actually is), not from eyeballing: the subject is placed at
# roughly 0.38 of the frame height, which is the part of the hero the scrim and
# the headline do not cover. `zoom` is the share of the source height kept; the
# tall phone frame is composed separately, because a photograph whose subject
# sits low (a frame at yard level, a wall at the bottom of a cut) would otherwise
# put the subject under the scrim on a phone.
MANIFEST = [
    dict(
        name="HERO-GATE",
        orig="IMG-20261017-WA0041.jpg",
        source=SOURCES_R16,
        # The frame is lifted above the courtyard's foreground furniture, which
        # otherwise sits as a clipped dark mass in the bottom-right corner, and
        # the phone frame is biased left so that same furniture leaves frame.
        desk=dict(fx=0.50, fy=0.32),
        phone=dict(fx=0.38, fy=0.50, zoom=1.0),
        caption="Brick screen wall and gateway standing over the paved garden walk",
    ),
    dict(
        name="HERO-FIELD",
        orig="IMG-20261010-WA0065.jpg",
        desk=dict(fx=0.50, fy=0.50),
        phone=dict(fx=0.50, fy=0.49, zoom=0.71),
        caption="Levelled ground under turf, sprinkler line laid",
    ),
    dict(
        name="HERO-STEEL",
        orig="IMG-20261010-WA0037.jpg",
        desk=dict(fx=0.50, fy=0.62, zoom=0.6),
        phone=dict(fx=0.45, fy=0.62, zoom=0.6),
        caption="Steel frame going up over the base",
    ),
    dict(
        name="HERO-PAVILION",
        orig="IMG-20261017-WA0042.jpg",
        source=SOURCES_R16,
        desk=dict(fx=0.50, fy=0.54),
        phone=dict(fx=0.50, fy=0.54, zoom=1.0),
        caption="Pavilion roof and columns set into the planted lawn",
    ),
    dict(
        name="HERO-STONEWALL",
        orig="IMG-20261009-WA0034.jpg",
        desk=dict(fx=0.50, fy=0.52, zoom=0.6),
        phone=dict(fx=0.60, fy=0.52, zoom=0.6),
        caption="Stone retaining wall at the cut",
    ),
]


def cover_box(src_w: int, src_h: int, ratio: float, fx: float, fy: float, zoom: float = 1.0):
    """Largest `ratio` window inside the source, placed on the focal point.

    `zoom` is the share of the source height the window may use: 1.0 takes the
    whole frame, lower values tighten the crop (and the subject lands larger).
    """
    win_h = min(src_h * zoom, src_w / ratio)
    win_w = win_h * ratio
    left = round(fx * src_w - win_w / 2)
    top = round(fy * src_h - win_h / 2)
    left = max(0, min(left, src_w - round(win_w)))
    top = max(0, min(top, src_h - round(win_h)))
    return left, top, round(win_w), round(win_h)


def cut(src: Image.Image, ratio: float, max_w: int, focal) -> tuple[Image.Image, tuple]:
    box = cover_box(
        src.width, src.height, ratio, focal["fx"], focal["fy"], focal.get("zoom", 1.0)
    )
    out = src.crop((box[0], box[1], box[0] + box[2], box[1] + box[3]))
    if out.width > max_w:
        out = out.resize((max_w, round(max_w / ratio)), Image.LANCZOS)
    return out, box


def frame(src: Image.Image, ratio: float, max_w: int, focal, min_w: int = 0):
    """Cut one frame, raising the zoom back to 1.0 if the crop would be too small."""
    zoom = focal.get("zoom", 1.0)
    if min_w:
        need = min_w / (ratio * src.height)
        zoom = max(zoom, min(1.0, need))
    return cut(src, ratio, max_w, {**focal, "zoom": zoom})


def main() -> int:
    os.makedirs(OUT_DIR, exist_ok=True)
    if not os.path.isdir(SRC_DIR):
        print(f"missing source dir: {SRC_DIR}", file=sys.stderr)
        return 1

    credits = []
    print(f"{'plate':22s} {'source':30s} {'desktop':>11s} {'phone':>10s} {'KB':>6s}")
    for item in MANIFEST:
        path = os.path.join(SRC_DIR, item["orig"])
        if not os.path.exists(path):
            print(f"missing source: {path}", file=sys.stderr)
            return 1
        src = ImageOps.exif_transpose(Image.open(path)).convert("RGB")

        desk, desk_box = frame(src, DESKTOP_RATIO, DESKTOP_MAX_W, item["desk"])
        phone, phone_box = frame(
            src, PHONE_RATIO, PHONE_MAX_W, item["phone"], min_w=PHONE_MIN_W
        )

        desk_name = f"{item['name']}.webp"
        phone_name = f"{item['name']}-PHONE.webp"
        desk.save(os.path.join(OUT_DIR, desk_name), "WEBP", quality=82, method=6)
        phone.save(os.path.join(OUT_DIR, phone_name), "WEBP", quality=80, method=6)

        desk_kb = os.path.getsize(os.path.join(OUT_DIR, desk_name)) // 1024
        phone_kb = os.path.getsize(os.path.join(OUT_DIR, phone_name)) // 1024
        print(
            f"{item['name']:22s} {item['orig']:30s} "
            f"{desk.width}x{desk.height:<6d} {phone.width}x{phone.height:<5d} "
            f"{desk_kb:>3d}/{phone_kb:<3d}"
        )
        credits.append(
            {
                "file": desk_name,
                "phoneFile": phone_name,
                "orig": item["orig"],
                "sourceSize": f"{src.width}x{src.height}",
                "caption": item["caption"],
                "desktop": {
                    "crop": list(desk_box),
                    "out": f"{desk.width}x{desk.height}",
                    "focal": [item["desk"]["fx"], item["desk"]["fy"]],
                },
                "phone": {
                    "crop": list(phone_box),
                    "out": f"{phone.width}x{phone.height}",
                    "focal": [item["phone"]["fx"], item["phone"]["fy"]],
                },
                "license": LICENSE,
                "creator": CREATOR,
                "source": item.get("source", SOURCES),
                "note": "Both frames are crops of the client's photograph: no retouch, no generation.",
            }
        )

    out = os.path.join(OUT_DIR, "credits.json")
    with open(out, "w") as fh:
        json.dump(credits, fh, indent=2)
        fh.write("\n")
    print(f"\nwrote {len(credits)} plates + {os.path.relpath(out, ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
