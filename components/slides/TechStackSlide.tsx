"use client";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import AnimatedHead from "@/components/animations/AnimatedHead";
import Slide from "./Slide";
import SlidingText from "@/components/animations/SlidingText";
import BubbleCloud from "@/components/BubbleCloud";
import { FiSearch } from "react-icons/fi";
import MyTechStackArray from "@/utils/MyTechStackArray";
import { motion } from "framer-motion";

function TechStackSlide({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [selectedFilter, setSelectedFilter] = useState<string>("frontend");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState(MyTechStackArray);
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter("All");
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filtered = MyTechStackArray.filter(
      (item) =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedFilter.toLowerCase() === "all" || item.category === selectedFilter.toLowerCase()),
    );
    setFilteredItems(filtered);
  }, [searchQuery, selectedFilter]);

  return (
    <Slide
      id="TechStackSlide"
      setActive={setActive}
      className="z-10 w-full min-h-fit bg-gray-950 py-12 md:px-12"
    >
      <div className="w-full h-fit items-center px-12 md:px-0">
        <h2
          className="text-[clamp(2.5rem,8vw,3.5rem)] block w-full font-monasans text-center font-bold"
          tabIndex={0}
        >
          <AnimatedHead
            className="text-gradient from-[#605E66] via-[#C5C4C6] to-[#605E66] text-transparent bg-clip-text [background-size:100%_100%] [background-position:0%] 
      [background-image:linear-gradient(to_right,#605E66_0%,#C5C4C6_22%,#C5C4C6_76%,#605E66_100%)]"
          >
            My Tech Stack
          </AnimatedHead>
        </h2>
        <div className="text-white text-sm text-center font-light py-4" tabIndex={0}>
          <SlidingText>Larger bubbles represent greater expertise in a skill.</SlidingText>
        </div>
      </div>
      <div className="mt-5 flex max-w-[800px] mx-auto items-center justify-center gap-4 lg:gap-6 flex-wrap p-3">
        <FilterButtons selectedFilter={selectedFilter} handleFilterChange={handleFilterChange} />
        <div className="relative my-2 flex-1 min-w-[300px] max-w-[448.4px]">
          <input
            type="text"
            placeholder="Search technologies"
            value={searchQuery}
            onChange={handleSearchChange}
            className="relative flex flex-wrap gap-2 py-0 isolate w-full select-none bg-white/5 sm:rounded-full rounded-md h-[44px] focus-visible:bg-white/10 hover:bg-white/10 hover:text-white transition duration-300 focus-visible:text-white pr-4 pl-12 border-white text-white focus:outline-none"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <FiSearch className="text-gray-400 text-xl" />
          </div>
        </div>
      </div>
      <div className="space-y-10">
        <BubbleCloud data={filteredItems} />
      </div>
    </Slide>
  );
}

const FilterButtons = ({
  selectedFilter,
  handleFilterChange,
}: {
  selectedFilter: string;
  handleFilterChange: (filter: string) => void;
}) => {
  const [activeStyle, setActiveStyle] = useState({ left: 0, width: 0, opacity: 1, top: 0 });
  const activeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const filters = ["All", "Frontend", "Backend", "Database", "Others"];

  const updateActiveStyle = useCallback(() => {
    requestAnimationFrame(() => {
      const activeItem = document.querySelector(`[data-filter='${selectedFilter.toLowerCase()}']`);
      if (activeItem && containerRef.current) {
        const rect = activeItem.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setActiveStyle({
          left: rect.left - containerRect.left,
          top: rect.top - containerRect.top,
          width: rect.width,
          opacity: 1,
        });
      }
    });
  }, [selectedFilter]);

  useLayoutEffect(() => {
    updateActiveStyle();
    window.addEventListener("resize", updateActiveStyle);
    return () => window.removeEventListener("resize", updateActiveStyle);
  }, [updateActiveStyle]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap gap-2 p-1 isolate w-fit select-none bg-white/5 sm:rounded-full rounded-md min-h-[44px]"
    >
      <ActiveBackgroundEffect activeStyle={activeStyle} activeRef={activeRef} />

      {filters.map((filter) => (
        <button
          key={filter}
          data-filter={filter.toLowerCase()}
          onClick={() => handleFilterChange(filter)}
          className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
            selectedFilter.toLowerCase() === filter.toLowerCase()
              ? "text-white font-semibold"
              : "text-gray-300 hover:text-white"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

function ActiveBackgroundEffect({
  activeRef,
  activeStyle,
}: {
  activeRef: React.RefObject<HTMLDivElement | null>;
  activeStyle: {
    left: number;
    width: number;
    opacity: number;
    top: number;
  };
}) {
  return (
    <motion.div
      ref={activeRef}
      className="absolute h-[36px] bg-gray-950 rounded-full flex items-center justify-center transition-colors duration-300 font-bold z-0"
      initial={activeStyle}
      animate={activeStyle}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    />
  );
}

export default TechStackSlide;
