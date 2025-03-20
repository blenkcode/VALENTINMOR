"use client";
import React, { useState, useEffect, useRef } from "react";
import { useModal } from "../Context/ModalContext";
import TransitionLink from "../utils/TransitionLink";
const Button = ({ text, href }) => {
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
    <TransitionLink
      href={href}
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      className="w-fit  flex  relative  z-[1000] py-[0.1vw]"
    >
      <div className="w-full h-[1px] absolute bottom-0 overflow-hidden duration-[250ms] transition-transform">
        <div
          ref={backgroundRef}
          style={{
            transform: isHover ? "translateX(0)" : "translateX(101%)",
          }}
          className="w-full h-full bg-black"
        ></div>
      </div>
      {text}
    </TransitionLink>
  );
};

export default Button;
