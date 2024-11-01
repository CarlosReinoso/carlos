// components/BackButton.js
import Link from "next/link";
import React from "react";

export default function BackButton({
  to,
  theme = "light",
  buttonUrl,
  buttonText,
  className,
}) {
  const baseStyles =
    "inline-block px-6 py-3 border-2 font-semibold rounded-full transition duration-300 ease-in-out";

  const themes = {
    light: `border-black text-black hover:bg-gray-800 hover:text-white`,
    secondary: `bg-gray-800 text-white border-transparent hover:bg-gray-700 hover:text-white hover:border-white`,
    dark: `border-white text-white hover:bg-gray-200 hover:text-black`,
    gradient: `border-black bg-gradient-to-r from-[#f5e6cc] via-[#d3a06d] to-[#b8864d] text-black hover:from-[#e9d2ae] hover:via-[#bf875c] hover:to-[#a46a3d] hover:text-white`,
    glow: `border-white text-white shadow-lg shadow-yellow-400/50 hover:bg-white hover:text-black`,
    outline: `border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black`,
  };

  return (
    <Link href={to} className={`${baseStyles} ${themes[theme]} ${className}`}>
      <svg
        className="w-6 h-6 md:w-8 md:h-8 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M15.5 5.5L14 4l-8 8 8 8 1.5-1.5L9 12z" />
      </svg>
    </Link>
  );
}
