// Home page copy. Facts come from lib/site.ts and the business's own site.

export const hero = {
    h1: "House cleaning in Milwaukee",
  sub: "Down to the last detail. An owner-operated crew that treats your home like our own, with natural-ingredient products, insured work and updates until the job is done.",
};

export const rooms = [
  {
    id: "kitchen",
    label: "Kitchen",
    intro: "The room that works hardest gets the most attention. Ask for a fridge and stove deep clean and we bring back the finish, whatever the make.",
    items: ["Counters, backsplash and sink scrubbed", "Cabinet fronts and handles wiped", "Microwave cleaned inside and out", "Appliance exteriors polished", "Floors vacuumed and mopped"],
    image: { src: "/images/kitchen.webp", w: 1600, h: 959, alt: "Bright white kitchen with a marble island" },
  },
  {
    id: "bathroom",
    label: "Bathroom",
    intro: "Natural-ingredient products, so the room you shower in doesn't smell like a chemistry lab afterwards.",
    items: ["Shower, tub and tiles scrubbed", "Toilet cleaned inside and out", "Mirrors and chrome shined", "Sink and vanity wiped down", "Floors washed edge to edge"],
    image: { src: "/images/bath.webp", w: 1400, h: 2114, alt: "All-white bathroom with a clean tub and chrome fixtures" },
  },
  {
    id: "living",
    label: "Living areas",
    intro: "Carpets, rugs and upholstery can be added to any visit, including pet stain and odor removal.",
    items: ["Surfaces and shelves dusted", "Baseboards and trim wiped", "Upholstery vacuumed", "Rugs and carpets vacuumed", "Floors vacuumed and mopped"],
    image: { src: "/images/rug.webp", w: 1600, h: 900, alt: "Calm living room with a soft rug and sofa" },
  },
];

export const steps = [
  {
    title: "Ask for a quote",
    body: "Send your address and how many bedrooms and bathrooms you have, or just call. We quote your first appointment.",
  },
  {
    title: "Pick a weekday",
    body: "We work Monday to Friday. Tell us about pets, alarm codes and anything that needs special care.",
  },
  {
    title: "Get the clean, and the updates",
    body: "Our process is about transparency. You hear from us until the job is done, and if something was missed, we put it right.",
  },
];
