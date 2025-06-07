import { whatsAppUrl } from "@/lib/constants";

export default function EmailIcon({
  className = "rounded-lg transition duration-300 group",
  svgStyles = "w-8 h-8 text-white fill-current group-hover:text-secondary",
  href = whatsAppUrl,
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        // fill="#000000"
        version="1.1"
        id="Capa_1"
        // width="16px"
        // height="16px"
        viewBox="0 0 388.424 388.424"
        className={svgStyles}
      >
        <g>
          <path d="M384.202,59.111H4.209C1.888,59.111,0,61,0,63.33v261.766c0,2.33,1.888,4.217,4.209,4.217h379.993   c2.317,0,4.222-1.887,4.222-4.217V63.33C388.424,61,386.52,59.111,384.202,59.111z M319.937,92.888L194.212,185.09L68.485,92.888   H319.937z M354.647,295.535H33.779V109.328l157.935,115.82c1.494,1.089,3.508,1.089,5.004,0l157.934-115.82v186.207H354.647z" />
        </g>
      </svg>
    </a>
  );
}
