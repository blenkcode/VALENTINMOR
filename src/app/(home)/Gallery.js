"use client";
import React, { useRef, useEffect, useState } from "react";
import SliderSceneSSR from "../components/shaders/SliderSceneSSR.js";

const Gallery = ({ container }) => {
  return (
    <div
      className={`bg-neutral-950 w-full h-[500svh] flex justify-start flex-col items-center `}
    >
      <div className="relative w-full h-full top-[-25vw]">
        {" "}
        <div className="absolute w-full h-lvh top-0">
          {" "}
          <SliderSceneSSR container={container} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
