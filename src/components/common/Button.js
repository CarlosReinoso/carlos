import clsx from "clsx";
import SVGSpinner from "./SVGSpinner";

export default function Button({
  buttonUrl,
  children,
  loading,
  theme = "light", // Default theme is light
  className = "",
  ...props
}) {
  // Define base, light, and dark theme styles
  const baseStyles =
    "font-neucha inline-block px-6 py-3 font-semibold rounded-full transition duration-300 ease-in-out cursor-pointer";
  const lightThemeStyles =
    "text-white bg-primary hover:bg-secondary hover:scale-105 hover:shadow-[0_0_15px_var(--primary-colour)]";
  const darkThemeStyles = "text-white hover:bg-gray-200 hover:text-black";

  return (
    <div className="mt-4 flex justify-center">
      <a
        href={buttonUrl}
        className={clsx(
          baseStyles,
          theme === "light" ? lightThemeStyles : darkThemeStyles, // Apply theme styles based on prop
          className
        )}
        {...props}
      >
        {loading ? <SVGSpinner /> : children}
      </a>
    </div>
  );
}
