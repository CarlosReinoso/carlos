"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import WebDevLayout from "@/app/layouts/WebDevLayout";
import PropertyLayout from "@/app/layouts/PropertyLayout";
import LandingLayout from "@/app/layouts/LandingLayout";
import KingdomLayout from "@/app/layouts/KingdomLayout";
import BooksLayout from "@/app/layouts/BooksLayout";
import VCardLayout from "@/app/layouts/VCardLayout";

export default function LayoutSelector({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Detect which theme to apply based on pathname
    let theme = "default"; // Default theme for Landing
    if (pathname.startsWith("/web-dev")) theme = "web-dev";
    else if (pathname.startsWith("/property")) theme = "property";
    else if (pathname.startsWith("/draft")) theme = "property";
    else if (pathname.startsWith("/books")) theme = "books";
    else if (pathname.startsWith("/vcard")) theme = "vcard";

    document.documentElement.setAttribute("data-theme", theme);
  }, [pathname]); // Runs whenever pathname changes

  if (pathname.startsWith("/web-dev")) {
    return <WebDevLayout>{children}</WebDevLayout>;
  }

  if (pathname.startsWith("/property")) {
    return <PropertyLayout>{children}</PropertyLayout>;
  }
  if (pathname.startsWith("/draft")) {
    return <KingdomLayout>{children}</KingdomLayout>;
  }
  if (pathname.startsWith("/books")) {
    return <BooksLayout>{children}</BooksLayout>;
  }
  if (pathname.startsWith("/vcard")) {
    return <VCardLayout>{children}</VCardLayout>;
  }

  return <LandingLayout>{children}</LandingLayout>;
}
