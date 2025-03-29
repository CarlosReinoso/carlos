import { propertyEmailUrl } from "@/lib/constants";
import Typography from "./Typography";
import WebsiteBy from "../common/WebsiteBy";
import SocialMediaIcons from "../common/SocialMediaIcons";

export default function Footer({ getInTouch }) {
  return (
    <>
      <Typography variant="h6" className="text-center mt-4 !mb-0 underline">
        Get in Touch
      </Typography>
      <SocialMediaIcons emailUrl={propertyEmailUrl} />
      <div className="mt-4" />
      <WebsiteBy />
    </>
  );
}
