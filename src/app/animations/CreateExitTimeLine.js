"use client";
import gsap from "gsap";
import { useTransition } from "../Context/TransitionContext";
import CustomEase from "gsap/CustomEase";
export const createExitTimeline = (router, href, transition, setTransition) => {
  gsap.registerPlugin(CustomEase);

  CustomEase.create("customEasing", "M0,0 C0.89,0 0.48,0.98 1,1");
  const tl = gsap.timeline();
  setTransition(true);
  return new Promise((resolve) => {
    tl.fromTo(
      ".all",
      { opacity: 1 },

      {
        opacity: 0,

        duration: 0.8,
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
        ".header",
        {
          y: 0,
          paddingLeft: "2vw",
          paddingRight: "2vw",
        },

        {
          y: "3vw",
          paddingLeft: "4.5vw",
          paddingRight: "4.5vw",
          duration: 1,
          ease: "power4.inOut",
        },
        0
      )

      .to(
        ".carrou",

        {
          opacity: 0,

          duration: 0.8,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".foliol",

        {
          paddingLeft: "3vw",

          duration: 1,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".folior",

        {
          paddingRight: "3vw",

          duration: 1,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".frametop",

        {
          y: 0,
          duration: 1,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".framebottom",

        {
          y: 0,
          duration: 1,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".frameleft",

        {
          x: 0,
          duration: 1,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".frameright",

        {
          x: 0,
          duration: 1,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        ".titlework",

        {
          x: "2vw",
          y: "2vw",
          duration: 1,
          ease: "power4.inOut",
        },
        0
      );

    // .to(
    //   ".works2",

    //   {
    //     scale: 0.91,
    //     y: "1vw",
    //     x: "-1vw",
    //     duration: 0.9,
    //     ease: "power4.inOut",
    //   },
    //   0
    // );
  });
};
