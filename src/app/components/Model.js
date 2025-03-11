import React from "react";
import { fragment, vertex } from "../components/shaders/Shader";
const Model = () => {
  return (
    <mesh>
      <planeGeometry args={[3, 3, 15, 15]} />
      <meshBasicMaterial color={"red"} wireframe={true} />
    </mesh>
  );
};

export default Model;
