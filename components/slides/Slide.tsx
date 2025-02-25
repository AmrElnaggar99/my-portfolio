"use client";
import React, { ReactNode, useEffect } from "react";
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
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: typeof window !== "undefined" && window.innerWidth > 1024 ? 0.4 : 0.2,
  });

  useEffect(() => {
    if (inView) {
      setActive && setActive(id); // Set the active navigation item based on the id of the slide
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
