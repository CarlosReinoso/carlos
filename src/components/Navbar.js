"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href }) => (
  <Link
    href={href}
    className="font-neucha text-white text-lg hover:text-gray-300 hover:cursor-pointer relative transition-all duration-300"
  >
    {children}
  </Link>
);

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    // Only enable scroll functionality on the homepage
    if (pathname !== "/") {
      setIsVisible(true); // Always show the navbar on other pages
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, pathname]);

  return (
    <div
      className={`fixed top-0 left-0 w-full shadow-md z-50 transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
      style={{
        background:
          "linear-gradient(to bottom, var(--primary-colour) 60%, var(--secondary-colour) 85%, rgba(128, 0, 128, 0))",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-end">
        <nav className="flex space-x-4">
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/events"}>Events</NavLink>
        </nav>
      </div>
    </div>
  );
}
