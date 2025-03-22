"use client";
import gsap from "gsap";

import CustomEase from "gsap/CustomEase";
export const createEnterLanding = ({
  works,
  number,
  jap,
  date,
  arrow,
  frame,
  setTransition,
}) => {
  gsap.registerPlugin(CustomEase);

  CustomEase.create("customEasing", "M0,0 C0.89,0 0.48,0.98 1,1");
  const tl = gsap.timeline();
  setTransition(false);
  return new Promise((resolve) => {
    tl.fromTo(
      ".line1",
      { y: "100%" },

      {
        y: 0,

        stagger: 0.13,
        duration: 1.6,
        ease: "expo.out",
      },
      0.5
    )
      .fromTo(
        ".works",
        { y: "100%", rotateX: "90deg" },

        {
          y: 0,
          rotateX: 0,
          stagger: 0.04,
          duration: 1.7,
          ease: "expo.out",
        },
        0.4
      )
      .fromTo(
        arrow.current,
        { y: "100%", rotateX: "120deg" },

        {
          y: 0,
          rotateX: 0,
          duration: 1.7,
          ease: "expo.out",
        },
        0.4
      )
      .fromTo(
        number.current,
        { y: "100%", rotateX: "90deg" },

        {
          y: 0,
          rotateX: 0,
          duration: 1.7,
          ease: "expo.out",
        },
        0.7
      )
      .fromTo(
        date.current,
        { y: "100%", rotateX: "90deg" },

        {
          y: 0,
          rotateX: 0,
          duration: 1.7,
          ease: "expo.out",
        },
        0.7
      )
      .fromTo(
        jap.current,
        { y: "100%", rotateX: "90deg" },

        {
          y: 0,
          rotateX: 0,
          duration: 1.7,
          ease: "expo.out",
        },
        0
      )
      .fromTo(
        frame.current,
        { clipPath: "inset(50% 50% 50% 50%)" },

        {
          clipPath: "inset(0% 0% 0% 0%)",

          duration: 1,
          ease: "expo.out",
        },
        0.5
      )
      .to(
        ".header",

        {
          y: 0,
          paddingLeft: "2vw",
          paddingRight: "2vw",
          duration: 0.95,
          ease: "power3.inOut",
        },
        0
      )

      .to(
        ".frametop",

        {
          y: "-3vw",
          duration: 0.95,
          ease: "power3.inOut",
        },

        0
      )
      .to(
        ".framebottom",

        {
          y: "3vw",
          duration: 0.95,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        ".frameleft",

        {
          x: "-3vw",
          duration: 0.95,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        ".frameright",

        {
          x: "3vw",
          duration: 0.95,
          ease: "power3.inOut",
        },
        0
      )

      .to(
        ".carrou",

        {
          opacity: 1,

          duration: 1.2,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        ".neutral1",

        {
          opacity: 1,

          duration: 1.2,
          ease: "power3.inOut",
        },
        0.5
      )
      .to(
        ".linefoliowhite",

        {
          width: "100%",

          stagger: 0.09,
          duration: 1.6,
          ease: "power3.inOut",
        },
        0.2
      );
  });
};
