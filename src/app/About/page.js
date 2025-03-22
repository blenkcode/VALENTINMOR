"use client";
import React, { useEffect, useRef } from "react";
import Button from "../components/Button";
import { createEnterAbout } from "../animations/CreateEnterAbout";
import Image from "next/image";
import ImageWithDeformation from "../components/shaders/ImageWithDeformationHover";
import { useMobile } from "../Context/isMobileContext";
const page = () => {
  const mesh = useRef(null);
  const arrow = useRef(null);
  const { isMobile } = useMobile();
  useEffect(() => {
    createEnterAbout({ mesh, arrow });
  }, []);
  return (
    <main className="w-screen  flex flex-col justify-between pt-[2vw] md:px-[2vw] h-[100svh] px-[3vw] [backface-visibility:hidden] [transform-origin:center] text-[0.7vw] Med pl-[2vw] relative pb-[2vw]">
      <div
        style={{
          transformOrigin: "center bottom",
          perspective: "1000px",
          perspectiveOrigin: "center bottom",
        }}
        className="w-full flex items-center all md:justify-start absolute top-[1vw] left-0  md:pl-[2vw] justify-center folio titlework pt-[0svh] md:pt-0 md:visible invisible md:h-auto h-0"
      >
        {" "}
        <div className="overflow-hidden">
          {" "}
          <h3 className="Med md:text-[2.5vw] text-[9vw] works2 [backface-visibility:hidden] [transform-origin:center] will-change-transform flex">
            <div
              style={{
                transform: "rotateX(120deg) ",
              }}
              className="works translate-y-full"
            >
              A
            </div>{" "}
            <div
              style={{
                transform: "rotateX(120deg) ",
              }}
              className="works translate-y-full"
            >
              b
            </div>{" "}
            <div
              style={{
                transform: "rotateX(120deg) ",
              }}
              className="works translate-y-full"
            >
              o
            </div>{" "}
            <div
              style={{
                transform: "rotateX(120deg) ",
              }}
              className="works translate-y-full"
            >
              u
            </div>{" "}
            <div
              style={{
                transform: "rotateX(120deg) ",
              }}
              className="works translate-y-full"
            >
              t
            </div>
          </h3>
        </div>
      </div>
      {isMobile ? (
        <div className="md:text-[1.4vw] text-[3.5vw] md:w-[65.5vw] w-[75vw] all md:mt-[6vw] titlework2 mt-[0vw] ">
          <div className="overflow-hidden">
            <div className="bio translate-y-full will-change-transform">
              {" "}
              Hey! I'm Valentin a 28 years old freelance
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="bio translate-y-full will-change-transform">
              {" "}
              developer based in Montpellier, France.
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="bio translate-y-full will-change-transform">
              {" "}
              From a career in audio engenieering & music
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="bio translate-y-full will-change-transform">
              production to coding, pushing my creativity
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="bio translate-y-full will-change-transform">
              boundaries and express a certain sensibility
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="bio translate-y-full will-change-transform">
              has always been part of my approach to work.
            </div>
          </div>
        </div>
      ) : (
        <div className="md:text-[1.4vw] text-[3vw] md:w-[65.5vw] w-[75vw] all md:mt-[6vw] titlework2 mt-[2vw]">
          <div className="overflow-hidden">
            <div className="bio translate-y-full will-change-transform">
              {" "}
              Hey! I'm Valentin a 28 years old freelance developer based in
              Montpellier, France. From a career in
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="bio translate-y-full will-change-transform">
              {" "}
              audio engenieering & music production to coding, pushing my
              creativity boundaries and express
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="bio translate-y-full will-change-transform">
              {" "}
              a certain sensibility has always been part of my approach to work.
              When I'm not coding motions
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="bio translate-y-full will-change-transform"> </div>
          </div>
          <div className="overflow-hidden">
            <div className="bio translate-y-full will-change-transform">
              based web interfaces, i'm lifting heavy weights with death metal
              in background music.
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="bio translate-y-full will-change-transform"></div>
          </div>
        </div>
      )}
      <div className=" flex md:flex-row flex-col-reverse  md:mt-[8vw] mt-0 all leftitem items-end md:items-start">
        <div
          ref={mesh}
          style={{
            clipPath: "inset(50% 50% 50% 50%)",
          }}
          className="  md:w-[18vw] w-[55vw] all md:h-[22vw] h-[70vw]"
        >
          <div className="relative w-full h-full">
            {" "}
            <ImageWithDeformation src="/val.webp"></ImageWithDeformation>
            <Image
              className=" mix-blend-exclusion"
              src="/val.webp"
              width={500}
              height={500}
              alt="valentin"
            ></Image>
          </div>
        </div>
        <div className="flex  md:text-[0.7vw] text-[2.2vw] md:pb-0 pb-[16vw] md:w-auto w-full">
          <div className="flex gap-[3.5vw] md:ml-[7.3vw]">
            <div className="opacity-50 overflow-hidden h-fit">
              <div className="translate-y-full list1 will-change-transform">
                TOOLS
              </div>
            </div>
            <ul className="">
              <li className="overflow-hidden">
                <div className="list1 translate-y-full will-change-transform">
                  <Button href="/" text="JAVASCRIPT"></Button>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="list1 translate-y-full will-change-transform">
                  <Button href="/" text="HTML5"></Button>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="list1 translate-y-full will-change-transform">
                  <Button href="/" text="   CSS3 / TAILWIND"></Button>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="list1 translate-y-full will-change-transform">
                  <Button href="/" text="  GLSL"></Button>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="list1 translate-y-full will-change-transform">
                  <Button href="/" text="       THREE.JS "></Button>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="list1 translate-y-full will-change-transform">
                  <Button href="/" text="   NEXT.JS  "></Button>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="list1 translate-y-full will-change-transform">
                  <Button href="/" text="GSAP "></Button>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="list1 translate-y-full will-change-transform">
                  <Button href="/" text="EXPRESS "></Button>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="list1 translate-y-full will-change-transform">
                  <Button href="/" text="PRISMIC "></Button>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="list1 translate-y-full will-change-transform">
                  <Button href="/" text="    NODE.JS  "></Button>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="list1 translate-y-full will-change-transform">
                  <Button href="/" text="    MY-SQL  "></Button>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="list1 translate-y-full will-change-transform">
                  <Button href="/" text="      MONGO DB   "></Button>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-[3vw] md:ml-[27.5vw] ml-[12vw]">
            {" "}
            <div className="flex gap-[3.5vw]">
              <div className="opacity-50 overflow-hidden  h-fit">
                <div className="translate-y-full list3 will-change-transform ">
                  CONTACT
                </div>
              </div>
              <ul>
                <li className="overflow-hidden">
                  <div className="list3 translate-y-full ">
                    <div className=" will-change-transform [backface-visibility:hidden] [transform-origin:center] ">
                      VALENTINMOR.PRO@GMAIL.COM
                    </div>
                  </div>
                </li>
                <li className="overflow-hidden">
                  <div className="list3 translate-y-full will-change-transform [backface-visibility:hidden] [transform-origin:center] ">
                    <div className="">+33 6 31 81 72 32</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex gap-[3.5vw]">
              <div className="opacity-50 overflow-hidden  h-fit">
                <div className="translate-y-full list2 will-change-transform">
                  SOCIALS
                </div>
              </div>
              <ul>
                <li className="overflow-hidden">
                  <div className="list2 translate-y-full will-change-transform">
                    <Button href="/" text="LINKEDIN"></Button>
                  </div>
                </li>
                <li className="overflow-hidden">
                  <div className="list2 translate-y-full will-change-transform">
                    <Button href="/" text="GITHUB"></Button>
                  </div>
                </li>
                <li className="overflow-hidden">
                  <div className="list2 translate-y-full will-change-transform">
                    <Button href="/" text="MALT"></Button>
                  </div>
                </li>
                <li className="overflow-hidden">
                  <div className="list2 translate-y-full will-change-transform">
                    <Button href="/" text="INSTAGRAM"></Button>
                  </div>
                </li>
                <li className="overflow-hidden">
                  <div className="list2 translate-y-full will-change-transform">
                    <Button href="/" text="SPOTIFY"></Button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
