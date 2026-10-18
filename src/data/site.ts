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

/**
 * The office's signature: who signs for the company. Printed in the hero, in the
 * corner opposite the brand lockup, so the page carries a name and a role rather
 * than an anonymous "we". Confirmed by the office on 2026-10-16.
 */
export const signatory = {
  name: "Prajwal Srinivas",
  role: "Managing Director",
};

/**
 * A hero plate carries two frames of the same photograph: the wide frame for
 * laptops and desktops, and a tall frame for phones, where a 16:9 image would
 * be sliced down to a thin middle band. Both are crops of the client's own
 * photograph; the crop boxes are recorded in `assets/plates/credits.json`.
 */
export interface HeroSlide extends Plate {
  phone: { src: string; width: number; height: number };
}

/**
 * The hero carousel, as re-cut on 2026-10-17.
 *
 * Order: the finished garden and paving work first, then the site work. The two
 * plates retired on the office's call that day were HERO-DEMOLITION (the JCB
 * knocking a wall down) and HERO-POUR (a concrete pour cut from a 1040px
 * original, the softest frame in the set on a large screen). HERO-GATE and
 * HERO-PAVILION come from the 2026-10-17 photographs, both 12.5MP originals, so
 * every slide now has at least 1600px of real width behind it and the two new
 * ones carry 2560. Frame sizes below are the files' own, not estimates.
 */
export const heroSlides: HeroSlide[] = [
  {
    src: "/plates/HERO-GATE.webp",
    width: 2560,
    height: 1440,
    phone: { src: "/plates/HERO-GATE-PHONE.webp", width: 1080, height: 1920 },
    alt: "A brick screen wall with an open gateway, terracotta pots set on a lawn and a stepped stone path leading to the opening, coconut palms behind.",
  },
  {
    src: "/plates/HERO-FIELD.webp",
    width: 1600,
    height: 900,
    phone: { src: "/plates/HERO-FIELD-PHONE.webp", width: 480, height: 853 },
    alt: "A wide levelled field under fresh turf with a sprinkler line laid across it, coconut palms and a boundary wall beyond, storm clouds overhead.",
  },
  {
    src: "/plates/HERO-STEEL.webp",
    width: 2560,
    height: 1440,
    phone: { src: "/plates/HERO-STEEL-PHONE.webp", width: 1033, height: 1836 },
    alt: "A partly erected steel frame: rows of grey columns with crane brackets on a concrete base, a roof beam lifted into place by a crane, workers on the ground.",
  },
  {
    src: "/plates/HERO-PAVILION.webp",
    width: 2560,
    height: 1440,
    phone: { src: "/plates/HERO-PAVILION-PHONE.webp", width: 1080, height: 1920 },
    alt: "A flat-roofed pavilion on slim black columns standing on a mown lawn, dark wood furniture under the roof, coconut palms and broadleaf planting around it.",
  },
  {
    src: "/plates/HERO-STONEWALL.webp",
    width: 2560,
    height: 1440,
    phone: { src: "/plates/HERO-STONEWALL-PHONE.webp", width: 1033, height: 1836 },
    alt: "A stone retaining wall built in courses above an excavated earth cut, with a concrete block and rubble in the foreground.",
  },
];

/** The design services, shown as the "What we do" carousel on the home page. */
export interface WhatWeDoItem {
  id: string;
  title: string;
  /** One line beside the name. Provisional wording until the office confirms its copy. */
  line: string;
  /** A photograph of this work from the company's own sites. */
  photo: SitePhoto;
}

export const whatWeDo: WhatWeDoItem[] = [
  {
    id: "architecture-designs",
    title: "Architecture Designs",
    line: "Design work: the building studied, drawn and detailed before the ground is cut.",
    photo: {
      src: "/photos/site-24.webp",
      width: 2000,
      height: 1500,
      alt: "A finished tropical residence with flat roofs, glass walls and a large pool behind a textured stone wall, palms around.",
      caption: "Finished residence and pool",
    },
  },
  {
    id: "joint-ventures-land-development",
    title: "Joint Ventures & Land Development",
    // Provisional wording. The offering was renamed from "Landscape" on
    // 2026-10-16; the office has not yet given the line for the new scope, so
    // this stands only until its own wording arrives. The photograph below is
    // unchanged and is still the evidence for the ground work.
    line: "Land taken up with a partner and developed to the finished plot, the ground work carried as part of the job.",
    photo: {
      src: "/photos/site-21.webp",
      width: 1600,
      height: 900,
      alt: "A landscaped green slope with a drainage line across it and a worker dressing the surface, boundary wall and trees above.",
      caption: "Slope finishing and drainage",
    },
  },
];

/** "What we take on" cards on the home page. `to` is where the card leads. */
export const categories: { title: string; blurb: string; plate?: Plate; to: string }[] = [
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
    to: "/services#civil",
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
    to: "/services#earthwork",
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
    to: "/services#machine-contracts",
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
    to: "/services#rammed-earth",
  },
  // The two design services, moved here from the retired "What we do" band.
  // No square plate exists for either yet, so the card stands with an empty
  // plate field until the artwork is supplied.
  {
    title: "Architecture Designs",
    blurb: "Design work: the building studied, drawn and detailed before the ground is cut.",
    to: "/services/architecture-designs",
  },
  {
    title: "Joint Ventures & Land Development",
    blurb:
      "Land taken up with a partner and developed to the finished plot, the ground work carried as part of the job.",
    to: "/services/joint-ventures",
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

/**
 * The joint-venture offering. Everything below comes from the Joint Venture
 * Agreement the office supplied on 2026-10-16: the concept, the three
 * landowner obligations, the nine developer undertakings, the sharing rule and
 * its worked example. No obligation, figure or condition is added, and none is
 * dropped. Only the wording is put into the site's plain register.
 *
 * The document writes its example figures with a peso mark (P65M / P120M /
 * P185M). The figures are kept exactly and the currency is left blank until the
 * office confirms it: set `currency` and the example prints with it.
 */
export const jointVenture = {
  title: "Joint Ventures & Land Development",
  lede:
    "The landowner brings the land. We bring the financing, the approvals and the work, and the finished homesite is shared by a formula fixed in the agreement.",
  concept: [
    "A partnership between a landowner and a developer: the landowner contributes raw land, and the developer undertakes and finances every cost of converting it into a finished homesite.",
    "A landowner takes this up when he does not have the funds, or cannot secure the financing, for the development of the project. For the developer it is a way to take on the work without the cost of acquiring the site.",
  ],
  landownerHeading: "What the landowner brings",
  landowner: [
    "The title, the tax declaration and the other documents, so that the plans can be prepared, the government approvals processed and the development implemented.",
    "No sale, encumbrance or other disposal of the land without the knowledge and consent of the developer.",
    "Assignment to the developer of the lots or units due to the developer, where the sharing is by allocation of lots or units.",
  ],
  developerHeading: "What we carry, at our cost",
  developer: [
    "Feasibility study",
    "Relocation, topographic and subdivision surveys",
    "Preparation of plans",
    "Procurement of government approvals",
    "Completion of development, utilities and amenities",
    "Maintenance and upkeep of the project facilities prior to turnover",
    "Progress reports to the landowner",
    "Marketing and collection",
    "Remittance of the landowner's share, where the sharing is from sales proceeds",
  ],
  sharing: {
    heading: "How the share is worked out",
    rule:
      "The percentage shared between the landowner and the developer depends on the value of the raw land and the cost of making it a complete project.",
    currency: "",
    example: [
      { label: "Raw land", value: "65", share: "35%" },
      { label: "Development expense", value: "120", share: "65%" },
    ],
    totalLabel: "Total",
    totalValue: "185",
    totalShare: "100%",
    implementation:
      "The share is implemented either pro-rata from the sales proceeds, or by allocation of the developed lots or units.",
  },
};

/**
 * Architecture Designs. The copy is the office's own text — it came from a page
 * belonging to another firm and is rewritten here into this site's register,
 * with the name changed. Three claims in it are the office's to confirm, because
 * the site cannot vouch for them: the architects, designers and planners on
 * staff; the range of project types named; and construction oversight as part of
 * the service. They are printed as the office stated them, not as fact checked
 * by us.
 */
export const architectureDesigns = {
  title: "Architecture Designs",
  lede: "The building studied, drawn and detailed before the ground is cut.",
  design: {
    meaningHeading: "What design means here",
    meaning: [
      "Architecture is more than structure. It is the environment a life is lived in: the approach to the building, the light, the air, and the way each room sits on its site.",
      "The design work is fitted to the client's own needs and ambitions, whether the job is a new house, a building brought back into use, or a layout planned as a whole community.",
    ],
    quote: "Design is not decoration added at the end. It is where the building is decided.",
    methodHeading: "How a design job starts",
    method: [
      "Every job begins with the client's own vision, requirements and constraints, understood before a line is drawn.",
      "The architects, designers and planners work beside the client, turning those ideas into solutions that are practical and buildable.",
      "From concept development through to construction oversight, every phase of the design is carried to the same standard.",
    ],
    rangeHeading: "From concept to site",
    range:
      "The work runs from the first concept to the oversight of construction, and every phase between the two is held to the same standard.",
  },
};

/* ------------------------------------------------------------------ *
 * Contact details. A value still to be confirmed by the office keeps a
 * masked placeholder and `pending: true`: the Contact page prints it as
 * plain text, never as a dead link. Set the real value and `href`, flip
 * `pending` to false, and the links come alive.
 *
 * The number and the team below arrived from the office on 2026-10-16 in a
 * WhatsApp list (screenshot kept outside the repo). Roles are theirs, spelled
 * to standard English; where the office did not give a number, none is printed.
 * ------------------------------------------------------------------ */
export interface ContactChannel {
  label: string;
  value: string;
  /** Shown under the value; says plainly where a pending value stands. */
  detail: string;
  href?: string;
  pending: boolean;
}

/** The office line. Printed and linked wherever the site needs one number. */
export const officeLine = {
  display: "+91 82963 19545",
  tel: "+918296319545",
  whatsapp: "https://wa.me/918296319545",
};

export const contactChannels: ContactChannel[] = [
  {
    label: "Call",
    value: officeLine.display,
    detail: "The office line, Monday to Saturday.",
    href: `tel:${officeLine.tel}`,
    pending: false,
  },
  {
    label: "WhatsApp",
    value: "Message the office line",
    detail: "The same number takes messages, site photographs and drawings.",
    href: officeLine.whatsapp,
    pending: false,
  },
];

/** One person in the office: name, the role the office gave, and a number where one was given. */
export interface ContactPerson {
  name: string;
  role: string;
  phone?: typeof officeLine;
}

/** The office, by name, as supplied by the office on 2026-10-16. */
export const team: ContactPerson[] = [
  {
    name: "Prajwal Srinivas",
    role: "Managing Director",
    phone: officeLine,
  },
  {
    name: "Likith Srinivas",
    role: "Head of Interiors",
    phone: {
      display: "+91 97426 78584",
      tel: "+919742678584",
      whatsapp: "https://wa.me/919742678584",
    },
  },
  {
    name: "Darshan RC",
    role: "Operation Manager",
    phone: {
      display: "+91 91089 01239",
      tel: "+919108901239",
      whatsapp: "https://wa.me/919108901239",
    },
  },
  {
    name: "Hariprasad",
    role: "In-house Counselor and Project Manager",
  },
  {
    name: "Nagraj",
    role: "Finance Manager",
  },
  {
    name: "Naresh S",
    role: "Civil Contractor, Government Works",
    phone: {
      display: "+91 85531 12116",
      tel: "+918553112116",
      whatsapp: "https://wa.me/918553112116",
    },
  },
  {
    name: "Suresh",
    role: "Chief Engineer",
  },
  {
    name: "Arun Kumar",
    role: "Plant and Equipment Manager",
  },
];

/** Office facts. The starred values are assumed for the preview and await the office's confirmation. */
export const contactFacts = {
  hours: "Monday to Saturday, 9am to 6pm",
  hoursNote: "Closed on Sunday.",
  whoAnswers:
    "Someone from the office answers, not a machine. If the line is busy, send the details on WhatsApp.",
  /** Assumed: the engagement's market coverage is the company's working corridor. */
  serviceArea:
    "The office works across Bengaluru south, the Harohalli corridor and Ramanagara district.",
  addressNote: "The street address prints once the office confirms it, with the map.",
  whatToHave: [
    "Where the site is, and what the land is like today",
    "What the work is: a building, a cut, a supply, a hire",
    "Any drawings you have, or a sketch",
    "When you want to start",
  ],
};
