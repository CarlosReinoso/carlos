import clsx from "clsx";
import Link from "next/link";
import Typography from "./Typography";

export default function Button({
  buttonUrl,
  children,
  loading,
  theme = "light", // Default theme is light
  arrow = true,    // Default to showing arrow
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-block px-6 py-3 font-semibold rounded-full transition duration-300 ease-in-out cursor-pointer group";
  const lightThemeStyles = "border hover:border-third";
  const darkThemeStyles = "bg-gray-100 border-2 border-primary hover:scale-105 hover:shadow-[0_0_15px_var(--primary-colour)]";

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
        <Typography
          variant="body1"
          className="relative inline-block group group-hover:text-third !mb-0 flex items-center gap-2 transition-all duration-300"
        >
          {children}

          {arrow && (
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          )}

          {/* Underline Animation */}
          <span className="absolute left-0 bottom-0 h-[1px] w-full bg-third scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </Typography>
      </Link>
    </div>
  );
}
