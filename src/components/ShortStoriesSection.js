"use client";
import { useState, useEffect } from "react";
import Button from "./common/Button";
import SVGWave from "./common/SVGWave";
import Typography from "./common/Typography";

const ShortStoriesSection = () => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch("/api/events/luminous");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEventData(data);
      } catch (err) {
        console.error("Error fetching event:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  if (loading) {
    return (
      <div className="relative text-center h-[80vh] flex items-center justify-center">
        <Typography variant="h2" className="font-playfair text-white">
          Loading event...
        </Typography>
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <div className="relative text-center h-[80vh] flex items-center justify-center">
        <Typography variant="h2" className="font-playfair text-white">
          {error ? `Error: ${error}` : "Event not found."}
        </Typography>
      </div>
    );
  }

  const { raw_date, location, link_url } = eventData;

  return (
    <div
      className="relative text-center h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("/homepage/moon-dance-two.jpeg")`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 bg-white text-black p-6 rounded-lg shadow-lg flex flex-col items-center max-w-md">
        <div className="decorative-square"></div>
        <Typography
          variant="h4"
          className="font-emblema text-primary h-text-shadow mb-4"
        >
          Luminous Next Event
        </Typography>
        <Typography variant="body1" className="mb-2">
          {raw_date}
        </Typography>
        <Typography variant="body1" className="mb-4">
          {location}
        </Typography>
        {link_url && (
          <Button onClick={() => window.open(link_url, "_blank")}>
            Get Your Tickets Here
          </Button>
        )}
      </div>

      <SVGWave className="absolute inset-x-0 bottom-[-1%]" />
    </div>
  );
};

export default ShortStoriesSection;
