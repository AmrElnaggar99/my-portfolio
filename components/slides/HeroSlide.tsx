"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import WavyText from "@/components/animations/WavyText";
import TypingText from "@/components/animations/TypingText";
import Slide from "@/components/slides/Slide";
import Image from "next/image";
import AnimatedHead from "@/components/animations/AnimatedHead";

function HeroSlide() {
  const [_, setMousePosition] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Update the motion values based on mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });

      // Adjust the motion values for a parallax effect
      x.set((clientX / window.innerWidth - 0.5) * 30); // Move within ±10px
      y.set((clientY / window.innerHeight - 0.5) * 30);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, 500]);

  return (
    <motion.div
      className="relative z-0"
      style={{
        y: y1,
        x: 0,
      }}
    >
      <Slide className="flex items-center justify-center bg-cover bg-center overflow-hidden bg-[url(/gradient-bg.jpg)]">
        <div className="relative flex w-full px-5 lg:flex-row flex-col md:px-24 lg:px-12 xl:px-24 h-full">
          <div className="w-full lg:w-[70%] md:min-h-80">
            <div className="relative flex h-full items-center">
              <div className="flex flex-col lg:absolute">
                <span className="font-merriweather text-yellow-400 font-light text-2xl mb-2">
                  <WavyText text="👋 Hey, I'm" />
                </span>
                <div className="relative z-30">
                  <motion.div
                    className="hidden md:block"
                    style={{
                      x: x,
                      y: y,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 50,
                      damping: 10,
                    }}
                  >
                    <MyNameHeading />
                  </motion.div>
                  <div className="block md:hidden">
                    <MyNameHeading />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[30%] pt-5 flex justify-center flex-col relative z-30 pb-32 lg:pb-5">
            <h2 className="mt-6 text-3xl md:text-4xl font-light font-merriweather leading-10 md:leading-snug max-w-3xl">
              <TypingText>I design and build </TypingText> <br />
              <span className="block pr-2">
                <span className="font-bold text-yellow-400">
                  <TypingText>fast</TypingText>
                </span>
                ,
              </span>
              <span className="block pr-2">
                <span className="font-bold text-yellow-400">
                  <TypingText>scalable</TypingText>
                </span>
                ,
              </span>
              <span className="block">
                <span className="font-bold text-yellow-400">
                  <TypingText>user-friendly</TypingText>
                </span>
              </span>
              <WavyText text="full-stack applications." />
            </h2>
            <div className="mt-10 flex w-full flex-col gap-4">
              <motion.button
                className="border-2 lg:w-full  w-[280px] border-white font-monasans text-white text-base md:text-xl px-8 py-4 rounded-full hover:bg-white hover:text-black transition"
                whileTap={{
                  scale: 0.85,
                }}
              >
                view my work
              </motion.button>
              <motion.button
                className="bg-yellow-400 lg:w-full w-[280px] font-monasans text-black text-base md:text-xl px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition"
                whileTap={{
                  scale: 0.85,
                }}
              >
                Let's connect →
              </motion.button>
            </div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-10 right-1/2 -mr-[25px] w-[50px] h-[50px] z-50 transform -translate-x-1/2 p-4 bg-white rounded-full shadow-lg flex justify-center items-center"
          animate={{
            y: [0, 20, 0],
          }} // Arrow moves from 0 to 20px and back to 0
          transition={{
            repeat: Infinity,
            // Repeat the animation infinitely
            repeatType: "loop",
            // Loop the animation back and forth
            duration: 1.5,
            // Duration of each cycle
            ease: "easeInOut", // Smooth ease-in-out transition
          }}
        >
          <span className="text-xl font-light font-monasans text-gray-800">↓</span>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="absolute md:-right-[300px] md:-bottom-10 lg:-bottom-32 xl:-bottom-48 lg:right-1/2 lg:-mr-[200px] xl:-mr-[240px] z-10 hidden md:block"
        >
          <div className="w-[620px] h-[864px] lg:w-[550px] lg:h-[750px] xl:w-[620px] xl:h-[845px]">
            <Image src="/amr1.png" alt="" fill className="-scale-x-100 lg:scale-x-100" />
          </div>
        </motion.div>
      </Slide>
    </motion.div>
  );
}

function MyNameHeading() {
  return (
    <AnimatedHead>
      <h1 className=" text-white font-monasans font-black text-6xl  md:text-[110px] lg:text-[120px] xl:text-[150px] leading-none">
        Amr
        <br />
        Elnaggar
      </h1>
    </AnimatedHead>
  );
}

export default HeroSlide;
