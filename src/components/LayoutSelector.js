"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import WebDevLayout from "@/app/layouts/WebDevLayout";
import PropertyLayout from "@/app/layouts/PropertyLayout";
import KingdomLayout from "@/app/layouts/KingdomLayout";
import BooksLayout from "@/app/layouts/BooksLayout";
import VCardLayout from "@/app/layouts/VCardLayout";
import HomeLayout from "@/app/layouts/HomeLayout";
import BaseLayout from "@/app/layouts/BaseLayout";
import TravelLayout from "@/app/layouts/TravelLayout";
import MusicLayout from "@/app/layouts/MusicLayout";

const layoutMap = [
  { prefix: "/web-dev", layout: WebDevLayout, theme: "web-dev" },
  { prefix: "/property", layout: PropertyLayout, theme: "property" },
  { prefix: "/draft", layout: KingdomLayout, theme: "property" },
  { prefix: "/books", layout: BooksLayout, theme: "books" },
  { prefix: "/vcard", layout: VCardLayout, theme: "vcard" },
  { prefix: "/travel", layout: TravelLayout, theme: "travel" },
  { prefix: "/music", layout: MusicLayout, theme: "music" },
];

export default function LayoutSelector({ children }) {
  const pathname = usePathname();

  const matched = layoutMap.find(({ prefix }) => pathname.startsWith(prefix));
  const isLanding = pathname === "/";
  const Layout = matched?.layout || (isLanding ? HomeLayout : BaseLayout);
  const theme = matched?.theme || "home";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <Layout>{children}</Layout>;
}
