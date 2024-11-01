import MasonryGallery from "./common/MasonryGallery.js";
import Typography from "./common/Typography.js";

const images = [
  {
    src: "/gallery/image1.webp",
    alt: "Image 1",
    width: 800,
    height: 600,
  },
  {
    src: "/gallery/image2.webp",
    alt: "Image 2",
    width: 400,
    height: 400,
  },
  {
    src: "/gallery/image3.webp",
    alt: "Image 3",
    width: 400,
    height: 400,
  },
  {
    src: "/gallery/image4.webp",
    alt: "Image 4",
    width: 400,
    height: 400,
  },
  {
    src: "/gallery/image5.webp",
    alt: "Image 5",
    width: 400,
    height: 400,
  },
];

const GallerySection = () => {
  return (
    <div className="md:px-20 sm:px-0">
      <Typography variant="h3" className="text-center">
        Gallery
      </Typography>
      <MasonryGallery images={images} />
    </div>
  );
};

export default GallerySection;
