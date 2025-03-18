"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
const Scene = dynamic(
  () => import("../components/shaders/ImageWithDeformation"),
  { ssr: false }
);
const Landing = () => {
  return (
    <div className=" w-full  h-[100svh] items-start  flex relative justify-between px-[2vw] z-10 pb-[3vw]">
      <div className="mt-[1vw] absolute bottom-[2vw] left-[26vw] Med text-[0.8vw]">
        SCROLL DOWN
      </div>
      {/* <div className="h-[94.5svh] w-[1px] absolute left-2/3 -translate-x-[2.5vw] top-[0vw] bg-black"></div>
      <div className="h-[1px] w-[95vw] absolute left-[2vw]  top-[18.5vw] bg-black"></div> */}
      {/* <div className="w-[3vw] absolute left-1/2 aspect-square top-[36.6vw] -translate-x-[46%] bg-white z-50 flex items-center justify-center"></div> */}
      <div className="h-full flex flex-col justify-start pt-[15.5vw] ">
        {" "}
        <h1 className="Med text-[7.6vw] leading-[7.5vw] relative">
          <div className="h-fit absolute text-[0.8vw] leading-[1.3vw] w-[15vw] bottom-[-11vw] right-[1.7vw] ">
            <div> FREELANCE CREATIVE WEB DEVELOPER //</div>{" "}
            <div className="mt-[1vw]">
              I PROVIDE SEAMLESS WEB EXPERIENCES THROUGHT FINELY CRAFTED MOTIONS
              & USER INTERACTIONS.
            </div>
          </div>
          <div className="flex items-center -translate-x-[0.vw]  ">
            <div className="mr-[2vw] clear-both text-[4vw]">→</div> VALENTIN
          </div>
          <div className=" relative flex flex-col items-end">MOR</div>
        </h1>
        <div className=" flex flex-col ">
          <div className="mt-[0vw] text-[1vw] Med relative"></div>
        </div>
      </div>
      <div className="w-[31.3vw] relative  flex flex-col justify-end pt-[19.5vw] h-full ">
        <div className="w-full flex text-[2vw] justify-between mt-[1vw] text-[1vw] Med">
          <div>創造的</div>
          <div>開発者</div>
        </div>

        <div className="relative z-10 mt-[1vw]">
          <img
            className="opacity-[100%] relative z-[1000] mix-blend-exclusion"
            src="/valp.webp"
          ></img>
          <div className="absolute top-[0vw] w-full h-[28.4vw] z-10">
            {" "}
            <Scene src="/valp.webp" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
