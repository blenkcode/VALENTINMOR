"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
const Scene = dynamic(
  () => import("../components/shaders/ImageWithDeformation"),
  { ssr: false }
);
const Landing = () => {
  return (
    <div className=" w-full  h-[100svh] items-start pb-[1vw]  flex relative justify-between px-[2vw] z-10">
      <div className="h-[82svh] w-[1px] absolute left-1/2 top-[8vw] bg-black"></div>
      <div className="w-[3vw] absolute left-1/2 aspect-square top-[36.6vw] -translate-x-[46%] bg-white z-50 flex items-center justify-center"></div>

      <div className="pt-[18.8vw] ">
        {" "}
        <h1 className="Med text-[8vw] leading-[9vw]">
          <div className="flex items-center -translate-x-[0.6vw] opacity-0 ">
            Mor
          </div>
          <div className="-translate-x-[0.6vw]">Mor Valentin </div>
        </h1>
        <div className=" flex flex-col ">
          <div className="mt-[3vw] text-[1vw] Med relative">
            <div className="w-[62vw] h-[1px] bg-black absolute -top-[1.8vw] left-0"></div>
            <p className="pl-[4vw]">
              I provide seamless web experiences throught
            </p>

            <p>finely crafted UX, motions & users interactions.</p>
          </div>
        </div>
      </div>

      <div className="w-[31.3vw] relative pt-[8vw]  flex flex-col justify-between ]">
        <div className="relative z-10">
          <img
            className="opacity-[100%] relative z-[1000] mix-blend-exclusion"
            src="/valp.webp"
          ></img>
          <div className="absolute top-[0vw] w-full h-[28.35vw] z-10">
            {" "}
            <Scene src="/valp.webp" />
          </div>

          <div className="w-full flex justify-between mt-[1vw] text-[1vw] Med">
            <div>FREELANCE</div>
            <div>CREATIVE</div>

            <div> WEB DEVELOPER</div>
          </div>
        </div>

        <div className=" text-[0.7vw] mt-[0.5vw]"> </div>
      </div>
    </div>
  );
};

export default Landing;
