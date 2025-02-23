"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href, onClick, isActive }) => (
  <a
    href={href}
    onClick={onClick}
    className={`font-poppins text-2xl font-medium transition-all duration-300 relative group ${
      isActive
        ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white"
        : ""
    }`}
  >
    {children}
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
  </a>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { label: "Short Stories", href: "#short-stories" },
    { label: "Bio", href: "#bio" },
    { label: "Education", href: "#education" },
    // { label: "Publications", href: "#publications" },
    // { label: "Monthly Essays", href: "#monthly-essays" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full shadow-md z-50 bg-primary">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-3xl focus:outline-none md:hidden"
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              isActive={pathname === item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-primary z-50 flex flex-col items-center justify-center space-y-6">
          <button
            onClick={closeMenu}
            className="absolute top-6 left-6 text-3xl focus:outline-none"
          >
            ✖
          </button>

          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              isActive={pathname === item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
