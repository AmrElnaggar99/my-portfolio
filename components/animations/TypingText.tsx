"use client";
import { motion, useMotionValue, useTransform, animate, HTMLMotionProps } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Props extends HTMLMotionProps<"span"> {
  children: string;
}

function TypingText({ children, ...props }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => children.slice(0, latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, children.length, {
        type: "tween",
        duration: 1,
        ease: "easeInOut",
      });
      return controls.stop;
    }
  }, [inView]);

  return (
    <motion.span ref={ref} className="inline-block" {...props}>
      {displayText}
    </motion.span>
  );
}

export default TypingText;
