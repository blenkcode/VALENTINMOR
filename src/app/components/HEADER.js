"use client";
import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import gsap from "gsap";
import { useModal } from "../Context/ModalContext";
const HEADER = () => {
  const [hover, setHover] = useState(false);
  const [anim, setAnim] = useState(false);
  const boulette = useRef(null);
  const { setIsHoverThing } = useModal();
  const boulette2 = useRef(null);
  const mega = useRef(null);
  useEffect(() => {
    if (hover) {
      setIsHoverThing(true);
      const tl = gsap.timeline();
      tl.to(boulette.current, {
        x: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setAnim(true);
        },
      }).to(
        boulette2.current,
        {
          x: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );
    } else {
      setIsHoverThing(false);
      const tl = gsap.timeline();
      setAnim(false);

      tl.to(boulette2.current, {
        x: "-0.8vw",
        duration: 0.5,
        ease: "power2.inOut",
      }).to(
        boulette.current,
        {
          x: "-1.4vw",
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            // gsap.set(mega.current, { rotate: 0 });
          },
        },
        "<"
      );
    }
  }, [hover]);
  return (
    <nav className="w-screen fixed flex justify-between top-[2vw] px-[2vw]   text-[0.7vw] Med z-[1000] left-0 mix-blend-difference text-white">
      <div className=" w-1/4 relative ">
        <p>VA/ MOR</p>
        {/* <p>FOLIO 2025</p> */}
      </div>
      <div className=" w-2/8 flex flex-col gap-[0.2vw] ">
        {" "}
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className=" group rounded-full  w-fit py-[0.4vw] px-[0.8vw] flex items-center gap-[0.5vw]  border-white border-[1px] -translate-x-[0.2vw]"
        >
          <div className="relative overflow-hidden flex items-center justify-center w-[1vw]">
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-[1.4vw] text-[0.8vw] duration-500 ease-in-out group-hover:translate-x-0 will-change-transform">
              →
            </div>
            <div className="w-[0.3vw] aspect-square rounded-full bg-white duration-500 ease-in-out group-hover:translate-x-[1.4vw] will-change-transform"></div>
          </div>{" "}
          <div>
            <Button text="LET'S CONNECT" />
          </div>
          <div
            ref={mega}
            className={`relative flex items-center duration-[500ms] justify-center w-[1vw] h-[1vw] will-change-transform ${
              anim ? "rotate-360" : " delay-300 rotate-0"
            }  overflow-hidden `}
          >
            <div
              ref={boulette}
              className="w-full h-full flex justify-between absolute top-[40%]   -translate-x-[1.4vw]  will-change-transform"
            >
              <div className="w-[0.3vw] h-[0.3vw] aspect-square   rounded-full bg-white will-change-transform"></div>
              <div
                ref={boulette2}
                className="w-[0.3vw] h-[0.3vw] aspect-square -translate-x-[0.8vw]  rounded-full bg-white will-change-transform"
              ></div>
            </div>
          </div>{" "}
        </div>
      </div>
      <div className=" w-1/6 flex flex-col ">
        <div className="">
          <Button text="INDEX" />
        </div>
        <div>
          <Button text="ABOUT" />
        </div>
        <div>
          <Button text="WORKS" />
        </div>
      </div>
      <div className=" w-1/6 flex flex-col gap-[0.2vw]">
        <div className="flex">
          {" "}
          <div className="pr-[2vw] opacity-70">SOCIALS </div>
          <Button text="INSTAGRAM" />
        </div>
        <div className="flex">
          {" "}
          <div className="opacity-0 pr-[2vw]">SOCIALS </div>{" "}
          <Button text="MALT" />
        </div>
      </div>
      <div className=" w-1/6 flex  pr-[1vw] text-[1vw] justify-end ">回航</div>
    </nav>
  );
};

export default HEADER;
