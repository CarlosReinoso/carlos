"use client";

import { usePathname } from "next/navigation";
import WebDevLayout from "@/app/layouts/WebDevLayout";
import PropertyLayout from "@/app/layouts/PropertyLayout";
import LandingLayout from "@/app/layouts/LandingLayout";

export default function LayoutSelector({ children }) {
  const pathname = usePathname();

  return (
    <>
      {pathname.startsWith("/web-dev") ? (
        <WebDevLayout>{children}</WebDevLayout>
      ) : pathname.startsWith("/property") ? (
        <PropertyLayout>{children}</PropertyLayout>
      ) : (
        <LandingLayout>{children}</LandingLayout>
      )}
    </>
  );
}
