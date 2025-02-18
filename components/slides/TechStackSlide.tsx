import React from "react";
import AnimatedHead from "@/components/animations/AnimatedHead";
import Slide from "./Slide";
import SlidingText from "../animations/SlidingText";

function TechStackSlide() {
  return (
    <Slide className="z-10 w-full flex min-h-fit bg-gray-950 p-12">
      <h2 className="text-6xl block w-full font-monasans text-left font-bold text-white">
        <AnimatedHead>My Tech Stack</AnimatedHead>
        <div className="text-gray-500 text-sm text-left font-light mt-4">
          <SlidingText>My go-to tools for crafting modern applications.</SlidingText>
        </div>
      </h2>
    </Slide>
  );
}

export default TechStackSlide;
