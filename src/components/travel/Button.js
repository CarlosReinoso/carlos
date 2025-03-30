"use client";
import clsx from "clsx";
import Link from "next/link";

export default function Button({
  buttonUrl,
  children,
  loading,
  theme = "light", // Default theme is light
  arrow = true, // Default to showing arrow
  className = "",
  arrowLeft,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full cursor-pointer transition duration-300 ease-in-out group relative group-hover:text-third";

  const lightThemeStyles = "border border-third hover:border-third";
  const darkThemeStyles =
    "bg-gray-100 border-2 border-primary hover:scale-105 hover:shadow-[0_0_15px_var(--primary-colour)]";

  return (
    <div className="mt-4 flex justify-center">
      <Link
        href={buttonUrl || "#"}
        className={clsx(
          baseStyles,
          theme === "light" ? lightThemeStyles : darkThemeStyles,
          className
        )}
        {...props}
      >
        {arrowLeft && (
          <span className="transform transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
        )}

        {/* Text wrapper with underline effect */}
        <span className="relative inline-block">
          <span className="relative z-10">{children}</span>
          <span className="absolute left-0 bottom-0 h-[1px] w-full bg-third scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </span>
        {arrow && (
          <span className="transform transition-transform duration-300 group-hover:translate-x-1">
            {" "}
            →
          </span>
        )}
      </Link>
    </div>
  );
}
