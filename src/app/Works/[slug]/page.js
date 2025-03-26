"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef, createRef } from "react";
import { worksData } from "@/app/utils/WorksData";
import Image from "next/image";
import { useProject } from "@/app/Context/ProjectContext";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import Button from "@/app/components/Button";
import { usePathname } from "next/navigation";
import { createEnterWorks } from "@/app/animations/CreateEnterWorks";
import TransitionLink from "@/app/utils/TransitionLink";
import { useMobile } from "@/app/Context/isMobileContext";
import Title from "@/app/components/Title";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
const Scene = dynamic(() => import("../../components/shaders/carousseltube"), {
  ssr: false,
});
export default function WorksPage() {
  const params = useParams();
  const { slug } = params;
  const { setProject } = useProject();
  const [works, setWorks] = useState(null);
  const [progress, setProgress] = useState([]);
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  const [descriptionsRef, setDescriptionsRef] = useState([]);

  const visit = useRef(null);
  const containerMain = useRef(null);
  const { isMobile } = useMobile();

  const [name, setName] = useState([]);
  useEffect(() => {
    if (slug && worksData[slug]) {
      setWorks(worksData[slug]);
      const imagesData = worksData[slug].imgs;
      setImages(imagesData);

      const descriptionsData = worksData[slug].description;
      setDescriptions(descriptionsData);

      setDescriptionsRef(descriptionsData.map(() => createRef()));
      const letters = Array.from(worksData[slug].name || "");
      setName(letters);
    }
  }, [slug]);

  useEffect(() => {
    if (!isMobile) {
      setProject("0");
    } else if (isMobile) {
      setProject("1");
    }
  }, [isMobile]);

  useEffect(() => {
    if (works) {
      createEnterWorks({ descriptionsRef, visit });
    }
  }, [works]);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 800 && containerMain) {
      gsap.registerPlugin(ScrollTrigger);

      let ctx = gsap.context(() => {
        const scrollTrigger = gsap.timeline({
          scrollTrigger: {
            trigger: containerMain.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              setProgress(self.progress);
            },
          },
        });

        return () => ctx.revert();
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [containerMain]);

  if (!works) {
    return <div></div>;
  }

  return (
    <div ref={containerMain} className="main w-screen h-[400svh] all relative">
      <div className="w-screen h-lvh fixed">
        <Canvas style={{ pointerEvents: "none" }}>
          <Scene progress={progress} images={images} />
        </Canvas>
      </div>
      <div className=" md:mt-[2vw] mt-[6vw] Med md:text-[1vw] text-[4vw] overflow-hidden fixed bottom-[2vw] left-[2vw]">
        <div
          ref={visit}
          className="translate-y-full gap-[0.5vw] relative w-fit items-center group flex"
        >
          <Button href="/" text=" VISIT SITE"></Button>
          <div className="relative overflow-hidden rotate-45 ">
            <div className="  duration-300 group-hover:-translate-y-full -rotate-90">
              →
            </div>
            <div className=" absolute top-0    -rotate-90 duration-300  translate-y-full group-hover:translate-y-0">
              →
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          transformOrigin: "center bottom",
          perspective: "1000px",
          perspectiveOrigin: "center bottom",
        }}
        className="w-full flex items-start leading-[2.5vw] all md:justify-start fixed bottom-[2vw] left-[14vw]  md:pl-[2vw] justify-center folio pt-[0svh] md:pt-0 md:visible invisible md:h-auto h-0 text-black"
      >
        {" "}
        <div className="overflow-hidden">
          {" "}
          <h3 className="Med md:text-[2.5vw] text-[9vw]  [backface-visibility:hidden] [transform-origin:center] will-change-transform flex">
            {name.length > 0 ? (
              name.map((letter, index) => (
                <div
                  key={index}
                  style={{
                    transform: "rotateX(120deg)",
                    display: "inline-block", // Assurez-vous que chaque lettre est bien affichée en ligne
                  }}
                  className="works translate-y-full"
                >
                  {letter === " " ? "\u00A0" : letter}
                </div>
              ))
            ) : (
              <div>No text provided</div>
            )}
          </h3>
        </div>
      </div>
      <div
        style={{
          transformOrigin: "center bottom",
          perspective: "1000px",
          perspectiveOrigin: "center bottom",
        }}
        className="w-full flex items-start all md:justify-start fixed top-[1.5vw] left-0  md:pl-[2vw] justify-center folio pt-[0svh] md:pt-0 md:visible invisible md:h-auto h-0 text-black"
      >
        {" "}
        <div className="mt-[0.7vw] text-[1vw]">
          {" "}
          {descriptions.map((desc, index) => (
            <div
              key={index}
              className={`overflow-hidden  text-nowrap Med  ${
                index === 0 ? "" : ""
              }`}
            >
              <p
                ref={descriptionsRef[index]}
                className="will-change-transform [transform-origin:center] [backface-visibility:hidden] translate-y-full"
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
