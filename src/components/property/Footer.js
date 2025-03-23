import { propertyEmailUrl } from "@/lib/constants";
import EmailIcon from "../icons/EmailIcon";
import InstagramIcon from "../icons/InstagramIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import Typography from "./Typography";
import WebsiteBy from "../common/WebsiteBy";

export default function Footer() {
  const iconWrapperStyles = "rounded-lg transition duration-300 group";
  const svgStyles = "w-8 h-8 gray-400 fill-current group-hover:text-third";

  return (
    <>
      <Typography variant="h6" className="text-center mt-4 underline">
        Get in Touch
      </Typography>
      <div className="flex flex-wrap justify-center items-center content-center gap-4 md:space-x-6 h-16 mt-4">
        <WhatsAppIcon className={iconWrapperStyles} svgStyles={svgStyles} />
        <EmailIcon
          href={propertyEmailUrl}
          className={iconWrapperStyles}
          svgStyles={svgStyles}
        />
        <LinkedInIcon className={iconWrapperStyles} svgStyles={svgStyles} />
        <InstagramIcon
          className={iconWrapperStyles}
          svgStyles={svgStyles}
          size="40px"
        />
      </div>
      <WebsiteBy />
    </>
  );
}
