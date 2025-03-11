"use client";
import React, { useState } from "react";
import ProjectFolio from "../components/ProjectFolio";
import ImageSlider from "../components/ImageSlider";
import { useModal } from "../Context/ModalContext";
const Folio = () => {
  const [lastpProject, setLastProject] = useState("0");
  const [project, setProject] = useState("0");
  const { setIsHoverLink } = useModal();
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

  return (
    <div className=" h-auto w-full mt-[2vw]   ">
      <div className="w-full flex">
        {" "}
        <div className="w-1/2"></div>
        <div className="w-1/6 flex">
          <h3 className="Med text-[4vw]">Works</h3>
          <div className="text-[0.8vw]">(05)</div>
        </div>
        <div className="Med text-[4vw] w-1/6">→</div>
        <div className="Med text-[4vw] pr-[2vw]">2024/25</div>
      </div>
      <div
        onMouseEnter={handleMouseIn}
        onMouseLeave={handleMouseOut}
        className="w-full h-[8vw]"
      ></div>
      <div
        onMouseEnter={() => setProject("1")}
        onMouseLeave={() => setLastProject("1")}
        className="w-full flex  overflow-hidden"
      >
        <ProjectFolio
          title="FERTILE "
          date="MAR 25"
          type="ARTISTIC AGENCY"
          src="/meta.webp"
          number="01"
          projectIndex="1"
          project={project}
          lastpProject={lastpProject}
        />
      </div>
      <div
        onMouseEnter={() => setProject("2")}
        onMouseLeave={() => setLastProject("2")}
        className="w-full flex overflow-hidden"
      >
        <ProjectFolio
          title="CAMILLE JUTEL"
          date="FEB 25"
          type="PHOTOGRAPHIC PORTFOLIO"
          src="/bannerjuliette.webp"
          number="02"
          projectIndex="2"
          project={project}
          lastpProject={lastpProject}
        />
      </div>
      <div
        onMouseEnter={() => setProject("3")}
        onMouseLeave={() => setLastProject("3")}
        className="w-full flex overflow-hidden"
      >
        <ProjectFolio
          title="MARINE BENABOU MASTERING"
          date="JAN 25"
          type="AUDIO ENGENIEER"
          src="/music1.webp"
          projectIndex="3"
          number="03"
          project={project}
          lastpProject={lastpProject}
        />
      </div>
      <div
        onMouseEnter={() => setProject("4")}
        onMouseLeave={() => setLastProject("4")}
        className="w-full flex overflow-hidden"
      >
        <ProjectFolio
          title="AMOURATROI"
          date="DEC 24"
          type="PHOTOGRAPHIC PORTFOLIO"
          src="/banneramour.webp"
          number="04"
          projectIndex="4"
          project={project}
          lastpProject={lastpProject}
        />
      </div>
      <div
        onMouseEnter={() => setProject("5")}
        onMouseLeave={() => setLastProject("5")}
        className="w-full flex overflow-hidden"
      >
        <ProjectFolio
          title="LE CHANT DES OISEAUX "
          date="NOV 24"
          type="MUSIC FESTIVAL"
          src="/bannerlcdo.webp"
          number="05"
          project={project}
          projectIndex="5"
          lastpProject={lastpProject}
        />
      </div>
      <div
        onMouseEnter={handleMouseIn2}
        onMouseLeave={handleMouseOut2}
        className="w-full h-[10vw]"
      ></div>
    </div>
  );
};

export default Folio;
