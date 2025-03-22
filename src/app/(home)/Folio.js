"use client";
import React, { useState, useEffect, useRef } from "react";
import ProjectFolio from "../components/ProjectFolio";

import { useModal } from "../Context/ModalContext";
import { createEnterLanding } from "../animations/CreateEnterLanding";
import { useTransition } from "../Context/TransitionContext";
import { useProject } from "../Context/ProjectContext";
import FolioTitle from "./FolioTitle";
import gsap from "gsap";
const Folio = () => {
  const { setIsHoverLink } = useModal();
  const { setTransition } = useTransition();
  const works = useRef(null);
  const number = useRef(null);
  const jap = useRef(null);
  const date = useRef(null);
  const arrow = useRef(null);
  const frame = useRef(null);
  const neutral = useRef(null);
  const [events, setEvents] = useState(true);
  //foliocompnent refs
  const { project, setProject, lastpProject, setLastProject } = useProject();
  const handleMouseIn = () => {
    setProject("0");
    setIsHoverLink(false);
  };
  const handleMouseIn2 = () => {
    setProject("6");
    setIsHoverLink(false);
  };
  const handleMouseOut = () => {
    setLastProject("0");
    setIsHoverLink(false);
  };
  const handleMouseOut2 = () => {
    setLastProject("6");
    setIsHoverLink(false);
  };
  useEffect(() => {
    createEnterLanding({
      works,
      number,
      jap,
      date,
      arrow,
      frame,
      setTransition,
    });
    setTimeout(() => {
      setEvents(false);
    }, 1000);

    setProject("0");
  }, []);

  const handlereset = () => {
    setEvents(true);
  };

  useEffect(() => {
    const Ytarget =
      project === "0"
        ? "-4vw"
        : project === "1"
        ? "0vw"
        : project === "2"
        ? "4vw"
        : project === "3"
        ? "8vw"
        : project === "4"
        ? "12vw"
        : project === "5"
        ? "16vw"
        : project === "6"
        ? "20vw"
        : "";
    const Ytarget2 =
      project === "0"
        ? "-4vw"
        : project === "1"
        ? "0vw"
        : project === "2"
        ? "4vw"
        : project === "3"
        ? "8vw"
        : project === "4"
        ? "12vw"
        : project === "5"
        ? "16vw"
        : project === "6"
        ? "20vw"
        : "";
    const tl = gsap.timeline();

    tl.to(
      neutral.current,

      {
        y: Ytarget,

        duration: 0.65,
        ease: "expo.out",
      },
      "<"
    );
  }, [project]);
  return (
    <div className={` h-auto w-full  z-10  folio  `}>
      <div className="md:absolute fixed md:top-[8vw] top-[2vw] w-full">
        {" "}
        <FolioTitle jap={jap} number={number} arrow={arrow}></FolioTitle>
      </div>

      <div
        onMouseEnter={handleMouseIn}
        onMouseLeave={handleMouseOut}
        className="w-full h-[15vw] md:visible md:pointer-events-auto pointer-events-none invisible"
      ></div>
      <div
        onClick={handlereset}
        className="w-full foliolines relative overflow-hidden md:visible md:pointer-events-auto pointer-events-none invisible"
      >
        <div
          ref={neutral}
          className="w-full h-[4vw] bg-neutral-200  absolute top-0 -translate-y-[4vw] neutral1 opacity-0 flex all px-[2vw]  pointer-events-none"
        >
          <div className="absolute w-full h-full top-0 left-0 flex  px-[2vw]">
            {" "}
            <div className="w-1/3 flex justify-center items-center">
              <img className="w-[1vw]" src="/chevron.svg"></img>
            </div>
          </div>
        </div>
        <div
          onMouseEnter={() => setProject("1")}
          onMouseLeave={() => setLastProject("1")}
          className={`w-full flex  overflow-hidden all   ${
            events ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <ProjectFolio
            title="FERTILE "
            neutral={neutral}
            frame={frame}
            date="MAR 25"
            type="ARTISTIC AGENCY"
            src="/meta.webp"
            number="PR.01"
            projectIndex="1"
            href="/Works/Fertile"
            project={project}
            lastpProject={lastpProject}
          />
        </div>
        <div
          onMouseEnter={() => setProject("2")}
          onMouseLeave={() => setLastProject("2")}
          className={`w-full flex  overflow-hidden all   ${
            events ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <ProjectFolio
            title="CAMILLE JUTEL"
            date="FEB 25"
            frame={frame}
            type="PHOTOGRAPHIC PORTFOLIO"
            src="/bannerjuliette.webp"
            number="PR.02"
            href="/Works/CamilleJutel"
            projectIndex="2"
            project={project}
            lastpProject={lastpProject}
          />
        </div>
        <div
          onMouseEnter={() => setProject("3")}
          onMouseLeave={() => setLastProject("3")}
          className={`w-full flex  overflow-hidden all   ${
            events ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <ProjectFolio
            title="MARINE BENABOU "
            date="JAN 25"
            frame={frame}
            type="AUDIO ENGENIEER"
            src="/music1.webp"
            href="/Works/MarineBenabou"
            projectIndex="3"
            number="PR.03"
            project={project}
            lastpProject={lastpProject}
          />
        </div>
        <div
          onMouseEnter={() => setProject("4")}
          onMouseLeave={() => setLastProject("4")}
          className={`w-full flex  overflow-hidden all   ${
            events ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <ProjectFolio
            title="AMOURATROI"
            date="DEC 24"
            frame={frame}
            type="PHOTOGRAPHIC PORTFOLIO"
            src="/banneramour.webp"
            href="/Works/Amouratroi"
            number="PR.04"
            projectIndex="4"
            project={project}
            lastpProject={lastpProject}
          />
        </div>
        <div
          onMouseEnter={() => setProject("5")}
          onMouseLeave={() => setLastProject("5")}
          className={`w-full flex  overflow-hidden all   ${
            events ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <ProjectFolio
            title="LCDO FESTIVAL "
            date="NOV 24"
            frame={frame}
            type="MUSIC FESTIVAL"
            src="/bannerlcdo.webp"
            number="PR.05"
            href="/Works/LeChantDesOiseaux"
            project={project}
            projectIndex="5"
            lastpProject={lastpProject}
          />
        </div>
      </div>
      <div
        onMouseEnter={() => setProject("6")}
        onMouseLeave={() => setLastProject("6")}
        className="w-full h-[15vw] relative md:visible md:pointer-events-auto pointer-events-none invisible"
      >
        <div className="w-0 h-[1px] absolute top-0 linefoliowhite bg-neutral-200 all"></div>
      </div>
    </div>
  );
};

export default Folio;
