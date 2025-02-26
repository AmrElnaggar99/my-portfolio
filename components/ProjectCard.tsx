"use client";

import Image, { StaticImageData } from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

function ProjectCard({
  title,
  description,
  demoURL,
  learnMoreURL,
  image,
  date,
}: {
  title: string;
  description: string[];
  demoURL?: string;
  learnMoreURL: string;
  image: StaticImageData;
  date: string;
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="sm:max-w-xs min-w-[320px] rounded-[40px] overflow-hidden bg-white"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.div className="relative w-full h-[300px]" variants={itemVariants}>
        <Image src={image} alt={title} fill className="rounded-t-3xl" />
      </motion.div>
      <motion.div className="px-6 py-4" variants={itemVariants}>
        <motion.h2 className="font-bold text-left text-xl text-gray-800" variants={itemVariants}>
          {title}
        </motion.h2>
        <div className="text-gray-600 text-left text-sm font-monasans font-light">{date}</div>
        <motion.ul
          className="text-gray-700 min-h-[72px] text-left text-base my-4"
          variants={itemVariants}
        >
          {description.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </motion.ul>
        <motion.div className="flex space-x-4" variants={itemVariants}>
          {demoURL && (
            <motion.a
              whileTap={{
                scale: 0.85,
              }}
              href={demoURL}
              target="_blank"
              className="bg-gray-900 items-center flex justify-center text-sm text-white px-4 py-3 rounded-full w-full hover:bg-gray-800 transition font-medium"
            >
              View Demo
            </motion.a>
          )}
          <motion.a
            whileTap={{
              scale: 0.85,
            }}
            href={learnMoreURL}
            target="_blank"
            className="border-gray-100 items-center justify-centerflex border-2 text-sm text-gray-950 px-4 py-3 rounded-full w-full hover:bg-gray-100 duration-300 font-medium transition"
          >
            Check Github
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectCard;
