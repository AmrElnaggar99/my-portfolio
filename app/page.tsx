"use client";
import React, { useEffect, useState } from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSlide from "@/components/slides/HeroSlide";
import ProfessionalExperienceSlide from "@/components/slides/ProfessionalExperienceSlide";
import dynamic from "next/dynamic";
import ProjectsSlide from "@/components/slides/ProjectsSlide";

const TechStackSlide = dynamic(() => import("@/components/slides/TechStackSlide"), { ssr: false });
const SpotifySlideWithAnnouncement = dynamic(
  () => import("@/components/slides/SpotifySlideWithAnnouncement"),
  { ssr: false },
);
const ContactSlide = dynamic(() => import("@/components/slides/ContactSlide"));

const HomePage: React.FC = () => {
  const [active, setActive] = useState("");
  const [artists, setArtists] = useState([]);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(false);
  const [showSecretAnnouncement, setShowSecretAnnouncement] = useState(true);

  useEffect(() => {
    if (showSecretAnnouncement) {
      setIsAnnouncementVisible(true);
    } else {
      const timer = setTimeout(() => setIsAnnouncementVisible(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showSecretAnnouncement]);

  useEffect(() => {
    function isOldBrowser() {
      return !CSS.supports("background-clip", "text");
    }
    if (isOldBrowser()) {
      document.documentElement.classList.add("old-browser");
    }
  }, []);

  useEffect(() => {
    fetch("/api/spotify")
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.items || []);
      });
  }, []);

  return (
    <>
      <div className={`relative z-50 ${isAnnouncementVisible ? "mb-[100vh]" : ""}`}>
        <StickyHeader active={active} />
        <HeroSlide setActive={setActive} />
        <TechStackSlide setActive={setActive} />
        <ProfessionalExperienceSlide setActive={setActive} />
        <ProjectsSlide setActive={setActive} />
        <ContactSlide setActive={setActive} />
      </div>
      <div className="relative z-10">
        <SpotifySlideWithAnnouncement
          setShowSecretAnnouncement={setShowSecretAnnouncement}
          showSecretAnnouncement={showSecretAnnouncement}
          isAnnouncementVisible={isAnnouncementVisible}
          active={active}
          artists={artists}
        />
      </div>
    </>
  );
};

export default HomePage;
