import Link from "next/link";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import { webEmailUrl } from "@/lib/constants";
import EmailIcon from "../icons/EmailIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import InstagramIcon from "../icons/InstagramIcon";

export default function Footer() {
  const iconWrapperStyles = "rounded-lg transition duration-300 group";
  const svgStyles = "w-8 h-8 gray-400 fill-current group-hover:text-third";

  return (
    <>
      <div className="flex flex-wrap justify-center items-center content-center gap-4 md:space-x-6 h-16 mt-4">
        <WhatsAppIcon className={iconWrapperStyles} svgStyles={svgStyles} />
        <EmailIcon
          href={webEmailUrl}
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
      <div className="bg-primary pt-2 pb-6">
        <div className="text-center">
          <p className="text-sm">
            Powered by{" "}
            <Link href="/web-dev" className="relative inline-block group">
              Carlos Reinoso
              <span className="absolute left-0 -bottom-0.5 w-full h-px bg-current transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left group-hover:text-third" />
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
