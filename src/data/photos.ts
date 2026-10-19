import type { SitePhoto } from "@/data/site";

/**
 * The client's own site photographs (supplied 2026-10), grouped by the work
 * they show. Nothing here is stock or stand-in imagery: every frame is from
 * the company's own sites. Captions are kept plain and factual.
 */
export interface PhotoGroup {
  title: string;
  blurb: string;
  photos: SitePhoto[];
}

export const photoGroups: PhotoGroup[] = [
  {
    title: "Excavation and foundations",
    blurb: "Cut, reinforced and poured. The work below the ground on a deep foundation.",
    photos: [
      {
        src: "/photos/site-01.webp",
        width: 2000,
        height: 1500,
        alt: "Terraced stone retaining walls built into a cut red-earth slope, with a small concrete block in the foreground.",
        caption: "Stone retaining wall at the cut",
      },
      {
        src: "/photos/site-08.webp",
        width: 1600,
        height: 1200,
        alt: "A freshly struck concrete retaining wall with formwork seams and tie holes, a drain pipe at the top, compacted red earth below and a worker on the stair.",
        caption: "Concrete retaining wall at the earthworks",
      },
    ],
  },
  {
    title: "Earthwork and site preparation",
    blurb: "Trenching, cutting and grading. The ground set out before the build.",
    photos: [
      {
        src: "/photos/site-09.webp",
        width: 1600,
        height: 1200,
        alt: "A backhoe loader trenching at an early earthworks site with a tractor and trailer behind, workers and palms around, an overcast sky.",
        caption: "Machine trenching on the plot",
      },
      {
        src: "/photos/site-20.webp",
        width: 1600,
        height: 1200,
        alt: "A wide plot of graded land with a long boundary wall, ground levelled and pegged for the build under an overcast sky.",
        caption: "Land graded and set out",
      },
    ],
  },
  {
    title: "Retaining walls",
    blurb: "Slopes held and finished — stone terraces and struck concrete.",
    photos: [
      {
        src: "/photos/site-02.webp",
        width: 1040,
        height: 780,
        alt: "A deep rectangular excavation with a poured base slab and a dense steel rebar cage, workers on the access ramp at the bottom.",
        caption: "Rebar cage in the foundation pit",
      },
      {
        src: "/photos/site-03.webp",
        width: 1040,
        height: 780,
        alt: "An excavated pit with blinding slab and dense rebar grids set out for the foundation walls and slab, a hard hat resting on the steel.",
        caption: "Wall and slab reinforcement",
      },
      {
        src: "/photos/site-04.webp",
        width: 1040,
        height: 780,
        alt: "A high view of the foundation pit: rebar cage around the walls and a separate column cage in the centre, cement bags and materials at the edges.",
        caption: "Column cages on the base slab",
      },
      {
        src: "/photos/site-05.webp",
        width: 780,
        height: 1040,
        alt: "A mixer truck at the ground level above the trench, its chute pouring concrete down into the reinforcement cage, workers watching at the edge.",
        caption: "Pour into the reinforcement cage",
      },
      {
        src: "/photos/site-06.webp",
        width: 1040,
        height: 780,
        alt: "A concrete mixer truck at the top of the embankment, its chute reaching down to pour at the rebar foundation, workers watching the pour.",
        caption: "Concrete pour into the foundation",
      },
      {
        src: "/photos/site-07.webp",
        width: 1040,
        height: 780,
        alt: "A mixer truck placing concrete by chute into a deep pit, rebar cage along the wall and formwork at the bottom of the excavation.",
        caption: "Placing concrete at the pit",
      },
    ],
  },
  {
    title: "Steel frame and decking",
    blurb: "Columns and beams raised and set on the slab.",
    photos: [
      {
        src: "/photos/site-12.webp",
        width: 1280,
        height: 960,
        alt: "A steel frame on a concrete slab: yellow columns and dark beams over a yellow diamond-plate floor, with a scaffolding tower to the side.",
        caption: "Steel frame on the slab",
      },
      {
        src: "/photos/site-13.webp",
        width: 1280,
        height: 960,
        alt: "Steel columns and beams standing on the slab of a new building, the road and traffic beyond and a makeshift scaffold at the edge.",
        caption: "Steel columns and beams",
      },
    ],
  },
  {
    title: "Industrial steel and shed works",
    blurb: "Trusses raised by crane; the sub-base compacted inside the shed.",
    photos: [
      {
        src: "/photos/site-18.webp",
        width: 2000,
        height: 1500,
        alt: "Steel trusses being erected over concrete columns in yellow formwork, workers in vests below and a mobile crane behind.",
        caption: "Steel erection on concrete columns",
      },
      {
        src: "/photos/site-19.webp",
        width: 2000,
        height: 1500,
        alt: "Rows of steel columns with a curved roof truss being raised between two of them, a mobile crane on site and workers in the foreground.",
        caption: "Raising the roof trusses",
      },
      {
        src: "/photos/site-11.webp",
        width: 1600,
        height: 900,
        alt: "Inside an industrial shed: a yellow road roller compacting the gravel sub-base between steel columns under a roof with skylights.",
        caption: "Sub-base compaction inside the shed",
      },
    ],
  },
  {
    title: "Building works",
    blurb: "Brick, block and frame rising together.",
    photos: [
      {
        src: "/photos/site-10.webp",
        width: 1600,
        height: 1200,
        alt: "A multi-storey brick building under construction behind bamboo scaffolding, with a parked backhoe, gravel and a concrete mixer in the foreground.",
        caption: "Brick building under construction",
      },
      {
        src: "/photos/site-16.webp",
        width: 1600,
        height: 739,
        alt: "The steel frame of a two-storey building with blockwork walls at the ground floor, people at the entrance and palms around.",
        caption: "Two-storey frame and blockwork",
      },
      {
        src: "/photos/site-17.webp",
        width: 1600,
        height: 739,
        alt: "The yellow steel framework of a two-storey building above grey block walls, a worker on the frame and plaster work at the base.",
        caption: "Framework and block walls",
      },
    ],
  },
  {
    title: "Landscaping and ground finishing",
    blurb: "Turf and green ground brought to their finished line.",
    photos: [
      {
        src: "/photos/site-21.webp",
        width: 1600,
        height: 900,
        alt: "A landscaped green slope with a drainage line across it and a worker dressing the surface, boundary wall and trees above.",
        caption: "Slope finishing and drainage",
      },
      {
        src: "/photos/site-22.webp",
        width: 1600,
        height: 1200,
        alt: "A green open ground with a goal frame at the wall and trees along the boundary.",
        caption: "Finished open ground",
      },
      {
        src: "/photos/site-23.webp",
        width: 960,
        height: 1280,
        alt: "Workers laying turf across a steep earth embankment, the lower slope already greened and a truck loaded with turf at the crest.",
        caption: "Laying turf on the slope",
      },
      {
        src: "/photos/site-41.webp",
        width: 1200,
        height: 1600,
        alt: "Workers edging fresh turf beside a green field, a rocky hill rising beyond the trees.",
        caption: "Turf edging beside the green field",
      },
      {
        src: "/photos/site-42.webp",
        width: 1600,
        height: 1200,
        alt: "A finished playfield with fencing, a goal frame and marked lines, trees and hills beyond.",
        caption: "Finished playfield",
      },
    ],
  },
];

/** Two photographs chosen as the home-page hooks. */
export const homeHooks: SitePhoto[] = [
  {
    src: "/photos/site-24.webp",
    width: 2000,
    height: 1500,
    alt: "A finished tropical residence with flat roofs, glass walls and a large pool behind a textured stone wall, palms around.",
    caption: "Finished residence and pool",
  },
  {
    src: "/photos/site-06.webp",
    width: 1040,
    height: 780,
    alt: "A concrete mixer truck at the top of the embankment, its chute reaching down to pour at the rebar foundation, workers watching the pour.",
    caption: "Concrete pour into the foundation",
  },
];
