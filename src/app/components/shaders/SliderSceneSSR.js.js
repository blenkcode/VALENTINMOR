"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

// Import dynamique avec désactivation du SSR pour le composant Three.js
const CombinedScene = dynamic(() => import("./SliderScene"), {
  ssr: false,
});

const SliderSceneSSR = ({ container, scrollY, canvasRef }) => {
  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full pointer-events-none z-20 top-0 -translate-y-[12vw]    "
    >
      <Canvas>
        <CombinedScene container={container} scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default SliderSceneSSR;
