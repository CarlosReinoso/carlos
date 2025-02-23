"use client";
import Typography from "./common/Typography";

const ShortStoriesModal = ({
  currentStory,
  isModalOpen,
  closeModal,
  showNextStory,
  showPreviousStory,
}) => {
  return (
    <div className="relative min-h-[100vh] mt-32 sm:mt-8 flex items-center justify-center bg-primary p-4">
      {/* Modal */}
      {isModalOpen && currentStory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg shadow-lg w-full max-w-5xl flex flex-col sm:flex-row overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Left side - Text Content */}
            <div className="w-full sm:w-2/3 p-6 px-10 overflow-y-auto max-h-[80vh]">
              <Typography
                variant="h4"
                className="font-bold text-lg sm:text-xl mb-2"
              >
                {currentStory.title}, {currentStory.year_written}
              </Typography>
              <hr className="border-t-2 border-gray-600 mb-4" />
              <Typography
                variant="body1"
                className="text-gray-800 text-sm sm:text-base leading-relaxed"
              >
                {currentStory.preview}
              </Typography>
            </div>

            {/* Right side - Info */}
            <div className="w-full sm:w-1/3 bg-gray-100 p-4 border-l border-gray-300 flex flex-col justify-start">
              <Typography
                variant="body2"
                className="font-semibold mb-2 text-gray-700"
              >
                Information
              </Typography>
              <ul className="text-gray-700 text-sm sm:text-base space-y-1">
                <li>
                  <strong>Page count:</strong>{" "}
                  {currentStory.page_count || "N/A"}
                </li>
                <li>
                  <strong>Reading time:</strong>{" "}
                  {currentStory.reading_time || "N/A"} minutes
                </li>
                <li>
                  <strong>Written:</strong> {currentStory.year_written || "N/A"}
                </li>
              </ul>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPreviousStory();
              }}
              className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none hover:bg-gray-700"
            >
              &larr;
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNextStory();
              }}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none hover:bg-gray-700"
            >
              &rarr;
            </button>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 text-2xl font-bold hover:text-black"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortStoriesModal;
