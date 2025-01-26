"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href, onClick, isActive }) => (
  <Link
    href={href}
    className={`font-poppins text-white text-2xl font-medium transition-all duration-300 relative group ${
      isActive ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white" : ""
    }`}
    onClick={onClick}
  >
    {children}
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="fixed top-0 left-0 w-full shadow-md z-50 bg-primary">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white text-3xl focus:outline-none md:hidden"
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>

        <div className="hidden md:flex space-x-6">
          <NavLink href="/" isActive={pathname === "/"}>
            Home
          </NavLink>
          <NavLink href="/events" isActive={pathname === "/events"}>
            Events
          </NavLink>
          <NavLink href="/playlists" isActive={pathname === "/playlists"}>
            Playlists
          </NavLink>
          <NavLink href="/about" isActive={pathname === "/about"}>
            About Us
          </NavLink>
          <NavLink href="/contact" isActive={pathname === "/contact"}>
            Contact
          </NavLink>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-primary z-50 flex flex-col items-center justify-center space-y-6">
          <button
            onClick={closeMenu}
            className="absolute top-6 left-6 text-white text-3xl focus:outline-none"
          >
            ✖
          </button>

          <NavLink href="/" onClick={closeMenu} isActive={pathname === "/"}>
            Home
          </NavLink>
          <NavLink href="/events" onClick={closeMenu} isActive={pathname === "/events"}>
            Events
          </NavLink>
          <NavLink href="/playlists" onClick={closeMenu} isActive={pathname === "/playlists"}>
            Playlists
          </NavLink>
          <NavLink href="/about" onClick={closeMenu} isActive={pathname === "/about"}>
            About Us
          </NavLink>
          <NavLink href="/contact" onClick={closeMenu} isActive={pathname === "/contact"}>
            Contact
          </NavLink>
        </div>
      )}
    </div>
  );
}
