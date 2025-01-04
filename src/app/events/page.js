"use client";
import Typography from "@/components/common/Typography";
import { useEffect, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/get");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Extract month and day from event_date
        const processedData = data.map((event) => {
          const date = new Date(event.event_date); // Parse the event_date
          const month = date.toLocaleString("default", { month: "short" }); // Get abbreviated month name
          const day = date.getDate(); // Get the day of the month
          return {
            ...event,
            month,
            day,
            dateObject: date, // Add date object for sorting purposes
          };
        });

        // Sort events by date
        processedData.sort((a, b) => a.dateObject - b.dateObject);

        setEvents(processedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen p-6">
      <Typography variant="h1" className="text-center pt-16 pb-4">
        Upcoming Events
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {events.map((event) => (
          <a
            href={event.link_url}
            target="_blank"
            rel="noopener noreferrer"
            key={event.id}
            className="block hover:no-underline h-full"
          >
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <img
                src={event.img_url}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                {/* Date Display */}
                <div className="flex items-center mb-3">
                  <div className="text-center mr-3 bg-gray-100 p-2 rounded">
                    <div className="text-xs uppercase text-gray-600">
                      {event.month}
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {event.day}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {event.title}
                    </h2>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                </div>
                <div className="flex-grow"></div>
                <p className="mt-2 text-gray-700 font-bold">{event.price}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
