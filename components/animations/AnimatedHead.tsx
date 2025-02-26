"use client";
import { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function AnimatedHead({ children, className }: { children: ReactNode; className?: string }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
    },
  };
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [animationEnded, setAnimationEnded] = useState(false);

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => setAnimationEnded(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [inView]);

  return (
    <motion.span
      ref={ref}
      initial={{
        scale: 1.1,
        opacity: 0,
        y: 10,
      }}
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className={`inline-block relative z-30 ${animationEnded ? "will-change-auto" : "will-change-opacity will-change-transform"} ${className ? className : ""}`}
    >
      {children}
    </motion.span>
  );
}

export default AnimatedHead;
