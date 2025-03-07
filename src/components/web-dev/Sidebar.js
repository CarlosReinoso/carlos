"use client";
import SidebarHero from "./SidebarHero";
import SidebarIcons from "./SidebarIcons";

export default function Sidebar() {
  return (
    <>
      {/* Mobile View: Only Show Name, Tagline & Icons */}
      <header className="flex-col lg:hidden top-0 w-full z-50 flex justify-between items-center">
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
