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
      { y: "100%", rotateX: -90 },

      {
        y: 0,
        rotateX: 0,
        stagger: 0.15,
        duration: 1.4,
        ease: "customEasing",
      },
      0.15
    )
      .fromTo(
        works.current,
        { y: "100%" },

        {
          y: 0,

          duration: 1.2,
          ease: "customEasing",
        },
        0
      )
      .fromTo(
        arrow.current,
        { y: "100%" },

        {
          y: 0,

          duration: 1.2,
          ease: "customEasing",
        },
        0
      )
      .fromTo(
        number.current,
        { y: "100%" },

        {
          y: 0,

          duration: 1.2,
          ease: "customEasing",
        },
        0
      )
      .fromTo(
        date.current,
        { y: "100%" },

        {
          y: 0,

          duration: 1.2,
          ease: "customEasing",
        },
        0
      )
      .fromTo(
        jap.current,
        { y: "100%" },

        {
          y: 0,

          duration: 1.2,
          ease: "customEasing",
        },
        0
      )
      .fromTo(
        frame.current,
        { clipPath: "inset(50% 50% 50% 50%)" },

        {
          clipPath: "inset(0% 0% 0% 0%)",

          duration: 2,
          ease: "customEasing",
        },
        0
      );
  });
};
