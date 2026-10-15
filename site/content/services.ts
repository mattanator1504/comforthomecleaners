// Services exactly as the business names them on its existing site.

export type Service = {
  id: string;
  name: string;
  short: string;
  body: string[];
  includes: string[];
  image: { src: string; w: number; h: number; alt: string };
};

export const services: Service[] = [
  {
    id: "residential-cleaning",
    name: "Residential estate cleaning",
    short: "Recurring and one-time house cleaning with eco-friendly products that are safe around pets and children.",
    body: [
      "Residential cleaning is the core of what Comfort Home Cleaners does in Milwaukee. You get a staff member who is thorough, professional and has a keen eye for detail, and who treats your home the way we treat our own.",
      "We use eco-friendly products made with natural ingredients, so there are fewer chemicals left on your counters and in your air. That matters most in the rooms where kids crawl and pets nap.",
    ],
    includes: ["Kitchens and bathrooms", "Dusting and surfaces", "Floors vacuumed and mopped", "Bedrooms and living areas"],
    image: { src: "/images/living.webp", w: 1600, h: 1067, alt: "Bright living room with two grey sofas and clean floors" },
  },
  {
    id: "deep-cleaning",
    name: "Deep cleaning",
    short: "The places a regular clean skips: behind, under, inside and on top.",
    body: [
      "A deep clean reaches the areas a regular cleaning can miss. It suits a first visit, a seasonal reset, a move, or a home that has simply had a busy few months.",
      "Tell us what bothers you most when you book, and we plan the visit around it.",
    ],
    includes: ["Baseboards, doors and trim", "Inside the microwave", "Light fixtures and vents", "Behind and under furniture"],
    image: { src: "/images/room.webp", w: 1360, h: 996, alt: "Living room with a mirror and tidy furniture after a deep clean" },
  },
  {
    id: "commercial-cleaning",
    name: "Commercial property cleaning",
    short: "Offices, hotels, restaurants, businesses and post-construction cleanup, one-time or on a schedule.",
    body: [
      "Comfort Home Cleaners looks after offices, hotels, restaurants and other businesses, plus post-construction cleanup when the builders leave dust behind.",
      "Book a single clean, or set a daily, weekly or monthly schedule that works around your opening hours.",
    ],
    includes: ["Offices and shared spaces", "Hotels and restaurants", "Post-construction cleanup", "Daily, weekly or monthly"],
    image: { src: "/images/office.webp", w: 1600, h: 1068, alt: "Clean modern office hallway with glass-panel doors" },
  },
  {
    id: "carpet-cleaning",
    name: "Carpet, rug and upholstery cleaning",
    short: "Area rugs, stain removal, upholstery, and pet stain and odor removal.",
    body: [
      "Carpets and soft furniture hold on to everything a household drops, spills and tracks in. We clean carpets, area rugs and upholstery, and treat stains as we go.",
      "Pet stain and odor removal is part of the service, not an awkward extra.",
    ],
    includes: ["Carpets and area rugs", "Stain removal", "Upholstery", "Pet stain and odor removal"],
    image: { src: "/images/rug.webp", w: 1600, h: 900, alt: "Living room with a soft area rug and upholstered sofa" },
  },
  {
    id: "fridge-and-stove",
    name: "Refrigerator and stove deep cleaning",
    short: "Enamel, chrome or stainless steel finishes brought back, for any make or model.",
    body: [
      "The fridge and stove are the two appliances nobody wants to clean and everybody notices. We deep clean both, inside and out, for any make or model.",
      "Whether the finish is enamel, chrome or stainless steel, the aim is the same: it should look the way it did when it was delivered.",
    ],
    includes: ["Inside and outside", "Shelves and drawers", "Burners, grates and knobs", "Enamel, chrome or stainless"],
    image: { src: "/images/fridge.webp", w: 1600, h: 1063, alt: "Stainless steel refrigerator in a bright modern kitchen" },
  },
  {
    id: "painting-and-repair",
    name: "Painting and drywall repair",
    short: "Interior, exterior and cabinet painting, plus hole and crack repair.",
    body: [
      "Sometimes a room needs more than a clean. Comfort Home Cleaners also handles interior, exterior and cabinet painting.",
      "We repair holes and cracks in drywall first, so the fresh paint sits on a smooth wall instead of highlighting the dent.",
    ],
    includes: ["Interior and exterior painting", "Cabinet painting", "Hole repair", "Crack repair"],
    image: { src: "/images/paint.webp", w: 1600, h: 1118, alt: "Paint roller applying blue paint to a white wall" },
  },
];

export const extras = ["Car detailing", "Vinyl and stick floor installation"];
