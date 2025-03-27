// app/motorbike/page.js
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function TravelPage() {
  return (
    <main className="">
      {/* Hero Section */}
      <div
        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-secondary) 15%, rgba(59,95,79,0.4) 60%, transparent 80%)`,
        }}
      ></div>

      <div className="relative w-screen mb-8 h-[100vh] overflow-hidden">
        <img
          src="/travel/hero.webp"
          alt="hero"
          className="w-[110vw] translate-x-[5vw] h-full object-cover z-0"
        />

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-4 z-20">
          <h1 className="underline text-white">Wild Songs For The Road</h1>
          <h4 className="text-white">A Journey With Heart</h4>
        </div>
      </div>

      {/* Centered Text */}

      {/* Navigation Links */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center p-8 bg-[color:var(--color-primary)]">
        {[
          { label: "MEMBERSHIPS", href: "#" },
          { label: "ACADEMY", href: "#" },
          { label: "EXPERIENCE", href: "#" },
          { label: "SHOP", href: "#" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-gray-800 hover:bg-gray-700 p-4 rounded shadow"
          >
            {item.label}
          </Link>
        ))}
      </section>

      {/* My Book Section */}
      <section className="p-10 grid md:grid-cols-2 gap-10">
        <Image
          src="/books/free-ride.jpg"
          alt="My Book"
          width={300}
          height={400}
          className="mx-auto"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">MY BOOK</h2>
          <p className="mb-6">
            On 3 June 2025 my book will be published in the USA, UK and
            Commonwealth including India and Australia!
          </p>
          <Link
            href="#"
            className="inline-block mt-4 px-6 py-3 text-black font-semibold rounded-xl hover:bg-orange-500 transition"
          >
            PREORDER MY BOOK
          </Link>
        </div>
      </section>

      {/* Motorcycles Section */}
      <section className="p-10 bg-black">
        <h2 className="text-3xl font-bold text-center mb-8">
          MEET MY MOTORCYCLES
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {["FRANKIE", "ALASKA", "SAVANNAH", "RONIN"].map((bike) => (
            <div key={bike} className="bg-gray-900 p-4 rounded">
              <Image
                src={`/motorbikes/${bike.toLowerCase()}.jpg`}
                alt={bike}
                width={200}
                height={200}
                className="mx-auto"
              />
              <p className="mt-4 text-lg font-semibold">{bike}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter & Courses */}
      <section className="p-10 bg-[color:var(--color-primary)] grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold mb-2">BI-MONTHLY NEWSLETTER</h3>
          <p className="mb-4">
            Become a free member and receive updates from the road!
          </p>
          <Link href="#" className="text-[color:var(--color-third)] underline">
            BECOME A MEMBER
          </Link>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">MOTOVLOGGING COURSES</h3>
          <p className="mb-4">
            Learn how to create your own motorcycle adventure videos.
          </p>
          <Link href="#" className="text-[color:var(--color-third)] underline">
            JOIN MY COURSE
          </Link>
        </div>
      </section>

      {/* Ambassador Logos */}
      <section className="p-10 bg-black flex flex-wrap justify-center items-center gap-10">
        {["revit", "mosko", "airoh"].map((brand) => (
          <Image
            key={brand}
            src={`/brands/${brand}.png`}
            alt={brand}
            width={150}
            height={60}
          />
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-[color:var(--color-primary)] text-gray-400 p-8 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </footer>
    </main>
  );
}
