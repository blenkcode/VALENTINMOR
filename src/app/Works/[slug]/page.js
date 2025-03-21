"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef, createRef } from "react";
import { worksData } from "@/app/utils/WorksData";
import Image from "next/image";
import Link from "next/link";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import Button from "@/app/components/Button";
import { usePathname } from "next/navigation";
import { createEnterWorks } from "@/app/animations/CreateEnterWorks";
import TransitionLink from "@/app/utils/TransitionLink";
export default function WorksPage() {
  const params = useParams();
  const { slug } = params;
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
  const next = useRef(null);
  const nextRef = useRef(null);
  const pathname = usePathname();
  const [bottom, setBottom] = useState(false);
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
    }
  }, [slug]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (
      imgContainer.current &&
      images.length > 0 &&
      imageRefs.length > 0 &&
      smallImageRefs.length > 0
    ) {
      createEnterWorks({
        imageRefs,
        smallImageRefs,
        descriptionsRef,
        date,
        type,
        title,
        visit,
        arrow,
        frameRef,
        overview,
      });
      gsap.to(frame.current, {
        y: "92%",
        ease: "none",
        scrollTrigger: {
          trigger: imgContainer.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [images, imgContainer]);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 800 && imageRefs.length > 0) {
      gsap.registerPlugin(ScrollTrigger);

      let ctx = gsap.context(() => {
        imageRefs.forEach((ref) => {
          if (ref.current) {
            gsap.set(ref.current, {
              y: "-10vw",
            });
          }
        });

        imageRefs.forEach((imageRef, index) => {
          const container = imageRef.current?.parentElement;

          if (imageRef.current && container) {
            const scrollTrigger = gsap.timeline({
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                  const progress = self.progress;
                  gsap.to(imageRef.current, {
                    y: -10 + progress * 20 + "vh",
                    duration: 0,
                  });
                },
              },
            });
          }
        });
        if (
          frameRef &&
          frameRef.length > 0 &&
          frameRef[frameRef.length - 1]?.current
        ) {
          const scrollTrigger2 = gsap.timeline({
            scrollTrigger: {
              trigger: frameRef[frameRef.length - 1].current,
              start: "center center",
              onEnter: () => setBottom(true),
            },
          });

          scrollTrigger2.to(nextRef.current, {
            y: 0,
            duration: 1.7,
            ease: "power3.out",
          });
        }

        return () => ctx.revert();
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [imageRefs]);

  const isVideo = (file) => {
    return file.toLowerCase().endsWith(".mp4");
  };

  const handleScrollTo = (index) => {
    if (frameRef[index] && frameRef[index].current) {
      const element = frameRef[index].current;
      const rect = element.getBoundingClientRect();

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const centerPosition =
        elementTop - window.innerHeight / 2 + rect.height / 2;

      window.scrollTo({
        top: centerPosition,
        behavior: "smooth",
      });
    }
  };

  if (!works) {
    return <div></div>;
  }

  return (
    <div ref={containerMain} className="main w-screen min-h-[100svh] all">
      <div className="fixed w-1/2 right-0 top-0 flex justify-between mt-[10vw] pr-[4vw] items-center">
        <div className="flex flex-col h-[29vw] justify-between">
          <div
            style={{
              transformOrigin: "center bottom",
              perspective: "1000px",
              perspectiveOrigin: "center bottom",
            }}
            className="overflow-hidden  leading-[1.5vw]"
          >
            <h1
              ref={title}
              style={{
                transform: "rotateX(120deg)",
              }}
              className="Med text-[1.5vw] -translate-y-full will-change-transform [transform-origin:center] [backface-visibility:hidden] flex justify-between w-[22.5vw]"
            >
              <div className="text-[0.7vw] opacity-50">NAME // </div>
              {works.name}
            </h1>
            <div>
              <div className="overflow-hidden mt-[1vw]">
                {" "}
                <p
                  ref={type}
                  className="Med text-[0.7vw]  translate-y-full will-change-transform [transform-origin:center] [backface-visibility:hidden] flex justify-between w-[22.5vw]"
                >
                  <span className="opacity-50">TYPE // </span> {works.type}
                </p>
              </div>
              <div className="overflow-hidden mt-[1vw]">
                {" "}
                <p
                  ref={date}
                  className="Med text-[0.7vw]  translate-y-full will-change-transform [transform-origin:center] [backface-visibility:hidden] flex justify-between w-[22.5vw]"
                >
                  {" "}
                  <span className="opacity-50"> DATE // </span>
                  {works.date}
                </p>
              </div>
            </div>
          </div>

          <div className=" Med  text-[0.8vw]">
            <div className="overflow-hidden mb-[1vw]">
              {" "}
              <p
                ref={overview}
                className="Med text-[0.7vw]  translate-y-full will-change-transform [transform-origin:center] [backface-visibility:hidden] flex justify-between w-[22.5vw]"
              >
                {" "}
                <span className="opacity-50"> OVERVIEW // </span>
              </p>
            </div>
            {descriptions.map((desc, index) => (
              <div key={index} className="overflow-hidden ">
                <p
                  ref={descriptionsRef[index]}
                  className="will-change-transform [transform-origin:center] [backface-visibility:hidden] translate-y-full"
                >
                  {desc}
                </p>
              </div>
            ))}
            <div className=" mt-[2vw] Med text-[0.8vw] overflow-hidden">
              <div
                ref={visit}
                className="translate-y-full gap-[0.5vw] relative w-fit group flex"
              >
                <Button href="/" text=" VISIT SITE"></Button>
                <div className="relative overflow-hidden">
                  <div className=" -rotate-45 duration-300 group-hover:translate-x-full group-hover:-translate-y-1/2 ">
                    →
                  </div>
                  <div className=" absolute top-0 -rotate-45 duration-300 group-hover:translate-x-0 translate-y-1/2 -translate-x-full group-hover:translate-y-0">
                    →
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[3vw] gap-[1.5vw] flex flex-col   absolute top-1/2 -translate-y-1/2 right-[10vw]  ">
          <div
            ref={frame}
            className="w-[3.5vw] top-0 right-[-4vw] absolute h-full "
          >
            <div className="relative h-full">
              <div className="absolute top-[0.2vw]">
                {" "}
                <img className="rotate-180 w-[1.4vw] " src="/chevron.svg"></img>
              </div>
            </div>
          </div>

          {smallImages.map((image, index) => (
            <div
              onClick={() => handleScrollTo(index)}
              ref={smallImageRefs[index]}
              style={{
                clipPath: "inset(50% 50% 50% 50%)",
              }}
              key={index}
              className="relative group cursor-pointer"
            >
              {isVideo(image) ? (
                <video
                  src={image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full border-[1px] group-hover:scale-110 duration-300 border-neutral-200"
                />
              ) : (
                <Image
                  src={image}
                  width={250}
                  height={500}
                  priority
                  alt={`${works.name} image ${index + 1}`}
                  className="w-full border-[1px]   border-neutral-200"
                />
              )}
            </div>
          ))}
        </div>
      </div>{" "}
      <div ref={imgContainer} className="w-1/2 pt-[10vw] pb-[10vw] relative ">
        {" "}
        <div className="Med text-[0.8vw] absolute top-[1.7vw] right-1/2 translate-x-1/2 pl-[5vw]">
          <div className="overflow-hidden">
            {" "}
            <div ref={arrow} className=" text-[2vw] translate-y-full">
              <div className="-rotate-90"> →</div>
            </div>
          </div>
        </div>{" "}
        <div className="gap-[4vw]  pl-[5vw]  flex flex-col items-center">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-[29vw] aspect-square flex items-center justify-center px-[2vw] relative  `}
            >
              <div
                style={{
                  clipPath: "inset(50% 50% 50% 50%)",
                }}
                ref={frameRef[index]}
                className={`w-full absolute inset-0 h-full ${
                  pathname === "/Works/Amouratroi"
                    ? "bg-black "
                    : "bg-neutral-300 "
                }`}
              ></div>
              {isVideo(image) ? (
                <video
                  style={{
                    clipPath: "inset(50% 50% 50% 50%)",
                  }}
                  ref={imageRefs[index]}
                  src={image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full  "
                />
              ) : (
                <Image
                  style={{
                    clipPath: "inset(50% 50% 50% 50%)",
                  }}
                  ref={imageRefs[index]}
                  src={image}
                  width={500}
                  loading="lazy"
                  height={500}
                  alt={`${works.name} image ${index + 1}`}
                  className="w-full "
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 pl-[5vw] flex items-center justify-center pb-[15vw] ">
        {" "}
        <TransitionLink
          href={works.href}
          className={`w-[20vw]  group relative ${
            pathname === "/Works/Amouratroi"
              ? " "
              : " text-[1.5vw] Med flex flex-col items-center justify-center"
          }`}
        >
          <div className="  absolute top-[-4vw] right-1/2 translate-x-1/2 Med overflow-hidden">
            <div
              ref={nextRef}
              className="translate-y-full relative overflo-hidden will-change-transform "
            >
              NEXT → PR.0{works.pr}
              <div className="absolute bottom-0 w-full h-[1px] bg-black -translate-x-full group-hover:translate-x-0 duration-500 ease-in-out will-change-transform "></div>
            </div>{" "}
          </div>
          <div
            style={{
              clipPath: bottom
                ? "inset(0% 0% 0% 0%)"
                : "inset(50% 50% 50% 50%)",
            }}
            className=" w-full duration-[1000ms] ease-in-out will-change-transform "
          >
            {" "}
            <img
              className=" duration-500 group-hover:scale-90 will-change-transform  "
              src={works.mockup}
            ></img>
          </div>
          <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-[50%]">
            {" "}
            <div className=" w-[24vw] text-[10vw] h-[17vw] overflow-hidden relative      duration-500 group-hover:scale-95 will-change-transform  ">
              <img
                src="/arrow2.svg"
                className={`absolute w-[1.8vw]  rotate-45 duration-1000 top-0 left-0 ease-in-out will-change-transform  ${
                  bottom
                    ? "translate-x-0 translate-y-0"
                    : " -translate-y-[80%]  -translate-x-[80%]"
                }`}
              />

              <img
                src="/arrow2.svg"
                className={`absolute  w-[1.8vw] will-change-transform     -rotate-45 duration-1000 bottom-0 left-0 ease-in-out ${
                  bottom
                    ? "translate-x-0 translate-y-0"
                    : "translate-y-[80%]  -translate-x-[80%] "
                }`}
              ></img>
              <img
                src="/arrow2.svg"
                className={`absolute  w-[1.8vw] will-change-transform   -rotate-[225deg] duration-1000 top-0 right-0 ease-in-out ${
                  bottom
                    ? "translate-x-0 translate-y-0"
                    : "-translate-y-[80%] translate-x-[80%]  "
                }`}
              ></img>
              <img
                src="/arrow2.svg"
                className={`absolute  w-[1.8vw] will-change-transform  bottom-0 right-0   duration-1000 rotate-[225deg] ease-in-out ${
                  bottom
                    ? "translate-x-0 translate-y-0"
                    : "translate-y-[80%] translate-x-[80%]  "
                }`}
              ></img>
            </div>
          </div>
        </TransitionLink>
      </div>
    </div>
  );
}
