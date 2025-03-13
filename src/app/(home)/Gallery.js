"use client";
import React, { useRef, useEffect, useState } from "react";
import SliderSceneSSR from "../components/shaders/SliderSceneSSR.js";

const Gallery = ({ container }) => {
  return (
    <div className={`w-full h-full flex justify-start flex-col items-center `}>
      <div className="relative w-full h-full top-0">
        {" "}
        <SliderSceneSSR container={container} />
      </div>
    </div>
  );
};

export default Gallery;
