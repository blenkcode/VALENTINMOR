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
export default function WorksPage() {
  const params = useParams();
  const { slug } = params;
  const [works, setWorks] = useState(null);
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const imgContainer = useRef(null);
  const frame = useRef(null);
  const slider = useRef(null);
  const [imageRefs, setImageRefs] = useState([]);
  const [frameRef, setFrameRef] = useState([]);
  const [smallImages, setSmallImages] = useState([]);
  const [descriptionsRef, setDescriptionsRef] = useState([]);
  const [smallImageRefs, setSmallImageRefs] = useState([]);
  const date = useRef(null);
  const title = useRef(null);
  const type = useRef(null);

  const arrow = useRef(null);
  const visit = useRef(null);
  const pathname = usePathname();
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
      });
      gsap.to(frame.current, {
        y: `${images.length * (0.537 * images.length)}vw`,
        ease: "none",
        scrollTrigger: {
          trigger: imgContainer.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }

    // Clean up ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [images, imgContainer]);

  const isVideo = (file) => {
    return file.toLowerCase().endsWith(".mp4");
  };

  if (!works) {
    return <div></div>;
  }

  return (
    <div className="main w-screen min-h-[100svh] all">
      <div className="fixed w-1/2 right-0 top-0 flex justify-between pt-[8.5vw] pr-[4vw] items-center">
        <div className="flex flex-col">
          <div
            style={{
              transformOrigin: "center bottom",
              perspective: "1000px",
              perspectiveOrigin: "center bottom",
            }}
            className="overflow-hidden"
          >
            <h1
              ref={title}
              style={{
                transform: "rotateX(120deg)",
              }}
              className="Med text-[5vw]  -translate-y-full will-change-transform [transform-origin:center] [backface-visibility:hidden] "
            >
              {works.name}
            </h1>
          </div>

          <div className="overflow-hidden mt-[5vw]">
            {" "}
            <p
              ref={type}
              className="Med text-[0.7vw] opacity-50 translate-y-full will-change-transform [transform-origin:center] [backface-visibility:hidden] "
            >
              {works.type}
            </p>
          </div>
          <div className="overflow-hidden mt-[1vw]">
            {" "}
            <p
              ref={date}
              className="Med text-[0.7vw] opacity-50 translate-y-full will-change-transform [transform-origin:center] [backface-visibility:hidden] "
            >
              {works.date}
            </p>
          </div>
          <div className=" Med mt-[8.8vw] text-[0.7vw}">
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
          </div>
          <div className="mt-[2vw] Med text-[0.7vw] overflow-hidden">
            <div ref={visit} className="translate-y-full">
              {" "}
              <Button href="/" text=" VISIT SITE"></Button>
            </div>
          </div>
        </div>
        <div className="w-[5vw] gap-[1.5vw] flex flex-col  fixed top-1/2 -translate-y-1/2 right-[3vw]  ">
          <div
            ref={frame}
            className="w-[3.5vw] top-[-0.5vw] right-1/2 translate-x-1/2 aspect-square border-[1px] border-black absolute"
          ></div>

          {smallImages.map((image, index) => (
            <div
              ref={smallImageRefs[index]}
              style={{
                clipPath: "inset(50% 50% 50% 50%)", // État initial du clip-path
              }}
              key={index}
              className=""
            >
              {isVideo(image) ? (
                <video
                  src={image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full border-[1px] border-neutral-200"
                />
              ) : (
                <Image
                  src={image}
                  width={250}
                  height={500}
                  priority
                  alt={`${works.name} image ${index + 1}`}
                  className="w-full border-[1px] border-neutral-200"
                />
              )}
            </div>
          ))}
        </div>
      </div>{" "}
      <div ref={imgContainer} className="w-1/2 py-[10vw]  relative ">
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
              className={`w-[32vw] aspect-square flex items-center justify-center px-[2vw] relative  `}
            >
              <div
                style={{
                  clipPath: "inset(50% 50% 50% 50%)", // État initial du clip-path
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
                    clipPath: "inset(50% 50% 50% 50%)", // État initial du clip-path
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
                    clipPath: "inset(50% 50% 50% 50%)", // État initial du clip-path
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
    </div>
  );
}
