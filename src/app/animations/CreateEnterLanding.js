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
}) => {
  gsap.registerPlugin(CustomEase);

  CustomEase.create("customEasing", "M0,0 C0.89,0 0.48,0.98 1,1");
  const tl = gsap.timeline();
  return new Promise((resolve) => {
    tl.fromTo(
      ".line1",
      { y: "100%", rotateX: "90deg" },

      {
        y: 0,
        rotateX: 0,
        stagger: 0.1,
        duration: 1.3,
        ease: "expo.out",
      },
      0.15
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
        0.1
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
        ".carrou",

        {
          y: 0,
          duration: 1,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".frametop",

        {
          y: "-4vw",
          duration: 0.95,
          ease: "power3.inOut",
        },

        0
      )
      .to(
        ".framebottom",

        {
          y: "4vw",
          duration: 0.95,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        ".frameleft",

        {
          x: "-4vw",
          duration: 0.95,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        ".frameright",

        {
          x: "4vw",
          duration: 0.95,
          ease: "power3.inOut",
        },
        0
      )

      .fromTo(
        ".foliol",
        { paddingLeft: "4vw" },

        {
          paddingLeft: "0vw",
          duration: 0.95,
          ease: "power3.inOut",
        },
        0
      )

      .fromTo(
        ".folior",
        { paddingRight: "4vw" },

        {
          paddingRight: "0vw",

          duration: 0.95,
          ease: "power3.inOut",
        },
        0
      )
      .fromTo(
        ".carrou",
        { y: "-50vw" },

        {
          y: 0,

          duration: 1.5,
          ease: "power4.inOut",
        },
        0
      )
      .fromTo(
        ".foliolines",
        { y: "-2vw" },

        {
          y: 0,
          duration: 0.95,
          ease: "power3.inOut",
        },
        0
      );
  });
};
