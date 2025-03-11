"use client";
import React from "react";
import Slide from "./Slide";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function ProfessionalExperienceSlide({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: typeof window !== "undefined" && window.innerWidth > 1024 ? 0.1 : 0,
  });

  return (
    <div ref={ref} className={`z-10 w-full min-h-fit py-12 bg-gray-900`}>
      <Slide id="ProfessionalExperienceSlide" setActive={setActive}>
        <div
          className={`transition-all duration-[2s] ease-out ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <MarqueeHeadline>Professional Experience</MarqueeHeadline>
          <div className="md:px-12">
            <section className="mx-auto py-12 px-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl text-white font-monasans font-medium" tabIndex={0}>
                  My resume
                </h3>

                <div className="relative">
                  <div className="hidden md:inline-block blur-effect absolute -inset-1 rounded-full opacity-40 z-0 animate-glowingBackground blur-lg bg-[length:400%] bg-[linear-gradient(90deg,#796ef6,transparent,transparent,#796ef6)]" />
                  <motion.a
                    className="relative p-[2px] overflow-hidden rounded-full inline-block group"
                    whileTap={{
                      scale: 0.95,
                    }}
                    href="/Amr_Elnaggar_resume.pdf"
                    target="_blank"
                  >
                    <div
                      className="blur-effect absolute top-1/2 left-1/2 w-[300%] h-[300%] animate-spinSlow z-10 blur"
                      style={{
                        background:
                          "conic-gradient(#796ef6 0deg, #796ef6 60deg, transparent 150deg)",
                        transform: "translate(-50%, -50%) scale(0.98)",
                      }}
                    />

                    <span className="flex items-center justify-center background-gradient-purple-text text-white relative font-normal font-monasans py-2 px-4 rounded-full transition z-20 bg-gray-950/70 backdrop-blur-lg group-hover:bg-gray-950/50">
                      View PDF Resume
                    </span>
                  </motion.a>
                </div>
              </div>
              {/* Experience Section */}
              <div className="space-y-8">
                {experiences.map((exp, index) => {
                  const { ref, inView } = useInView({
                    triggerOnce: true,
                  });

                  return (
                    <motion.div
                      ref={ref}
                      key={index}
                      className="border-b pb-6 font-merriweather text-white border-gray-700"
                      initial={{ opacity: 0, y: 40 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <div className="flex gap-2 md:items-center justify-between flex-col md:flex-row">
                        <div className="flex flex-col" tabIndex={0}>
                          <span
                            aria-label={`${exp.title}, at ${exp.company}, in ${exp.location}, from ${exp.duration}`}
                          >
                            <h3 className="text-2xl font-bold text-white uppercase">{exp.title}</h3>
                            <p className="flex gap-1 text-lg font-monasans text-gray-300 flex-col md:flex-row">
                              <span>{exp.company}</span>
                              <span className="text-white hidden md:inline-block"> — </span>
                              <span>{exp.location}</span>
                            </p>
                            <p className="text-md font-monasans text-gray-500">{exp.duration}</p>
                          </span>
                          <ul className="text-gray-50 mt-2 list-disc font-light pl-5" tabIndex={0}>
                            {exp.description.map((item, index) => (
                              <motion.li
                                ref={ref}
                                key={index}
                                className="my-1"
                                dangerouslySetInnerHTML={{ __html: item }}
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                  duration: 0.2,
                                  delay: index * 0.1,
                                  ease: "easeOut",
                                }}
                              />
                            ))}
                          </ul>
                        </div>
                        <motion.a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-w-[250px] text-center inline-block mt-4 border font-monasans border-gray-200 text-gray-200 py-2 px-4 rounded-full hover:bg-white hover:text-gray-900 transition"
                          whileTap={{
                            scale: 0.95,
                          }}
                        >
                          Visit {exp.company}
                        </motion.a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </Slide>
    </div>
  );
}

function MarqueeHeadline({ children }: { children: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <>
      <div className="flex whitespace-nowrap w-full overflow-hidden" ref={ref} tabIndex={0}>
        <h2
          className={`text-[clamp(2.5rem,8vw,5.5rem)] uppercase font-monasans ${inView ? "animate-loopText" : ""} text-white`}
        >
          <span className="w-[200px] md:w-[400px] inline-block"></span>
          {children}
          <span className="w-[100px] md:w-[200px] inline-block"></span>
        </h2>
        {[0, 1].map((item) => (
          <span
            key={item}
            className={`text-[clamp(2.5rem,8vw,5.5rem)] uppercase font-monasans ${inView ? "animate-loopText" : ""} text-white`}
          >
            {children}
            <span className="w-[100px] md:w-[200px] inline-block"></span>
          </span>
        ))}
      </div>
    </>
  );
}

const experiences = [
  {
    title: "Full Stack Engineer",
    company: "Infrasoft",
    location: "Kuwait City, Kuwait (Remote)",
    duration: "April 2023 - Present",
    description: [
      "Maintained a robust suite of scalable full-stack applications using <span style='font-weight:bold;color:#8080F4'>React, TypeScript, Java, Spring Boot, and MySQL</span> and containerized with <span style='font-weight:bold;color:#8080F4'>Docker</span>.",
      "Deployed applications on <span style='font-weight:bold;color:#8080F4'>AWS</span> using <span style='font-weight:bold;color:#8080F4'>Git</span> within a <span style='font-weight:bold;color:#8080F4'>Continuous Integration</span> environment.",
    ],
    url: "https://www.linkedin.com/company/isoft-co/",
  },
  {
    title: "Frontend Engineer",
    company: "GeoGebra",
    location: "Linz, Austria",
    duration: "August 2022 - April 2023",
    description: [
      "Directed highly accessible and reusable UI components in <span style='font-weight:bold;color:#8080F4'>React, Next.js, TypeScript using Tailwind, Radix UI</span>, focusing on UX, optimization, and bundling; and offered documentation with <span style='font-weight:bold;color:#8080F4'>Storybook</span>.",
      "Ensured a 100% Lighthouse score for <span style='font-weight:bold;color:#8080F4'>SEO</span> and performance by optimizing assets, implementing <span style='font-weight:bold;color:#8080F4'>server-side rendering (SSR)</span>, and improving Core Web Vitals.",
      "Migrated test cases from Enzyme to <span style='font-weight:bold;color:#8080F4'>React Testing Library</span>, improving test reliability and alignment with React best practices.",
      "Conducted code review processes within a team of 7 engineers in an agile environment, focusing on enhancing <span style='font-weight:bold;color:#8080F4'>best practices, functionality, and readability</span>.",
    ],
    url: "https://www.geogebra.org",
  },
  {
    title: "Full Stack Engineer",
    company: "Oncoustics",
    location: "Toronto, Canada (Remote)",
    duration: "May 2022 - August 2022",
    description: [
      "Built 2 scalable pixel-perfect full-stack web applications with <span style='font-weight:bold;color:#8080F4'>Next.js, React Query, and TypeScript</span>, leveraging <span style='font-weight:bold;color:#8080F4'>Node.js and NestJS</span> for REST Web Services.",
      "Executed the installation and configuration of a <span style='font-weight:bold;color:#8080F4'>MongoDB</span> environment for two full-stack web applications, ensuring seamless data migration.",
    ],
    url: "https://www.oncoustics.com",
  },
  {
    title: "Full Stack Engineer",
    company: "Aschl Management Systems",
    location: "Schluesslberg, Austria",
    duration: "October 2020 - August 2022",
    description: [
      "Engineered and deployed applications for the web with <span style='font-weight:bold;color:#8080F4'>JavaScript and PHP</span>, and built mobile and desktop applications using Windev in an MVC pattern.",
      "Executed high-performance modifications on existing ERP systems by enhancing querying techniques, achieving 50% faster query performance on MySQL.",
    ],
    url: "https://www.aschl.com",
  },
  {
    title: "Full Stack Engineer (Internship)",
    company: "Vodafone",
    location: "Smart Village, Egypt (Remote)",
    duration: "August 2020 - September 2020",
    description: [
      "Developed a data visualization dashboard using <span style='font-weight:bold;color:#8080F4'>React and ECharts</span>, enabling real-time insights into the data of over 1 million users.",
    ],
    url: "https://www.vodafone.com",
  },
  {
    title: "Software Engineer (Internship)",
    company: "Qatar Computing Research Institute",
    location: "Ar-Rayyan, Qatar (Remote)",
    duration: "May 2020 - July 2020",
    description: [
      "Built <span style='font-weight:bold;color:#8080F4'>Python and Node.js</span> backend applications and created <span style='font-weight:bold;color:#8080F4'>Docker</span> images, cutting deployment time by 50%.",
    ],
    url: "https://www.hbku.edu.qa/en/qcri",
  },
];

export default ProfessionalExperienceSlide;
