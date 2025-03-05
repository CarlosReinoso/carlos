const metadataMap = {
  "/": {
    title:
      "Carlos Reinoso | Web Development, Property Investment, Music & Travel",
    description:
      "Explore expert web development, profitable property investments, inspiring music, and immersive travel experiences. Your gateway to innovation and success.",
    keywords:
      "Web Development, Property Investment, Music, Travel, Digital Nomad, Online Business, Passive Income",
    robots: "index, follow",
    icons: {
      icon: "/favicons/landing.ico",
    },
    openGraph: {
      title: "Carlos Reinoso | Web, Property, Music & Travel",
      description:
        "Discover the world of web development, real estate investment, music, and travel. Learn, grow, and explore with Carlos Reinoso.",
      url: "https://carlosreinoso.co.uk",
      site_name: "Carlos Reinoso",
      images: [
        {
          url: "/favicons/landing.ico",
          width: 1200,
          height: 630,
          alt: "Carlos Reinoso | Web Development, Property, Music, and Travel",
        },
      ],
      type: "website",
    },
  },
  "/web-dev": {
    title: "Web Development | Carlos Reinoso",
    description:
      "Learn modern web development with Next.js, React, and frontend technologies.",
    icons: { icon: "/favicons/web-dev.ico" },
  },
  "/property": {
    title: "Property Investment | Carlos Reinoso",
    description: "Find profitable real estate deals and investment strategies.",
    icons: { icon: "/favicons/property.ico" },
  },
  "/music": {
    title: "Music | Carlos Reinoso",
    description:
      "Explore my musical journey, compositions, and creative works.",
    icons: { icon: "/favicons/music.ico" },
  },
  "/travel": {
    title: "Travel | Carlos Reinoso",
    description:
      "Discover my adventures, travel hacks, and digital nomad lifestyle.",
    icons: { icon: "/favicons/travel.ico" },
  },
};

export default metadataMap;
