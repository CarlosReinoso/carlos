"use client";

import { usePathname } from "next/navigation";
import WebDevLayout from "@/app/layouts/WebDevLayout";
import PropertyLayout from "@/app/layouts/PropertyLayout";
import LandingLayout from "@/app/layouts/LandingLayout";

export default function LayoutSelector({ children }) {
  const pathname = usePathname();

  if (pathname === "/web-dev" || pathname.startsWith("/web-dev/")) {
    return <WebDevLayout>{children}</WebDevLayout>;
  }

  if (pathname === "/property" || pathname.startsWith("/property/")) {
    return <PropertyLayout>{children}</PropertyLayout>;
  }

  return <LandingLayout>{children}</LandingLayout>; // Only if no other match
}
