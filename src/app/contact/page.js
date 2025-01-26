"use client";

import Typography from "@/components/common/Typography";
import { whatsAppLink } from "@/components/Footer";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="text-white py-16 px-8 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <Typography variant="h1" className="mb-4">
            Contact
          </Typography>
          <Typography variant="body1" className="mb-8">
            Please feel free to get in touch, ask us a question, or send us a
            link to a song you'd like to request for a dance you are attending.
          </Typography>

          <Typography variant="body1" className="mb-12">
            We look forward to hearing from you.
          </Typography>

          <div className="bg-white p-8 rounded-lg shadow-md mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <Typography variant="h3" className="text-black mb-2">
                  WhatsApp Group
                </Typography>
                <div className="flex justify-center space-x-4 relative">
                  {/* WhatsApp Icon */}
                  <WhatsAppIcon link={whatsAppLink} />
                </div>
              </div>
              <div>
                <Typography variant="h3" className="mb-2 text-black">
                  Email
                </Typography>
                <a
                  href="mailto:Luminousnightslondon@gmail.com"
                  className="text-black break-words underline"
                >
                  luminousnightslondon@gmail.com
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
