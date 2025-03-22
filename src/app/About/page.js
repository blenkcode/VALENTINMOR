"use client";
import React, { useEffect, useRef } from "react";
import Button from "../components/Button";
import { createEnterAbout } from "../animations/CreateEnterAbout";
import Image from "next/image";
import ImageWithDeformation from "../components/shaders/ImageWithDeformationHover";
const page = () => {
  const mesh = useRef(null);
  useEffect(() => {
    createEnterAbout({ mesh });
  }, []);
  return (
    <main className="w-screen  flex flex-col justify-between pt-[10vw] px-[2vw] h-[100svh]  [backface-visibility:hidden] [transform-origin:center] text-[0.7vw] Med pl-[7.5vw] relative pb-[16vw]">
      <div
        ref={mesh}
        style={{
          clipPath: "inset(50% 50% 50% 50%)",
        }}
        className="absolute bottom-[2vw] right-[2vw] w-[22vw] all h-[29vw]"
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

      <div className="text-[1.38vw] w-[65.5vw] all">
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
            based web interfaces, i'm lifting heavy weights with death metal in
            background music.
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="bio translate-y-full will-change-transform"></div>
        </div>
      </div>
      <div className=" flex gap-[11.5vw] mt-[5vw] all">
        <div className="flex gap-[2.5vw]">
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
        <div className="flex flex-col gap-[3vw]">
          {" "}
          <div className="flex gap-[2.5vw]">
            <div className="opacity-50 overflow-hidden  h-fit">
              <div className="translate-y-full list3 will-change-transform">
                CONTACT
              </div>
            </div>
            <ul>
              <li className="overflow-hidden">
                <div className="list3 translate-y-full ">
                  <div className="underline will-change-transform">
                    VALENTINMOR.PRO@GMAIL.COM
                  </div>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="list3 translate-y-full will-change-transform">
                  <div className="underline">+33 6 31 81 72 32</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex gap-[2.5vw]">
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
    </main>
  );
};

export default page;
