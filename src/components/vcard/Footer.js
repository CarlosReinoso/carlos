import Link from "next/link";
import SocialMediaIcons from "../common/SocialMediaIcons";

export default function Footer() {
  return (
    <>
      <SocialMediaIcons />
      <div className="bg-primary pt-6 pb-6">
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
