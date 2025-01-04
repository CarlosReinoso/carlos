"use client";
import { useState, useEffect } from "react";
import Typography from "./common/Typography";
import SVGWave from "./common/SVGWave";
import SpotlightModal from "./SpotlightModal";

const fallbackImages = [
  { src: "/homepage/strawberry-moon.jpg", name: "Carlos Reinoso", description: "Default description 1" },
  { src: "/homepage/delic-moon.jpg", name: "Person 2", description: "Default description 2" },
  { src: "/homepage/moon-dance.jpg", name: "Person 3", description: "Default description 3" },
];

const SpotlightSection = () => {
  const [spotlighters, setSpotlighters] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const openModal = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const showPreviousImage = () => {
    setCurrentItem((prev) => {
      const currentIndex = spotlighters.findIndex((item) => item === prev);
      const newIndex = currentIndex === 0 ? spotlighters.length - 1 : currentIndex - 1;
      return spotlighters[newIndex] || fallbackImages[newIndex];
    });
  };

  const showNextImage = () => {
    setCurrentItem((prev) => {
      const currentIndex = spotlighters.findIndex((item) => item === prev);
      const newIndex = (currentIndex + 1) % (spotlighters.length || fallbackImages.length);
      return spotlighters[newIndex] || fallbackImages[newIndex];
    });
  };

  useEffect(() => {
    const fetchSpotlighters = async () => {
      try {
        const response = await fetch("/api/spotlight/get");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.length > 0) {
          setSpotlighters(data);
        } else {
          setSpotlighters(fallbackImages);
        }
      } catch (err) {
        console.error(err.message);
        setSpotlighters(fallbackImages);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotlighters();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const displayItems = spotlighters.length > 0 ? spotlighters : fallbackImages;

  return (
    <div>
      <div className="relative h-[105vh] 2xl:h-[115vh] bg-[url('/homepage/delic-moon.jpg')] bg-cover bg-center bg-black bg-opacity-50 bg-blend-overlay">
        <SVGWave
          style={{
            transform: "scale(-1, -1) translateY(0.2px)",
          }}
        />

        <Typography
          variant="h2"
          className="font-monoton text-shadow text-center"
        >
          This Month's Spotlight!
        </Typography>

        <div className="flex justify-center w-full relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
            {displayItems.map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative cursor-pointer w-64 sm:w-80 h-64 sm:h-80 mx-auto overflow-hidden rounded-full">
                  <img
                    src={item.image_url || item.src}
                    alt={`Spotlight ${item.name}`}
                    className="w-full h-full object-cover rounded-full shadow-md"
                    onClick={() => openModal(item)}
                  />
                  <div className="font-neucha absolute bottom-0 w-full bg-primary bg-opacity-70 text-white text-lg font-semibold py-5">
                    {item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SpotlightModal
          isModalOpen={isModalOpen}
          currentItem={currentItem}
          closeModal={closeModal}
          showPreviousImage={showPreviousImage}
          showNextImage={showNextImage}
        />

        <SVGWave
          className="absolute inset-x-0 bottom-[-1%]"
          style={{ transform: "scale(-1, 1) translateY(0.2px)" }}
        />
      </div>
    </div>
  );
};

export default SpotlightSection;
