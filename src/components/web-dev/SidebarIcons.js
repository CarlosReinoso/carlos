import EmailIcon from "../icons/EmailIcon";
import GitHubLogo from "../icons/GithubIcon";
import InstagramIcon from "../icons/InstagramIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import WhatsAppIcon from "../icons/WhatsAppIcon";

export default function SidebarIcons() {
  const iconWrapperStyles = "bg-slate-900 rounded-lg";
  const svgStyles = "w-8 h-8 text-gray-200 fill-current";

  return (
    <div className="flex flex-wrap justify-center items-center content-center bg-gray-900 gap-4 md:space-x-6 h-16">
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
