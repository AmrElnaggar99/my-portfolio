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
const overlappingFactor = 1.2;

const getRandomPosition = (
  size: number,
  containerWidth: number,
  containerHeight: number,
  placedBubbles: { top: number; left: number; size: number }[],
) => {
  const maxAttempts = 500;
  const minDistance = size * overlappingFactor; // Reduce overlap but keep bubbles close
  const randomOffset = size * 0.2; // Small randomization factor
  const margin = size * 0.2; // Keep bubbles away from the edges

  let attempt = 0;
  let top = margin;
  let left = margin;

  while (top + size <= containerHeight - margin && attempt < maxAttempts) {
    // If the bubble exceeds container width, move to the next row
    if (left + size > containerWidth - margin) {
      left = margin; // Reset to the start of the row
      top += size * overlappingFactor; // Move down slightly less than the bubble size to keep them close
    }

    // Add slight randomization to make placement look more natural
    const randomizedTop = top + (Math.random() * randomOffset - randomOffset / 2);
    const randomizedLeft = left + (Math.random() * randomOffset - randomOffset / 2);

    const isOverlapping = placedBubbles.some(
      (bubble) =>
        Math.hypot(bubble.left - randomizedLeft, bubble.top - randomizedTop) < minDistance,
    );

    if (!isOverlapping) {
      return { top: `${randomizedTop}px`, left: `${randomizedLeft}px` };
    }

    left += size * overlappingFactor; // Move to the right for the next bubble
    attempt++;
  }

  // If structured placement fails, pick a completely random position within bounds (with margins)
  const randomTop = margin + Math.random() * (containerHeight - size - 2 * margin);
  const randomLeft = margin + Math.random() * (containerWidth - size - 2 * margin);

  return { top: `${randomTop}px`, left: `${randomLeft}px` };
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

  const bubbleSize = proficiencyToSize(data[0]?.proficiency || 0);
  const maxBubblesPerRow = Math.max(
    1,
    Math.floor(window.innerWidth / (bubbleSize * overlappingFactor)),
  );

  const totalRequiredRows = Math.ceil(data.length / maxBubblesPerRow);

  const containerHeight =
    data.length > 0
      ? totalRequiredRows * bubbleSize * overlappingFactor + 50 // Adjust height dynamically and add a safety padding
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
