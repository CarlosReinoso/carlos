"use client";
import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import LoadingSpinner from "../common/LoadingSpinner";

export default function MusicPlayer() {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [canAutoPlay, setCanAutoPlay] = useState(false);
  const audioRef = useRef(null);

  // Fetch tracks on mount
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await fetch("/api/music");
        const data = await res.json();
        setTracks(data);
      } catch (err) {
        console.error("Failed to load tracks", err);
      }
    };

    fetchTracks();
  }, []);

  // Enable autoplay on scroll (mobile) or mouseenter (desktop)
  useEffect(() => {
    const handleScroll = () => {
      setCanAutoPlay(true);
      window.removeEventListener("scroll", handleScroll);
    };

    const handleMouseEnter = () => {
      setCanAutoPlay(true);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };

    if (window.innerWidth < 768) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Actually trigger .play() on scroll/hover
  useEffect(() => {
    if (canAutoPlay && audioRef.current) {
      const audio = audioRef.current.audio.current;
      audio?.play().catch((err) => {
        console.warn("Autoplay blocked:", err.message);
      });
    }
  }, [canAutoPlay]);

  const handleClickNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handleClickPrevious = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  if (tracks.length === 0) return <LoadingSpinner />;

  const currentTrack = tracks[currentTrackIndex];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md text-white p-4 flex items-center gap-4 border-t border-zinc-800">
      {currentTrack.cover && (
        <img
          src={currentTrack.cover}
          alt="Album Art"
          className="w-16 h-16 rounded-md object-cover"
        />
      )}

      <div className="flex-1">
        <div className="flex items-center gap-4">
          <div className="flex flex-col justify-center overflow-hidden flex-1">
            <h6 className="text-sm sm:text-base font-semibold truncate text-white capitalize !mb-1">
              {currentTrack.title}
            </h6>
            <p className="text-xs sm:text-sm text-neutral-400 truncate !mb-0">
              {currentTrack.artist}
            </p>

            <AudioPlayer
              ref={audioRef}
              autoPlay={false}
              src={currentTrack.src}
              onEnded={handleClickNext}
              showJumpControls={false}
              showSkipControls={false}
              onClickPrevious={handleClickPrevious}
              onClickNext={handleClickNext}
              layout="horizontal-reverse"
              customAdditionalControls={[]}
              customVolumeControls={[]}
              className="!bg-transparent !text-white !p-0 !pb-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
