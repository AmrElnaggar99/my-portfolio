import React, { useState } from "react";
import AnimatedHead from "@/components/animations/AnimatedHead";
import Slide from "./Slide";
import SlidingText from "@/components/animations/SlidingText";
import BubbleCloud, { ItemsList } from "@/components/BubbleCloud";

function TechStackSlide() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const bubblesData: ItemsList[] = [
    { id: 1, proficiency: 90, color: "bg-red-500", text: "React", category: "frontend" },
    { id: 2, proficiency: 80, color: "bg-blue-500", text: "Next", category: "frontend" },
    { id: 3, proficiency: 60, color: "bg-green-500", text: "Java", category: "backend" },
    { id: 4, proficiency: 75, color: "bg-yellow-500", text: "Spring Boot", category: "backend" },
    { id: 5, proficiency: 50, color: "bg-purple-500", text: "MongoDB", category: "database" },
  ];

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const filteredItems =
    selectedFilter === "all"
      ? bubblesData
      : bubblesData.filter((item) => item.category === selectedFilter);
  return (
    <Slide className="z-10 w-full min-h-fit bg-gray-950 p-12">
      <div className="flex justify-between w-full h-fit items-center">
        <h2 className="text-6xl block w-full font-monasans text-left font-bold text-white">
          <AnimatedHead>My Tech Stack</AnimatedHead>
          <div className="text-gray-500 text-sm text-left font-light mt-4">
            <SlidingText>My go-to tools for crafting modern applications.</SlidingText>
          </div>
        </h2>
        <div className="flex space-x-4 mb- h-10">
          {["all", "frontend", "backend", "database", "devops", "Mobile"].map((filter) => (
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
      </div>

      <div className="space-y-10">
        <BubbleCloud data={filteredItems} />
      </div>
    </Slide>
  );
}

export default TechStackSlide;
