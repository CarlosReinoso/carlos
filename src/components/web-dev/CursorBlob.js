"use client";
import { useState, useEffect } from "react";

const CursorBlob = () => {
  const [position, setPosition] = useState({ x: -10, y: -10 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-4 h-4 bg-white/10 backdrop-blur-sm rounded-full pointer-events-none transition-transform duration-100"
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
      }}
    />
  );
};

export default CursorBlob;
