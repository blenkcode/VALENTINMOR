"use client";
import React from "react";
import { useTransition } from "../Context/TransitionContext";

const Frame = () => {
  const { transiton } = useTransition();
  return (
    <div
      className={`fixed w-screen top-0 left-0  z-[10000] pointer-events-none ${
        transiton ? "h-[100svh]" : "h-lvh"
      }`}
    >
      <div className="h-full absolute md:w-[3vw] w-[6vw] bg-black left-0 top-0 frameleft md:-translate-x-[3vw] -translate-x-[6vw]"></div>
      <div className="h-full absolute md:w-[3vw] w-[6vw] bg-black right-0 top-0 frameright md:translate-x-[3vw] translate-x-[6vw]"></div>
      <div className="md:h-[3vw] h-[6vw] absolute w-screen bg-black left-0 top-0 frametop md:-translate-y-[3vw] translate-y-[6vw]"></div>
      <div className=" absolute w-screen bg-black left-0 bottom-0 framebottom md:translate-y-[3vw] translate-y-[6vw] md:h-[3vw] h-[6vw]"></div>
    </div>
  );
};

export default Frame;
