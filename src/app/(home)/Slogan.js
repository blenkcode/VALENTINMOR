"use client";
import React, { useRef, useEffect, useState } from "react";
import Gallery from "./Gallery";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SliderSceneSSR from "../components/shaders/SliderSceneSSR.js";
const Slogan = ({ container }) => {
  const container2 = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  useEffect(() => {
    // S'assurer que les éléments sont montés
    if (!container2.current) return;
    gsap.registerPlugin(ScrollTrigger);
    // Créer le ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: container.current,
      start: "top top", // Quand le haut de container2 atteint le haut de la fenêtre
      end: "bottom bottom", // Continuer jusqu'à ce que la fin de container2 atteigne le haut
      onEnter: () => {
        // Quand container2 entre dans la vue et atteint le haut
        // gsap.to(container2.current, {
        //   position: "fixed",
        //   top: 0,

        //   duration: 0.1,
        // });
        setIsFixed(true);
        setIsBottom(false);
      },
      onEnterBack: () => {
        // Quand container2 entre dans la vue et atteint le haut
        // gsap.to(container2.current, {
        //   position: "fixed",
        //   top: 0,
        //   duration: 0.1,
        // });
        setIsFixed(true);
        setIsBottom(false);
      },
      onLeaveBack: () => {
        // gsap.to(container2.current, {
        //   position: "absolute",
        //   top: 0,

        //   duration: 0.1,
        // });
        setIsFixed(false);
        setIsBottom(false);
      },
      onLeave: () => {
        // Optionnel: Si vous voulez qu'il redevienne relatif après avoir défilé au-delà
        // gsap.to(container2.current, {
        //   position: "absolute",
        //   top: "400svh",

        //   duration: 0.1,
        // });
        setIsFixed(false);
        setIsBottom(true);
      },
    });

    // Nettoyer lors du démontage
    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={container2}
      className={`w-full h-[100svh] flex justify-start flex-col items-center overflow-visible`}
      style={{
        willChange: "transform, position",
        position: isFixed ? "fixed" : "absolute",
        top: isFixed ? 0 : isBottom ? "400svh" : "",
      }}
    >
      <div className="w-full h-[100svh]   relative z-[10000]">
        {" "}
        <SliderSceneSSR container={container} />
        <div className="absolute top-1/2 -translate-y-1/2 w-[30vw] h-full text-white right-0 pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute text-[3vw]">
              <h5>PR.01</h5>
              <div>Visit Live</div>
            </div>
          </div>
        </div>
        <div className="w-full px-[2vw] pt-[2vw] pb-[0vw] flex items-start justify-center  text-white absolute top-0">
          {" "}
          <div className="w-full flex">
            {" "}
            <div className="w-1/4 Med text-[1.2vw] mt-[1.5vw]">
              <p>
                Snapshots of my recents works for the seek of visual appeal.
              </p>
            </div>
            <div className="w-2/8 text-[4vw] flex justify-center translate-x-[2vw]">
              {" "}
              →
            </div>
            <div className="w-1/6 flex">
              <h5 className="text-[4vw]">Gallery </h5>
            </div>
            <div className="Med text-[4vw] w-1/6"></div>
            <div className="Med text-[4vw] pr-[2vw]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slogan;
