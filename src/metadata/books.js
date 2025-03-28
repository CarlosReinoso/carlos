const title =
  "Book Notes and Reflections, Manga and Insightful Discussions | Carlos Reinoso ";

const description =
  "Explore a curated collection of spiritual reflections, poetic expressions, and philosophical insights from ancient wisdom to modern thought. Through the lens of scripture, Desert Fathers, Lao Tzu, and self-help literature, I document my inner journey of compassion, creativity, and discovery. This space is dedicated to those who seek meaning, stillness, and inspiration. Currently diving deep into the Psalms, ancient Chinese philosophy, and the teachings of early Christian mystics.";

export const metadataBooks = {
  title,
  description,
  keywords: [
    "Bible Psalms",
    "Spiritual Reflections",
    "Christian Mysticism",
    "Desert Fathers",
    "Lao Tzu",
    "The Art of Happiness",
    "Self Discovery",
    "Philosophy and Poetry",
    "Carlos Reinoso Books",
    "Meditative Writing",
    "Faith and Creativity",
    "Compassion and Wisdom",
  ].join(", "),
  robots: "index, follow",
  icons: {
    icon: "/favicons/books.ico",
  },
  openGraph: {
    title,
    description,
    site_name: title,
    images: [
      {
        url: "/favicons/books.ico",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "website",
  },
};
