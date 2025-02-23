"use client";

import { useState, useEffect } from "react";
import Typography from "./common/Typography";
import ShortStoriesModal from "./ShortStoriesModal";
import supabase from "@/services/supabase/setup";

const ShortStoriesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase
        .from("keanu_short_stories")
        .select("id, title, page_count, year_written, preview, reading_time")
        .order("year_written", { ascending: true });

      if (error) {
        console.error("Error fetching stories:", error);
      } else {
        setStories(data);
      }
    };

    fetchStories();
  }, []);

  const openModal = (story) => {
    setCurrentStory(story);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStory(null);
  };

  const showNextStory = () => {
    if (!currentStory || stories.length === 0) return;
    const currentIndex = stories.findIndex(
      (story) => story.id === currentStory.id
    );
    const nextIndex = (currentIndex + 1) % stories.length;
    setCurrentStory(stories[nextIndex]);
  };

  const showPreviousStory = () => {
    if (!currentStory || stories.length === 0) return;
    const currentIndex = stories.findIndex(
      (story) => story.id === currentStory.id
    );
    const previousIndex = (currentIndex - 1 + stories.length) % stories.length;
    setCurrentStory(stories[previousIndex]);
  };

  return (
    <div
      id="short-stories"
      className="relative min-h-[100vh] mt-32 sm:mt-8 flex items-center justify-center bg-primary p-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl overflow-hidden">
        {/* Left side - Short Stories List */}
        <div className="flex flex-col justify-start items-start p-6 md:p-8 w-full">
          <Typography
            variant="h3"
            className="font-semibold tracking-widest text-lg sm:text-xl mb-2"
          >
            SHORT STORIES
          </Typography>
          <hr className="w-full border-t-2 border-gray-600 mb-4" />
          <ul className="text-gray-800 space-y-2 text-base sm:text-lg w-full">
            {stories?.length > 0 ? (
              stories.map((story) => (
                <li
                  key={story.id}
                  className="hover:text-gray-600 cursor-pointer"
                  onClick={() => openModal(story)}
                >
                  {story.title}, {story.year_written} ({story.page_count} pages)
                </li>
              ))
            ) : (
              <li className="text-gray-500">Loading stories...</li>
            )}
          </ul>
        </div>

        {/* Right side - Image */}
        <div className="flex justify-center items-center bg-secondary h-[60vh] sm:h-[70vh] md:h-[80vh] p-4 sm:px-8 md:px-12">
          <img
            src="/cats.jpg"
            alt="Cats on a wall"
            className="w-full h-full object-cover "
          />
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && currentStory && (
        <ShortStoriesModal
          isModalOpen={isModalOpen}
          currentStory={currentStory}
          closeModal={closeModal}
          showNextStory={showNextStory}
          showPreviousStory={showPreviousStory}
        />
      )}
    </div>
  );
};

export default ShortStoriesSection;
