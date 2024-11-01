import Image from "next/image";
import MarkdownContent from "../../lib/MarkdownContent";
import Button from "./Button";

export default function TextAndImageSection({
  markdownFilePath,
  imgSrc,
  imgAlt,
  bgColor,
  imagePosition = "right",
  buttonText,
  buttonUrl,
}) {
  const isImageLeft = imagePosition === "left";

  return (
    <div
      className={`flex flex-col md:flex-row items-center p-4 ${bgColor} my-10`}
    >
      <div
        className={`md:w-1/2 p-4 ${
          isImageLeft ? "md:order-last" : "md:order-first"
        } `}
        style={{ color: "white" }}
      >
        <MarkdownContent markdownFilePath={markdownFilePath} />
        {buttonText && buttonUrl && (
          <Button buttonUrl={buttonUrl} buttonText={buttonText} />
        )}
      </div>
      <div
        className={`flex justify-center md:w-1/2 p-4 ${
          isImageLeft ? "md:order-first" : "md:order-last"
        }`}
      >
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={500}
          height={500}
          className="w-full h-auto img-shadow responsive-image"
          style={{ maxHeight: "100vh", width: "auto" }}
        />
      </div>
    </div>
  );
}
