# ROUND 9 — title plates and a real call to action

Directive (verbatim): "also parallely build a better title section for all the pages, they dont
look good with those faded image on the right side, think something better think something
differnet, maybe use iamges or art as faded bg behind the title and the description or something
better" / "and need a better CTA too".

## What was done

- The washed-out right-column photo is gone. The `Section` primitive now renders its plate
  **full-bleed as a pale struck print**: desaturated into the paper (grayscale + a breath of
  sepia, multiplied), scaled past the plate's painted frame edge, with a paper gradient that
  keeps the text column clean and releases the artwork toward the right. The print is
  decorative (`alt=""`) and never one of the client's own site photographs.
- Every page title now carries its own plate: Work — the rammed-earth crew; Services — the
  masons' tile; Machinery — the haul-road machines; About — the mud house; Contact — the
  loaders. No image repeats within a page.
- Weak interior textures were resolved rather than repeated: Services' pre-footer and About's
  "Where" plates were retired; Home's two bands and the new closing bands carry prints.
- **CTA system:** the Button primitive was rebuilt (md/lg sizes, larger presence, a hairline
  divider between label and the sliding arrow; the hero CTA is now lg). A new `TalkBand`
  component closes every page — display line (or pull-quote), optional support line, one
  clear lg action — over a struck print and a terracotta wash. Work and About, which had no
  closing call at all, now end on one; Services, Machinery and Home were rebuilt onto it.

## The artifact found on the way

The plates carry painted frame borders baked into the artwork. A full-bleed print exposed
them at the viewport edge as a hard-edged "seam" (invisible under the left gradient, obvious
on the right). Fixed by scaling the image ~1.28 inside an overflow-clipped wrapper so only
artwork shows. Re-verified on Services and Machinery: no seam remains.

## Verify

Audit 18/18 (viewport gate included), shots clean, no blank frames; dead-space bands all
<= 119px, within the standing seam bar (<= 128). Art-director reviews of all five title
bands, the Home closing band, and the Work and Services closing bands: deliberate, legible,
no defects. Evidence in `.r9-ledger.md`.
