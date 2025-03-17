import Typography from "@/components/common/Typography";
import { metadataProperty } from "../../metadata/property";
import Button from "@/components/common/Button";

export const metadata = metadataProperty;

export default function PropertyPage() {
  return (
    <>
      <Typography variant="h1" className="text-primary">
        typographye
      </Typography>
      <p>p tag in property page</p>
      <h1>Property Investment Portfolio</h1>
      <Button buttonUrl={"property/portfolio"}>portfolio</Button>
    </>
  );
}
