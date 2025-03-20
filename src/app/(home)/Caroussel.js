import React from "react";
import Carrousel from "./Carrousel";
const Caroussel = () => {
  return (
    <div className="w-[30vw] aspect-square absolute -top-[1.5vw] left-[12.5vw]">
      <div ref={frame} className="relative w-full h-full  theframe">
        <Carrousel project={project} lastpProject={lastpProject} />
      </div>
    </div>
  );
};

export default Caroussel;
