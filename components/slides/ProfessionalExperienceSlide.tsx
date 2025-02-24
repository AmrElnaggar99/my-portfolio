"use client";
import React from "react";
import Slide from "./Slide";
import { useInView } from "react-intersection-observer";

function ProfessionalExperienceSlide({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures it only animates once
    threshold: 0.3, // Triggers when 30% of the component is in view
  });

  return (
    <div
      ref={ref}
      className={`z-10 w-full min-h-fit py-12 bg-gray-900 transition-all duration-[2s] ease-out ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <Slide id="ProfessionalExperienceSlide" setActive={setActive}>
        <AnimatedHeadline>Professional Experience</AnimatedHeadline>
        <div className="md:px-12"></div>
      </Slide>
    </div>
  );
}

function AnimatedHeadline({ children }: { children: string }) {
  return (
    <>
      <div className="flex whitespace-nowrap w-full overflow-hidden">
        <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] uppercase font-monasans animate-loopText text-white">
          {children}
          <span className="w-[100px] md:w-[200px] inline-block"></span>
        </h2>
        {[0, 1].map((item) => (
          <span
            key={item}
            className="text-[clamp(2.5rem,8vw,5.5rem)] uppercase font-monasans animate-loopText text-white"
          >
            {children}
            <span className="w-[100px] md:w-[200px] inline-block"></span>
          </span>
        ))}
      </div>
    </>
  );
}

export default ProfessionalExperienceSlide;
