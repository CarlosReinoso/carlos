"use client";

import Typography from "./common/Typography";

const EducationSection = () => {
  return (
    <div
      id="education"
      className="relative min-h-[100vh] mt-32 sm:mt-8 flex items-center justify-center bg-primary p-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl overflow-hidden">
        {/* Left side - Education Text */}
        <div className="flex flex-col justify-start items-start p-6 md:p-8 w-full">
          <Typography
            variant="h3"
            className="font-semibold tracking-widest text-lg sm:text-xl mb-2"
          >
            EDUCATION
          </Typography>
          <hr className="w-full border-t-2 border-gray-600 mb-4" />
          <Typography
            variant="body1"
            className="text-gray-800 text-base sm:text-lg leading-relaxed space-y-4"
          >
            <p>
              Birkbeck, University of London, Modern and Contemporary Literature
              MA, 2021-2022
            </p>
            <p>
              University of Brighton, Fine Art: Sculpture BA (Hons), 2015-2018
            </p>
            <p>UCA Epsom, Art and Design Foundation, 2014-2015, Merit</p>
          </Typography>
        </div>

        {/* Right side - Image */}
        <div className="flex justify-center items-center bg-secondary h-[60vh] sm:h-[70vh] md:h-[80vh] p-4 sm:px-8 md:px-12">
          <img
            src="/dog.jpg"
            alt="Dog sitting on stairs"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
