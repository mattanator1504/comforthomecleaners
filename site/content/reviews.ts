// Facebook recommendations, word for word (spelling and punctuation as written).
// Source: https://www.facebook.com/chcservu/reviews (page shows 100% recommend, 10 reviews).

export type Review = { id: string; name: string; quote: string; topic: string; service?: string };

export const reviewStats = { recommend: "100%", count: 10, followers: "1.6K" };

export const reviews: Review[] = [
  {
    id: "mardrease",
    name: "Mardrease Robinson",
    quote:
      "I absolutely LOVEEE the work of this business! She was extremely professional, quick, and did a great job in my home! My bathrooms and furniture is spotless! Thank you so much!",
    topic: "Home cleaning",
    service: "residential-cleaning",
  },
  {
    id: "may",
    name: "May Flowers",
    quote:
      "10/10 service! Very Professional and Nice, Came at expected Time and cleaned My Bathrooms like Mr. Clean. Definitely a satisfied customer.",
    topic: "Bathrooms",
    service: "deep-cleaning",
  },
  {
    id: "reina",
    name: "Reina Siddity",
    quote:
      "Overall Extremely satisfied with the services I received. My carpet looks like new. All stains were lifted & removed. I definitely recommend & will return for more cleanings in the future",
    topic: "Carpet cleaning",
    service: "carpet-cleaning",
  },
  {
    id: "still-el",
    name: "Still El Mechanic",
    quote:
      "Accommodated my schedule and provided and amazing service! Removed several animal related stains and wine while giving a great price highly recommended!",
    topic: "Stain removal",
  },
  {
    id: "cynthia",
    name: "Cynthia's Breast Cancer Giving Circle, Inc.",
    quote:
      "We are very pleased with the painting service provided toward our bathroom renovation along with the professionalism received. Definitely will use your services in the future, as well. Continued blessings to your business.",
    topic: "Painting",
    service: "painting-and-repair",
  },
  {
    id: "tina",
    name: "Tina Williams",
    quote: "I love everything she did with my couches, thank you will book again!!",
    topic: "Upholstery",
  },
  {
    id: "leadra",
    name: "Leadra Hampton",
    quote: "They do nice cleaning and good customer service",
    topic: "Cleaning",
  },
];

export const reviewFor = (serviceId: string) => reviews.find((r) => r.service === serviceId);
