"use client";
import { useState, useEffect } from "react";
import Typography from "@/components/common/Typography";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("/api/playlists");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPlaylists(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return (
      <Typography variant="body1" className="text-center text-white">
        Loading playlists...
      </Typography>
    );
  }

  return (
    <div className="bg-second text-white py-16 px-8">
      <div className="max-w-7xl mx-auto mb-12">
        <Typography variant="h1" element="h1" className="mb-4">
          Monthly Luminous Recordings
        </Typography>
        <Typography variant="body1" element="p" className="mb-8">
          Why not listen to the magic playlists from our very own Luminous DJ
          Gumbo over and over and over again.
        </Typography>
        <div className={"space-y-4"}>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <iframe
              src={
                "https://w.soundcloud.com/player/?visual=false&url=https%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F1763646651&show_artwork=true&color=%23ff5500&show_comments=true&show_playcount=true"
              }
              width="100%"
              height="450"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
          <Typography variant="h1" element="h1" className="mb-4 pt-8">
            Monthly Requests
          </Typography>
          <Typography variant="body1" element="p" className="mb-8">
            Access song requests for previous Luminous events.
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {playlists.map((playlist, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <iframe
                  title={`Playlist ${index + 1}`}
                  src={playlist.url}
                  width="100%"
                  height="450"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
