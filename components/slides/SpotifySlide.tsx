"use client";

import ArtistCardCloud, { ArtistProps } from "../ArtistCardCloud";
import { motion } from "framer-motion";

function SpotifySlide({ artists }: { artists: ArtistProps[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
      className="w-full min-h-screen bg-gray-950 py-[40px] px-6 md:px-12 pt-32"
    >
      <div className="p-6 font-monasans items-center text-center">
        <div className="relative z-0 flex items-center flex-col">
          <div className="mb-3">
            <div className="text-gradient bg-gradient-to-r from-[#EEA525] to-[#FADC3A] bg-clip-text text-transparent">
              ✨ Bonus section ✨
            </div>
          </div>
          <h2 className="text-[clamp(2.5rem,8vw,3.5rem)] text-white font-bold mb-4">
            My Most Played Artists
          </h2>
          <p className="text-gray-300">
            Music fuels my creativity. Here's what I've been listening to, fetched live from Spotify
          </p>
        </div>
      </div>
      <div className="relative w-full px-4 md:px-8">
        <ArtistCardCloud data={artists} />
      </div>
    </motion.div>
  );
}

export default SpotifySlide;
