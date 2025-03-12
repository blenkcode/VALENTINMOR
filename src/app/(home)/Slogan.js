"use client";
import React, { useRef, useEffect, useState } from "react";
import Gallery from "./Gallery";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
const Slogan = ({ container }) => {
  const container2 = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    // S'assurer que les éléments sont montés
    if (!container2.current || !container.current) return;
    gsap.registerPlugin(ScrollTrigger);
    // Premier ScrollTrigger - Quand container2 atteint le haut de la fenêtre
    const scrollTrigger1 = ScrollTrigger.create({
      trigger: container2.current,
      start: "top top",
      end: "bottom-=100% top", // Fin quand le bas de container2 moins la hauteur de la fenêtre atteint le haut
      onEnter: () => {
        gsap.to(container2.current, {
          position: "fixed",
          top: 0,
          left: 0,
          duration: 0.1,
        });
        setIsFixed(true);
      },
      onLeaveBack: () => {
        // Quand on remonte et qu'on quitte la zone de trigger
        gsap.to(container2.current, {
          position: "relative",
          top: "auto",
          bottom: "auto",
          duration: 0.1,
        });
        setIsFixed(false);
      },
    });

    // Deuxième ScrollTrigger - Quand container atteint le bas de la fenêtre
    const scrollTrigger2 = ScrollTrigger.create({
      trigger: container.current,
      start: "bottom bottom", // Quand le bas de container atteint le bas de la fenêtre
      onEnter: () => {
        gsap.to(container2.current, {
          position: "absolute",
          top: "auto",
          bottom: 0,
          left: 0,
          duration: 0.1,
        });
        setIsFixed(false);
      },
      onLeaveBack: () => {
        // Quand on remonte et que container n'est plus au bas de la fenêtre
        if (ScrollTrigger.isInViewport(container2.current, 0)) {
          gsap.to(container2.current, {
            position: "fixed",
            top: 0,
            bottom: "auto",
            left: 0,
            duration: 0.1,
          });
          setIsFixed(true);
        }
      },
    });

    // Créer un ScrollTrigger pour observer la position du scroll
    const scrollObserver = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        // Vérifier si container2 est dans la vue
        const isInView = ScrollTrigger.isInViewport(container2.current, 0);

        // Vérifier si container est au bas de la vue
        const containerAtBottom =
          self.scroll() >
          ScrollTrigger.positionInViewport(container.current, "bottom") -
            window.innerHeight;

        // Logique de décision pour le comportement inverse au scroll
        if (!containerAtBottom && isInView && self.direction < 0 && !isFixed) {
          // Si on remonte (direction < 0) et que container n'est pas au bas, mais container2 est dans la vue
          gsap.to(container2.current, {
            position: "fixed",
            top: 0,
            bottom: "auto",
            left: 0,
            duration: 0.1,
          });
          setIsFixed(true);
        }
      },
    });

    // Nettoyer lors du démontage
    return () => {
      scrollTrigger1.kill();
      scrollTrigger2.kill();
      scrollObserver.kill();
    };
  }, [isFixed]);

  return (
    <div
      ref={container2}
      className={`bg-neutral-950 w-full h-[100svh] top-0 flex justify-start flex-col items-center ${
        isFixed ? "z-50" : "absolute z-50 "
      }`}
      style={{
        willChange: "position, transform",
      }}
    >
      <div className="w-full px-[2vw] pt-[2vw] pb-[20vw] flex items-start justify-center bg-neutral-950 text-white">
        {" "}
        <div className="w-full flex">
          {" "}
          <div className="w-1/4 Med text-[1.2vw] mt-[1.5vw]">
            <p>Snapshots of my recents works for the seek of visual appeal.</p>
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

      <Gallery container={container} />
    </div>
  );
};

export default Slogan;
