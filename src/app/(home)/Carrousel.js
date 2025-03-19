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
const Carrousel = ({ lastpProject, project }) => {
  return (
    <div className="w-full h-full z-20">
      {" "}
      <Canvas>
        <Scene lastpProject={lastpProject} project={project} />
      </Canvas>
    </div>
  );
};

export default Carrousel;
