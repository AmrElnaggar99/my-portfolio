"use client";

import React, { useState } from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSlide from "@/components/slides/HeroSlide";
import ProfessionalExperienceSlide from "@/components/slides/ProfessionalExperienceSlide";
import ContactSlide from "@/components/slides/ContactSlide";
import dynamic from "next/dynamic";

const TechStackSlide = dynamic(() => import("@/components/slides/TechStackSlide"));
const SpotifySlide = dynamic(() => import("@/components/slides/SpotifySlide"));

const HomePage: React.FC = () => {
  const [active, setActive] = useState("");
  return (
    <>
      <StickyHeader active={active} />
      <HeroSlide setActive={setActive} />
      <TechStackSlide setActive={setActive} />
      <ProfessionalExperienceSlide setActive={setActive} />
      <ContactSlide setActive={setActive} />
      <SpotifySlide setActive={setActive} />
    </>
  );
};

export default HomePage;
