"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

// Import dynamique avec désactivation du SSR pour le composant Three.js
const CombinedScene = dynamic(() => import("./CombinedSceneHover"), {
  ssr: false,
});

const ImageWithDeformation = ({ src }) => {
  const containerRef = useRef();

  return (
    <div
      ref={containerRef}
      className="absolute  w-full h-full pointer-events-none  "
    >
      <Canvas style={{ pointerEvents: "none" }}>
        <CombinedScene src={src} />
      </Canvas>
    </div>
  );
};

export default ImageWithDeformation;
