const title =
  "Carlos Reinoso | Web Development | Helping solo entrepreneurs and small businesses create stunning websites that drive success";

const description =
  "I design and develop digital experiences tailored for solo entrepreneurs and small businesses. With experience working in startups to large FTS100 companies. I now focus on empowering independent business owners—artists, property investors, Airbnb hosts as well as psychosomatic teachers and many more—to establish a strong online presence. Whether it's a sleek portfolio, a booking platform, or an eCommerce site, I create websites that are intuitive, visually compelling, and built for growth.To relax I like to play guitar and sing, stay active at the gym, and love exploring new places. Right now, I’m planning an epic world trip to inspire my creativity for music, poetry and philosophy.";

export const metadataWebDev = {
  title,
  description,
  keywords: [
    "Web Development",
    "Next.js Developer",
    "React Developer",
    "Tailwind CSS",
    "SQL Database",
    "Postgres Supabase",
    "Full Stack Development",
    "Modern UI/UX",
    "Frontend Engineering",
    "Scalable Web Apps",
    "Carlos Reinoso Portfolio",
  ].join(", "), // ✅ SEO-friendly keyword list
  robots: "index, follow", // ✅ Allows search engines to index and follow links
  icons: {
    icon: "/favicons/web-dev.ico",
  },
  openGraph: {
    title,
    description,
    site_name: title,
    images: [
      {
        url: "/favicons/web-dev.ico",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "website",
  },
};
