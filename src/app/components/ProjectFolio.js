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
  neutral,
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
            rotateX: -0,
            duration: 0.95,
            ease: "expo.out",
            onComplete: () => {
              gsap.set(background1.current, { rotateX: 0 });
            },
          }
        ).to(
          background2.current,

          {
            y: 0,
            rotateX: 0,
            duration: 0.95,
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
            rotateX: 0,
            onComplete: () => {
              gsap.set(background2.current, { rotateX: 0 });
            },
            duration: 0.95,
            ease: "expo.out",
          }
        ).to(
          background3.current,

          { rotateX: 0, y: 0, duration: 0.95, ease: "expo.out" },
          "<"
        );
      }
    } else {
      if (project === projectIndex && lastpProject > project) {
        const tl = gsap.timeline();

        tl.to(
          background3.current,

          {
            rotateX: 0,
            onComplete: () => {
              gsap.set(background3.current, { rotateX: 0 });
            },
            y: "-103%",
            duration: 0.95,
            ease: "expo.out",
          }
        ).to(
          background2.current,

          { rotateX: 0, y: 0, duration: 0.95, ease: "expo.out" },
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

          { rotateX: -0, y: "-103%", duration: 0.95, ease: "expo.out" }
        ).to(
          background1.current,

          { rotateX: 0, y: 0, duration: 0.95, ease: "expo.out" },
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
      className={`w-full flex relative overflow-hidden items-center justify-center h-[4vw]  `}
    >
      <div className="w-0 h-[1px] absolute top-0 linefoliowhite bg-neutral-200"></div>

      <div
        ref={background1}
        className="flex w-full h-full px-[2vw] [backface-visibility:hidden] will-change-transform line1 translate-y-full"
      >
        {" "}
        <div className="w-[31vw] text-[0.7vw] Med flex  items-center justify-between h-full foliol">
          {number}{" "}
          <div className="flex h-full items-center justify-end"> {type} </div>
        </div>
        <div className="w-[33vw]"></div>
        <div className="w-1/6 Med text-[1.5vw] flex items-center text-nowrap  will-change-transform duration-[400ms] ease-in-out [transform-origin:center] translate-x-[0.2vw] [backface-visibility:hidden] relative">
          {" "}
          {title}
        </div>
        <div className="w-1/6">
          {" "}
          <div className=" text-[0.7vw] h-full flex items-center justify-end Med  folior">
            <div>{date}</div>
          </div>
        </div>
      </div>
      <div
        ref={background2}
        style={{
          transform: "rotateX(0deg)",
        }}
        className={`flex w-full h-full absolute top-0  -translate-y-[103%] px-[2vw] overflow-hidden [backface-visibility:hidden] will-change-transform `}
      >
        <div className="w-[31vw] text-[0.7vw] Med flex  items-center justify-between h-full foliol">
          {number}{" "}
          <div className="flex h-full items-center justify-end"> {type} </div>
        </div>
        <div className="w-[33vw]"></div>
        <div className="w-1/6 Med text-[1.5vw] flex items-center text-nowrap  will-change-transform duration-[400ms] ease-in-out [transform-origin:center] translate-x-[0.2vw] [backface-visibility:hidden] relative">
          {" "}
          {title}
        </div>
        <div className="w-1/6">
          {" "}
          <div className=" text-[0.7vw] h-full flex items-center justify-end Med  folior">
            <div>{date}</div>
          </div>
        </div>
      </div>
      <div
        ref={background3}
        style={{
          transform: "rotateX(0deg)",
        }}
        className={`flex w-full h-full absolute top-0  -translate-y-[103%] px-[2vw] [backface-visibility:hidden] will-change-transform `}
      >
        {" "}
        <div className="w-[31vw] text-[0.7vw] Med flex  items-center justify-between h-full foliol">
          {number}{" "}
          <div className="flex h-full items-center justify-end"> {type} </div>
        </div>
        <div className="w-[33vw]"></div>
        <div className="w-1/6 Med text-[1.5vw] flex items-center text-nowrap  will-change-transform duration-[400ms] ease-in-out [transform-origin:center] translate-x-[0.2vw] [backface-visibility:hidden] relative">
          {" "}
          {title}
        </div>
        <div className="w-1/6">
          {" "}
          <div className="text-[0.7vw]  h-full flex items-center justify-end Med  folior">
            <div>{date}</div>
          </div>
        </div>
      </div>
    </TransitionLink>
  );
};

export default ProjectFolio;
