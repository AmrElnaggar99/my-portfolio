"use client";

import React, { useEffect, useState } from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSlide from "@/components/slides/HeroSlide";
import ProfessionalExperienceSlide from "@/components/slides/ProfessionalExperienceSlide";

import dynamic from "next/dynamic";
import ProjectsSlide from "@/components/slides/ProjectsSlide";

const TechStackSlide = dynamic(() => import("@/components/slides/TechStackSlide"), { ssr: false });
const SpotifySlide = dynamic(() => import("@/components/slides/SpotifySlide"), { ssr: false });
const ContactSlide = dynamic(() => import("@/components/slides/ContactSlide"));

const HomePage: React.FC = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
    function isOldBrowser() {
      return !CSS.supports("background-clip", "text");
    }

    if (isOldBrowser()) {
      document.documentElement.classList.add("old-browser");
    }
  }, []);

  return (
    <>
      <StickyHeader active={active} />
      <HeroSlide setActive={setActive} />
      <TechStackSlide setActive={setActive} />
      <ProfessionalExperienceSlide setActive={setActive} />
      <ProjectsSlide setActive={setActive} />
      <ContactSlide setActive={setActive} />
      <SpotifySlide setActive={setActive} />
    </>
  );
};

export default HomePage;
