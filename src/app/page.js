"use client";

import Image from "next/image";
import Link from "next/link";

const links = [
  {
    href: "/web-dev",
    title: "Web Development",
    description: "Portfolio & coding projects",
    imageSrc: "/home/web-dev.png",
  },
  {
    href: "/property",
    title: "Property",
    description: "Deals, data & renovations",
    imageSrc: "/home/property.png",
  },
  {
    href: "/vcard",
    title: "vCard",
    description: "My digital business card",
    imageSrc: "/home/vcard.png",
  },
  {
    href: "/books",
    title: "Books",
    description: "Bible study & reflections",
    imageSrc: "/home/books.jpg",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-white dark:bg-black">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to CarlosReinoso.co.uk
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {links.map(({ href, title, description, imageSrc }) => (
          <Link href={href} key={href}>
            <div className="flex flex-col h-full min-h-[320px] border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-lg transition overflow-hidden">
              <div className="relative w-full h-40">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow p-4">
                <h4 className="text-xl font-semibold mb-1">{title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
                {/* Optional spacer for consistent bottom alignment */}
                <div className="flex-grow" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
