"use client";
import React, { useState } from "react";
import AnimatedHead from "@/components/animations/AnimatedHead";
import Slide from "./Slide";
import SlidingText from "@/components/animations/SlidingText";
import BubbleCloud from "@/components/BubbleCloud";
import { FiSearch } from "react-icons/fi";
import MyTechStackArray from "@/utils/MyTechStackArray";

function TechStackSlide({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter("All");
    setSearchQuery(event.target.value);
  };

  const filteredItems = MyTechStackArray.filter(
    (item) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedFilter === "All" || item.category === selectedFilter.toLowerCase()),
  );

  return (
    <Slide
      id="TechStackSlide"
      setActive={setActive}
      className="z-10 w-full min-h-fit bg-gray-950 py-12 md:px-12"
    >
      <div className="w-full h-fit items-center px-12 md:px-0">
        <h2 className="text-6xl block w-full font-monasans text-center font-bold text-white">
          <AnimatedHead>My Tech Stack</AnimatedHead>
          <div className="text-gray-400 text-sm text-center font-light">
            <SlidingText>Larger bubbles represent greater expertise in a skill.</SlidingText>
          </div>
        </h2>
      </div>
      <div className="mt-5 flex max-w-[800px] mx-auto items-center justify-center gap-6 flex-wrap p-3">
        <div className="flex min-h-10 flex-wrap gap-2">
          {["All", "Frontend", "Backend", "Database", "Others"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300
            ${
              selectedFilter === filter
                ? "bg-white text-black"
                : "bg-transparent border border-white hover:bg-white hover:text-black text-gray-300"
            }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative my-2 flex-1 min-w-[300px] max-w-[427px]">
          <input
            type="text"
            placeholder="Search technologies"
            value={searchQuery}
            onChange={handleSearchChange}
            className="focus-visible:bg-white hover:bg-white hover:text-black transition duration-300 focus-visible:text-black pr-4 pl-12 py-2 rounded-full border border-white text-white bg-transparent focus:outline-none w-full"
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

export default TechStackSlide;
