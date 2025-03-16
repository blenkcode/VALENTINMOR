import React from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

// Import dynamique avec désactivation du SSR pour le composant Three.js
const Scene = dynamic(
  () => import("../components/shaders/CircularCarousselScene"),
  {
    ssr: false,
  }
);
const Carrousel = () => {
  return (
    <div className="w-screen  h-[100vh]  z-20">
      {" "}
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
};

export default Carrousel;
