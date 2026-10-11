export interface NavItem {
  label: string;
  to: string;
}

export interface Plate {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Service {
  /** Page order 1..9, matches the plate mapping in the brief. */
  id: string;
  title: string;
  body: string;
  provide: string;
  plate: Plate;
  /** A real photograph of this work on the company's own sites, where one exists. */
  evidence?: SitePhoto;
}

export interface SitePhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "Machinery", to: "/machinery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const companyName = "Sri Sai Enterprise";

/** The name the work is built under, and the enterprise behind it. */
export const brandName = "Alankara";
export const brandBy = "Sri Sai Enterprises";

/** Four hero slides, in the order fixed by the brief. */
export const heroSlides: Plate[] = [
  {
    src: "/plates/HERO-CREW.webp",
    width: 1600,
    height: 900,
    alt: "Workers raising a rammed earth wall, tamping wet earth into tall wooden formwork with hand rammers beside bamboo scaffolding.",
  },
  {
    src: "/plates/HERO-MACHINE-V2.webp",
    width: 1600,
    height: 900,
    alt: "Earthmoving machines cutting into a red earth hillside on a haul road, with trucks waiting nearby.",
  },
  {
    src: "/plates/HERO-MUDHOUSE.webp",
    width: 1600,
    height: 900,
    alt: "A mud house with rammed earth walls, a deep veranda and a tiled roof.",
  },
  {
    src: "/plates/HERO-MACHINE.webp",
    width: 1600,
    height: 900,
    alt: "An earthmover loading red soil into a tipper truck on a haul road, a cut hillside behind.",
  },
];

/** "What we take on" cards on the home page. */
export const categories: { title: string; blurb: string; plate: Plate }[] = [
  {
    title: "Civil construction",
    blurb:
      "Contract work finished like craft: foundations, columns, slabs and masonry built to the drawing, and to the eye.",
    plate: {
      src: "/plates/TILE-CIVIL.webp",
      width: 800,
      height: 800,
      alt: "Two masons building a brick masonry wall, one laying a brick with a trowel while a plumb line hangs.",
    },
  },
  {
    title: "Earthwork and levelling",
    blurb:
      "The ground is the first material. Cut, filled and set to level with the precision the build deserves.",
    plate: {
      src: "/plates/TILE-EARTHWORK.webp",
      width: 800,
      height: 800,
      alt: "Workers levelling and cutting red earth on a pegged-out plot, with string lines and a small excavator at the edge.",
    },
  },
  {
    title: "Machine and material supply",
    blurb:
      "Machines with an operator and materials chosen for the work. Power in service of the finish.",
    plate: {
      src: "/plates/TILE-SUPPLY.webp",
      width: 800,
      height: 800,
      alt: "Materials at a building site: stacked cement bags, a heap of stone aggregate, steel bars, and a truck unloading red soil.",
    },
  },
  {
    title: "Rammed earth and mud construction",
    blurb:
      "The art form we keep alive: walls formed in lifts and finished by hand. Beautiful and permanent.",
    plate: {
      src: "/plates/HERO-MUDHOUSE-SQ.webp",
      width: 800,
      height: 800,
      alt: "A mud house with rammed earth walls, a deep veranda and a tiled roof.",
    },
  },
];

const PROVIDE = "What you provide: drawings, approvals, and site access.";

export const services: Service[] = [
  {
    id: "civil",
    title: "Civil construction contracts",
    body: "We take on civil construction work as a contract. The scope follows the drawings and the specification. Foundations, columns, slabs and masonry are built on site with the finish the work deserves.",
    provide: PROVIDE,
    plate: {
      src: "/plates/TILE-CIVIL.webp",
      width: 800,
      height: 800,
      alt: "Two masons building a brick masonry wall, one laying a brick with a trowel while a plumb line hangs.",
    },
    evidence: {
      src: "/photos/site-10.webp",
      width: 1600,
      height: 1200,
      alt: "A multi-storey brick building under construction behind bamboo scaffolding, with a parked backhoe, gravel and a concrete mixer in the foreground.",
      caption: "Brick building under construction",
    },
  },
  {
    id: "earthwork",
    title: "Earthwork and excavation",
    body: "We cut and remove earth where the drawings call for it. Excavation follows the set-out lines and the levels. The spoil is loaded and carted off, and the cut is left true.",
    provide: PROVIDE,
    plate: {
      src: "/plates/HERO-MACHINE-V2.webp",
      width: 1600,
      height: 900,
      alt: "Earthmoving machines cutting into a red earth hillside on a haul road, with trucks waiting nearby.",
    },
    evidence: {
      src: "/photos/site-09.webp",
      width: 1600,
      height: 1200,
      alt: "A backhoe loader trenching at an early earthworks site with a tractor and trailer behind, workers and palms around, an overcast sky.",
      caption: "Machine trenching on the plot",
    },
  },
  {
    id: "levelling",
    title: "Site levelling and preparation",
    body: "We level and prepare ground before building starts. Pegs and string lines mark the levels. The plot is cut and filled until it is flat and set for the build.",
    provide: PROVIDE,
    plate: {
      src: "/plates/TILE-EARTHWORK.webp",
      width: 800,
      height: 800,
      alt: "Workers levelling and cutting red earth on a pegged-out plot, with string lines and a small excavator at the edge.",
    },
    evidence: {
      src: "/photos/site-20.webp",
      width: 1600,
      height: 1200,
      alt: "A wide plot of graded land with a long boundary wall, ground levelled and pegged for the build under an overcast sky.",
      caption: "Land graded and set out",
    },
  },
  {
    id: "machine-contracts",
    title: "Machine contracts by hour, day or trip",
    body: "The hire is booked and charged by the hour, the day or the trip. The rate is agreed before the machine is booked. The right machine is matched to the work in hand.",
    provide: PROVIDE,
    plate: {
      src: "/plates/HERO-MACHINE.webp",
      width: 1600,
      height: 900,
      alt: "An earthmover loading red soil into a tipper truck on a haul road, a cut hillside behind.",
    },
    evidence: {
      src: "/photos/site-14.webp",
      width: 1280,
      height: 720,
      alt: "A backhoe loader working on the rubble of a partly demolished building on an urban site, workers and onlookers around.",
      caption: "Clearing with the backhoe loader",
    },
  },
  {
    id: "machinery-operator",
    title: "Machinery with operator",
    body: "Machines are hired out with an operator. The operator runs the machine on the work in hand, with the care the work needs. Machine hours are written in the logbook.",
    provide: PROVIDE,
    plate: {
      src: "/plates/HERO-MACHINE-V2.webp",
      width: 1600,
      height: 900,
      alt: "Earthmoving machines cutting into a red earth hillside on a haul road, with trucks waiting nearby.",
    },
    evidence: {
      src: "/photos/site-11.webp",
      width: 1600,
      height: 900,
      alt: "Inside an industrial shed: a yellow road roller compacting the gravel sub-base between steel columns under a roof with skylights.",
      caption: "Sub-base compaction inside the shed",
    },
  },
  {
    id: "material-supply",
    title: "Material supply (cement, steel, aggregates, fill earth)",
    body: "Materials are supplied to site as the work needs them, chosen for the job. They are brought in and unloaded on site. Supply can run with the construction or on its own.",
    provide: PROVIDE,
    plate: {
      src: "/plates/TILE-SUPPLY.webp",
      width: 800,
      height: 800,
      alt: "Materials at a building site: stacked cement bags, a heap of stone aggregate, steel bars, and a truck unloading red soil.",
    },
    evidence: {
      src: "/photos/site-07.webp",
      width: 1040,
      height: 780,
      alt: "A mixer truck placing concrete by chute into a deep pit, rebar cage along the wall and formwork at the bottom of the excavation.",
      caption: "Placing concrete at the pit",
    },
  },
  {
    id: "labour",
    title: "Labour supply and labour contracts",
    body: "Labour is supplied to site on contract. Teams are placed with the job for the work it needs. The team works on site for the span of the job, and leaves the work to the standard set.",
    provide: PROVIDE,
    plate: {
      src: "/plates/TILE-LABOUR.webp",
      width: 800,
      height: 800,
      alt: "A crew of workers arriving at a site with shovels and tools, a foreman pointing toward the work.",
    },
    evidence: {
      src: "/photos/site-23.webp",
      width: 960,
      height: 1280,
      alt: "Workers laying turf across a steep earth embankment, the lower slope already greened and a truck loaded with turf at the crest.",
      caption: "Laying turf on the slope",
    },
  },
  {
    id: "road",
    title: "Road, drain and barrier work",
    body: "We build roads, drains and barriers as part of a site. Formation, drainage lines and barrier runs are set out and built to the drawings. The lines are run true and the levels held.",
    provide: PROVIDE,
    plate: {
      src: "/plates/TILE-ROAD.webp",
      width: 800,
      height: 800,
      alt: "Workers building a concrete drainage channel and kerb line along a road shoulder, with barrier posts planted.",
    },
    evidence: {
      src: "/photos/site-21.webp",
      width: 1600,
      height: 900,
      alt: "A landscaped green slope with a drainage line across it and a worker dressing the surface, boundary wall and trees above.",
      caption: "Slope finishing and drainage",
    },
  },
  {
    id: "rammed-earth",
    title: "Rammed earth and mud construction",
    body: "Rammed earth is the art form we keep alive. Walls are formed inside formwork, the earth mix placed and compacted in lifts until the wall stands, then the formwork is struck. Mud construction follows the same method, and the wall is finished by hand.",
    provide: PROVIDE,
    plate: {
      src: "/plates/HERO-MUDHOUSE.webp",
      width: 1600,
      height: 900,
      alt: "A mud house with rammed earth walls, a deep veranda and a tiled roof.",
    },
  },
];

export const steps: string[] = [
  "Receive the site",
  "Survey and set out",
  "Cut and excavate",
  "Fill and level",
  "Compact and hand over",
];

// Site photographs now live in src/data/photos.ts (the client's own photos,
// supplied 2026-10). The former stand-in set has been retired.

/** Machines at work on the company's own sites — the Machinery page wall. */
export const machineryPhotos: SitePhoto[] = [
  {
    src: "/photos/site-11.webp",
    width: 1600,
    height: 900,
    alt: "Inside an industrial shed: a yellow road roller compacting the gravel sub-base between steel columns under a roof with skylights.",
    caption: "Sub-base compaction inside the shed",
  },
  {
    src: "/photos/site-15.webp",
    width: 1080,
    height: 612,
    alt: "Two excavators working the rubble pile at a demolition, dust rising, palm trees and onlookers beyond.",
    caption: "Excavators at the demolition",
  },
  {
    src: "/photos/site-14.webp",
    width: 1280,
    height: 720,
    alt: "A backhoe loader working on the rubble of a partly demolished building on an urban site, workers and onlookers around.",
    caption: "Clearing with the backhoe loader",
  },
];

/** Studio cutouts of the machine classes — the frieze on the Machinery page. */
export interface MachineCutout {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const fleetCutouts: MachineCutout[] = [
  {
    src: "/machines/excavator.webp",
    width: 359,
    height: 314,
    alt: "A tracked excavator, boom raised, its bucket curled at the end of the arm.",
  },
  {
    src: "/machines/backhoe.webp",
    width: 713,
    height: 360,
    alt: "A backhoe loader with its front bucket raised and the rear digging arm extended.",
  },
  {
    src: "/machines/tipper.webp",
    width: 510,
    height: 360,
    alt: "A three-axle tipper truck with a steel dump body.",
  },
  {
    src: "/machines/compactor.webp",
    width: 572,
    height: 360,
    alt: "A single-drum soil compactor with a smooth steel drum at the front.",
  },
];

/** Decorative plates. These carry alt="" and never depict the company's sites. */
export const frieze: Plate = {
  src: "/plates/FRIEZE-5STATIONS.webp",
  width: 2000,
  height: 312,
  alt: "",
};

export const borderMotif: Plate = {
  src: "/plates/BORDER-MOTIF.webp",
  width: 2000,
  height: 84,
  alt: "",
};

export const marqueeItems: string[] = [
  "Civil construction",
  "Earthwork and excavation",
  "Site levelling",
  "Machine contracts",
  "Machinery with operator",
  "Material supply",
  "Labour supply",
  "Road, drain and barrier",
  "Rammed earth",
];
