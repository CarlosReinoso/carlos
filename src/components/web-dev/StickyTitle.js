"use client";
import { useState, useEffect } from "react";
import Typography from "../common/Typography";

const StickyTitle = ({ contentTitle }) => {
  const [title, setTitle] = useState("ABOUT");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "about", name: "About" },
        { id: "experience", name: "Experience" },
        { id: "projects", name: "Projects" },
      ];

      const scrollY = window.scrollY;
      let activeTitle = title; // Default to current title

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionBottom = sectionTop + element.offsetHeight;

          if (scrollY >= sectionTop - 100 && scrollY < sectionBottom) {
            activeTitle = section.name;
          } else if (scrollY >= sectionBottom && index < sections.length - 1) {
            activeTitle = sections[index + 1].name;
          }
        }
      });

      setTitle(activeTitle);

      // Hide StickyTitle if completely scrolled past last section
      const lastSection = sections[sections.length - 1];
      const lastElement = document.getElementById(lastSection.id);
      if (
        lastElement &&
        scrollY > lastElement.offsetTop + lastElement.offsetHeight
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-20 -mx-6 mb-4 w-screen bg-third/75 px-6 py-5 backdrop-blur-md transition-all duration-300 
                  md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 
                  ${!isVisible ? "opacity-0" : "opacity-100"}`}
    >
      <Typography variant="h6" className="text-white uppercase mb-0">
        {isVisible ? title : contentTitle}
      </Typography>
    </div>
  );
};

export default StickyTitle;
