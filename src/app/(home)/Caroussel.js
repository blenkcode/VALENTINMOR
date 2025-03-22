"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Carrousel from "./Carrousel";
import { useProject } from "../Context/ProjectContext";

import TransitionLink from "../utils/TransitionLink";
const Caroussel = () => {
  const { project, setProject, lastpProject, setLastProject } = useProject();
  const pr = useRef(null);
  const number = useRef(null);
  const [href, setHref] = useState("/Works/Fertile");

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

  useEffect(() => {
    if (project === "1") {
      setHref("/Works/Fertile");
    } else if (project === "2") {
      setHref("/Works/CamilleJutel");
    } else if (project === "3") {
      setHref("/Works/MarineBenabou");
    } else if (project === "4") {
      setHref("/Works/Amouratroi");
    } else if (project === "5") {
      setHref("/Works/LeChantDesOiseaux");
    }
  }, [project]);

  return (
    <div className="md:w-[30.5vw] w-[90vw] carrou opacity-0 aspect-square fixed  z-[20] pointer-events-none top-1/2 -translate-y-[49.7%] right-1/2 translate-x-1/2 flex items-center justify-center ">
      <div className="absolute md:bottom-[-5vw] bottom-[-12vw] Med md:text-[1vw] text-[5vw] overflow-hidden">
        <TransitionLink
          href={href}
          ref={pr}
          className="-translate-y-full flex overflow-hidden relative md:pr-[0.6vw] pr-[3vw] will-change-transform pointer-events-auto"
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
        </TransitionLink>
      </div>
      <div className="relative w-full h-full   pointer-events-none">
        <Carrousel project={project} lastpProject={lastpProject} />
      </div>
    </div>
  );
};

export default Caroussel;
