"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import {
  useFloating,
  shift,
  useHover,
  useInteractions,
  safePolygon,
  useTransitionStyles,
  useClick,
  useDismiss,
} from "@floating-ui/react";
const cardVariants = {
  hidden: { scale: 0, opacity: 0, y: 50 },
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
  demoAlert,
  learnMoreURL,
  date,
}: {
  title: string;
  description: string[];
  demoURL?: string;
  demoAlert?: boolean;
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
      className="w-[330px] rounded-3xl h-[366px] bg-gray-950 hover:bg-gray-900 transition duration-300 border border-gray-800 flex flex-col gap-4 p-6 justify-between"
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
      <motion.div className="flex gap-3 flex-wrap" variants={itemVariants}>
        {demoURL && <DemoButton demoURL={demoURL} demoAlert={demoAlert} />}
        <motion.a
          whileTap={{
            scale: 0.85,
          }}
          href={learnMoreURL}
          target="_blank"
          className="bg-gray-50 items-center justify-center flex border h-[44px] leading-6 border-transparent text-sm text-gray-800 px-4 py-3 rounded-full w-full min-w-[130px] hover:bg-gray-200 duration-300 font-semibold transition"
        >
          Check Github
        </motion.a>
      </motion.div>
    </motion.article>
  );
}

function DemoButton({ demoURL, demoAlert }: { demoURL: string; demoAlert?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    middleware: [shift()],
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context, {
    handleClose: safePolygon({ requireIntent: false }),
  });
  const click = useClick(context, { event: "click", toggle: true });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, dismiss]);
  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      transform: "scale(0)",
    },
    common: () => ({
      transformOrigin: "bottom center",
    }),
  });
  return (
    <div className="relative flex justify-center w-full">
      {demoURL && (
        <motion.a
          whileTap={{ scale: 0.85 }}
          href={demoURL}
          target="_blank"
          className="items-center flex-1 justify-between border h-[44px] leading-6 border-gray-800 flex text-sm text-white px-4 rounded-full w-full hover:bg-gray-950 transition font-medium"
        >
          View Demo
          <button
            ref={refs.setReference}
            {...getReferenceProps()}
            className="p-1.5 w-5 h-5 text-xs text-white opacity-50 hover:opacity-100 border border-white rounded-full aspect-square items-center flex"
            aria-label="More info"
            onClick={(e) => e.preventDefault()}
          >
            ?
          </button>
        </motion.a>
      )}
      {demoAlert && (
        <>
          {isMounted && (
            <div
              ref={refs.setFloating}
              {...getFloatingProps()}
              style={{
                ...floatingStyles,
                width: "250px",
                minWidth: "150px",
                left: "50%",
                transform: "translateX(-125px) translateY(-110%)",
              }}
              className="relative"
            >
              <div
                style={styles}
                className="bg-yellow-400 text-yellow-900 text-sm px-3 py-2 rounded-lg shadow-lg font-medium"
              >
                The initial load can take up to 60 seconds.
                <a
                  href="https://render.com/docs/free?_gl=1*1luk5nq*_gcl_au*MTI5MjU5MzM4LjE3Mzk1MDE2Mjc.*_ga*MTAxNjkxMTI4My4xNzM5NTAxNjI3*_ga_QK9L9QJC5N*MTc0MTc0NDM1Ni43LjEuMTc0MTc0NDU0OC42MC4wLjA.#spinning-down-on-idle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 rounded-full border border-gray-900 p-1 font-medium block mt-2 hover:bg-white hover:border-white hover:text-black"
                >
                  learn why
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectCard;
