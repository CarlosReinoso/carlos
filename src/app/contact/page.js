"use client";

import Typography from "@/components/common/Typography";

const ContactUs = () => {
  return (
    <div className="text-white py-16 px-8">
      <div className="max-w-5xl mx-auto">
        <Typography variant="h1" className="mb-4">
          Contact
        </Typography>
        <Typography variant="body1" className="mb-8">
          Please feel free to get in touch, ask us a question, or send us a link
          to a song you'd like to request for a dance you are attending.
        </Typography>

        <Typography variant="body1" className="mb-12">
          We look forward to hearing from you.
        </Typography>

        <div className="bg-white p-8 rounded-lg shadow-md mt-8">
          <Typography variant="h2" className="text-black mb-8">
            Let's Chat
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <Typography variant="h3" className="text-black mb-2">
                Phone
              </Typography>
              <div className="flex justify-center space-x-4 relative">
                {/* WhatsApp Icon */}
                <a
                  href="https://wa.me/1234567890"
                  className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full hover:scale-110 transition-transform duration-300"
                  aria-label="WhatsApp"
                  title="Chat on WhatsApp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.16 1.16 0 0 1 1.24-.27 11.72 11.72 0 0 0 3.68.59 1.16 1.16 0 0 1 1.16 1.16v3.63a1.16 1.16 0 0 1-1.16 1.16A17.09 17.09 0 0 1 3.5 5.83a1.16 1.16 0 0 1 1.16-1.16h3.63a1.16 1.16 0 0 1 1.16 1.16 11.72 11.72 0 0 0 .59 3.68 1.16 1.16 0 0 1-.27 1.24l-2.2 2.2z" />
                  </svg>
                </a>
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
  );
};

export default ContactUs;
