const title =
  "Wild Songs for the Road | Motorcycle Travel from London to Japan";

const description =
  "Join me as I ride from London to Japan on a motorcycle, writing music along the way. This journey blends adventure, creativity, and self-expression — from city streets to mountain passes, I document it all through soulful storytelling, sound, and visual content. Follow my path as I share updates, reflections, and live the road through Instagram and beyond.";

export const metadataTravel = {
  title,
  description,
  keywords: [
    "Motorcycle Travel London to Japan",
    "Wild Songs for the Road",
    "Adventure Travel with Music",
    "Carlos Reinoso Travel",
    "Motorbike Journey Asia",
    "Travel Vlog Motorcycle",
    "Songwriting on the Road",
    "Inspiration Through Travel",
    "Solo Travel Artist",
    "Creative Journey Across Borders",
    "London to Japan Motorcycle Route",
    "Travel Instagram Storytelling",
  ].join(", "),
  robots: "index, follow",
  icons: {
    icon: "/favicons/travel.ico",
  },
  openGraph: {
    title,
    description,
    site_name: title,
    images: [
      {
        url: "/travel/hero.webp", // use a good banner or change to your cover image
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "website",
  },
};
