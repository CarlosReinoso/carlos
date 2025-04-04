"use client";
import Button from "@/components/property/Button";
import { envPrefix } from "@/lib/constants";
import { useState } from "react";

export default function SupportMe() {
  const [showOptions, setShowOptions] = useState(false);
  const [clickedOption, setClickedOption] = useState(null);

  const supportOptions = [
    "Donate",
    "Buy Merch",
    "Subscribe",
    "Leave a Review",
    "Share on Social Media",
    "Give Feedback",
    "Follow Me",
  ];

  const handleClick = (option) => {
    setClickedOption(option);

    if (window.gtag) {
      window.gtag("event", `${envPrefix}support_click_options`, {
        event_category: "Support",
        event_label: option,
      });
    }
  };

  const handleToggle = () => {
    setShowOptions(!showOptions);

    if (window.gtag) {
      window.gtag("event", `${envPrefix}support_button_toggle`, {
        event_category: "Support",
        event_label: showOptions ? "Closed" : "Opened",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 rounded-xl shadow-md text-center">
      <Button arrow={false} onClick={handleToggle}>
        Want To Support My Work?
      </Button>

      {showOptions && (
        <div className="mt-4 space-y-2">
          {supportOptions.map((option) => (
            <Button
              key={option}
              onClick={() => handleClick(option)}
              className={`w-full px-4 py-2 rounded text-left ${
                clickedOption === option ? "bg-green-100 text-green-700" : ""
              }`}
            >
              {option}
            </Button>
          ))}
          {clickedOption && (
            <div className="mt-4 text-sm text-third italic">
              Thanks for your support! I’ll work on{" "}
              <strong>{clickedOption.toLowerCase()}</strong> soon 🙏
            </div>
          )}
        </div>
      )}
    </div>
  );
}
