"use client";
import React, { useState, useEffect } from "react";
import SidebarHero from "./SidebarHero";
import SidebarIcons from "./SidebarIcons";

export default function Sidebar() {
  const [currentSection, setCurrentSection] = useState("ABOUT");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects"];
      let current = "ABOUT";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const { top } = section.getBoundingClientRect();
          if (top < window.innerHeight / 3) {
            current = id.toUpperCase();
          }
        }
      });

      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile View: Only Show Name, Tagline & Icons */}
      <header className="flex-col lg:hidden top-0 w-full bg-gray-900 text-white shadow-md z-50 flex justify-between items-center">
        <SidebarHero />
        <SidebarIcons />
      </header>

      {/* Sidebar (Desktop Only) */}
      <aside className="hidden lg:flex lg:sticky top-0 h-[100vh] w-1/2 bg-gray-900 text-white flex-col justify-between">
        {/* Branding */}
        <SidebarHero />
        <nav className="mt-8">
          <ul className="space-y-3">
            {["about", "experience", "projects"].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className="text-gray-400 hover:text-white font-medium uppercase"
                >
                  {section.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <SidebarIcons />
      </aside>
    </>
  );
}
