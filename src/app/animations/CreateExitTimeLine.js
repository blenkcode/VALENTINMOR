"use client";
import gsap from "gsap";

import CustomEase from "gsap/CustomEase";
export const createExitTimeline = (router, href, frame) => {
  gsap.registerPlugin(CustomEase);

  CustomEase.create("customEasing", "M0,0 C0.89,0 0.48,0.98 1,1");
  const tl = gsap.timeline();
  return new Promise((resolve) => {
    tl.fromTo(
      ".all",
      { opacity: 1 },

      {
        opacity: 0,

        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          requestAnimationFrame(() => {
            router.push(href);
          });
        },
      },
      0
    )
      .fromTo(
        frame.current,
        { clipPath: "inset(0% 0% 0% 0%)" },

        {
          clipPath: " inset(50% 50% 50% 50%)",

          duration: 0.7,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".header",

        {
          y: "3vw",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          duration: 0.7,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".folio",

        {
          paddingLeft: "4vw",
          paddingRight: "4vw",
          duration: 0.7,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".frametop",

        {
          y: 0,
          duration: 0.7,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".framebottom",

        {
          y: 0,
          duration: 0.7,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".frameleft",

        {
          x: 0,
          duration: 0.7,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".frameright",

        {
          x: 0,
          duration: 0.7,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".foliolines",

        {
          scale: 0.91,
          y: "-1vw",
          duration: 0.7,
          ease: "power4.inOut",
        },
        0
      );
  });
};
