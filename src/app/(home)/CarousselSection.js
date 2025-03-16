"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Slogan from "./Slogan";
import FixedText from "./FixedText";
import { title } from "process";

const CarousselSection = () => {
  const container = useRef(null);
  const title1 = useRef(null);
  const block1 = useRef(null);
  const block2 = useRef(null);
  const block3 = useRef(null);
  const block4 = useRef(null);
  const title2 = useRef(null);
  const title3 = useRef(null);
  const title4 = useRef(null);
  const [isBottom, setIsBottom] = useState(false);
  useEffect(() => {
    if (!block1.current || !title1.current) return;

    // Créer directement un ScrollTrigger sans timeline
    ScrollTrigger.create({
      trigger: block1.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const yValue = 100 - self.progress * 100;

        gsap.set(title1.current, { y: `${yValue}%` });
      },
    });

    ScrollTrigger.create({
      trigger: block2.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const yValue = 100 - self.progress * 100;

        gsap.set(title2.current, { y: `${yValue}%` });
      },
    });

    ScrollTrigger.create({
      trigger: block3.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const yValue = 100 - self.progress * 100;

        gsap.set(title3.current, { y: `${yValue}%` });
      },
    });
    ScrollTrigger.create({
      trigger: block4.current,
      start: "top top",
      markers: true,
      onEnter: () => {
        setIsBottom(false);
      },
      onEnterBack: () => {
        setIsBottom(false);
      },
      onLeave: () => {
        setIsBottom(true);
      },
      onLeaveBack: () => {
        setIsBottom(false);
      },
    });

    return () => {
      // Nettoyage
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div ref={container} className="h-[570svh]   w-full relative">
      <Slogan container={container}></Slogan>
      <FixedText
        title1={title1}
        title2={title2}
        title3={title3}
        isBottom={isBottom}
      ></FixedText>
      <div ref={block1} className="relative h-[100svh] w-screen "></div>
      <div ref={block2} className="relative h-[100svh] w-screen "></div>
      <div ref={block3} className="relative h-[100svh] w-screen "></div>
      <div ref={block4} className="relative h-[170svh] w-screen "></div>
    </div>
  );
};

export default CarousselSection;
