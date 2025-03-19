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

        duration: 0.7,
        ease: "customEasing",
        onComplete: () => {
          requestAnimationFrame(() => {
            router.push(href);
          });
        },
      }
    ).fromTo(
      frame.current,
      { clipPath: "inset(0% 0% 0% 0%)" },

      {
        clipPath: " inset(50% 50% 50% 50%)",

        duration: 0.7,
        ease: "customEasing",
      },
      0
    );
  });
};
