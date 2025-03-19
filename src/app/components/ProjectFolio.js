import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import TransitionLink from "../utils/TransitionLink";
import { useModal } from "../Context/ModalContext";
const ProjectFolio = ({
  title,
  date,
  type,
  src,
  href,
  project,
  number,
  lastpProject,
  projectIndex,
  frame,
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
            rotateX: 90,
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

          { rotateX: -90, y: "-103%", duration: 0.85, ease: "expo.out" }
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

          { rotateX: -90, y: "-103%", duration: 0.85, ease: "expo.out" }
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
    <TransitionLink
      frame={frame}
      href={href}
      style={{
        transformOrigin: "center bottom",
        perspective: "1000px",
        perspectiveOrigin: "center bottom",
      }}
      onMouseEnter={handleMouseIn}
      className={`w-full flex relative overflow-hidden border-t-[0px] h-[3.5vw] transition-colors ${
        projectIndex === project ||
        (projectIndex > project && projectIndex === lastpProject)
          ? "border-white "
          : "border-black "
      } `}
    >
      <div
        ref={background1}
        className="flex w-full h-full px-[2vw] [backface-visibility:hidden] will-change-transform line1 translate-y-full"
      >
        {" "}
        <div className="w-1/2 text-[0.8vw] Med flex  items-center gap-[16.3vw] h-full">
          {number} <div className="flex h-full items-center"> {type} </div>
        </div>
        <div className="w-1/6 Med text-[2.5vw] flex items-center text-nowrap  will-change-transform duration-[400ms] ease-in-out [transform-origin:center] translate-x-[0.2vw] [backface-visibility:hidden] relative">
          {" "}
          {title}
        </div>
        <div className="w-1/6 text-[0.9vw] Med pl-[1vw]"></div>
        <div className="w-1/6">
          {" "}
          <div className="  h-full flex items-center justify-end Med  ">
            <div>{date}</div>
          </div>
        </div>
      </div>
      <div
        ref={background2}
        style={{
          transform: "rotateX(-90deg)",
        }}
        className={`flex w-full h-full absolute top-0 bg-neutral-950 text-white  -translate-y-[103%] px-[2vw] overflow-hidden [backface-visibility:hidden] will-change-transform `}
      >
        <div className="w-1/2 text-[0.8vw] Med flex  items-center gap-[16.3vw] h-full">
          {number} <div className="flex h-full items-center"> {type} </div>
        </div>
        <div className="w-1/6 Med text-[2.5vw] flex items-center text-nowrap  will-change-transform duration-[400ms] ease-in-out [transform-origin:center] translate-x-[0.2vw] [backface-visibility:hidden] relative">
          {" "}
          {title}
        </div>
        <div className="w-1/6 text-[0.9vw] Med pl-[1vw]"></div>
        <div className="w-1/6">
          {" "}
          <div className="  h-full flex items-center justify-end Med  ">
            <div>{date}</div>
          </div>
        </div>
      </div>
      <div
        ref={background3}
        style={{
          transform: "rotateX(-90deg)",
        }}
        className={`flex w-full h-full absolute top-0  -translate-y-[103%] px-[2vw] [backface-visibility:hidden] will-change-transform `}
      >
        {" "}
        <div className="w-1/2 text-[0.8vw] Med flex  items-center gap-[16.3vw] h-full">
          {number} <div className="flex h-full items-center"> {type} </div>
        </div>
        <div className="w-1/6 Med text-[2.5vw] flex items-center text-nowrap  will-change-transform duration-[400ms] ease-in-out [transform-origin:center] translate-x-[0.2vw] [backface-visibility:hidden] relative">
          {" "}
          {title}
        </div>
        <div className="w-1/6 text-[0.9vw] Med pl-[1vw]"></div>
        <div className="w-1/6">
          {" "}
          <div className="  h-full flex items-center justify-end Med  ">
            <div>{date}</div>
          </div>
        </div>
      </div>
    </TransitionLink>
  );
};

export default ProjectFolio;
