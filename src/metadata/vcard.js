const title =
  "Digital vCard for Modern Professionals | Personal Branding & Smart Contact Sharing | Carlos Reinoso ";

const description =
  "Create your personal digital business card in minutes – quick, easy, and perfect for sharing your details with a simple QR code. Whether you're networking, building your personal brand, or just want a sleek way to stay connected, this modern vCard is designed for freelancers, creatives, consultants, and business owners. Built with Next.js for performance, SEO, and effortless shareability.";

export const metadataVcard = {
  title,
  description,
  keywords: [
    "Digital vCard",
    "vCard App",
    "Smart Business Card",
    "Online Portfolio",
    "Personal Branding",
    "Freelancer Profile",
    "Next.js vCard",
    "Carlos Reinoso",
    "Modern Resume Website",
    "Contact Sharing App",
    "Mobile-Friendly vCard",
    "Minimalist Web Design",
    "Self Promotion Tool",
  ].join(", "),
  robots: "index, follow",
  icons: {
    icon: "/favicons/vcard.ico",
  },
  openGraph: {
    title,
    description,
    url: "https://carlosreinoso.co.uk/vcard", // Update if hosted elsewhere
    site_name: "Carlos Reinoso vCard",
    images: [
      {
        url: "/images/vcard-og.png", // Ideally 1200x630 and visually branded
        width: 1200,
        height: 630,
        alt: "Carlos Reinoso Digital vCard",
      },
    ],
    type: "profile",
    locale: "en_GB",
  },
};
