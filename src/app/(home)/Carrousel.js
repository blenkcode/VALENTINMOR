import React from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

const Scene = dynamic(
  () => import("../components/shaders//CircularCarousselScene"),
  {
    ssr: false,
  }
);
const Carrousel = ({ lastpProject, project }) => {
  return (
    <div className="w-full h-full z-20 pointer-events-none ">
      {" "}
      <Canvas style={{ pointerEvents: "none" }}>
        <Scene lastpProject={lastpProject} project={project} />
      </Canvas>
    </div>
  );
};

export default Carrousel;
