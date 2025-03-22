import { metadataLanding } from "@/metadata/landing";
import { metadataProperty } from "@/metadata/property";
import { metadataWebDev } from "@/metadata/web-dev";
import { headers } from "next/headers";

export async function generateMetadata() {
  const headersList = headers();

  const pathname = headersList.get("x-custom-path") || "/";

  if (pathname.startsWith("/web-dev")) {
    return metadataWebDev;
  }

  if (pathname.startsWith("/property")) {
    return metadataProperty;
  }

  return metadataLanding;
}
