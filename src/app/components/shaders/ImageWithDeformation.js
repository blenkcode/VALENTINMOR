"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

// Import dynamique avec désactivation du SSR pour le composant Three.js
const CombinedScene = dynamic(() => import("./CombinedScene"), {
  ssr: false,
});

const ImageWithDeformation = ({ src, alt, isHovering }) => {
  const containerRef = useRef();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full pointer-events-none z-20 "
    >
      {/* Canvas pour l'effet Three.js */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <Canvas>
          <CombinedScene src={src} isHovering={isHovering} />
        </Canvas>
      </div>
    </div>
  );
};

export default ImageWithDeformation;
