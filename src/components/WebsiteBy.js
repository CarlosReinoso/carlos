"use client";

import React, { useState } from "react";

const WebsiteBy = () => {
  const underlineAnimationStyles = {
    position: "relative",
    color: "inherit",
    textDecoration: "none",
  };

  const underlineAfterStyles = {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "2px",
    bottom: "0",
    left: "0",
    backgroundColor: "currentColor",
    transform: "scaleX(0)",
    transformOrigin: "bottom right",
    transition: "transform 0.25s ease-out",
  };

  const underlineHoverAfterStyles = {
    transform: "scaleX(1)",
    transformOrigin: "bottom left",
  };

  return (
    <div className="bg-secondary py-6">
      {/* WebsiteBy Text Section */}
      <div className="text-center text-white mt-4">
        <p style={{ fontSize: "13px" }}>
          Website by{" "}
          <a
            href="mailto:carlosrwebs@gmail.com"
            style={underlineAnimationStyles}
            onMouseEnter={(e) => {
              const after = e.currentTarget.querySelector("span");
              if (after) Object.assign(after.style, underlineHoverAfterStyles);
            }}
            onMouseLeave={(e) => {
              const after = e.currentTarget.querySelector("span");
              if (after) after.style.transform = "scaleX(0)";
            }}
          >
            Carlos Reinoso
            <span
              style={{
                ...underlineAfterStyles,
                position: "absolute",
                bottom: "-2px",
                display: "block",
              }}
            />
          </a>
        </p>
      </div>
    </div>
  );
};

export default WebsiteBy;
