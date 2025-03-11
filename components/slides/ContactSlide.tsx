"use client";
import React, { useEffect } from "react";
import Slide from "./Slide";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Gradient } from "@/utils/gradient";
import TypingText from "../animations/TypingText";

function ContactSlide({ setActive }: { setActive: React.Dispatch<React.SetStateAction<string>> }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: typeof window !== "undefined" && window.innerWidth > 1024 ? 0.1 : 0,
  });

  return (
    <div ref={ref} className={`z-10 w-full bg-black`}>
      <Slide
        id="ContactSlide"
        setActive={setActive}
        className="overflow-hidden relative flex items-center justify-center py-32"
      >
        <div
          className={`transition-all duration-[2s] ease-out ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute top-0 right-0 bottom-0 left-0 z-0">
            <GradientSlide />
          </div>
          <div className="relative items-center gap-10 justify-center z-20 flex w-full px-5 lg:flex-row flex-col md:px-24 lg:px-12 xl:px-24 h-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                className="text-[clamp(2.5rem,8vw,4rem)] leading-none font-monasans font-bold text-white"
                tabIndex={0}
              >
                Let's work together!
              </motion.h2>
              <p className="text-xl text-white font-merriweather opacity-80">
                <TypingText tabIndex={0}>
                  Do you have a project for me? I would love to help!
                </TypingText>
              </p>
            </div>
            <div className="w-full lg:w-1/2 bg-gray-900 rounded-xl p-10 min-h-[500px] flex flex-col">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                className="text-3xl font-medium font-monasans mb-4 text-white"
                tabIndex={0}
              >
                Get in touch
              </motion.h3>
              <div className="flex-1 flex items-center">
                <div className="w-full space-y-4 font-merriweather">
                  <a href="mailto:a.naggar99@gmail.com" className="text-gray-300 hover:text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className="flex items-start justify-between border-b border-gray-800 py-5 flex-col lg:flex-row"
                    >
                      <span>Email</span>
                      <div className="w-auto md:w-[265px] text-left">
                        <TypingText>a.naggar99@gmail.com</TypingText>
                      </div>
                    </motion.div>
                  </a>

                  <a
                    href="https://linkedin.com/in/amrelnaggar99"
                    className="text-gray-300 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className="flex items-start justify-between border-b border-gray-800 py-5 flex-col lg:flex-row"
                    >
                      <span>LinkedIn</span>

                      <div className="w-auto md:w-[265px] text-left">
                        <TypingText>linkedin.com/in/amrelnaggar99</TypingText>
                      </div>
                    </motion.div>
                  </a>

                  <a
                    href="https://github.com/AmrElnaggar99/"
                    className="text-gray-300 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className="flex items-start justify-between border-b border-gray-800 py-5 flex-col lg:flex-row"
                    >
                      <span>GitHub</span>

                      <div className="w-auto md:w-[265px] text-left">
                        <TypingText>github.com/AmrElnaggar99</TypingText>
                      </div>
                    </motion.div>
                  </a>

                  <a
                    href="https://instagram.com/amrelnaaggaar/"
                    className="text-gray-300 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className="flex items-start justify-between border-b border-gray-800 py-5 flex-col lg:flex-row"
                    >
                      <span>Instagram</span>

                      <div className="w-auto md:w-[265px] text-left">
                        <TypingText>instagram.com/amrelnaaggaar</TypingText>
                      </div>
                    </motion.div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
}

function GradientSlide() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#contact-gradient-canvas");
  }, []);

  return <canvas id="contact-gradient-canvas" data-js-darken-top data-transition-in />;
}
export default ContactSlide;
