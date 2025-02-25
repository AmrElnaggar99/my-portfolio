import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const sections = [
  {
    title: "start",
    slide: "HeroSlide",
  },
  {
    title: "Tech Stack",
    slide: "TechStackSlide",
  },
  {
    title: "Experience",
    slide: "ProfessionalExperienceSlide",
  },
  {
    title: "Contact",
    slide: "ContactSlide",
  },
  { title: "Bonus", slide: "SpotifySlide" },
];

function StickyHeader({ active }: { active: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -36]); // Adjust the scroll distance as needed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function scrollTo(id: string) {
    if (id === "HeroSlide") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetElement = document.getElementById(id);
      targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false); // Close the menu after clicking a link
  }

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside: EventListener = (event: Event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      (event.target as HTMLDivElement).classList.contains("hamburgermenu") === false
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Attach event listeners for both mouse and touch events
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup the event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.header
        style={{
          y,
        }}
        className="fixed w-full z-50 flex justify-start lg:justify-center items-center pt-16 font-monasans font-bold"
      >
        <nav className="w-full h-18 top-9 lg:top-auto hamburgermenu lg:rounded-full gap-2 fixed lg:h-12 flex items-center lg:justify-evenly lg:p-8 lg:w-fit mx-auto backdrop-filter backdrop-blur-lg">
          {/* Hamburger Icon for Mobile */}
          <div
            className="lg:hidden p-8 w-18 h-18 hamburgermenu cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6 hamburgermenu"
              fill="white"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="hamburgermenu"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </div>

          {/* Regular Navigation Links (Hidden on Mobile) */}
          <div className="hidden lg:flex gap-2">
            {sections.map((item) => (
              <a
                key={item.title}
                onClick={() => scrollTo(item.slide)}
                className={`${
                  active === item.slide ? "bg-white text-black" : "text-white"
                } rounded-full cursor-pointer md:px-6 transition duration-300 lg:px-12 h-fit py-2 flex items-center w-fit`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>
      </motion.header>

      {/* Menu with Framer Motion animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className="lg:hidden z-50 fixed top-0 bottom-0 h-full right-0 w-64 backdrop-filter bg-white bg-opacity-5 backdrop-blur-lg shadow-lg p-6"
            initial={{ x: "100%" }} // Start off the screen to the right
            animate={{ x: 0 }} // Animate to position 0 (visible)
            exit={{ x: "100%" }} // When exiting, slide back to the right
            transition={{ type: "spring", stiffness: 200, damping: 30 }} // Animation settings
          >
            {sections.map((item) => (
              <a
                key={item.title}
                onClick={() => scrollTo(item.slide)}
                className={`${
                  active === item.slide ? "bg-white text-black" : "text-white"
                } block rounded-full cursor-pointer px-4 py-2 mb-2 transition duration-300`}
              >
                {item.title}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default StickyHeader;
