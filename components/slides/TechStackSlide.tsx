import React, { useState } from "react";
import AnimatedHead from "@/components/animations/AnimatedHead";
import Slide from "./Slide";
import SlidingText from "@/components/animations/SlidingText";
import BubbleCloud from "@/components/BubbleCloud";
import { FiSearch } from "react-icons/fi";
import MyTechStackArray from "@/utils/MyTechStackArray";

function TechStackSlide() {
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
    <Slide className="z-10 w-full min-h-fit bg-gray-950 py-12 md:px-12">
      <div className="w-full h-fit items-center px-12 md:px-0">
        <h2 className="text-6xl block w-full font-monasans text-center font-bold text-white">
          <AnimatedHead>My Tech Stack</AnimatedHead>
          <div className="text-gray-400 text-sm text-center font-light mt-4">
            <SlidingText>My go-to tools for crafting modern applications.</SlidingText>
          </div>
          <div className="text-gray-500 text-sm text-center font-light">
            <SlidingText>Larger bubbles represent greater expertise in a skill.</SlidingText>
          </div>
        </h2>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <div className="flex space-x-4 mb- h-10">
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
        <div className="relative ml-6 min-w-32">
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
