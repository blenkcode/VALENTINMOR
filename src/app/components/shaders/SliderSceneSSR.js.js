"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

// Import dynamique avec désactivation du SSR pour le composant Three.js
const CombinedScene = dynamic(() => import("./SliderScene"), {
  ssr: false,
});

const SliderSceneSSR = ({ container, src, scrollY }) => {
  return (
    <div className="relative w-full h-full pointer-events-none z-20 ">
      <Canvas>
        <CombinedScene container={container} src={src} scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default SliderSceneSSR;
