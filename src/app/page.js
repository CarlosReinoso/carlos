// src/app/page.js or src/app/Home/page.js

"use client";

import Link from "next/link";

const links = [
  {
    href: "/web-dev",
    title: "Web Dev",
    description: "Portfolio & coding projects",
  },
  {
    href: "/property",
    title: "Property",
    description: "Deals, data & renovations",
  },
  { href: "/vcard", title: "vCard", description: "My digital business card" },
  { href: "/books", title: "Books", description: "Bible study & reflections" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-white dark:bg-black">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to CarlosReinoso.co.uk
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {links.map(({ href, title, description }) => (
          <Link href={href} key={href}>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
