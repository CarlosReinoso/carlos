"use client";
import { useState, useEffect } from "react";
import Button from "./common/Button";
import SVGWave from "./common/SVGWave";
import Typography from "./common/Typography";

const UpcomingEvent = () => {
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
        <Typography variant="h2" className="font-monoton text-white">
          Loading event...
        </Typography>
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <div className="relative text-center h-[80vh] flex items-center justify-center">
        <Typography variant="h2" className="font-monoton text-white">
          {error ? `Error: ${error}` : "Event not found."}
        </Typography>
      </div>
    );
  }

  const { raw_date, location, img_url, link_url } = eventData;

  return (
    <div
      className="relative text-center h-[80vh] bg-cover bg-center"
      style={{
        backgroundImage: `url("/homepage/strawberry-moon.jpg")`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10">
        <Typography
          variant="h2"
          className="font-monoton pt-20 opacity-90 text-shadow text-white"
        >
          Luminous Next Event
        </Typography>
        <div className="container max-w-full flex justify-center pt-0 sm:pt-20">
          <div className="w-[900px] grid grid-cols-12 auto-rows-auto justify-items-center relative">
            <div className="col-span-10 sm:col-span-8 col-start-1">
              <img
                src={img_url || "/homepage/moon-dance.jpg"}
                alt="Event Image"
                className="rounded"
              />
            </div>

            <div className="col-span-8 sm:col-span-10 col-start-1 sm:col-start-7 md:col-start-7 col-end-13 absolute top-full sm:top-[20%] md:top-[22%] transform -translate-y-1/4 z-20 p-4 bg-white text-black flex flex-col rounded">
              <div className="decorative-square"></div>

              <Typography
                variant="h4"
                className="font-emblema text-primary h-text-shadow"
              >
                Luminous Conscious Dance
              </Typography>
              <Typography variant="body1">{raw_date}</Typography>
              <Typography variant="body1">{location}</Typography>
              {link_url && (
                <Button onClick={() => window.open(link_url, "_blank")}>
                  Get Your Tickets Here
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <SVGWave className="absolute inset-x-0 bottom-[-1%]" />
    </div>
  );
};

export default UpcomingEvent;
