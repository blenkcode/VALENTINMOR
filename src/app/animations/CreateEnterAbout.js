"use client";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

export const createEnterAbout = ({ mesh, arrow }) => {
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
      paddingBottom: "2vw",
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
        y: "-100%",
        duration: 0.95,
        ease: "power3.inOut",
      },

      0
    )
    .to(
      ".framebottom",

      {
        y: "100%",
        duration: 0.95,
        ease: "power3.inOut",
      },
      0
    )
    .to(
      ".frameleft",

      {
        x: "-100%",
        duration: 0.95,
        ease: "power3.inOut",
      },
      0
    )
    .to(
      ".frameright",

      {
        x: "100%",
        duration: 0.95,
        ease: "power3.inOut",
      },
      0
    )
    .to(
      ".bio",

      {
        y: 0,
        duration: 1.7,
        ease: "expo.out",
        stagger: 0.1,
      },
      0.35
    )
    .to(
      ".list1",

      {
        y: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.09,
      },
      0.45
    )
    .to(
      ".list3",

      {
        y: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.09,
      },
      1.6
    )
    .to(
      ".list2",

      {
        y: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.09,
      },
      1.9
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
    );

  return new Promise((resolve) => {
    // Resolve when the timeline completes
    tl.eventCallback("onComplete", resolve);
  });
};
