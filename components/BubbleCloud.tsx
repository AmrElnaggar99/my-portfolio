"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Moveable from "react-moveable";

type BubbleProps = {
  id: number;
  size: number;
  color: string;
  top: string;
  left: string;
  text: string;
  ref?: React.RefObject<HTMLDivElement>;
};

export type ItemsList = {
  id: number;
  proficiency: number;
  color: string;
  text: string;
  category: string;
};

const proficiencyToSize = (proficiency: number) => {
  const minSize = 60;
  const maxSize = 150;
  return minSize + (proficiency / 100) * (maxSize - minSize);
};

const Bubble = ({
  size,
  color,
  top,
  left,
  text,
  bubbleRef,
}: BubbleProps & { bubbleRef: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <div
      ref={bubbleRef}
      className={`cursor-move absolute rounded-full ${color} shadow-lg flex items-center justify-center`}
      style={{
        width: size,
        height: size,
        top,
        left,
        position: "absolute", // Ensure absolute positioning for moveable
      }}
    >
      <span className="text-white font-semibold">{text}</span>
    </div>
  );
};

const getRandomPosition = (
  size: number,
  containerWidth: number,
  containerHeight: number,
  placedBubbles: { top: number; left: number; size: number }[],
) => {
  const maxAttempts = 50;
  let attempt = 0;
  while (attempt < maxAttempts) {
    const top = Math.random() * (containerHeight - size);
    const left = Math.random() * (containerWidth - size);

    const isOverlapping = placedBubbles.some(
      (bubble) => Math.hypot(bubble.left - left, bubble.top - top) < (bubble.size + size) / 2 + 10,
    );

    if (!isOverlapping) return { top: `${top}px`, left: `${left}px` };

    attempt++;
  }
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

  return (
    <div ref={containerRef} className="relative w-full min-h-[400px] overflow-hidden">
      {bubbles.map((bubble) => (
        <div key={bubble.id} className="relative">
          <Bubble
            id={bubble.id}
            size={bubble.size}
            color={bubble.color}
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
