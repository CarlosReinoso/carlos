import { helloEmailUrl } from "@/lib/constants";
import EmailIcon from "../icons/EmailIcon";
import GitHubLogo from "../icons/GithubIcon";
import InstagramIcon from "../icons/InstagramIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import HomeIcon from "../icons/HomeIcon";
import QRCodeIcon from "../icons/QRCodeIcon";

export default function SocialMediaIcons({
  github = false,
  whatsapp = true,
  email = true,
  instagram = true,
  linkedin = true,
  qrcode = true,
  home = true,
  iconSize = "w-8 h-8",
  spacing = "mt-8",
  container = "h-16",
  customIcons = {},
  emailUrl = helloEmailUrl,
}) {
  const iconWrapperStyles = "rounded-lg transition duration-300 group";
  const svgStyles = `${iconSize} ${spacing} text-white fill-current group-hover:text-third`;

  return (
    <div
      className={`flex flex-wrap justify-center items-center content-center gap-3 md:space-x-6 ${container}`}
    >
      {github && (
        <GitHubLogo
          className={iconWrapperStyles}
          svgStyles={svgStyles}
          {...customIcons.github}
        />
      )}
      {whatsapp && (
        <WhatsAppIcon
          className={iconWrapperStyles}
          svgStyles={svgStyles}
          {...customIcons.whatsapp}
        />
      )}

      {email && (
        <EmailIcon
          href={emailUrl}
          className={iconWrapperStyles}
          svgStyles={svgStyles}
          {...customIcons.email}
        />
      )}

      {instagram && (
        <InstagramIcon
          className={iconWrapperStyles}
          svgStyles={svgStyles}
          {...customIcons.instagram}
        />
      )}

      {linkedin && (
        <LinkedInIcon
          className={iconWrapperStyles}
          svgStyles={svgStyles}
          {...customIcons.linkedin}
        />
      )}
      {qrcode && (
        <QRCodeIcon
          className={iconWrapperStyles}
          svgStyles={svgStyles}
          {...customIcons.qrcode}
        />
      )}
      {home && (
        <HomeIcon
          className={iconWrapperStyles}
          svgStyles={svgStyles}
          {...customIcons.home}
        />
      )}
    </div>
  );
}
