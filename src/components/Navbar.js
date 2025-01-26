"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href, isActive }) => (
  <Link
    href={href}
    className={`font-poppins text-lg relative transition-all duration-300 hover:cursor-pointer ${
      isActive ? "text-white" : "text-gray-400"
    }`}
    style={{
      position: "relative",
      textDecoration: "none",
      color: "inherit",
    }}
    onMouseEnter={(e) => {
      const after = e.currentTarget.querySelector("span");
      if (after) {
        after.style.transform = "scaleX(1)";
        after.style.transformOrigin = "bottom left";
      }
    }}
    onMouseLeave={(e) => {
      const after = e.currentTarget.querySelector("span");
      if (after && !isActive) {
        after.style.transform = "scaleX(0)";
        after.style.transformOrigin = "bottom right";
      }
    }}
  >
    {children}
    <span
      style={{
        content: '""',
        position: "absolute",
        width: "100%",
        height: "2px",
        bottom: "0",
        left: "0",
        backgroundColor: "currentColor",
        transform: isActive ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: isActive ? "bottom left" : "bottom right",
        transition: "transform 0.25s ease-out",
        display: "block",
      }}
    ></span>
  </Link>
);

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div
      className={`fixed top-0 left-0 w-full shadow-md z-50 transition-transform duration-300 transform translate-y-0`}
      style={{
        background:
          "linear-gradient(to bottom, var(--primary-colour) 60%, var(--secondary-colour) 85%, rgba(128, 0, 128, 0))",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-end">
        <nav className="flex space-x-6">
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
        </nav>
      </div>
    </div>
  );
}
