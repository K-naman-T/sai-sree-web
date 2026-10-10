/* Assert the wall planner reproduces the page's compositions and behaves for
 * arbitrary future inputs (any count, any orientation mix). Run with:
 *   npx esbuild src/components/ui/wallPlan.ts --bundle --format=cjs --outfile=/tmp/wallPlan.cjs
 *   node scripts/plan_check.cjs
 */
const assert = require("node:assert");
const { planWalls } = require("/tmp/wallPlan.cjs");

const L = () => ({ width: 1040, height: 780 }); // phone landscape 4:3
const L2 = () => ({ width: 1600, height: 1200 }); // camera landscape 4:3
const P = () => ({ width: 780, height: 1040 }); // phone portrait 3:4
const P2 = () => ({ width: 960, height: 1280 }); // portrait 3:4
const C = () => ({ width: 1280, height: 720 }); // letterbox 16:9
const W = () => ({ width: 1600, height: 739 }); // panorama ~2.17:1

let passed = 0;
function check(label, actual, expected) {
  assert.deepStrictEqual(actual, expected, label);
  passed++;
}

try {
  // The nine groups on the page today, exactly as hand-composed.
  const current = [
    [L(), L(), L(), P(), L(), L()],
    [L2(), L2()],
    [L2(), L2()],
    [C(), { width: 1080, height: 612 }],
    [{ width: 1280, height: 960 }, { width: 1280, height: 960 }],
    [L2(), L2(), { width: 1600, height: 900 }],
    [L2(), W(), W()],
    [{ width: 1600, height: 900 }, L2(), P2()],
    [L2(), L2(), L2()],
  ];
  check(
    "current page reproduces",
    planWalls(current),
    ["mosaic", "duo", "duo-flip", "duo-cinema", "duo-wide", "rail", "split", "hang", "featured"],
  );

  // Synthetic matrix — what a CMS might hand the component.
  const singles = [
    [[L()], ["solo"]],
    [[P()], ["solo-portrait"]],
    [[L(), L()], ["duo"]],
    [[P(), P()], ["duo-portrait"]],
    [[L(), P()], ["duo-mixed"]],
    [[C(), C()], ["duo-cinema"]],
    [[W(), W()], ["duo-cinema"]],
    [[L(), L(), L()], ["rail"]],
    [[P(), P(), P()], ["portrait-rail"]],
    [[P(), L(), L()], ["hang"]],
    [[P(), P(), L()], ["rail-mixed"]],
    [[L(), W(), W()], ["split"]],
    [[L(), L(), L(), L()], ["quad"]],
    [[P(), P(), P(), P()], ["quad"]],
    [[L(), L(), L(), L(), L()], ["stack32"]],
    [[P(), L(), L(), L(), L()], ["mosaic5"]],
    [[L(), L(), L(), L(), L(), L()], ["grid6"]],
    [[P(), L(), L(), L(), L(), L()], ["mosaic"]],
    [[L(), L(), L(), L(), L(), L(), L()], ["grid-many"]],
    [Array.from({ length: 12 }, () => L()), ["grid-many"]],
  ];
  for (const [photos, expected] of singles) {
    check("single group n=" + photos.length, planWalls([photos]), expected);
  }

  // Rotation across siblings, and overrides not consuming rotation slots.
  check(
    "2-photo rotation cycles",
    planWalls([[L(), L()], [L(), L()], [L(), L()], [L(), L()]]),
    ["duo", "duo-flip", "duo-wide", "duo"],
  );
  check(
    "3-photo rotation cycles",
    planWalls([[L(), L(), L()], [L(), L(), L()], [L(), L(), L()]]),
    ["rail", "featured", "rail"],
  );
  check(
    "cinema override does not consume rotation",
    planWalls([[L(), L()], [C(), C()], [L(), L()]]),
    ["duo", "duo-cinema", "duo-flip"],
  );

  console.log(`PLAN_CHECK: ${passed} assertions passed`);
} catch (err) {
  console.error("PLAN_CHECK FAILED:", err.message);
  process.exit(1);
}
