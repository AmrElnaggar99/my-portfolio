"use client";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { useEffect, useState } from "react";

interface Props extends HTMLMotionProps<"span"> {
  text: string;
  delay?: number;
  duration?: number;
}

function WavyText({ text, delay = 0, duration = 0.05, ...props }: Props) {
  const letters = Array.from(text);
  const [animationEnded, setAnimationEnded] = useState(false);

  const container: Variants = {
    visible: (i: number = 1) => ({
      transition: { staggerChildren: duration, delayChildren: i * delay },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  useEffect(() => {
    const timeout = setTimeout(
      () => setAnimationEnded(true),
      (letters.length * duration + delay) * 1000,
    );
    return () => clearTimeout(timeout);
  }, [letters.length, duration, delay]);

  return (
    <motion.span
      className={`flex overflow-hidden flex-nowrap ${animationEnded ? "will-change-auto" : "will-change-opacity"}`}
      variants={container}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className={`${animationEnded ? "will-change-auto" : "will-change-opacity will-change-transform"}`}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default WavyText;
