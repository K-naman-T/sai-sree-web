import type { SitePhoto } from "@/data/site";

/**
 * wallPlan — the composition planner behind PhotoWall.
 *
 * A group of photographs goes in; a wall composition comes out, chosen from
 * the photographs themselves: how many there are, how many are portrait or
 * landscape, and whether any are letterbox (16:9-ish) or true panoramas.
 * Nothing here is per-page hand-tuning — when the CMS starts feeding groups,
 * the same planner runs on whatever the client adds, at any count.
 *
 * Sibling groups of the same shape rotate through their treatments (so two
 * 2-photo landscape groups never look cloned), driven by a variation index
 * that `planWalls` counts per shape as it walks the page.
 */
export type WallVariant =
  | "solo"
  | "solo-portrait"
  | "duo"
  | "duo-flip"
  | "duo-cinema"
  | "duo-wide"
  | "duo-portrait"
  | "duo-mixed"
  | "rail"
  | "rail-mixed"
  | "portrait-rail"
  | "split"
  | "hang"
  | "featured"
  | "quad"
  | "stack32"
  | "mosaic5"
  | "mosaic"
  | "grid6"
  | "grid-many";

const aspect = (photo: SitePhoto) => photo.width / photo.height;
const isPortrait = (photo: SitePhoto) => photo.height > photo.width;

/** Letterbox (phone video / wide crop) — the cinema pair treatment. */
const isCinema = (photo: SitePhoto) => aspect(photo) >= 1.55;
/** True panorama — the split treatment. */
const isWide = (photo: SitePhoto) => aspect(photo) >= 1.9;

function shape(photos: SitePhoto[]) {
  return {
    n: photos.length,
    portraits: photos.filter(isPortrait).length,
    cinema: photos.some(isCinema),
    wide: photos.some(isWide),
  };
}

/** Shapes whose treatments rotate across sibling groups. */
const ROTATIONS: Record<string, WallVariant[]> = {
  "2-landscape": ["duo", "duo-flip", "duo-wide"],
  "3-landscape": ["rail", "featured"],
};

export function rotationKey(photos: SitePhoto[]): string | null {
  const { n, portraits, wide, cinema } = shape(photos);
  if (n === 2 && portraits === 0 && !cinema && !wide) return "2-landscape";
  if (n === 3 && portraits === 0 && !wide) return "3-landscape";
  return null;
}

/** The composition for one group; `variation` picks among rotating treatments. */
export function suggestWall(photos: SitePhoto[], variation = 0): WallVariant {
  const { n, portraits, cinema, wide } = shape(photos);
  if (n === 0) return "grid-many";
  if (n === 1) return portraits === 1 ? "solo-portrait" : "solo";
  if (n === 2) {
    if (portraits === 2) return "duo-portrait";
    if (portraits === 1) return "duo-mixed";
    if (cinema || wide) return "duo-cinema";
    const rotation = ROTATIONS["2-landscape"];
    return rotation[variation % rotation.length];
  }
  if (n === 3) {
    if (portraits === 1) return "hang";
    if (wide) return "split";
    if (portraits === 3) return "portrait-rail";
    if (portraits === 2) return "rail-mixed";
    const rotation = ROTATIONS["3-landscape"];
    return rotation[variation % rotation.length];
  }
  if (n === 4) return "quad";
  if (n === 5) return portraits >= 1 ? "mosaic5" : "stack32";
  if (n === 6) return portraits === 1 ? "mosaic" : "grid6";
  return "grid-many";
}

/** Plan a whole page: one variant per group, with rotating treatments counted. */
export function planWalls(groups: SitePhoto[][]): WallVariant[] {
  const seen = new Map<string, number>();
  return groups.map((photos) => {
    const key = rotationKey(photos);
    const variation = key ? seen.get(key) ?? 0 : 0;
    const variant = suggestWall(photos, variation);
    if (key) seen.set(key, variation + 1);
    return variant;
  });
}
