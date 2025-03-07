"use client";
import { useState, useEffect } from "react";

export default function useStickyTitle() {
  const [activeSection, setActiveSection] = useState("about");
  const [isStickyVisible, setIsStickyVisible] = useState(true);

  useEffect(() => {
    const sections = [
      { id: "about", name: "about" },
      { id: "experience", name: "experience" },
      { id: "projects", name: "projects" },
    ];

    const handleScroll = () => {
      let newActiveSection = activeSection;
      let foundVisibleSection = false;
      const scrollY = window.scrollY;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionBottom = sectionTop + element.offsetHeight;

          // If the section is in view, set it as active
          if (scrollY >= sectionTop - 100 && scrollY < sectionBottom) {
            newActiveSection = section.name;
            foundVisibleSection = true;
          } else if (!foundVisibleSection && scrollY >= sectionBottom) {
            // If scrolled past, use the next section's title
            newActiveSection =
              index < sections.length - 1
                ? sections[index + 1].name
                : section.name;
          }
        }
      });

      setActiveSection(newActiveSection);

      // Hide StickyTitle when scrolling past the last section
      const lastSection = sections[sections.length - 1];
      const lastElement = document.getElementById(lastSection.id);
      if (
        lastElement &&
        scrollY > lastElement.offsetTop + lastElement.offsetHeight
      ) {
        setIsStickyVisible(false);
      } else {
        setIsStickyVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return { activeSection, isStickyVisible };
}
