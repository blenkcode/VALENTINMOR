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
    if (!isMobile) {
      setProject("0");
    } else if (isMobile) {
      setProject("1");
    }
  }, [isMobile]);

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
      <div className="md:w-[3vw] gap-[1.5vw] flex flex-col   fixed top-1/2 -translate-y-1/2 left-[3vw]  smalls md:visible invisible pointer-events-auto z-[10000] w-0 ">
        <div
          ref={frame}
          className="w-[3.5vw] top-0 right-[-4vw] absolute h-full md:visible invisible "
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
      <div className="fixed md:w-[33.8%] w-full right-0 top-0 flex justify-between md:mt-[10vw] pr-[4vw] md:pt-0 pt-[4vw] md:pl-0 pl-[3vw] items-center carre2 bg-white z-[50] pb-[3vw] md:pb-0">
        <div className="flex flex-col md:h-[25vw] h-[35svh] justify-between carre">
          <div className="overflow-hidden  md:leading-[2vw] leading-[7vw] ">
            <div className="overflow-hidden">
              {" "}
              <h1
                ref={title}
                className="Med md:text-[2vw] text-[7vw] -translate-y-full will-change-transform [transform-origin:center] [backface-visibility:hidden] flex md:justify-between text-nowrap  md:w-[24.5vw]"
              >
                <div className="md:text-[0.7vw] text-[4vw] opacity-50 md:visible invisible md:w-auto w-0 ">
                  NAME{" "}
                </div>
                {works.name}
              </h1>
            </div>

            <div>
              <div className="overflow-hidden mt-[1vw] md:visible invisible md:w-auto w-0 ">
                {" "}
                <p
                  ref={type}
                  className="Med md:text-[0.8vw] text-[3vw] text-nowrap   translate-y-full will-change-transform [transform-origin:center] [backface-visibility:hidden] flex md:justify-between w-[24.5vw]"
                >
                  <span className="opacity-50 text-[0.7vw]  md:visible invisible md:w-auto w-0 ">
                    TYPE{" "}
                  </span>{" "}
                  {works.type}
                </p>
              </div>
              <div className="overflow-hidden mt-[1vw] md:visible invisible md:w-auto w-0 ">
                {" "}
                <p
                  ref={date}
                  className="Med md:text-[0.8vw] text-[3vw] text-nowrap  translate-y-full will-change-transform [transform-origin:center] [backface-visibility:hidden] flex md:justify-between w-[24.5vw]"
                >
                  {" "}
                  <span className="opacity-50 text-[0.7vw]  md:visible invisible md:w-auto w-0 ">
                    {" "}
                    DATE{" "}
                  </span>
                  {works.date}
                </p>
              </div>
            </div>
          </div>

          <div className=" Med  md:text-[0.8vw]  text-[3.2vw]">
            <div className="overflow-hidden mb-[1vw]">
              {" "}
              <p
                ref={overview}
                className="Med text-[0.7vw]  translate-y-full will-change-transform [transform-origin:center] [backface-visibility:hidden] flex justify-between w-[22.5vw]"
              >
                {" "}
                <span className="opacity-50 md:visible invisible md:w-auto w-0">
                  {" "}
                  OVERVIEW{" "}
                </span>
              </p>
            </div>
            {descriptions.map((desc, index) => (
              <div
                key={index}
                className={`overflow-hidden  text-nowrap   ${
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
            <div className=" md:mt-[2vw] mt-[6vw] Med md:text-[0.7vw] text-[4vw] overflow-hidden">
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
      </div>{" "}
      <div
        ref={imgContainer}
        className="md:w-2/3 md:pt-[2.5vw] pt-[40svh] pb-[10vw] relative "
      >
        {" "}
        <div className="gap-[4vw]    flex flex-col items-center">
          {images.map((image, index) => (
            <div
              key={index}
              className={`md:w-[40vw] w-[96vw] md:h-[33vw] h-[65vw] flex items-center justify-center md:px-[2vw] relative imgsframe will-change-auto  `}
            >
              <div
                style={{
                  clipPath: "inset(50% 50% 50% 50%)",
                }}
                ref={frameRef[index]}
                className={`md:w-full absolute inset-0  md:h-full h-0 w-0 ${
                  pathname === "/Works/Amouratroi"
                    ? "bg-black "
                    : "bg-neutral-200 "
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
                  loading="lazy"
                  muted
                  playsInline
                  className={`w-full ${
                    pathname === "/Works/CamilleJutel"
                      ? "border-[1px] border-neutral-500 shadow-xl"
                      : ""
                  }`}
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
                  className={`w-full ${
                    pathname === "/Works/CamilleJutel"
                      ? "border-[1px] border-neutral-500"
                      : ""
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2  flex items-center justify-center pb-[15vw] ">
        {" "}
        <TransitionLink
          href={works.href}
          className={`w-[20vw]  group relative md:text-[0.8vw] text-[4vw]  text-nowrap Med flex flex-col items-start justify-start ${
            pathname === "/Works/Amouratroi" ? " " : " "
          }`}
        >
          See next project
        </TransitionLink>
      </div>
    </div>
  );
}
