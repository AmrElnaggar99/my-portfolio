"use client";
import React, { useEffect, useRef } from "react";

interface Dot {
  baseX: number;
  baseY: number;
  animationOffset: number;
  animationSpeed: number;
  animationRadius: number;
}

const AnimatedGridDotsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotGridRef = useRef<Dot[]>([]);
  const dimensionsRef = useRef({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Function to initialize the grid
  const initializeGrid = () => {
    const spacing = 25;
    const cols = Math.floor(dimensionsRef.current.width / spacing) + 5;
    const rows = Math.floor(dimensionsRef.current.height / spacing) + 5;
    const grid: Dot[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid.push({
          baseX: col * spacing,
          baseY: row * spacing,
          animationOffset: Math.random() * 2 * Math.PI,
          animationSpeed: Math.random() * 0.3 + 0.2,
          animationRadius: Math.random() * 3 + 1.5,
        });
      }
    }

    dotGridRef.current = grid;
  };

  useEffect(() => {
    initializeGrid();

    const handleResize = () => {
      requestAnimationFrame(() => {
        dimensionsRef.current = { width: window.innerWidth, height: window.innerHeight };
        initializeGrid();
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensionsRef.current.width;
    canvas.height = dimensionsRef.current.height;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() / 1000;

      dotGridRef.current.forEach((dot) => {
        const offsetX =
          Math.cos(time * dot.animationSpeed + dot.animationOffset) * dot.animationRadius;
        const offsetY =
          Math.sin(time * dot.animationSpeed + dot.animationOffset) * dot.animationRadius;
        const x = dot.baseX + offsetX;
        const y = dot.baseY + offsetY;

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, 0.7, 0, Math.PI);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default AnimatedGridDotsBackground;
