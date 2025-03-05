"use client";

import ArtistCardCloud, { ArtistProps } from "../ArtistCardCloud";
import AnimatedHead from "@/components/animations/AnimatedHead";
import TypingText from "@/components/animations/TypingText";
import { motion } from "framer-motion";

function SpotifySlide({ artists }: { artists: ArtistProps[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
      className="w-full min-h-fit bg-gray-950 py-[80px] px-6 md:px-12"
    >
      <div className="p-6 font-monasans items-center text-center">
        <div className="relative z-0 flex items-center flex-col">
          <div className="mb-3">
            <AnimatedHead className="text-gradient bg-gradient-to-r from-[#EEA525] to-[#FADC3A] bg-clip-text text-transparent">
              ✨ Bonus section ✨
            </AnimatedHead>
          </div>
          <h2 className="text-[clamp(2.5rem,8vw,3.5rem)] font-bold mb-4">
            <AnimatedHead className="text-white">My Most Played Artists</AnimatedHead>
          </h2>
          <p className="text-gray-300">
            <TypingText>
              Music fuels my creativity. Here's what I've been listening to, fetched live from
              Spotify
            </TypingText>
          </p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative w-full py-8 px-4 md:px-8 overflow-hidden"
      >
        <ArtistCardCloud data={artists} />
      </motion.div>
    </motion.div>
  );
}

export default SpotifySlide;
