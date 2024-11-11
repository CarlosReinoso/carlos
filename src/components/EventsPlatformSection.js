"use client";
import { useState, useEffect } from "react";
import Typography from "./common/Typography";
import SVGWave from "./common/SVGWave";

const EventsPlatformSection = () => {
  return (
    <div>
      <div className="relative bg-[url('/homepage/delic-moon.jpg')] bg-cover bg-center bg-black bg-opacity-50 bg-blend-overlay h-full">
        <SVGWave style={{ transform: "scale(1, -1) translateY(0.2px)" }} />
        <Typography
          variant="h2"
          className="font-monoton text-shadow text-center"
        >
          This Month's Spotlight!
        </Typography>
      </div>
      {/* <SVGWave
        className="absolute inset-x-0 bottom-[-1%]"
        style={{ transform: "scale(-1, 1) translateY(0.2px)" }}
      /> */}
    </div>
  );
};

export default EventsPlatformSection;
