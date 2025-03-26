"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import WebDevLayout from "@/app/layouts/WebDevLayout";
import PropertyLayout from "@/app/layouts/PropertyLayout";
import KingdomLayout from "@/app/layouts/KingdomLayout";
import BooksLayout from "@/app/layouts/BooksLayout";
import VCardLayout from "@/app/layouts/VCardLayout";
import HomeLayout from "@/app/layouts/HomeLayout";
import TravelLayout from "@/app/layouts/TravelLayout";

export default function LayoutSelector({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Detect which theme to apply based on pathname
    let theme = "home"; // Default theme for Landing
    if (pathname.startsWith("/web-dev")) theme = "web-dev";
    else if (pathname.startsWith("/property")) theme = "property";
    else if (pathname.startsWith("/draft")) theme = "property";
    else if (pathname.startsWith("/books")) theme = "books";
    else if (pathname.startsWith("/vcard")) theme = "vcard";
    else if (pathname.startsWith("/travel")) theme = "travel";

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
  if (pathname.startsWith("/travel")) {
    return <TravelLayout>{children}</TravelLayout>;
  }

  return <HomeLayout>{children}</HomeLayout>;
}
