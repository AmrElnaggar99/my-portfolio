"use client";

import React, { useEffect } from "react";
import { Gradient } from "@/utils/gradient.js";

function GradientSlide() {
  useEffect(() => {
    // Create your instance
    const gradient = new Gradient();

    // Call `initGradient` with the selector to your canvas
    gradient.initGradient("#gradient-canvas");
  }, []);

  return <canvas id="gradient-canvas" data-js-darken-top data-transition-in />;
}

export default GradientSlide;
