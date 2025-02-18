"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { RefObject, useState } from "react";

function StickyHeader({ active }: { active: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -35]); // Adjust the scroll distance as needed

  function ScrollTo(id: string) {
    const targetElement = document.getElementById(id);
    targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <motion.header
      style={{
        y,
      }}
      className="fixed w-full z-50 flex justify-center items-center pt-16 font-monasans font-bold"
    >
      <nav className="rounded-full gap-2 fixed h-12 flex items-center justify-evenly p-8 w-fit mx-auto backdrop-filter backdrop-blur-lg">
        <a
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`${
            active === "HeroSlide" ? "bg-white text-black" : ""
          } rounded-full cursor-pointer md:px-6 transition duration-300 lg:px-12 h-fit py-2 flex items-center w-fit`}
        >
          Start
        </a>
        <a
          onClick={() => ScrollTo("TechStackSlide")}
          className={`${
            active === "TechStackSlide" ? "bg-white text-black" : ""
          } rounded-full cursor-pointer md:px-6 transition duration-300 lg:px-12 h-fit py-2 flex items-center w-fit`}
        >
          Tech Stack
        </a>
        <a className="rounded-full cursor-pointer md:px-6 lg:px-12 h-full flex items-center">
          Services
        </a>
        <a className="rounded-full cursor-pointer md:px-6 lg:px-12 h-full flex items-center">
          Projects
        </a>
        <a className="rounded-full cursor-pointer md:px-6 lg:px-12 h-full flex items-center">
          Contact
        </a>
      </nav>
    </motion.header>
  );
}

export default StickyHeader;
