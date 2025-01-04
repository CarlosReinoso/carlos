const SpotlightModal = ({
  isModalOpen,
  currentItem,
  closeModal,
  showPreviousImage,
  showNextImage,
}) => {
  if (!isModalOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="relative bg-white p-4 rounded shadow-lg max-w-4xl w-full h-[70vh] flex flex-col sm:flex-row"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="w-full sm:w-1/2 p-2 flex justify-center">
          <img
            src={currentItem.image_url || currentItem.src}
            alt={currentItem.name}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="w-full sm:w-1/2 p-4 text-black overflow-y-auto">
          <h2 className="text-xl font-bold mb-2">{currentItem.name}</h2>
          <p className="text-sm">{currentItem.description}</p>
        </div>
        <button
          onClick={showPreviousImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
        >
          &larr;
        </button>
        <button
          onClick={showNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
        >
          &rarr;
        </button>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-black text-2xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default SpotlightModal;
