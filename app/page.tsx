"use client";

import React from "react";
import FixedHeader from "@/components/FixedHeader";
import HeroSlide from "@/components/slides/HeroSlide";
import TechStackSlide from "@/components/slides/TechStackSlide";

const HomePage: React.FC = () => {
  return (
    <>
      <FixedHeader />
      <HeroSlide />
      <TechStackSlide />
    </>
  );
};

export default HomePage;
