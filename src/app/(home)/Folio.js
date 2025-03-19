"use client";
import React, { useState, useEffect, useRef } from "react";
import ProjectFolio from "../components/ProjectFolio";

import { useModal } from "../Context/ModalContext";
import { createEnterLanding } from "../animations/CreateEnterLanding";
import Carrousel from "./Carrousel";
const Folio = () => {
  const [lastpProject, setLastProject] = useState("0");
  const [project, setProject] = useState("0");
  const { setIsHoverLink } = useModal();
  const works = useRef(null);
  const number = useRef(null);
  const jap = useRef(null);
  const date = useRef(null);
  const arrow = useRef(null);
  const frame = useRef(null);
  //foliocompnent refs

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
    createEnterLanding({ works, number, jap, date, arrow, frame });
  }, []);
  //   const duration = 1.2;

  //   if (project === "1" && lastpProject === "0") {
  //     const tl = gsap.timeline();
  //     tl.to(
  //       VAL.current,

  //       {
  //         y: "103%",
  //         scale: 0.7,
  //         rotateX: 90,
  //         duration: duration,
  //         ease: "expo.out",
  //       }
  //     ).to(
  //       FERTILE.current,

  //       {
  //         y: 0,
  //         scale: 1,
  //         rotateX: 0,
  //         duration: duration,
  //         ease: "expo.out",
  //       },
  //       "<"
  //     );
  //   } else if (project === "0" && lastpProject === "1") {
  //     const tl = gsap.timeline();
  //     tl.to(
  //       VAL.current,

  //       {
  //         y: 0,
  //         scale: 1,
  //         rotateX: 0,
  //         duration: duration,
  //         ease: "expo.out",
  //       }
  //     ).to(
  //       FERTILE.current,

  //       {
  //         y: "-103%",
  //         scale: 0.7,
  //         rotateX: -90,
  //         duration: duration,
  //         ease: "expo.out",
  //       },
  //       "<"
  //     );
  //   } else if (project === "2" && lastpProject === "1") {
  //     const tl = gsap.timeline();
  //     tl.to(
  //       FERTILE.current,

  //       {
  //         y: "103%",
  //         scale: 0.7,
  //         rotateX: 90,
  //         duration: duration,
  //         ease: "expo.out",
  //       }
  //     ).to(
  //       JUTEL.current,

  //       {
  //         y: 0,
  //         rotateX: 0,
  //         scale: 1,
  //         duration: duration,
  //         ease: "expo.out",
  //       },
  //       "<"
  //     );
  //   } else if (project === "1" && lastpProject === "2") {
  //     const tl = gsap.timeline();
  //     tl.to(
  //       FERTILE.current,

  //       {
  //         y: 0,
  //         rotateX: 0,
  //         scale: 1,
  //         duration: duration,
  //         ease: "expo.out",
  //       }
  //     ).to(
  //       JUTEL.current,

  //       {
  //         y: "-103%",
  //         rotateX: -90,
  //         scale: 0.7,
  //         duration: duration,
  //         ease: "expo.out",
  //       },
  //       "<"
  //     );
  //   } else if (project === "3" && lastpProject === "2") {
  //     const tl = gsap.timeline();
  //     tl.to(
  //       JUTEL.current,

  //       {
  //         y: "103%",
  //         rotateX: 90,
  //         scale: 0.7,
  //         duration: duration,
  //         ease: "expo.out",
  //       }
  //     ).to(
  //       MBM.current,

  //       {
  //         y: 0,
  //         scale: 1,
  //         rotateX: 0,
  //         duration: duration,
  //         ease: "expo.out",
  //       },
  //       "<"
  //     );
  //   } else if (project === "2" && lastpProject === "3") {
  //     const tl = gsap.timeline();
  //     tl.to(
  //       JUTEL.current,

  //       {
  //         y: 0,
  //         scale: 1,
  //         rotateX: 0,
  //         duration: duration,
  //         ease: "expo.out",
  //       }
  //     ).to(
  //       MBM.current,

  //       {
  //         y: "-103%",
  //         rotateX: -90,
  //         scale: 0.7,
  //         duration: duration,
  //         ease: "expo.out",
  //       },
  //       "<"
  //     );
  //   } else if (project === "4" && lastpProject === "3") {
  //     const tl = gsap.timeline();
  //     tl.to(
  //       MBM.current,

  //       {
  //         y: "103%",
  //         rotateX: 90,
  //         scale: 0.7,
  //         duration: duration,
  //         ease: "expo.out",
  //       }
  //     ).to(
  //       AMOURATROI.current,

  //       {
  //         y: 0,
  //         rotateX: 0,
  //         scale: 1,
  //         duration: duration,
  //         ease: "expo.out",
  //       },
  //       "<"
  //     );
  //   } else if (project === "3" && lastpProject === "4") {
  //     const tl = gsap.timeline();
  //     tl.to(
  //       MBM.current,

  //       {
  //         y: 0,
  //         rotateX: 0,
  //         scale: 1,
  //         duration: duration,
  //         ease: "expo.out",
  //       }
  //     ).to(
  //       AMOURATROI.current,

  //       {
  //         y: "-103%",
  //         scale: 0.7,
  //         rotateX: -90,
  //         duration: duration,
  //         ease: "expo.out",
  //       },
  //       "<"
  //     );
  //   } else if (project === "5" && lastpProject === "4") {
  //     const tl = gsap.timeline();
  //     tl.to(
  //       AMOURATROI.current,

  //       {
  //         y: "103%",
  //         rotateX: 90,
  //         scale: 0.7,
  //         duration: duration,
  //         ease: "expo.out",
  //       }
  //     ).to(
  //       LCDO.current,

  //       {
  //         y: 0,
  //         scale: 1,
  //         rotateX: 0,
  //         duration: duration,
  //         ease: "expo.out",
  //       },
  //       "<"
  //     );
  //   } else if (project === "4" && lastpProject === "5") {
  //     const tl = gsap.timeline();
  //     tl.to(
  //       AMOURATROI.current,

  //       {
  //         y: 0,
  //         scale: 1,
  //         rotateX: 0,
  //         duration: duration,
  //         ease: "expo.out",
  //       }
  //     ).to(
  //       LCDO.current,

  //       {
  //         y: "-103%",
  //         scale: 0.7,
  //         rotateX: -90,
  //         duration: duration,
  //         ease: "expo.out",
  //       },
  //       "<"
  //     );
  //   }
  // }, [project]);

  return (
    <div className=" h-auto w-full mt-[2vw] z-10   ">
      <div className="w-[21.5vw] aspect-square absolute top-[1.7vw] left-[17vw]">
        <div
          ref={frame}
          style={{
            clipPath: "inset(50% 50% 50% 50%)", // État initial du clip-path
          }}
          className="relative w-full h-full  theframe"
        >
          <Carrousel project={project} lastpProject={lastpProject} />
        </div>
      </div>
      <div className="w-full flex items-center all">
        {" "}
        <div className="w-1/2 text-[2vw] pl-[2vw] Med pt-[1.9vw] overflow-hidden">
          <p ref={jap} className="translate-y-full">
            作品
          </p>
        </div>
        <div className="w-1/6 flex -translate-x-[0.1vw]">
          <div className="overflow-hidden">
            {" "}
            <h3 ref={works} className="Med text-[5vw] translate-y-full">
              Works
            </h3>
          </div>
          <div className="overflow-hidden h-fit">
            {" "}
            <div ref={number} className="text-[0.8vw] translate-y-full">
              (05)
            </div>
          </div>
        </div>
        <div className="Med text-[4vw] w-1/6 overflow-hidden">
          <div ref={arrow} className="translate-y-full ">
            →
          </div>
        </div>
        <div className="Med text-[2vw] w-1/6 flex justify-end pr-[2vw] overflow-hidden ">
          <div ref={date} className="translate-y-full">
            {" "}
            2024/25
          </div>
        </div>
      </div>
      <div
        onMouseEnter={handleMouseIn}
        onMouseLeave={handleMouseOut}
        className="w-full h-[5vw]"
      ></div>
      <div
        onMouseEnter={() => setProject("1")}
        onMouseLeave={() => setLastProject("1")}
        className="w-full flex  overflow-hidden all"
      >
        <ProjectFolio
          title="FERTILE "
          frame={frame}
          date="MAR 25"
          type="ARTISTIC AGENCY"
          src="/meta.webp"
          number="01"
          projectIndex="1"
          href="/Works/Fertile"
          project={project}
          lastpProject={lastpProject}
        />
      </div>
      <div
        onMouseEnter={() => setProject("2")}
        onMouseLeave={() => setLastProject("2")}
        className="w-full flex overflow-hidden all"
      >
        <ProjectFolio
          title="CAMILLE JUTEL"
          date="FEB 25"
          frame={frame}
          type="PHOTOGRAPHIC PORTFOLIO"
          src="/bannerjuliette.webp"
          number="02"
          href="/Works/CamilleJutel"
          projectIndex="2"
          project={project}
          lastpProject={lastpProject}
        />
      </div>
      <div
        onMouseEnter={() => setProject("3")}
        onMouseLeave={() => setLastProject("3")}
        className="w-full flex overflow-hidden all"
      >
        <ProjectFolio
          title="MARINE BENABOU "
          date="JAN 25"
          frame={frame}
          type="AUDIO ENGENIEER"
          src="/music1.webp"
          href="/Works/MarineBenabou"
          projectIndex="3"
          number="03"
          project={project}
          lastpProject={lastpProject}
        />
      </div>
      <div
        onMouseEnter={() => setProject("4")}
        onMouseLeave={() => setLastProject("4")}
        className="w-full flex overflow-hidden all"
      >
        <ProjectFolio
          title="AMOURATROI"
          date="DEC 24"
          frame={frame}
          type="PHOTOGRAPHIC PORTFOLIO"
          src="/banneramour.webp"
          href="/Works/Amouratroi"
          number="04"
          projectIndex="4"
          project={project}
          lastpProject={lastpProject}
        />
      </div>
      <div
        onMouseEnter={() => setProject("5")}
        onMouseLeave={() => setLastProject("5")}
        className="w-full flex overflow-hidden  all"
      >
        <ProjectFolio
          title="LE CHANT DES OISEAUX "
          date="NOV 24"
          frame={frame}
          type="MUSIC FESTIVAL"
          src="/bannerlcdo.webp"
          number="05"
          href="/Works/LeChantDesOiseaux"
          project={project}
          projectIndex="5"
          lastpProject={lastpProject}
        />
      </div>
      <div
        onMouseEnter={handleMouseIn2}
        onMouseLeave={handleMouseOut2}
        className="w-full h-[4vw]"
      ></div>
    </div>
  );
};

export default Folio;
