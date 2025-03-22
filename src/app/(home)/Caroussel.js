"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Carrousel from "./Carrousel";
import { useProject } from "../Context/ProjectContext";
import { useModal } from "../Context/ModalContext";
const Caroussel = () => {
  const { project, setProject, lastpProject, setLastProject } = useProject();
  const pr = useRef(null);
  const number = useRef(null);
  useEffect(() => {
    if (project === "0" || project === "6") {
      const tl = gsap.timeline();
      tl.to(pr.current, {
        y: "-100%",
        duration: 0.9,
        ease: "expo.out",
      });
    } else {
      const tl = gsap.timeline();
      tl.to(pr.current, {
        y: 0,
        duration: 0.9,
        ease: "expo.out",
      });
    }
  }, [project]);

  useEffect(() => {
    if (project === "1") {
      const tl = gsap.timeline();
      tl.to(number.current, {
        y: 0,
        duration: 0.65,
        ease: "expo.out",
      });
    } else if (project === "2") {
      const tl = gsap.timeline();
      tl.to(number.current, {
        y: "-20%",
        duration: 0.65,
        ease: "expo.out",
      });
    } else if (project === "3") {
      const tl = gsap.timeline();
      tl.to(number.current, {
        y: "-40%",
        duration: 0.65,
        ease: "expo.out",
      });
    } else if (project === "4") {
      const tl = gsap.timeline();
      tl.to(number.current, {
        y: "-60%",
        duration: 0.65,
        ease: "expo.out",
      });
    } else if (project === "5") {
      const tl = gsap.timeline();
      tl.to(number.current, {
        y: "-80%",
        duration: 0.65,
        ease: "expo.out",
      });
    }
  }, [project]);

  const container1 = useRef(null);
  const container2 = useRef(null);
  const container3 = useRef(null);
  const container4 = useRef(null);
  const container5 = useRef(null);
  return (
    <>
      {" "}
      <div className="md:w-[30.5vw] w-[90vw] carrou opacity-0 aspect-square fixed  z-[20] pointer-events-none top-1/2 -translate-y-[49.7%] right-1/2 translate-x-1/2 flex items-center justify-center ">
        <div className="absolute md:bottom-[-5vw] bottom-[-10vw] Med md:text-[1vw] text-[5vw] overflow-hidden">
          <div
            ref={pr}
            className="-translate-y-full flex overflow-hidden relative md:pr-[0.6vw] pr-[3vw] will-change-transform"
          >
            OPEN PR.0
            <div
              ref={number}
              className="flex flex-col absolute will-change-transform right-[0vw]"
            >
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full   pointer-events-none">
          <Carrousel
            project={project}
            lastpProject={lastpProject}
            container1={container1}
            container2={container2}
            container3={container3}
            container4={container4}
            container5={container5}
          />
        </div>
      </div>
      <div className="md:h-0 h-[500svh] relative">
        {" "}
        <div ref={container1} className="h-[100svh] md:h-0 "></div>
        <div ref={container2} className="h-[100svh] md:h-0 "></div>
        <div ref={container3} className="h-[100svh] md:h-0 "></div>
        <div ref={container4} className="h-[100svh] md:h-0 "></div>
        <div ref={container5} className="h-[100svh] md:h-0 "></div>
      </div>
    </>
  );
};

export default Caroussel;
