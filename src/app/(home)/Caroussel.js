"use client";
import React from "react";
import Carrousel from "./Carrousel";
import { useProject } from "../Context/ProjectContext";
const Caroussel = () => {
  const { project, setProject, lastpProject, setLastProject } = useProject();
  return (
    <div className="w-[38vw] aspect-square absolute carrou -top-[5.5vw] left-[9.5vw]">
      <div className="relative w-full h-full  theframe">
        <Carrousel project={project} lastpProject={lastpProject} />
      </div>
    </div>
  );
};

export default Caroussel;
