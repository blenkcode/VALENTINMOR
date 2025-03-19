"use client";
import React, { useState, useEffect, useRef, use } from "react";
import ProjectFolio from "../components/ProjectFolio";
import ImageSlider from "../components/ImageSlider";
import { useModal } from "../Context/ModalContext";
import Image from "next/image";
import gsap from "gsap";
const Folio = () => {
  const [lastpProject, setLastProject] = useState("0");
  const [project, setProject] = useState("0");
  const { setIsHoverLink } = useModal();
  const VAL = useRef(null);
  const FERTILE = useRef(null);
  const JUTEL = useRef(null);
  const MBM = useRef(null);
  const AMOURATROI = useRef(null);
  const LCDO = useRef(null);
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
    const duration = 1.2;

    if (project === "1" && lastpProject === "0") {
      const tl = gsap.timeline();
      tl.to(
        VAL.current,

        {
          y: "103%",
          scale: 0.7,
          rotateX: 90,
          duration: duration,
          ease: "expo.out",
        }
      ).to(
        FERTILE.current,

        {
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: duration,
          ease: "expo.out",
        },
        "<"
      );
    } else if (project === "0" && lastpProject === "1") {
      const tl = gsap.timeline();
      tl.to(
        VAL.current,

        {
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: duration,
          ease: "expo.out",
        }
      ).to(
        FERTILE.current,

        {
          y: "-103%",
          scale: 0.7,
          rotateX: -90,
          duration: duration,
          ease: "expo.out",
        },
        "<"
      );
    } else if (project === "2" && lastpProject === "1") {
      const tl = gsap.timeline();
      tl.to(
        FERTILE.current,

        {
          y: "103%",
          scale: 0.7,
          rotateX: 90,
          duration: duration,
          ease: "expo.out",
        }
      ).to(
        JUTEL.current,

        {
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: duration,
          ease: "expo.out",
        },
        "<"
      );
    } else if (project === "1" && lastpProject === "2") {
      const tl = gsap.timeline();
      tl.to(
        FERTILE.current,

        {
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: duration,
          ease: "expo.out",
        }
      ).to(
        JUTEL.current,

        {
          y: "-103%",
          rotateX: -90,
          scale: 0.7,
          duration: duration,
          ease: "expo.out",
        },
        "<"
      );
    } else if (project === "3" && lastpProject === "2") {
      const tl = gsap.timeline();
      tl.to(
        JUTEL.current,

        {
          y: "103%",
          rotateX: 90,
          scale: 0.7,
          duration: duration,
          ease: "expo.out",
        }
      ).to(
        MBM.current,

        {
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: duration,
          ease: "expo.out",
        },
        "<"
      );
    } else if (project === "2" && lastpProject === "3") {
      const tl = gsap.timeline();
      tl.to(
        JUTEL.current,

        {
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: duration,
          ease: "expo.out",
        }
      ).to(
        MBM.current,

        {
          y: "-103%",
          rotateX: -90,
          scale: 0.7,
          duration: duration,
          ease: "expo.out",
        },
        "<"
      );
    } else if (project === "4" && lastpProject === "3") {
      const tl = gsap.timeline();
      tl.to(
        MBM.current,

        {
          y: "103%",
          rotateX: 90,
          scale: 0.7,
          duration: duration,
          ease: "expo.out",
        }
      ).to(
        AMOURATROI.current,

        {
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: duration,
          ease: "expo.out",
        },
        "<"
      );
    } else if (project === "3" && lastpProject === "4") {
      const tl = gsap.timeline();
      tl.to(
        MBM.current,

        {
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: duration,
          ease: "expo.out",
        }
      ).to(
        AMOURATROI.current,

        {
          y: "-103%",
          scale: 0.7,
          rotateX: -90,
          duration: duration,
          ease: "expo.out",
        },
        "<"
      );
    } else if (project === "5" && lastpProject === "4") {
      const tl = gsap.timeline();
      tl.to(
        AMOURATROI.current,

        {
          y: "103%",
          rotateX: 90,
          scale: 0.7,
          duration: duration,
          ease: "expo.out",
        }
      ).to(
        LCDO.current,

        {
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: duration,
          ease: "expo.out",
        },
        "<"
      );
    } else if (project === "4" && lastpProject === "5") {
      const tl = gsap.timeline();
      tl.to(
        AMOURATROI.current,

        {
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: duration,
          ease: "expo.out",
        }
      ).to(
        LCDO.current,

        {
          y: "-103%",
          scale: 0.7,
          rotateX: -90,
          duration: duration,
          ease: "expo.out",
        },
        "<"
      );
    }
  }, [project]);

  return (
    <div className=" h-auto w-full mt-[2vw] z-10   ">
      <div className="w-[17vw] aspect-square absolute top-[8vw] left-[22vw]">
        <div className="relative w-full h-full overflow-hidden">
          <div
            style={{
              transformOrigin: "center bottom",
              perspective: "1000px",
              perspectiveOrigin: "center bottom",
            }}
          >
            {" "}
            <Image
              ref={VAL}
              src="/VAL.png"
              width={500}
              height={500}
              alt="mockups"
            ></Image>
            <Image
              style={{
                transform: "rotateX(-90deg) ",
              }}
              className="absolute top-0 -translate-y-full"
              ref={FERTILE}
              src="/FERTILE.png"
              width={500}
              height={500}
              alt="mockups"
            ></Image>
            <Image
              style={{
                transform: "rotateX(-90deg)",
              }}
              className="absolute top-0 -translate-y-full"
              ref={JUTEL}
              src="/JUTEL.png"
              width={500}
              height={500}
              alt="mockups"
            ></Image>
            <Image
              style={{
                transform: "rotateX(-90deg)",
              }}
              className="absolute top-0 -translate-y-full"
              ref={MBM}
              src="/MBM.png"
              width={500}
              height={500}
              alt="mockups"
            ></Image>
            <Image
              style={{
                transform: "rotateX(-90deg)",
              }}
              className="absolute top-0 -translate-y-full"
              ref={AMOURATROI}
              src="/AMOURATROI.png"
              width={500}
              height={500}
              alt="mockups"
            ></Image>
            <Image
              style={{
                transform: "rotateX(-90deg)",
              }}
              className="absolute top-0 -translate-y-full"
              ref={LCDO}
              src="/LCDO.png"
              width={500}
              height={500}
              alt="mockups"
            ></Image>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center">
        {" "}
        <div className="w-1/2 text-[2vw] pl-[2vw] Med pt-[1vw]">作品</div>
        <div className="w-1/6 flex translate-x-[0.9vw]">
          <h3 className="Med text-[5vw]">Works</h3>
          <div className="text-[0.8vw]">(05)</div>
        </div>
        <div className="Med text-[4vw] w-1/6">→</div>
        <div className="Med text-[2vw] w-1/6 flex justify-end pr-[2vw] ">
          2024/25
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
          title="MARINE BENABOU "
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
        className="w-full h-[1vw] border-t-[0px]"
      ></div>
    </div>
  );
};

export default Folio;
