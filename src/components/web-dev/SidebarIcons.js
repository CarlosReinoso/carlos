import EmailIcon from "../icons/EmailIcon";
import GitHubLogo from "../icons/GithubIcon";
import InstagramIcon from "../icons/InstagramIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import WhatsAppIcon from "../icons/WhatsAppIcon";

export default function SidebarIcons() {
  const iconWrapperStyles =
    "rounded-lg transition duration-300 group";
  const svgStyles = "w-8 h-8 text-gray-400 fill-current group-hover:text-white";

  return (
    <div className="flex flex-wrap justify-center items-center content-center gap-4 md:space-x-6 h-16 mt-8">
      <GitHubLogo className={iconWrapperStyles} svgStyles={svgStyles} />
      <LinkedInIcon className={iconWrapperStyles} svgStyles={svgStyles} />
      <InstagramIcon
        className={iconWrapperStyles}
        svgStyles={svgStyles}
        size="40px"
      />
      <WhatsAppIcon className={iconWrapperStyles} svgStyles={svgStyles} />
      <EmailIcon className={iconWrapperStyles} svgStyles={svgStyles} />
    </div>
  );
}
