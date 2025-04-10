"use client";

import Image from "next/image";

export default function SculptorHero() {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: "url('/web-dev/hero.png')" }}
    >
      {/* Top Bar + Nav */}
      <header className="w-full">
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
        </div>

        {/* Main Menu */}
        <nav className="relative z-10 bg-[#8a7d57] text-white text-sm font-medium rounded-full py-4 px-4 mx-4 flex items-center justify-between">
          {/* Left Menu Items */}
          <ul className="flex space-x-8 ml-6">
            {["Home", "About Us", "Marketplace", "Our Classes"].map((item) => (
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
          <ul className="flex space-x-8 mr-6">
            {["Client Reviews", "Gallery", "Blogs", "Contact Us"].map(
              (item) => (
                <li key={item} className="hover:underline cursor-pointer">
                  {item}
                </li>
              )
            )}
          </ul>
        </nav>
      </header>

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
