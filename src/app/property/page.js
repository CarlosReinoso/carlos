import { metadataProperty } from "../../metadata/property";
import Hero from "@/components/property/Hero";

export const metadata = metadataProperty;

export default function PropertyPage() {
  return (
    <>
      <Hero />
      {/* <Button buttonUrl={"property/portfolio"}>portfolio</Button> */}
    </>
  );
}
