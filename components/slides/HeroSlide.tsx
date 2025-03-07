"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import WavyText from "@/components/animations/WavyText";
import TypingText from "@/components/animations/TypingText";
import Slide from "@/components/slides/Slide";
import Image from "next/image";
import AnimatedHead from "@/components/animations/AnimatedHead";
import { Gradient } from "@/utils/gradient.js";
import amrWebp from "@/public/amr.webp";

function HeroSlide({ setActive }: { setActive: React.Dispatch<React.SetStateAction<string>> }) {
  const [_, setMousePosition] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Move my name according to the mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
      const movementTolerance = 30; // Move within ±px of that value
      // Adjust the motion values for a parallax effect
      x.set((clientX / window.innerWidth - 0.5) * movementTolerance);
      y.set((clientY / window.innerHeight - 0.5) * movementTolerance);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const { scrollY } = useScroll();
  let y1 = useTransform(scrollY, [0, 2000], [0, 700]);

  const [windowWidth, setWindowWidth] = useState(0);

  // Disable parallax scroll on mobiles
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };

    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <motion.div
      id="HeroSlideContainer"
      className="relative z-0"
      style={{
        y: windowWidth < 1024 ? 0 : y1,
        x: 0,
      }}
    >
      <Slide
        setActive={setActive}
        id="HeroSlide"
        className="flex items-center justify-center bg-cover bg-center overflow-hidden relative bg-gradient-to-br from-black via-[#1a002b] to-[#3a0080]"
      >
        <div
          className="absolute top-0 left-0 w-full h-full z-10"
          style={{
            background: "linear-gradient(to bottom right, #171717 30%, transparent 100%)",
          }}
        ></div>
        <div className="absolute top-0 right-0 bottom-0 left-0 z-0">
          <GradientSlide />
        </div>
        <div className="relative z-20 flex w-full px-5 lg:flex-row flex-col md:px-24 lg:px-12 xl:px-24 h-full">
          <div className="w-full lg:w-[68%] md:min-h-80">
            <div className="relative flex h-full items-center">
              <div className="flex flex-col lg:absolute">
                <span className="font-merriweather text-yellow-400 font-light text-2xl mb-2">
                  <WavyText text="👋 Hey, I'm" />
                </span>
                <div className="relative z-30">
                  <motion.div
                    className="hidden md:block will-change-transform"
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
          <div className="w-full lg:w-[33%] pt-5 flex justify-center flex-col relative z-30 pb-32 lg:pb-5">
            <h2 className="mt-6 text-3xl md:text-4xl font-light font-merriweather leading-10 md:leading-snug max-w-3xl text-white">
              <div>
                <TypingText>I design and build </TypingText>
              </div>
              <div className="pr-2">
                <span className="font-bold text-yellow-400">
                  <TypingText>fast</TypingText>
                </span>
                <TypingText>,</TypingText>
              </div>
              <div>
                <span className="font-bold text-yellow-400">
                  <TypingText>beautiful</TypingText>
                </span>
                <TypingText>,</TypingText>
              </div>
              <div className="font-bold text-yellow-400">
                <TypingText>user-friendly</TypingText>
              </div>
              <div className="flex flex-wrap ">
                <div className="w-fit">
                  <WavyText text="Full-Stack " />
                </div>
                <div className="w-fit">
                  <WavyText text="applications." />
                </div>
              </div>
            </h2>
            <CallToActionButtons />
          </div>
        </div>
        <motion.div
          className="will-change-transform absolute bottom-10 right-1/2 -mr-[25px] w-[50px] h-[50px] z-50 transform -translate-x-1/2 p-4 flex justify-center items-center"
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <span className="text-3xl font-light font-monasans text-white pointer-events-none select-none">
            ↓
          </span>
        </motion.div>
        <div className="absolute md:-right-[300px] md:-bottom-10 lg:-bottom-32 xl:-bottom-48 lg:right-1/2 lg:-mr-[200px] xl:-mr-[240px] z-10 hidden md:block">
          <motion.div
            id="heroImage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="relative w-[620px] h-[864px] lg:w-[550px] lg:h-[750px] xl:w-[620px] xl:h-[845px] will-change-opacity"
            onAnimationComplete={() => {
              const element = document.querySelector("#heroImage");
              element?.classList.replace("will-change-opacity", "will-change-auto");
            }}
          >
            <Image
              src={amrWebp}
              alt=""
              fill
              priority
              className="-scale-x-100 lg:scale-x-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </div>
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

function GradientSlide() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#hero-gradient-canvas");
  }, []);

  return <canvas id="hero-gradient-canvas" data-js-darken-top data-transition-in />;
}

function CallToActionButtons() {
  return (
    <motion.div
      id="callToActionButtons"
      className="mt-10 flex w-full flex-col gap-4 will-change-opacity will-change-transform"
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      onAnimationComplete={() => {
        const element = document.querySelector("#callToActionButtons");
        if (element) element.classList.replace("will-change-opacity", "will-change-auto");
        element?.classList.remove("will-change-transform");
      }}
    >
      <motion.a
        className="border-2 text-center max-w-[500px] lg:w-full  w-[280px] border-white font-monasans text-white text-base md:text-xl px-8 py-4 rounded-full hover:bg-white hover:text-black transition"
        whileTap={{
          scale: 0.95,
        }}
        href="/Amr_Elnaggar_resume.pdf"
        target="_blank"
      >
        View my resume
      </motion.a>
      <motion.button
        className="bg-yellow-400 max-w-[500px] lg:w-full w-[280px] font-monasans text-black text-base md:text-xl px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition"
        whileTap={{
          scale: 0.95,
        }}
        onClick={() =>
          window.scrollTo({
            top: document.getElementById("ContactSlide")?.offsetTop,
            behavior: "smooth",
          })
        }
      >
        Let's connect →
      </motion.button>
    </motion.div>
  );
}

export default HeroSlide;
