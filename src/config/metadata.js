import { metadataBooks } from "@/metadata/books";
import { metadataLanding } from "@/metadata/landing";
import { metadataMusic } from "@/metadata/music";
import { metadataProperty } from "@/metadata/property";
import { metadataTravel } from "@/metadata/travel";
import { metadataVcard } from "@/metadata/vcard";
import { metadataWebDev } from "@/metadata/web-dev";
import { headers } from "next/headers";

const metadataMap = new Map([
  ["/web-dev", metadataWebDev],
  ["/property", metadataProperty],
  ["/vcard", metadataVcard],
  ["/books", metadataBooks],
  ["/music", metadataMusic],
  ["/travel", metadataTravel],
]);

export async function generateMetadata() {
  const pathname = headers().get("x-custom-path") || "/";

  for (const [prefix, metadata] of metadataMap) {
    if (pathname.startsWith(prefix)) return metadata;
  }

  return metadataLanding;
}
