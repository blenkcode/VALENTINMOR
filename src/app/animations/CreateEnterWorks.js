"use client";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

export const createEnterWorks = ({ descriptionsRef, visit }) => {
  gsap.registerPlugin(CustomEase);

  CustomEase.create("customEasing", "M0,0 C0.89,0 0.48,0.98 1,1");
  const tl = gsap.timeline();

  // Animate each image ref with stagger
  tl.to(
    ".header",

    {
      y: 0,
      paddingLeft: "2vw",
      paddingBottom: "2vw",
      paddingRight: "2vw",
      duration: 0.95,
      ease: "power3.inOut",
    },
    0
  )
    .fromTo(
      descriptionsRef.map((ref) => ref.current).filter(Boolean),
      { y: "100%" },
      {
        y: 0,
        duration: 2.2,
        ease: "expo.out",
        stagger: {
          amount: 0.1,
          from: "end",
        },
      },
      0.7
    )
    .fromTo(
      ".works",
      { y: "100%", rotateX: "120deg" },

      {
        y: 0,
        rotateX: 0,
        stagger: 0.02,
        duration: 1.7,
        ease: "expo.out",
      },
      0.4
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
    .fromTo(
      visit.current,
      { y: "100%", rotateX: "-120deg" },
      {
        y: 0,
        rotateX: 0,
        duration: 1.95,
        ease: "expo.out",
      },
      0.5
    );

  return new Promise((resolve) => {
    // Resolve when the timeline completes
    tl.eventCallback("onComplete", resolve);
  });
};
