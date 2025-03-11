import React from "react";
import ImageWithDeformation from "./shaders/ImageWithDeformationHover";
const ImageSlider = () => {
  return (
    <div className="fixed w-screen h-lvh top-0 left-[-15vw] z-[100] pointer-events-none overflow-visible"></div>
  );
};

export default ImageSlider;
