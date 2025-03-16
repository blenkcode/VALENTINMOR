"use client";
import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
const Scene = dynamic(
  () => import("../components/shaders/CircularCarousselScene"),
  {
    ssr: false,
  }
);
const Slogan = ({ container }) => {
  const container2 = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [scrollY, setScrollY] = useState(200);
  const canvasRef = useRef(null);
  const title1 = useRef(null);
  useEffect(() => {
    // S'assurer que les éléments sont montés
    if (!container2.current) return;
    gsap.registerPlugin(ScrollTrigger);
    // Créer le ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => {
        setIsFixed(true);
        setIsBottom(false);
        gsap.to(canvasRef.current, {
          y: 0,
          duration: 1,
          scrub: 0,
        });
      },
      onEnterBack: () => {
        setIsFixed(true);
        setIsBottom(false);
      },
      onLeaveBack: () => {
        setIsFixed(false);
        setIsBottom(false);
      },
      onLeave: () => {
        setIsFixed(false);
        setIsBottom(true);
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  useEffect(() => {
    if (!container || !container.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        const newY = -0.4 + self.progress * 3.5;
        setScrollY(newY);
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [container]);

  return (
    <div
      ref={container2}
      style={{
        willChange: "transform, position",
        position: isFixed ? "fixed" : "absolute",
        top: isFixed ? 0 : isBottom ? "470svh" : "",
      }}
      className={`w-full h-[100svh] flex justify-start flex-col items-center overflow-visible z-20`}
    >
      <div className="absolute top-[11vw] left-[66%] w-[1px] h-[80%] bg-black"></div>
      <div className="w-full  h-[100svh]   relative z-10 ">
        <div
          className={`w-full h-[100svh] flex justify-start flex-col items-center overflow-visible -translate-x-[17vw]  z-10`}
        >
          {" "}
          <Canvas>
            <Scene />
          </Canvas>
        </div>

        <div className="w-full px-[2vw] pt-[8vw] pb-[0vw] flex items-start justify-center   absolute top-0">
          {" "}
          <div className="w-full flex">
            {" "}
            <div className="w-1/4 flex Med text-[1.2vw]   justify-start   ">
              <h5 className="text-[4vw] Med">Services </h5>{" "}
            </div>
            <div className="w-1/4 Med text-[4vw] flex justify-start pr-[4vw] ">
              {" "}
              <div>→ </div>{" "}
            </div>
            <div className="w-1/4 text-[2vw] Med mt-[2vw]">貢献</div>
            <div className="w-1/4"> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slogan;
