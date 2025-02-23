import React from "react";
import WebsiteBy from "./WebsiteBy";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export const whatsAppLink = "https://chat.whatsapp.com/BRb6XITEHr829zUKiwZBAM";
const mailto = "luminousnightslondon@gmail.com";
const instagramUrl = "https://www.instagram.com/luminousnightslondon/";

const Footer = () => {
  return (
    <>
      <div className="bg-primary py-6">
        {/* Icons Section */}
        <div className="flex justify-center space-x-4 relative">
          <WhatsAppIcon link={whatsAppLink} />

          {/* Instagram Icon */}
          <a
            href={instagramUrl}
            className="flex items-center justify-center w-12 h-12 bg-pink-500 text-white rounded-full hover:scale-110 transition-transform duration-300"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zM12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm-6.25-.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 9.25a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5z" />
            </svg>
          </a>

          {/* Email Icon */}
          <a
            href={`mailto:${mailto}`}
            className="flex items-center justify-center w-12 h-12 bg-gray-500 text-white rounded-full hover:scale-110 transition-transform duration-300"
            aria-label="Email"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 13.065l-11.24-8.486A2.999 2.999 0 0 1 3 3h18c.697 0 1.353.23 1.887.579L12 13.065zM12 14.935l11.24-8.486A2.995 2.995 0 0 1 24 6v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V6a2.995 2.995 0 0 1 .76-1.551L12 14.935z" />
            </svg>
          </a>
        </div>
      </div>
      <WebsiteBy />
    </>
  );
};

export default Footer;
