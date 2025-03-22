import React from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

const Scene = dynamic(
  () => import("../components/shaders//CircularCarousselScene"),
  {
    ssr: false,
  }
);
const Carrousel = ({
  container1,
  container2,
  container3,
  container4,
  container5,
}) => {
  return (
    <div className="w-full h-full z-20 pointer-events-none ">
      {" "}
      <Canvas style={{ pointerEvents: "none" }}>
        <Scene
          container1={container1}
          container2={container2}
          container3={container3}
          container4={container4}
          container5={container5}
        />
      </Canvas>
    </div>
  );
};

export default Carrousel;
