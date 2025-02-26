"use client";
import React, { useEffect, useRef } from "react";

const GridDotsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dimensionsRef = useRef({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const drawGrid = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensionsRef.current.width;
    canvas.height = dimensionsRef.current.height;

    const spacing = 25;
    const cols = Math.floor(dimensionsRef.current.width / spacing) + 5;
    const rows = Math.floor(dimensionsRef.current.height / spacing) + 5;

    ctx.fillStyle = "#ffffff";

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing;
        const y = row * spacing;

        ctx.beginPath();
        ctx.arc(x, y, 0.6, 0, Math.PI);
        ctx.fill();
      }
    }
  };

  useEffect(() => {
    drawGrid();

    const handleResize = () => {
      requestAnimationFrame(() => {
        dimensionsRef.current = { width: window.innerWidth, height: window.innerHeight };
        drawGrid();
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default GridDotsBackground;
