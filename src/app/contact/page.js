"use client";

import Typography from "@/components/common/Typography";
import { whatsAppLink } from "@/components/Footer";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="py-16 px-8 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <Typography variant="h1" className="mb-4">
            Contact
          </Typography>
          <Typography variant="body1" className="mb-8">
            Please feel free to get in touch
          </Typography>
          <br />

          <div className="bg-white p-8 rounded-lg shadow-md mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <Typography variant="h4" className="text-black mb-2">
                  WhatsApp
                </Typography>
                <div className="flex justify-center space-x-4 relative">
                  {/* WhatsApp Icon */}
                  <WhatsAppIcon link={whatsAppLink} />
                </div>
              </div>
              <div>
                <Typography variant="h4" className="mb-2 text-black">
                  Email
                </Typography>
                <a
                  href="mailto:GraceBasak@outlook.com"
                  className="text-black break-words underline"
                >
                  GraceBasak@outlook.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
