"use client";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function AnimatedHead({ children }: { children: ReactNode }) {
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
      className="inline-block relative z-30 from-[#605E66] via-[#C5C4C6] to-[#605E66] text-transparent bg-clip-text [background-size:100%_100%] [background-position:0%] 
      [background-image:linear-gradient(to_right,#605E66_0%,#C5C4C6_22%,#C5C4C6_76%,#605E66_100%)]"
    >
      {children}
    </motion.span>
  );
}

export default AnimatedHead;
