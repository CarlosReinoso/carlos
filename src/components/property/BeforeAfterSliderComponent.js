"use client";
import ReactCompareImage from "react-compare-image";
import Image from "next/image";

export default function BeforeAfterSliderComponent({
  beforeImage,
  afterImage,
}) {
  return (
    <div className="relative w-full mx-auto max-w-[800px]">
      {afterImage ? (
        <div className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-lg shadow-lg overflow-hidden">
          <ReactCompareImage
            leftImage={beforeImage}
            rightImage={afterImage}
            leftImageCss={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            rightImageCss={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ) : (
        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-lg shadow-lg overflow-hidden">
          <Image
            src={beforeImage}
            alt="Before"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-semibold text-lg">
            Work In Progress
          </div>
        </div>
      )}
    </div>
  );
}
