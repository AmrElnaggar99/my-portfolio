"use client";

import { useEffect, useState } from "react";
import ArtistCardCloud from "../ArtistCardCloud";
import AnimatedHead from "../animations/AnimatedHead";
import TypingText from "../animations/TypingText";
import Slide from "./Slide";

function SpotifySlide() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("/api/spotify")
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.items || []);
        console.log("artists: ", artists);
      });
  }, []);

  return (
    <Slide id="SpotifySlide" className="w-full min-h-fit bg-gray-950 py-12 md:px-12">
      <div className="p-6 font-monasans">
        <div className="relative z-0 flex items-center flex-col">
          <div className="mb-3 bg-gradient-to-r from-[#EEA525] to-[#FADC3A] bg-clip-text text-transparent">
            <AnimatedHead>✨ Bonus section ✨</AnimatedHead>
          </div>
          <h2 className="text-[clamp(2.5rem,8vw,3.5rem)] font-bold mb-4">
            <AnimatedHead>My Most Played Artists</AnimatedHead>
          </h2>
          <p className="text-gray-300">
            <TypingText>
              Music fuels my creativity, drag, explore, and see what's been on repeat in my world!
            </TypingText>
          </p>
        </div>
        <div className="relative w-full p-8">
          <ArtistCardCloud data={artists} />
        </div>
      </div>
    </Slide>
  );
}

export default SpotifySlide;
