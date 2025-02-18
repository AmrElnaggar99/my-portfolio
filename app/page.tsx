"use client";

import React, { useState } from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSlide from "@/components/slides/HeroSlide";
import TechStackSlide from "@/components/slides/TechStackSlide";

const HomePage: React.FC = () => {
  const [active, setActive] = useState("");
  return (
    <>
      <StickyHeader active={active} />
      <HeroSlide setActive={setActive} />
      <TechStackSlide setActive={setActive} />
    </>
  );
};

export default HomePage;
