"use client";

import Typography from "@/components/common/Typography";

const playlists = [
  {
    title: "Monthly Luminous Recordings",
    description:
      "Why not listen to the magic playlists from our very own Luminous DJ Gumbo over and over and over again.",
    embedUrl: [
      "https://w.soundcloud.com/player/?visual=false&url=https%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F1763646651&show_artwork=true&color=%23ff5500&show_comments=true&show_playcount=true",
    ],
  },
  {
    title: "Monthly Requests",
    description:
      "Access song requests for previous Luminous events.",
    embedUrl: [
      "https://open.spotify.com/embed?uri=spotify%3Aplaylist%3A5jzZEBiLCsA6cDIBZM5wLW",
      "https://open.spotify.com/embed?uri=spotify%3Aplaylist%3A6hiiz88d05jnClDeZtPigP",
      "https://open.spotify.com/embed?uri=spotify%3Aplaylist%3A6lo399oRLW9coMsIvHcgo3",
      "https://open.spotify.com/embed?uri=spotify%3Aplaylist%3A6hFRicYjeSLKECNovQ7eB6",
      "https://open.spotify.com/embed?uri=spotify%3Aplaylist%3A0K7LvhBosWFOVAJDaLaKVk",
      "https://open.spotify.com/embed?uri=spotify%3Aplaylist%3A43O2Ui4GKw28pe1Zn0u2T3",
      "https://open.spotify.com/embed?uri=spotify%3Aplaylist%3A77stpfoOEgTam4N4RtFa6H",
    ],
  },
];

const Playlists = () => {
  return (
    <div className="bg-second text-white py-16 px-8">
      {playlists.map((playlist, index) => (
        <div key={index} className="max-w-7xl mx-auto mb-12">
          <Typography variant="h1" className="mb-4">
            {playlist.title}
          </Typography>
          <Typography variant="body1" className="mb-8">
            {playlist.description}
          </Typography>
          {playlist.title === "Monthly Requests" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {playlist.embedUrl.map((url, urlIndex) => (
                <div
                  key={urlIndex}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <iframe
                    title={`${playlist.title} ${urlIndex + 1}`}
                    src={url}
                    width="100%"
                    height="450"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  ></iframe>
                </div>
              ))}
            </div>
          ) : (
            playlist.embedUrl.map((url, urlIndex) => (
              <div
                key={urlIndex}
                className="bg-white rounded-lg overflow-hidden shadow-md mb-4"
              >
                <iframe
                  title={`${playlist.title} ${urlIndex + 1}`}
                  src={url}
                  width="100%"
                  height="450"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default Playlists;
