"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function Slide({
  className,
  id,
  children,
  setActive,
}: {
  className?: string;
  id: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  children?: ReactNode;
}) {
  const [slideHeight, setSlideHeight] = useState(700); // Default height

  useEffect(() => {
    const slide = document.querySelector(`#${id}`);
    setSlideHeight(slide?.clientHeight ?? 700);
  }, [id]);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold:
      slideHeight > 1000
        ? 0.2
        : typeof window !== "undefined" && window.innerWidth > 1024
          ? 0.4
          : 0.2,
  });

  useEffect(() => {
    if (inView) {
      setActive(id);
    } else {
      if (id === "ContactSlide") {
        setActive((prev) => (prev === id ? "SpotifySlide" : prev)); // since ContactSlide is the last section, we should reset active when ContactSlide gets out of view and no other slide changes the active state
      }
    }
  }, [inView, id, setActive]);

  return (
    <div
      ref={ref}
      id={id}
      className={`min-h-[750px] [@media(max-height:1000px)]:min-h-screen w-full relative pt-32 ${className}`}
    >
      {children}
    </div>
  );
}

export default Slide;
