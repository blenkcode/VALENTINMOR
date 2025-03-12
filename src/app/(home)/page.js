"use client";
import React, { useState, useEffect, useRef } from "react";
import Folio from "./Folio";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Tech from "./Tech";
import Slogan from "./Slogan";
import Gallery from "./Gallery";
const Scene = dynamic(
  () => import("../components/shaders/ImageWithDeformation"),
  { ssr: false }
);
const page = () => {
  const [isHover, setIsHover] = useState(false);
  const backgroundRef = useRef(null);
  const arrow1 = useRef(null);
  const framer = useRef(null);
  const arrow2 = useRef(null);
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
  useEffect(() => {}, []);
  return (
    <main className=" w-full relative flex flex-col   items-center  ">
      {" "}
      <div className="flex w-full  h-[100svh] items-start pb-[1vw]  flex items-end relative justify-between px-[2vw]">
        <div className="h-[82svh] w-[1px] absolute left-1/2 top-[8vw] bg-black"></div>
        <div className="w-[3vw] absolute left-1/2 aspect-square top-[36.6vw] -translate-x-[46%] bg-white z-50 flex items-center justify-center">
          {/* <div className="w-[1vw] aspect-square bg-black"></div> */}
        </div>
        {/* <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="w-fit text-[1.225vw] Med flex mt-[2vw]  cursor-pointer absolute bottom-[1vw]"
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
          Learn more
          <div className="absolute top-[-0.5vw] -right-[1.2vw] aspect-square w-[1.2vw] overflow-hidden">
            <div className="relative w-full h-full">
              {" "}
              <img
                ref={arrow1}
                style={{
                  transform: isHover ? " translateY(-103%)" : " translateY(0)",
                }}
                className="rotate-[45deg] w-[1.2vw] duration-[250ms] transition-transform"
                src="/arroww.svg"
              ></img>
              <img
                ref={arrow2}
                style={{
                  transform: isHover ? "translateY(0)" : " translateY(104%)",
                }}
                className="rotate-[45deg] w-[1.2vw] absolute top-0 duration-[250ms] transition-transform"
                src="/arroww.svg"
              ></img>
            </div>
          </div>
        </div> */}
        <div className="pt-[18.8vw] ">
          {" "}
          <h1 className="Med text-[9vw] leading-[9vw]">
            <div className="flex items-center -translate-x-[0.6vw] ">Mor</div>
            <div className="">Valentin </div>
          </h1>
          <div className=" flex flex-col ">
            <div className="mt-[3vw] text-[1vw] Med relative">
              <div className="w-[62vw] h-[1px] bg-black absolute -top-[1.8vw] left-0"></div>
              <p className="pl-[4vw]">
                I PROVIDE SEAMLESS WEB EXPERIENCES THROUGHT
              </p>

              <p> FINELY CRAFTED UX, MOTIONS & USERS INTERACTIONS.</p>
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
      <Folio />
      <Tech></Tech>
      <Slogan></Slogan>
    </main>
  );
};

export default page;
