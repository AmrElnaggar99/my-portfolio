"use client";
import Confetti from "react-confetti";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArtistProps } from "@/components/ArtistCardCloud";
import { useEffect, useState } from "react";
import SpotifySlide from "./SpotifySlide";

function SpotifySlideWithAnnouncement({
  active,
  artists,
  isAnnouncementVisible,
  setShowSecretAnnouncement,
  showSecretAnnouncement,
}: {
  active: string;
  artists: ArtistProps[];
  isAnnouncementVisible: boolean;
  showSecretAnnouncement: boolean;
  setShowSecretAnnouncement: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [spotifyRevealed, setSpotifyRevealed] = useState(false);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.8, 1], ["95vh", "50vh"]);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setWindowWidth(newWidth);
      setWindowHeight(newHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setShowSecretAnnouncement(true);
  }, [windowWidth]);

  useEffect(() => {
    if (active === "SpotifySlide" && !spotifyRevealed) {
      setIsConfettiVisible(true);

      const secretTimer = setTimeout(() => {
        setShowSecretAnnouncement(false);
        setIsConfettiVisible(false);
        setSpotifyRevealed(true);
      }, 4250);

      return () => clearTimeout(secretTimer);
    }
  }, [active]);

  return (
    <>
      {isAnnouncementVisible && (
        <div
          className={`fixed bg-black inset-0 z-50 flex items-center transition duration-1000 ${showSecretAnnouncement ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className={`-mt-[192px] md:-mt-[80px] absolute inset-0 flex flex-col items-center text-white text-center p-6 z-50`}
          >
            {isConfettiVisible && (
              <Confetti
                numberOfPieces={500}
                recycle={false}
                tweenDuration={1500}
                width={windowWidth}
                height={windowHeight + 100}
              />
            )}
            <motion.h2
              className="text-[clamp(1rem,8vw,2rem)] font-bold mb-4"
              style={{
                y: y,
              }}
            >
              <span className="block md:inline">🎉</span> You unlocked a secret section!{" "}
              <span className="block md:inline">🎉</span>
            </motion.h2>
            <motion.p
              className="text-lg font-merriweather"
              style={{
                y: y,
              }}
            >
              Scroll to the end to see my most played artists from Spotify!
            </motion.p>
          </div>
        </div>
      )}

      {!showSecretAnnouncement && <SpotifySlide artists={artists} />}
    </>
  );
}

export default SpotifySlideWithAnnouncement;
