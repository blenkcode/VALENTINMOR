"use client";
import React from "react";

import Folio from "./Folio";
import { useProject } from "../Context/ProjectContext";
import { useMobile } from "../Context/isMobileContext";
const Landing = () => {
  const { setProject, project } = useProject();
  const { isMobile } = useMobile();
  const handlenext = () => {
    // if (project === "5") return;

    if (project === "1") {
      setProject("2");
    } else if (project === "2") {
      setProject("3");
    } else if (project === "3") {
      setProject("4");
    } else if (project === "4") {
      setProject("5");
    }
  };

  const handleprev = () => {
    // if (project === "5") return;

    if (project === "2") {
      setProject("1");
    } else if (project === "3") {
      setProject("2");
    } else if (project === "4") {
      setProject("3");
    } else if (project === "5") {
      setProject("4");
    }
  };
  return (
    <div className=" w-full  h-[100svh] items-center  flex flex-col relative justify-center  z-10 pb-[0vw]">
      <Folio></Folio>

      {isMobile ? (
        <div className="w-full absolute top-1/2 -translate-y-1/2 flex justify-between px-[2vw] pointer-events-auto z-[1000] all">
          <button
            className="pointer-events-auto cursor-pointer w-[18vw] flex items-center justify-center aspect-square  z-[1000] relative"
            onClick={handleprev}
          >
            <img className="w-[7vw] rotate-90" src="/chevron.svg"></img>
          </button>
          <button
            className="pointer-events-auto cursor-pointer w-[18vw] flex items-center justify-center aspect-square "
            onClick={handlenext}
          >
            <img className="w-[7vw] -rotate-90" src="/chevron.svg"></img>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Landing;
