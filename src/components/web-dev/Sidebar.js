"use client";
import { navItems } from "@/app/web-dev/page";
import SidebarHero from "./SidebarHero";
import SidebarIcons from "./SidebarIcons";

export default function Sidebar({ className, activeSection }) {

  return (
    <>
      {/* Mobile View */}
      <header
        className={`flex-col lg:hidden top-0 w-full z-50 flex justify-between items-center ${className}`}
      >
        <SidebarHero />
        <SidebarIcons />
      </header>

      {/* Sidebar (Desktop Only) */}
      <aside
        className={`hidden lg:flex lg:sticky top-0 h-[100vh] w-1/2 text-white flex-col justify-between ${className}`}
      >
        {/* Branding */}
        <SidebarHero />

        {/* Navigation Menu */}
        <nav className="mt-8">
          <ul className="space-y-3">
            {navItems.map((section) => (
              <li key={section.name}>
                <a
                  href={`#${section.name.toLowerCase()}`}
                  className={`font-poppins relative font-medium uppercase transition-colors duration-300 group
                    ${
                      activeSection === section.name
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                >
                  {section.name.toUpperCase()}

                  {/* Underline Effect */}
                  <span
                    className={`absolute left-0 h-[1px] bg-white transition-all duration-300 
                      ${
                        activeSection === section.name
                          ? "w-full" // Full underline for active section
                          : "w-0 group-hover:w-full" // Expands on hover
                      }`}
                  ></span>
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
