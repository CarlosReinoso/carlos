"use client";
import { useState, useEffect } from "react";

const SpotlightForm = () => {
  const [name, setName] = useState("testName");
  const [description, setDescription] = useState("desc");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [positionError, setPositionError] = useState(false);
  const [position, setPosition] = useState("");

  useEffect(() => {
    // Parse the position parameter from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const pos = searchParams.get("position");

    if (!pos || !["1", "2", "3"].includes(pos)) {
      setPositionError(true);
    } else {
      setPosition(pos);
      setPositionError(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!position || !["1", "2", "3"].includes(position)) {
      setMessage(
        "Set a valid position in the URL `.../spotlight?position=1`, `2`, or `3`"
      );
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("position", position); // Append the position to the form data

      // Send the data to the API endpoint
      const response = await fetch("/api/spotlight/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload data");
      }

      // Optionally handle the response data
      const result = await response.json();
      console.log("API Response:", result);

      setMessage("Added successfully!");
      setName("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while adding the information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {positionError ? (
        <div className="text-red-500 p-4 pt-16">
          Set a valid position in the URL like `.../spotlight?position=1`, `2`,
          or `3`
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 p-4 pt-12"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
          {message && <p>{message}</p>}
        </form>
      )}
    </>
  );
};

export default SpotlightForm;
