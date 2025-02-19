"use client";

import React, { useEffect } from "react";
import { Gradient } from "@/utils/gradient.js";

function GradientSlide() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return <canvas id="gradient-canvas" data-js-darken-top data-transition-in />;
}

export default GradientSlide;
