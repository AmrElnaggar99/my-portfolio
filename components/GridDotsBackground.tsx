"use client";
import React, { useEffect, useRef } from "react";

const GridDotsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dimensionsRef = useRef({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const mouseRef = useRef({ x: 0, y: 0 });

  const drawGrid = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensionsRef.current.width * dpr;
    canvas.height = dimensionsRef.current.height * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.beginPath();

    const spacing = 25;
    const cols = Math.floor(dimensionsRef.current.width / spacing) + 5;
    const rows = Math.floor(dimensionsRef.current.height / spacing) + 5;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing;
        const y = row * spacing;
        let radius = 0.6;

        if (window.innerWidth >= 768) {
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxRadius = 1.5;
          radius = Math.max(0.6, maxRadius * Math.exp(-distance / 500));
        }

        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      }
    }

    ctx.fill();
  };

  useEffect(() => {
    drawGrid();

    const handleResize = () => {
      requestAnimationFrame(() => {
        dimensionsRef.current = { width: window.innerWidth, height: window.innerHeight };
        drawGrid();
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth >= 768) {
        mouseRef.current = { x: event.clientX, y: event.clientY };
        drawGrid();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ display: "block", height: "100vh" }}
    />
  );
};

export default GridDotsBackground;
