const title =
  "Heartfelt Music, Expressive Sounds & Creative Recordings | Carlos Reinoso";

const description =
  "Discover heartfelt, expressive music that blends bossa nova, flamenco, and Arabian influences. I explore creativity through soulful melodies, jazzy chords, and emotional storytelling. This space is where I document my musical journey, share ideas in progress, and express my truest self through sound. Currently focused on capturing raw inspiration and recording original compositions.";

export const metadataMusic = {
  title,
  description,
  keywords: [
    "Carlos Reinoso Music",
    "Heartfelt Music",
    "Bossa Nova Guitar",
    "Flamenco Fusion",
    "Expressive Guitar",
    "Creative Music Ideas",
    "Arabian Inspired Music",
    "Self Expression Through Music",
    "Original Guitar Music",
    "Emotional Instrumentals",
    "Jazz Bossa Chords",
    "Music Journey",
  ].join(", "),
  robots: "index, follow",
  icons: {
    icon: "/favicons/music.ico",
  },
  openGraph: {
    title,
    description,
    site_name: title,
    images: [
      {
        url: "/favicons/music.ico",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "website",
  },
};
