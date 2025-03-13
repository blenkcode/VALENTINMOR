"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

// Import dynamique avec désactivation du SSR pour le composant Three.js
const CombinedScene = dynamic(() => import("./SliderScene"), {
  ssr: false,
});

const SliderSceneSSR = ({ container }) => {
  return (
    <div className="relative w-full h-full pointer-events-none z-20 top-[3vw] ">
      <Canvas>
        <CombinedScene container={container} />
      </Canvas>
    </div>
  );
};

export default SliderSceneSSR;
