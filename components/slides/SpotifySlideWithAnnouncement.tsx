"use client";
import Confetti from "react-confetti";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArtistProps } from "@/components/ArtistCardCloud";
import { useEffect, useState } from "react";
import SpotifySlide from "./SpotifySlide";

function SpotifySlideWithAnnouncement({
  active,
  artists,
}: {
  active: string;
  artists: ArtistProps[];
}) {
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(false);
  const [showSecretAnnouncement, setShowSecretAnnouncement] = useState(true);
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
    !spotifyRevealed && setShowSecretAnnouncement(windowWidth >= 1024);
  }, [windowWidth]);

  useEffect(() => {
    if (showSecretAnnouncement) {
      setIsAnnouncementVisible(true);
    } else {
      // Delay unmounting until the fade-out animation completes
      const timer = setTimeout(() => setIsAnnouncementVisible(false), 1000);
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [showSecretAnnouncement]);

  useEffect(() => {
    if (windowWidth < 1024) return;
    if (active === "SpotifySlide" && !spotifyRevealed) {
      setIsConfettiVisible(true);

      const secretTimer = setTimeout(() => {
        setShowSecretAnnouncement(false);
        setIsConfettiVisible(false);
        setSpotifyRevealed(true);
      }, 5000);

      return () => clearTimeout(secretTimer);
    }
  }, [active]);

  return (
    <>
      {isAnnouncementVisible && (
        <div
          className={`lg:fixed lg:inset-0 z-50 flex items-center transition duration-1000 ${showSecretAnnouncement ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className={`-mt-[80px] absolute inset-0 flex flex-col items-center text-white text-center p-6 z-50`}
          >
            {isConfettiVisible && (
              <Confetti
                numberOfPieces={500}
                recycle={false}
                tweenDuration={2500}
                width={windowWidth}
                height={windowHeight + 100}
              />
            )}
            <motion.h2
              className="text-4xl font-bold mb-4"
              style={{
                y: y,
              }}
            >
              🎉 You unlocked a secret section! 🎉
            </motion.h2>
            <motion.p
              className="text-lg font-merriweather"
              style={{
                y: y,
              }}
            >
              Get ready to see my most played artists from Spotify!
            </motion.p>
          </div>
        </div>
      )}

      {!showSecretAnnouncement && <SpotifySlide artists={artists} />}
    </>
  );
}

export default SpotifySlideWithAnnouncement;
