import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { useModal } from "../Context/ModalContext";
const ProjectFolio = ({
  title,
  date,
  type,

  project,
  number,
  lastpProject,
  projectIndex,
}) => {
  const background1 = useRef(null);
  const background2 = useRef(null);
  const background3 = useRef(null);

  const { setIsHoverLink } = useModal();
  useEffect(() => {
    if (project > lastpProject) {
      if (project === projectIndex && lastpProject < project) {
        const tl = gsap.timeline();

        tl.to(
          background1.current,

          {
            y: "103%",
            rotateX: 70,
            duration: 0.85,
            ease: "expo.out",
          }
        ).to(
          background2.current,

          {
            y: 0,
            rotateX: 0,
            duration: 0.85,
            ease: "expo.out",
          },
          "<"
        );
      } else if (
        project - lastpProject === 1 &&
        projectIndex === lastpProject
      ) {
        const tl = gsap.timeline();
        gsap.set(background1.current, { y: "103%" });
        tl.to(
          background2.current,

          {
            y: "103%",
            rotateX: 70,
            duration: 0.85,
            ease: "expo.out",
          }
        ).to(
          background3.current,

          { rotateX: 0, y: 0, duration: 0.85, ease: "expo.out" },
          "<"
        );
      }
    } else {
      if (project === projectIndex && lastpProject > project) {
        const tl = gsap.timeline();

        tl.to(
          background3.current,

          { rotateX: -70, y: "-103%", duration: 0.85, ease: "expo.out" }
        ).to(
          background2.current,

          { rotateX: 0, y: 0, duration: 0.85, ease: "expo.out" },
          "<"
        );
      } else if (
        project - lastpProject === -1 &&
        projectIndex === lastpProject
      ) {
        const tl = gsap.timeline();
        gsap.set(background1.current, { y: "103%" });
        gsap.set(background3.current, { y: "-103%" });
        tl.to(
          background2.current,

          { rotateX: -70, y: "-103%", duration: 0.85, ease: "expo.out" }
        ).to(
          background1.current,

          { rotateX: 0, y: 0, duration: 0.85, ease: "expo.out" },
          "<"
        );
      }
    }
  }, [project]);

  const handleMouseIn = () => {
    setIsHoverLink(true);
  };
  return (
    <div
      style={{
        transformOrigin: "center bottom",
        perspective: "1000px",
        perspectiveOrigin: "center bottom",
      }}
      onMouseEnter={handleMouseIn}
      className={`w-full flex relative overflow-hidden border-t-[1px] h-[9vw] transition-colors ${
        projectIndex === project ||
        (projectIndex > project && projectIndex === lastpProject)
          ? "border-white "
          : "border-black "
      } `}
    >
      <div
        ref={background1}
        className="flex w-full h-full px-[2vw] [backface-visibility:hidden] will-change-transform "
      >
        {" "}
        <div className="w-1/4 text-[0.8vw] Med flex  items-center gap-[5vw] h-full">
          {number} <div className="flex h-full items-center"> {type} </div>
        </div>
        <div className="w-2/8  h-full flex items-center justify-between Med pr-[2vw] ">
          <div>{date}</div> <div className="opacity-0">x</div>
        </div>
        <div className="w-1/6 Med text-[3vw] flex items-center text-nowrap  will-change-transform duration-[400ms] ease-in-out [transform-origin:center] [backface-visibility:hidden] relative">
          {" "}
          {title}
        </div>
        <div className="w-1/6 text-[0.9vw] Med pl-[1vw]"></div>
        <div className="w-1/6"> </div>
      </div>
      <div
        ref={background2}
        style={{
          transform: "rotateX(-70deg)",
        }}
        className={`flex w-full h-full absolute top-0 bg-neutral-950 text-white  -translate-y-[103%] px-[2vw] overflow-hidden [backface-visibility:hidden] will-change-transform `}
      >
        {" "}
        <div className="w-1/4 text-[0.8vw] Med flex  items-center gap-[5vw] h-full">
          {number} <div className="flex h-full items-center"> {type} </div>
        </div>
        <div className="w-2/8  h-full flex items-center justify-between Med pr-[2vw] ">
          <div>{date}</div> <div className="text-[2vw]"></div>
        </div>
        <div className="w-1/6 Med text-[3vw] flex items-center text-nowrap  duration-[400ms] ease-in-out [transform-origin:center]  relative">
          {" "}
          {title}
        </div>
        <div className="w-1/6 text-[0.9vw] Med pl-[1vw]"></div>
        <div className="w-1/6"> </div>
      </div>
      <div
        ref={background3}
        style={{
          transform: "rotateX(-70deg)",
        }}
        className={`flex w-full h-full absolute top-0  -translate-y-[103%] px-[2vw] [backface-visibility:hidden] will-change-transform `}
      >
        {" "}
        <div className="w-1/4 text-[0.8vw] Med flex  items-center gap-[5vw] h-full">
          {number} <div className="flex h-full items-center"> {type} </div>
        </div>
        <div className="w-2/8  h-full flex items-center justify-between Med pr-[2vw] ">
          <div>{date}</div> <div className="opacity-0">x</div>
        </div>
        <div className="w-1/6 Med text-[3vw] flex items-center text-nowrap  will-change-transform duration-[400ms] ease-in-out [transform-origin:center] [backface-visibility:hidden] relative">
          {" "}
          {title}
        </div>
        <div className="w-1/6 text-[0.9vw] Med pl-[1vw]"></div>
        <div className="w-1/6"> </div>
      </div>
    </div>
  );
};

export default ProjectFolio;
