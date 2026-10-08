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

export const companyName = "Sai Sree Enterprise";

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
    blurb: "Contracts built to the drawings, from foundations to masonry.",
    plate: {
      src: "/plates/TILE-CIVIL.webp",
      width: 800,
      height: 800,
      alt: "Two masons building a brick masonry wall, one laying a brick with a trowel while a plumb line hangs.",
    },
  },
  {
    title: "Earthwork and levelling",
    blurb: "Ground cut, filled and set to level before the build starts.",
    plate: {
      src: "/plates/TILE-EARTHWORK.webp",
      width: 800,
      height: 800,
      alt: "Workers levelling and cutting red earth on a pegged-out plot, with string lines and a small excavator at the edge.",
    },
  },
  {
    title: "Machine and material supply",
    blurb: "Machines with an operator, and materials brought to site.",
    plate: {
      src: "/plates/TILE-SUPPLY.webp",
      width: 800,
      height: 800,
      alt: "Materials at a building site: stacked cement bags, a heap of stone aggregate, steel bars, and a truck unloading red soil.",
    },
  },
  {
    title: "Rammed earth and mud construction",
    blurb: "Walls formed in lifts and finished by hand.",
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
    body: "We take on civil construction work as a contract. The scope follows the drawings and the specification. Foundations, columns, slabs and masonry are built on site.",
    provide: PROVIDE,
    plate: {
      src: "/plates/TILE-CIVIL.webp",
      width: 800,
      height: 800,
      alt: "Two masons building a brick masonry wall, one laying a brick with a trowel while a plumb line hangs.",
    },
  },
  {
    id: "earthwork",
    title: "Earthwork and excavation",
    body: "We cut and remove earth where the drawings call for it. Excavation follows the set-out lines and the levels. The spoil is loaded and carted off the site.",
    provide: PROVIDE,
    plate: {
      src: "/plates/HERO-MACHINE-V2.webp",
      width: 1600,
      height: 900,
      alt: "Earthmoving machines cutting into a red earth hillside on a haul road, with trucks waiting nearby.",
    },
  },
  {
    id: "levelling",
    title: "Site levelling and preparation",
    body: "We level and prepare ground before building starts. Pegs and string lines mark the levels. The plot is cut and filled until it is flat and ready.",
    provide: PROVIDE,
    plate: {
      src: "/plates/TILE-EARTHWORK.webp",
      width: 800,
      height: 800,
      alt: "Workers levelling and cutting red earth on a pegged-out plot, with string lines and a small excavator at the edge.",
    },
  },
  {
    id: "machine-contracts",
    title: "Machine contracts by hour, day or trip",
    body: "The hire is booked and charged by the hour, the day or the trip. The rate is agreed before the machine is booked. The booking covers the machine's time on site.",
    provide: PROVIDE,
    plate: {
      src: "/plates/HERO-MACHINE.webp",
      width: 1600,
      height: 900,
      alt: "An earthmover loading red soil into a tipper truck on a haul road, a cut hillside behind.",
    },
  },
  {
    id: "machinery-operator",
    title: "Machinery with operator",
    body: "Machines are hired out with an operator. The operator runs the machine on the work in hand. The machine is chosen for the ground and the access on your site. Machine hours are written in the logbook.",
    provide: PROVIDE,
    plate: {
      src: "/plates/HERO-MACHINE-V2.webp",
      width: 1600,
      height: 900,
      alt: "Earthmoving machines cutting into a red earth hillside on a haul road, with trucks waiting nearby.",
    },
  },
  {
    id: "material-supply",
    title: "Material supply (cement, steel, aggregates, fill earth)",
    body: "Materials are supplied to site as the work needs them. They are brought in and unloaded on site. Supply can run with the construction or on its own.",
    provide: PROVIDE,
    plate: {
      src: "/plates/TILE-SUPPLY.webp",
      width: 800,
      height: 800,
      alt: "Materials at a building site: stacked cement bags, a heap of stone aggregate, steel bars, and a truck unloading red soil.",
    },
  },
  {
    id: "labour",
    title: "Labour supply and labour contracts",
    body: "Labour is supplied to site on contract. Teams are placed with the job for the work it needs. The team works on site for the span of the job.",
    provide: PROVIDE,
    plate: {
      src: "/plates/TILE-LABOUR.webp",
      width: 800,
      height: 800,
      alt: "A crew of workers arriving at a site with shovels and tools, a foreman pointing toward the work.",
    },
  },
  {
    id: "road",
    title: "Road, drain and barrier work",
    body: "We build roads, drains and barriers as part of a site. Formation, drainage lines and barrier runs are set out and built to the drawings.",
    provide: PROVIDE,
    plate: {
      src: "/plates/TILE-ROAD.webp",
      width: 800,
      height: 800,
      alt: "Workers building a concrete drainage channel and kerb line along a road shoulder, with barrier posts planted.",
    },
  },
  {
    id: "rammed-earth",
    title: "Rammed earth and mud construction",
    body: "Rammed earth walls are formed inside formwork. The earth mix is placed and compacted in lifts until the wall stands, then the formwork is struck. Mud construction follows the same method, and the wall is finished by hand.",
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

export const finishedSites: SitePhoto[] = [
  {
    src: "/photos/standin-01.jpg",
    width: 1600,
    height: 1067,
    alt: "Road paving work",
    caption: "Road paving work",
  },
  {
    src: "/photos/standin-02.jpg",
    width: 1600,
    height: 1067,
    alt: "Earthwork and excavation",
    caption: "Earthwork and excavation",
  },
  {
    src: "/photos/standin-03.jpg",
    width: 1600,
    height: 1067,
    alt: "Kerb and edge work",
    caption: "Kerb and edge work",
  },
];

export const runningSites: SitePhoto[] = [
  {
    src: "/photos/standin-04.jpg",
    width: 1600,
    height: 1067,
    alt: "Foundation excavation",
    caption: "Foundation excavation",
  },
  {
    src: "/photos/standin-05.jpg",
    width: 1600,
    height: 1067,
    alt: "Earthmoving and haul",
    caption: "Earthmoving and haul",
  },
  {
    src: "/photos/standin-06.jpg",
    width: 1600,
    height: 1067,
    alt: "Site levelling work",
    caption: "Site levelling work",
  },
];

export const allStandins: SitePhoto[] = [...finishedSites, ...runningSites];

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
