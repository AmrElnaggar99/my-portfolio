"use client";

import GridDotsBackground from "@/components/GridDotsBackground";
import Slide from "./Slide";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectCard from "../ProjectCard";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "This website",
    description: ["Built with Next.js, TypeScript, and Tailwind CSS"],
    date: "February 2025",
    learnMoreURL:
      "https://github.com/AmrElnaggar99/my-portfolio/?tab=readme-ov-file#amr-elnaggar---personal-website-documentation",
  },
  {
    title: "E-commerce application",
    description: [
      "Built with Node.js, Express, React, Redux, MongoDB.",
      "Offers PayPal integration.",
    ],
    date: "December 2020",
    demoURL: "https://mern-ecommerce-yuvr.onrender.com/",
    learnMoreURL:
      "https://github.com/AmrElnaggar99/MERN_ecommerce?tab=readme-ov-file#mern-e-commerce",
  },
];

function ProjectsSlide({ setActive }: { setActive: React.Dispatch<React.SetStateAction<string>> }) {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 1,
  });
  return (
    <Slide
      id="ProjectsSlide"
      className="relative w-full min-h-fit bg-gray-950"
      setActive={setActive}
    >
      <div className="relative z-20 p-6 font-monasans items-center text-center">
        <div className="md:px-12">
          <div ref={ref} className="h-fit overflow-hidden flex justify-center">
            <motion.span
              initial={{ y: 100 }}
              animate={{ y: inView ? 0 : 100 }}
              transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
              tabIndex={0}
              aria-label="My side projects"
            >
              <Headline>My side projects</Headline>
            </motion.span>
          </div>
          <div ref={ref} className="h-fit overflow-hidden flex justify-center">
            <motion.span
              initial={{ y: 100 }}
              animate={{ y: inView ? 0 : 100 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
            >
              <span className="text-sm text-gray-400 font-normal block" tabIndex={0}>
                Projects showcasing my full-stack expertise across diverse technologies
              </span>
            </motion.span>
          </div>
          <div className="pb-10 pt-3 mt-5 flex gap-12 justify-center flex-wrap">
            {projects.map((item) => (
              <ProjectCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
      <GridDotsBackground />
    </Slide>
  );
}

const Headline = ({ children }: { children: string }) => {
  const comicFont = { class: "font-sigmar" };
  const defaultFont = { class: "font-monasans" };
  const [letterStyles, setLetterStyles] = useState(new Array(children.length).fill(defaultFont));
  const [isHoverEnabled, setIsHoverEnabled] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsHoverEnabled(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (!isHoverEnabled) return;
    setLetterStyles((prev) => prev.map((font, i) => (i === index ? comicFont : font)));
  };

  const handleMouseLeave = (index: number) => {
    if (!isHoverEnabled) return;
    setTimeout(() => {
      setLetterStyles((prev) => prev.map((font, i) => (i === index ? defaultFont : font)));
    }, 1000);
  };

  return (
    <div className="inline-block overflow-hidden">
      <h2
        className="flex mb-2 text-[clamp(2.5rem,8vw,3.5rem)] text-white leading-[1.1] 
        transition-transform duration-1000 cursor-default ease-in-out origin-left scale-x-100"
      >
        {children.split("").map((char, index) =>
          char === " " ? (
            <span key={index} className="w-[0.2em] inline-block">
              &nbsp;
            </span>
          ) : (
            <span
              key={index}
              className={`${letterStyles[index].class} font-black transition-all duration-600 leading-[1.1]`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {char}
            </span>
          ),
        )}
      </h2>
    </div>
  );
};

export default ProjectsSlide;
