"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SculptorHero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLeft = ["Home", "About Us", "Marketplace", "Our Classes"];
  const navRight = ["Client Reviews", "Gallery", "Blogs", "Contact Us"];

  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: "url('/web-dev/hero.png')" }}
    >
      {/* Top Bar + Nav */}
      <header className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-2 text-sm text-black">
          <div className="flex items-center space-x-2">
            <Image
              src="/web-dev/phone.png"
              alt="Phone"
              width={32}
              height={32}
            />
            <div className="flex flex-col">
              <span>Call us Today</span>
              <span className="font-bold">07 480 327 950</span>
            </div>
          </div>

          {/* Hamburger menu (shown only on mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-xl text-white bg-[#8a7d57] p-2 px-4 rounded-md shadow-md focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block relative z-10 bg-[#8a7d57] text-white text-sm font-medium rounded-full py-4 px-4 mx-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between relative">
            {/* Left Menu Items */}
            <ul className="flex space-x-8">
              {navLeft.map((item) => (
                <li
                  key={item}
                  className={`${
                    item === "Home" ? "font-bold" : "hover:underline"
                  } cursor-pointer`}
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* Logo in center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <Image
                src="/web-dev/logo.png"
                alt="Logo"
                width={100}
                height={100}
              />
            </div>

            {/* Right Menu Items */}
            <ul className="flex space-x-8">
              {navRight.map((item) => (
                <li key={item} className="hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Modal */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#8a7d57] text-white flex flex-col items-center justify-center space-y-6 text-lg">
          <button
            onClick={closeMenu}
            className="absolute top-6 left-6 text-white hover:text-gray-300 text-3xl"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {[...navLeft, ...navRight].map((item) => (
            <Link
              key={item}
              href="#"
              onClick={closeMenu}
              className="hover:underline"
            >
              {item}
            </Link>
          ))}
        </div>
      )}

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto flex items-center h-[80vh] px-6">
        <div className="lg:w-1/2 text-left bg-white/80 p-6 rounded-md shadow-md">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
            Sculpting Studio Excellence One Piece at a Time
          </h1>
          <p className="mt-4 text-gray-700">
            A range of sculpture classes catering to different skill levels,
            from beginners exploring the basics to advanced students honing
            their techniques.
          </p>
          <button className="mt-6 bg-[#8a7d57] text-white hover:bg-[#756946] px-4 py-2 rounded-full">
            Explore Our Collection
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 tracking-widest">
        * Scroll Down *
      </div>
    </section>
  );
}
