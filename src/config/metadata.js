import { metadataLanding } from "@/metadata/landing";
import { metadataProperty } from "@/metadata/property";
import { metadataWebDev } from "@/metadata/web-dev";
import { headers } from "next/headers";

export async function generateMetadata() {
  const headersList = headers();

  const headersArray = Array.from(headersList.entries());
  console.log("🚀 ~ generateMetadata ~ headersArray:", headersArray);

  // ✅ Use "x-next-pathname" for more reliable path detection
  // const pathname = headersList.get("x-matched-path") || "/";
  // console.log("🚀 ~ generateMetadata ~ pathname:", pathname);

  const pathname =
    headersList.get("referer")?.split(headersList.get("host"))[1] || "/";
  console.log("🚀 ~ generateMetadata ~ pathnameRef:", pathname)

  if (pathname.startsWith("/web-dev")) {
    return metadataWebDev;
  }

  if (pathname.startsWith("/property")) {
    return metadataProperty;
  }

  return metadataLanding;
}
