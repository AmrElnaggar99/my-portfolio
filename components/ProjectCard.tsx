"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const cardVariants = {
  hidden: { scale: 0, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      delay: 0.45,
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
  date,
}: {
  title: string;
  description: string[];
  demoURL?: string;
  learnMoreURL: string;
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
    <motion.article
      ref={ref}
      className="w-[330px] rounded-3xl h-[366px] overflow-hidden bg-gray-950 hover:bg-gray-900 transition duration-300 border border-gray-800 flex flex-col gap-4 p-6 justify-between"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      tabIndex={0}
    >
      <header>
        <motion.h2
          className="font-bold text-left text-xl text-white"
          variants={itemVariants}
          tabIndex={0}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-gray-400 text-left text-sm font-monasans font-light"
          tabIndex={0}
          variants={itemVariants}
        >
          {date}
        </motion.p>
      </header>
      <section>
        <motion.ul
          tabIndex={0}
          className="text-gray-100 min-h-[72px] text-left text-base my-4 flex flex-col gap-2"
          variants={itemVariants}
        >
          {description.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </motion.ul>
      </section>
      <motion.div className="flex space-x-4" variants={itemVariants}>
        {demoURL && (
          <motion.a
            whileTap={{
              scale: 0.85,
            }}
            href={demoURL}
            target="_blank"
            className="items-center border h-[44px] leading-6 border-gray-800 flex justify-center text-sm text-white px-4 rounded-full w-full hover:bg-gray-950 transition font-medium"
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
          className="bg-gray-50 items-center justify-center flex border h-[44px] leading-6 border-transparent text-sm text-gray-800 px-4 py-3 rounded-full w-full hover:bg-gray-200 duration-300 font-semibold transition"
        >
          Check Github
        </motion.a>
      </motion.div>
    </motion.article>
  );
}

export default ProjectCard;
