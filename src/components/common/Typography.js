import React from "react";
import clsx from "clsx";

const Typography = ({ variant = "h1", children, className = "" }) => {
  const variants = {
    h1: "font-sacramento text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4",
    h2: "font-sacramento text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4",
    h3: "font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4",
    h4: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4",
    h5: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-4",
    h6: "text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-4",
    body1: "font-poppins text-base sm:text-lg mb-4",
    body2: "text-sm sm:text-base mb-4",
  };

  const Component = variant.startsWith("body") ? "p" : variant; // Use <p> for body1 and body2

  return (
    <Component className={clsx(variants[variant], className)}>
      {children}
    </Component>
  );
};

export default Typography;
