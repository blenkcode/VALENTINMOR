"use client";
import React, { useRef, useEffect, useState } from "react";
import SliderSceneSSR from "../components/shaders/SliderSceneSSR.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
const Gallery = () => {
  const container1 = useRef(null);
  const [scrollY, setScrollY] = useState(5);

  const container2 = useRef(null);
  const [scrollY2, setScrollY2] = useState(5);

  const container3 = useRef(null);
  const [scrollY3, setScrollY3] = useState(5);

  const container4 = useRef(null);
  const [scrollY4, setScrollY4] = useState(5);

  const container5 = useRef(null);
  const [scrollY5, setScrollY5] = useState(5);

  // Fonction pour créer des ScrollTriggers pour un conteneur
  const createScrollTriggers = (container, setScrollYFunc) => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger1 = ScrollTrigger.create({
      trigger: container.current,
      start: "top bottom",
      end: "center center",
      markers: false, // Mettre à true pour déboguer
      onUpdate: (self) => {
        const newY = 5 * (1 - self.progress);
        setScrollYFunc(newY);
      },
    });

    // Second ScrollTrigger: de 0 à -5
    const trigger2 = ScrollTrigger.create({
      trigger: container.current,
      start: "center center",
      end: "bottom top",
      markers: false, // Mettre à true pour déboguer
      onUpdate: (self) => {
        const newY = -5 * self.progress;
        setScrollYFunc(newY);
      },
    });

    return [trigger1, trigger2];
  };

  useEffect(() => {
    // Créer tous les ScrollTriggers
    const triggers1 = createScrollTriggers(container1, setScrollY);
    const triggers2 = createScrollTriggers(container2, setScrollY2);
    const triggers3 = createScrollTriggers(container3, setScrollY3);
    const triggers4 = createScrollTriggers(container4, setScrollY4);
    const triggers5 = createScrollTriggers(container5, setScrollY5);

    // Nettoyage de tous les triggers
    return () => {
      [
        ...triggers1,
        ...triggers2,
        ...triggers3,
        ...triggers4,
        ...triggers5,
      ].forEach((trigger) => {
        if (trigger) trigger.kill();
      });
    };
  }, []);

  return (
    <div className="bg-neutral-950 w-full h-[500svh] flex justify-start flex-col items-center  ">
      <div
        ref={container1}
        className="  relative top-[-20vw] w-screen h-[100svh] "
      >
        {" "}
        <SliderSceneSSR
          src="/mockup1.webp"
          container={container1}
          scrollY={scrollY}
        />
      </div>
      <div
        ref={container2}
        className="  relative top-[-45vw] w-screen h-[100svh] "
      >
        {" "}
        <SliderSceneSSR
          src="/mockup2.webp"
          container={container2}
          scrollY={scrollY2}
        />
      </div>
      <div
        ref={container3}
        className="  relative top-[-45vw] w-screen h-[100svh] "
      >
        {" "}
        <SliderSceneSSR
          src="/mockup3.webp"
          container={container3}
          scrollY={scrollY3}
        />
      </div>
      <div
        ref={container4}
        className="  relative top-[-45vw] w-screen h-[100svh] "
      >
        {" "}
        <SliderSceneSSR
          src="/mockup4.webp"
          container={container4}
          scrollY={scrollY4}
        />
      </div>
      <div
        ref={container5}
        className="  relative top-[-45vw] w-screen h-[100svh] "
      >
        {" "}
        <SliderSceneSSR
          src="/mockup5.webp"
          container={container5}
          scrollY={scrollY5}
        />
      </div>
    </div>
  );
};

export default Gallery;
