"use client";

import { useEffect, useState } from "react";
import ArtistCardCloud from "../ArtistCardCloud";
import AnimatedHead from "../animations/AnimatedHead";
import TypingText from "../animations/TypingText";
import Slide from "./Slide";

function SpotifySlide({ setActive }: { setActive: React.Dispatch<React.SetStateAction<string>> }) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("/api/spotify")
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.items || []);
      });
  }, []);

  return (
    <Slide
      id="SpotifySlide"
      className="w-full min-h-fit bg-gray-950 py-12 md:px-12"
      setActive={setActive}
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
      <div className="relative w-full py-8 md:px-8 overflow-x-hidden">
        <ArtistCardCloud data={artists} />
      </div>
    </Slide>
  );
}

export default SpotifySlide;
