"use client";

import Typography from "@/components/common/Typography";

const AboutUs = () => {
  return (
    <div className="relative text-center h-auto flex items-center justify-center bg-cover bg-center py-16 px-4">
      <div className="relative z-10 bg-white text-black p-8 rounded-lg shadow-lg max-w-6xl flex flex-col sm:flex-row">
        <div className="flex-shrink-0 sm:-ml-20">
          <img
            src="/founders-two.jpg"
            alt="Founders"
            className="rounded-lg shadow-md w-full sm:w-96 object-cover"
          />
        </div>
        <div className="flex flex-col text-left w-full sm:pl-8">
          <Typography
            variant="h2"
            className="font-emblema text-primary h-text-shadow mb-6"
          >
            About Us
          </Typography>
          <Typography variant="body1" className="mb-6">
            Luminous Ent are bringing a community of dancers together who
            co-curate the space during each event. Inspired by conscious dance
            practices, we facilitate an open format DJ set with the intention of
            connecting and flowing with the energy in the room. Each event will
            be different, as those in attendance will shape the experience with
            what they bring to the dance.
          </Typography>
          <Typography variant="body1" className="mb-6">
            Our events are all about celebrating life, love, and connection
            through heart-centered fun. With an amazing spinning soul-stirring
            afro-inspired beats, you'll move and groove with a like-minded
            community in a safe and sober environment. Embrace the magic of the
            night, connect with your inner self, and dance your heart out as we
            unite in joy and celebration.
          </Typography>
          <Typography variant="body1" className="mb-6">
            Being held around the full moons, our fun, heart-centred experience
            is an expressive outlet for whatever you have been harnessing that
            month, to leave you feeling rejuvenated for the new month
            approaching. We are creating an open forum for the community to
            input on each month’s event; sharing music that you would love to
            dance to (either composed by others or by yourself), original
            artwork to decorate the space is welcomed, as well as instruments to
            jam along and elevate the vibe, as we invite you to bring what’s
            energetically motivating you to want to dance that month.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
