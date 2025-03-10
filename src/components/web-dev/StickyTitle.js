"use client";
import Typography from "../common/Typography";

const StickyTitle = ({ contentTitle, isStickyVisible }) => {
  return (
    <div
      className={`sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur-md transition-all duration-300 md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 ${!isStickyVisible ? "opacity-0" : "opacity-100"}`}
    >
      <Typography variant="h6" className="text-white uppercase">
        {contentTitle}
      </Typography>
    </div>
  );
};

export default StickyTitle;
