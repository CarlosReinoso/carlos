"use client";

import ReactCompareImage from "react-compare-image";
import Image from "next/image";

export default function BeforeAfterSliderComponent({
  beforeImage,
  afterImage,
}) {
  return (
    <div className="relative max-w-xl mx-auto rounded-xl overflow-hidden shadow-lg">
      {afterImage ? (
        <ReactCompareImage
          leftImage={beforeImage}
          rightImage={afterImage}
          leftImageCss={{ width: "100%", height: "100%" }}
          rightImageCss={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div className="relative">
          <Image
            src={beforeImage}
            alt="Before"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-semibold text-lg">
            Work In Progress
          </div>
        </div>
      )}
    </div>
  );
}
