"use client";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

export const createEnterAbout = ({ mesh }) => {
  gsap.registerPlugin(CustomEase);

  CustomEase.create("customEasing", "M0,0 C0.89,0 0.48,0.98 1,1");
  const tl = gsap.timeline();

  // Animate each image ref with stagger
  tl.to(
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
    .fromTo(
      mesh.current,
      { clipPath: "inset(50% 50% 50% 50%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.8,
        ease: "power3.out",
      },
      0.65
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
      ".bio",

      {
        y: 0,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.1,
      },
      0.35
    )
    .to(
      ".list1",

      {
        y: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.05,
      },
      0.45
    )
    .to(
      ".list2",

      {
        y: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.05,
      },
      0.65
    )
    .to(
      ".list3",

      {
        y: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.05,
      },
      0.75
    );

  return new Promise((resolve) => {
    // Resolve when the timeline completes
    tl.eventCallback("onComplete", resolve);
  });
};
