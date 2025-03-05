"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const Moveable = dynamic(() => import("react-moveable"), { ssr: false });

export type ArtistProps = {
  id: number;
  images: { url: string; height: number; width: number }[];
  name: string;
  position: any;
  ref: React.RefObject<HTMLDivElement | null>;
};

const ArtistCard = ({ id, images, name, position, ref }: ArtistProps) => {
  const randomRotation = Math.random() * 30 - 15;
  const randomTranslateX = Math.random() * 20 - 10;
  const randomTranslateY = Math.random() * 20 - 10;

  return (
    <div
      ref={ref}
      className="cursor-move absolute flex flex-col items-center shadow-xl"
      style={{
        ...position,
        transform: `rotate(${randomRotation}deg) translate(${randomTranslateX}px, ${randomTranslateY}px)`,
      }}
    >
      <div className="bg-white p-2 shadow-lg relative z-10">
        <Image
          src={images[0].url}
          alt={name}
          width={200}
          height={200}
          className="object-cover border-8 border-white"
        />
        <div className="bg-white w-full text-center font-monasans">
          <p className="font-semibold text-gray-900 text-sm">{name}</p>
        </div>
      </div>
    </div>
  );
};

const getRandomPosition = (
  size: number,
  containerWidth: number,
  placedBubbles: { top: number; left: number; size: number }[],
) => {
  const overlappingFactor = 0.9;
  const maxAttempts = 500;
  const minDistance = size * overlappingFactor;
  const randomOffset = size * 0.2;
  const margin = size * 0.2;

  let attempt = 0;
  let top = margin;
  let left = margin;

  while (attempt < maxAttempts) {
    if (left + size > containerWidth - margin) {
      left = margin;
      top += size * overlappingFactor;
    }

    const randomizedTop = top + (Math.random() * randomOffset - randomOffset / 2);
    const randomizedLeft = left + (Math.random() * randomOffset - randomOffset / 2);

    const isOverlapping = placedBubbles.some(
      (bubble) =>
        Math.hypot(bubble.left - randomizedLeft, bubble.top - randomizedTop) < minDistance,
    );

    if (!isOverlapping) {
      return { top: `${randomizedTop}px`, left: `${randomizedLeft}px` };
    }

    left += size * overlappingFactor;
    attempt++;
  }

  return { top: `${top}px`, left: `${left}px` };
};

function ArtistCardCloud({ data }: { data: ArtistProps[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const artistRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({});
  const [moveableTargets, setMoveableTargets] = useState<Record<number, HTMLDivElement | null>>({});
  const [artists, setArtists] = useState<
    {
      top: string;
      left: string;
      size: number;
      id: number;
      images: { url: string; height: number; width: number }[];
      name: string;
      position: { top: number; left: number; size: number };
    }[]
  >([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;

    let placedArtists: { top: number; left: number; size: number }[] = [];
    const newArtists = data.map((artist) => {
      const position = getRandomPosition(150, containerWidth, placedArtists);

      if (!artistRefs.current[artist.id]) {
        artistRefs.current[artist.id] = React.createRef();
      }

      placedArtists.push({
        top: parseFloat(position.top),
        left: parseFloat(position.left),
        size: 150,
      });

      return { ...artist, size: 150, ...position };
    });

    setArtists(newArtists);
  }, [data]);

  useEffect(() => {
    const updatedTargets = Object.keys(artistRefs.current).reduce(
      (acc, id) => {
        const ref = artistRefs.current[id];
        if (ref && ref.current) {
          acc[id] = ref.current;
        }
        return acc;
      },
      {} as Record<string, HTMLDivElement | null>,
    );

    setMoveableTargets(updatedTargets);
  }, [artists]);

  const maxBottom = Math.max(0, ...artists.map((artist) => parseFloat(artist.top) + 250));

  const constrainMovement = (e: any, containerRef: React.RefObject<HTMLDivElement | null>) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const cardRect = e.target.getBoundingClientRect();

    // Extract existing rotation
    const computedStyle = window.getComputedStyle(e.target);
    const matrix = new DOMMatrix(computedStyle.transform);
    const rotationAngle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI); // Extract rotation in degrees

    // Get initial top/left values
    const initialLeft = parseFloat(e.target.style.left) || 0;
    const initialTop = parseFloat(e.target.style.top) || 0;

    // Calculate next position
    let nextX = matrix.m41 + e.delta[0]; // TranslateX
    let nextY = matrix.m42 + e.delta[1]; // TranslateY

    // Constrain movement within container
    const minX = -initialLeft;
    const maxX = containerRect.width - cardRect.width - initialLeft;
    const minY = -initialTop;
    const maxY = containerRect.height - cardRect.height - initialTop;

    nextX = Math.max(minX, Math.min(nextX, maxX));
    nextY = Math.max(minY, Math.min(nextY, maxY));

    // Apply new transform while preserving rotation
    e.target.style.transform = `translate(${nextX}px, ${nextY}px) rotate(${rotationAngle}deg)`;
  };
  return (
    <div ref={containerRef} className="relative w-full" style={{ minHeight: `${maxBottom}px` }}>
      {artists.map((artist) => (
        <div key={artist.id} className="relative">
          <ArtistCard
            id={artist.id}
            images={artist.images}
            name={artist.name}
            ref={artistRefs.current[artist.id]}
            position={{ top: artist.top, left: artist.left }}
          />
          <Moveable
            target={moveableTargets[artist.id]}
            draggable
            edgeDraggable={true}
            onDrag={(e) => constrainMovement(e, containerRef)}
          />
        </div>
      ))}
    </div>
  );
}

export default React.memo(ArtistCardCloud);
