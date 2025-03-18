"use client";
import React, { useState, useEffect, useRef } from "react";
import { useModal } from "../Context/ModalContext";
const Button = ({ text }) => {
  const [isHover, setIsHover] = useState(false);
  const backgroundRef = useRef(null);
  const { setIsHoverThing } = useModal();
  useEffect(() => {
    if (!isHover && backgroundRef.current) {
      const timer = setTimeout(() => {
        backgroundRef.current.style.transition = "none";

        backgroundRef.current.style.transform = "translateX(-101%)";

        backgroundRef.current.offsetHeight;

        backgroundRef.current.style.transition = "transform 250ms ease-in-out";
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [isHover]);
  const handleMouseIn = () => {
    setIsHoverThing(true);
    setIsHover(true);
    console.log("in");
  };
  const handleMouseOut = () => {
    setIsHoverThing(false);
    setIsHover(false);
  };
  return (
    <button
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      className="w-fit  flex  relative cursor-none z-[1000] py-[0.1vw]"
    >
      <div className="w-full h-[1px] absolute bottom-0 overflow-hidden duration-[250ms] transition-transform">
        <div
          ref={backgroundRef}
          style={{
            transform: isHover ? "translateX(0)" : "translateX(101%)",
          }}
          className="w-full h-full bg-white"
        ></div>
      </div>
      {text}
    </button>
  );
};

export default Button;
