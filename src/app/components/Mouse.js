"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useModal } from "../Context/ModalContext";
const Mouse = () => {
  const mouseRef = useRef(null);
  const mouse2Ref = useRef(null);
  const mouse3Ref = useRef(null);
  const pointerRef = useRef(null);
  const openProject = useRef(null);
  const { isHoverLink, isHoverThing } = useModal();
  useEffect(() => {
    const handleMouseMove = (e) => {
      gsap.to(mouseRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(mouse2Ref.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(mouse3Ref.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(openProject.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(pointerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div
      style={{
        transform: "translate(-50%, -50%)",
      }}
      className="fixed w-[4vw] aspect-square flex items-center justify-center mix-blend-difference z-[10000] pointer-events-none overflow-visible"
    >
      <div
        ref={mouseRef}
        className=" w-full h-full top-3/4 left-3/4 -translate-x-1/2 translate-y-full absolute flex items-center justify-center"
      >
        {" "}
        <div
          className={`border-white border-[1px] rounded-full w-full h-full duration-[400ms] ease-int-out ${
            isHoverLink
              ? "scale-[80%] -translate-y-3/4   -translate-x-3/4 "
              : "scale-100"
          } ${
            isHoverThing
              ? "scale-[20%] bg-white -translate-y-3/4 -translate-x-3/4 "
              : "scale-100"
          }`}
        ></div>
      </div>
      <div
        ref={mouse3Ref}
        className=" w-full h-full top-3/4 left-3/4 -translate-x-1/2 translate-y-full absolute flex items-center justify-center"
      >
        {" "}
        <div
          className={` tewt-[5vw] w-full h-full  flex justify-between items-center duration-[400ms] ease-int-out text-white ${
            isHoverLink
              ? "scale-[140%] -translate-y-3/4  -translate-x-3/4 "
              : "scale-0"
          } `}
        >
          <div className="rotate-180">→</div> <div>→</div>
        </div>
      </div>

      <div
        ref={pointerRef}
        className={`w-[5px] aspect-square absolute  bg-white rounded-full top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 ${
          isHoverLink ? "scale-[140%]  " : "scale-100"
        }`}
      ></div>

      {/* <div ref={openProject} className="absolute w-full h-full ">
        {" "}
        <div
          style={{
            clipPath: isHoverLink
              ? "inset(0% 0% 0% 0%)"
              : "inset(50% 50% 50% 50%)", // État initial du clip-path
          }}
          className=" absolute top-0 right-[7vw] duration-[400ms] text-black bg-white text-[1vw] Med flex gap-[1vw] p-[0.4vw]"
        >
          <div>OPEN </div>
        </div>
      </div> */}
    </div>
  );
};

export default Mouse;
