"use client";
import gsap from "gsap";

import CustomEase from "gsap/CustomEase";
export const createExitTimeline = (router, href) => {
  gsap.registerPlugin(CustomEase);

  CustomEase.create("customEasing", "M0,0 C0.89,0 0.48,0.98 1,1");
  const tl = gsap.timeline();
  return new Promise((resolve) => {
    tl.fromTo(
      ".transitionBlack",
      { y: "100%" },

      {
        y: "0%",

        duration: 0.7,
        ease: "customEasing",
        onComplete: () => {
          requestAnimationFrame(() => {
            router.push(href);
          });
        },
      }
    )
      .fromTo(
        ".mainContainer",
        { y: 0, opacity: "100%" },

        {
          y: "-20vh",
          opacity: "30%",
          duration: 0.7,
          ease: "customEasing",
        },
        0
      )
      .to(
        ".item-nav",

        {
          y: "-100%",

          duration: 0.6,
          ease: "customEasing",
        },
        0
      )
      .to(
        ".item-header",

        {
          y: "-100%",

          duration: 0.6,
          ease: "customEasing",
        },
        0
      );
  });
};
