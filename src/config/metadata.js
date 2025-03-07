import { metadataLanding } from "@/metadata/landing";
import { metadataProperty } from "@/metadata/property";
import { metadataWebDev } from "@/metadata/web-dev";
import { headers } from "next/headers";

export async function generateMetadata() {
  const headersList = headers();
  console.log("🚀 ~ generateMetadata ~ headersList:", headersList)

  // ✅ Use "x-next-pathname" for more reliable path detection
  const pathname = headersList.get("x-matched-path") || "/";
  console.log("🚀 ~ generateMetadata ~ pathname:", pathname)

  const pathnameRef =
  headersList.get("referer")?.split(headersList.get("host"))[1] || "/";
  console.log("🚀 ~ generateMetadata ~ pathnameRef:", pathnameRef)


  if (pathname.startsWith("/web-dev")) {
    return metadataWebDev;
  }

  if (pathname.startsWith("/property")) {
    return metadataProperty;
  }

  return metadataLanding;
}
