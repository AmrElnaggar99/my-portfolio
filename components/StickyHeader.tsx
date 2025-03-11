import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const sections = [
  {
    title: "Home",
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
    title: "Projects",
    slide: "ProjectsSlide",
  },
  {
    title: "Contact",
    slide: "ContactSlide",
  },
];

function StickyHeader({ active }: { active: string }) {
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [offset, setOffset] = useState(0);

  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    if (currentScrollY > lastScrollY || window.innerWidth < 1024) {
      // Scrolling down, move navbar up (-36px)
      setOffset(-36);
    } else {
      // Scrolling up, put navbar in its original placement
      setOffset(0);
    }
    setLastScrollY(currentScrollY);
  });

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

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        style={{
          y: offset,
        }}
        className="fixed w-full z-50 flex justify-start lg:justify-center items-center pt-16 font-monasans font-bold transition duration-300 will-change-transform"
      >
        <nav className="w-full h-18 top-9 lg:top-auto hamburgermenu lg:rounded-full gap-2 fixed lg:h-12 flex items-center lg:justify-evenly lg:p-8 lg:w-fit mx-auto backdrop-filter backdrop-blur-lg">
          <MobileHamburgerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <DesktopNavigationMenu active={active} scrollTo={scrollTo} />
        </nav>
      </motion.header>

      <MobileNavigationMenu
        setIsMenuOpen={setIsMenuOpen}
        active={active}
        isMenuOpen={isMenuOpen}
        menuRef={menuRef}
        scrollTo={scrollTo}
      />
    </>
  );
}

function MobileHamburgerMenu({
  setIsMenuOpen,
  isMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
}) {
  return (
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
  );
}

function ActiveBackgroundEffect({
  activeRef,
  activeStyle,
}: {
  activeRef: React.Ref<HTMLDivElement> | undefined;
  activeStyle: { left: any; width: any; opacity: any };
}) {
  return (
    <div
      ref={activeRef}
      className="absolute bg-white rounded-full h-full top-0 transition-all duration-300"
      style={{
        left: activeStyle.left,
        width: activeStyle.width,
        opacity: activeStyle.opacity,
      }}
    ></div>
  );
}

function HoverBackgroundEffect({
  hoverRef,
  hoverStyle,
}: {
  hoverRef: React.Ref<HTMLDivElement> | undefined;
  hoverStyle: { left: any; width: any; opacity: any };
}) {
  return (
    <div
      ref={hoverRef}
      className="absolute bg-white bg-opacity-10 rounded-full h-full top-0"
      style={{
        left: hoverStyle.left,
        width: hoverStyle.width,
        opacity: hoverStyle.opacity,
      }}
    ></div>
  );
}

function DesktopNavigationMenu({
  active,
  scrollTo,
}: {
  active: string;
  scrollTo: (id: string) => void;
}) {
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0, opacity: 0, immediate: false });
  const [activeStyle, setActiveStyle] = useState({ left: 0, width: 0, opacity: 1 });
  const hoverRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hoverRef.current) {
      hoverRef.current.style.left = `${hoverStyle.left}px`;
      hoverRef.current.style.width = `${hoverStyle.width}px`;
      hoverRef.current.style.opacity = `${hoverStyle.opacity}`;
      hoverRef.current.style.transition = hoverStyle.immediate ? "none" : "all 0.3s ease";
    }
  }, [hoverStyle]);

  useEffect(() => {
    const updateActiveStyle = () => {
      const activeItem = document.querySelector(`[href='#${active}']`);
      if (activeItem && menuRef.current) {
        const rect = activeItem.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        setActiveStyle({
          left: rect.left - menuRect.left,
          width: rect.width,
          opacity: 1,
        });
      } else {
        setActiveStyle({
          ...activeStyle,
          opacity: 0,
        });
      }
    };
    updateActiveStyle();

    window.addEventListener("resize", updateActiveStyle);

    return () => {
      window.removeEventListener("resize", updateActiveStyle);
    };
  }, [active]);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };

    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const isHeroSlide = active === "HeroSlide";

  // Fixed width values for the two states
  const LgCompactWidth = "503px";
  const XlCompactWidth = "695px";
  const LgFullWidth = "614.2px";
  const XlFullWidth = "854px";

  return (
    <motion.div
      ref={menuRef}
      className="hidden lg:flex gap-2 relative"
      onMouseLeave={() => setHoverStyle((prev) => ({ ...prev, opacity: 0 }))}
      initial={false}
      animate={{
        width: isHeroSlide
          ? windowWidth > 1280
            ? XlCompactWidth
            : LgCompactWidth
          : windowWidth > 1280
            ? XlFullWidth
            : LgFullWidth,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <ActiveBackgroundEffect activeStyle={activeStyle} activeRef={activeRef} />
      <HoverBackgroundEffect hoverStyle={hoverStyle} hoverRef={hoverRef} />

      {sections.map((item) => {
        const isActive = active === item.slide;
        return (
          <a
            key={item.title}
            href={`#${item.slide}`}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(item.slide);
            }}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const menuRect = menuRef.current!.getBoundingClientRect();
              const isNewHover = hoverStyle.opacity === 0;
              setHoverStyle({
                left: rect.left - menuRect.left,
                width: rect.width,
                opacity: 1,
                immediate: isNewHover,
              });
            }}
            className={`text-nowrap relative z-10 rounded-full cursor-pointer md:px-6 transition duration-300 lg:px-6 xl:px-12 h-fit py-2 items-center w-fit ${
              isActive ? "text-black" : "text-white"
            } ${isHeroSlide && item.slide === "ContactSlide" ? "hidden" : "flex"}`}
          >
            {item.title}
          </a>
        );
      })}
    </motion.div>
  );
}

function MobileNavigationMenu({
  setIsMenuOpen,
  scrollTo,
  isMenuOpen,
  menuRef,
  active,
}: {
  scrollTo: (id: string) => void;
  isMenuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  active: string;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className="lg:hidden z-[70] fixed top-0 bottom-0 h-full right-0 w-64 backdrop-blur-3xl shadow-lg p-6"
            initial={{
              x: "100%",
            }} // Start off the screen to the right
            animate={{
              x: 0,
            }} // Animate to position 0 (visible)
            exit={{
              x: "100%",
            }} // When exiting, slide back to the right
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 30,
            }}
          >
            {sections.map((item) => (
              <a
                key={item.title}
                href={`#${item.slide}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.slide);
                }}
                className={`${active === item.slide ? "bg-white text-gray-800" : "font-normal text-white"} rounded-full block cursor-pointer px-4 py-2 mb-2 transition duration-300`}
              >
                {item.title}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[60] inset-0"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default StickyHeader;
