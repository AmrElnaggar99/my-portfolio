import React from "react";
import Slide from "./Slide";

function ProfessionalExperienceSlide({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Slide
      id="ProfessionalExperienceSlide"
      setActive={setActive}
      className="z-10 w-full min-h-fit bg-red-400 py-12 md:px-12"
    ></Slide>
  );
}

export default ProfessionalExperienceSlide;
