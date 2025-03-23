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
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const imgContainer = useRef(null);
  const frame = useRef(null);
  const [imageRefs, setImageRefs] = useState([]);
  const [frameRef, setFrameRef] = useState([]);
  const [smallImages, setSmallImages] = useState([]);
  const [descriptionsRef, setDescriptionsRef] = useState([]);
  const [smallImageRefs, setSmallImageRefs] = useState([]);
  const date = useRef(null);
  const title = useRef(null);
  const type = useRef(null);
  const overview = useRef(null);
  const arrow = useRef(null);
  const visit = useRef(null);
  const containerMain = useRef(null);
  const { isMobile } = useMobile();
  const nextRef = useRef(null);
  const pathname = usePathname();
  const [bottom, setBottom] = useState(false);
  const [name, setName] = useState([]);
  useEffect(() => {
    if (slug && worksData[slug]) {
      setWorks(worksData[slug]);
      const imagesData = worksData[slug].imgs;
      setImages(imagesData);
      const smallImagesData = worksData[slug].smallsImgs;
      setSmallImages(smallImagesData);
      const descriptionsData = worksData[slug].description;
      setDescriptions(descriptionsData);
      setImageRefs(imagesData.map(() => createRef()));
      setFrameRef(imagesData.map(() => createRef()));
      setSmallImageRefs(imagesData.map(() => createRef()));
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

  if (!works) {
    return <div></div>;
  }

  return (
    <div
      ref={containerMain}
      className="main w-screen min-h-[100svh] all relative"
    >
      <div className="w-screen h-lvh relative">
        <Canvas style={{ pointerEvents: "none" }}>
          <Scene images={images} />
        </Canvas>
      </div>
      <div className=" md:mt-[2vw] mt-[6vw] Med md:text-[1.5vw] text-[4vw] overflow-hidden fixed bottom-[2vw] left-[2vw]">
        <div
          ref={visit}
          className="translate-y-full gap-[0.5vw] relative w-fit items-center group flex"
        >
          <Button href="/" text=" VISIT SITE"></Button>
          <div className="relative overflow-hidden rotate-45 text-[1.7vw]">
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
        className="w-full flex items-start all md:justify-start absolute top-[1.5vw] left-0  md:pl-[2vw] justify-center folio pt-[0svh] md:pt-0 md:visible invisible md:h-auto h-0 text-black"
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
        <div className="mt-[0.7vw] ml-[5vw] text-[0.8vw]">
          {" "}
          {descriptions.map((desc, index) => (
            <div
              key={index}
              className={`overflow-hidden  text-nowrap Med  ${
                index === 0 ? "translate-x-[6vw]" : ""
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
