"use client";
import React, { useEffect, useState } from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSlide from "@/components/slides/HeroSlide";
import ProfessionalExperienceSlide from "@/components/slides/ProfessionalExperienceSlide";
import dynamic from "next/dynamic";
import ContactSlide from "@/components/slides/ContactSlide";
import { useInView } from "react-intersection-observer";
import TechStackSlide from "@/components/slides/TechStackSlide";

const DynamicProjectsSlide = dynamic(() => import("@/components/slides/ProjectsSlide"), {
  ssr: false,
  loading: () => <LoadingSlide />,
});

const DynamicSpotifySlide = dynamic(
  () => import("@/components/slides/SpotifySlideWithAnnouncement"),
  {
    ssr: false,
    loading: () => <LoadingSlide />,
  },
);
const HomePage: React.FC = () => {
  const [active, setActive] = useState("");
  const [artists, setArtists] = useState([]);
  const { ref: projectsRef, inView: projectsInView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const { ref: techStackRef, inView: techStackInView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
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
    if (contactInView) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = "/api/spotify";
      document.head.appendChild(link);

      fetch("/api/spotify")
        .then((res) => res.json())
        .then((data) => {
          setArtists(data.items || []);
        });
    }
  }, [contactInView]);

  return (
    <>
      <div className={`relative z-50 ${isAnnouncementVisible ? "mb-[100vh]" : ""}`}>
        <StickyHeader active={active} />
        <HeroSlide setActive={setActive} />
        <TechStackSlide setActive={setActive} />
        <ProfessionalExperienceSlide setActive={setActive} />
        <div ref={projectsRef}>
          {projectsInView && <DynamicProjectsSlide setActive={setActive} />}
        </div>
        <div ref={contactRef}>
          <ContactSlide setActive={setActive} />
        </div>
      </div>
      <div className="relative z-10">
        <DynamicSpotifySlide
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

function LoadingSlide() {
  return (
    <div className="relative w-full min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-800 border-t-white rounded-full animate-spin" />
    </div>
  );
}

export default HomePage;
