"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import Moveable from "react-moveable";
import { createNoise2D } from "simplex-noise";

type BubbleProps = {
  id: number;
  size: number;
  color: string;
  top: string;
  left: string;
  text: string;
  bubbleRef?: React.RefObject<HTMLDivElement | null>;
  textColor?: string;
};

export type ItemsList = {
  id: number;
  proficiency: number;
  color: string;
  text: string;
  category: string;
  textColor?: string;
};

const proficiencyToSize = (proficiency: number) => {
  const minSize = 60;
  const maxSize = 150;
  return minSize + (proficiency / 100) * (maxSize - minSize);
};

const simplex = createNoise2D();

const Bubble = ({ size, color, top, left, text, bubbleRef, textColor }: BubbleProps) => {
  const randomDuration = Math.random() * (4 - 2) + 2; // Random duration between 2 and 4 seconds

  return (
    <motion.div
      animate={{
        y: [0, -10, 0], // Float up and down with a slight movement
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        ref={bubbleRef}
        className={`cursor-move absolute rounded-full font-merriweather ${color} hover:scale-105 shadow-lg flex items-center justify-center ${textColor ?? "text-white"}`}
        style={{
          width: size,
          height: size,
          top,
          left,
          position: "absolute",
        }}
      >
        <span className="font-semibold">{text}</span>
      </div>
    </motion.div>
  );
};

const getRandomPosition = (
  size: number,
  containerWidth: number,
  containerHeight: number,
  placedBubbles: { top: number; left: number; size: number }[],
) => {
  const maxAttempts = 500;
  const minDistance = size / 1.5; // Allow bubbles to be closer
  let attempt = 0;

  while (attempt < maxAttempts) {
    const noiseX = simplex(Math.random(), Math.random());
    const noiseY = simplex(Math.random(), Math.random());

    const top = (noiseY * containerHeight) / 2 + containerHeight / 2 - size / 2;
    const left = (noiseX * containerWidth) / 2 + containerWidth / 2 - size / 2;

    const isOverlapping = placedBubbles.some(
      (bubble) => Math.hypot(bubble.left - left, bubble.top - top) < minDistance,
    );

    if (!isOverlapping) {
      return { top: `${top}px`, left: `${left}px` };
    }

    attempt++;
  }

  // In case max attempts are reached, return a default position
  return { top: "50%", left: "50%" };
};

function BubbleCloud({ data }: { data: ItemsList[] }) {
  const [bubbles, setBubbles] = useState<BubbleProps[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<Record<number, React.RefObject<HTMLDivElement | null>>>({});

  const [moveableTargets, setMoveableTargets] = useState<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    const placedBubbles: { top: number; left: number; size: number }[] = [];
    const newBubbles = data.map((bubble) => {
      const size = proficiencyToSize(bubble.proficiency);
      const position = getRandomPosition(size, containerWidth, containerHeight, placedBubbles);

      if (!bubbleRefs.current[bubble.id]) {
        bubbleRefs.current[bubble.id] = React.createRef();
      }

      placedBubbles.push({
        ...bubble,
        top: parseFloat(position.top),
        left: parseFloat(position.left),
        size,
      });

      return { ...bubble, size, ...position };
    });

    setBubbles(newBubbles);
  }, [data]);

  useEffect(() => {
    const updatedTargets = Object.keys(bubbleRefs.current).reduce(
      (acc, id) => {
        const ref = bubbleRefs.current[parseInt(id)];
        if (ref && ref.current) {
          acc[parseInt(id)] = ref.current;
        }
        return acc;
      },
      {} as Record<number, HTMLDivElement | null>,
    );

    setMoveableTargets(updatedTargets);
  }, [bubbles]);

  // Calculate container height based on the number of bubbles
  const containerHeight =
    data.length > 0
      ? Math.min(proficiencyToSize(data[0].proficiency) * data.length * 1.1, 1000)
      : 500;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: `${containerHeight}px` }}
    >
      {bubbles.map((bubble) => (
        <div key={bubble.id} className="relative">
          <Bubble
            id={bubble.id}
            size={bubble.size}
            color={bubble.color}
            textColor={bubble.textColor}
            top={bubble.top}
            left={bubble.left}
            text={bubble.text}
            bubbleRef={bubbleRefs.current[bubble.id]}
          />
          <Moveable
            target={moveableTargets[bubble.id]}
            draggable
            edgeDraggable={true}
            onDrag={(e) => {
              e.target.style.transform = e.transform;
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default BubbleCloud;
