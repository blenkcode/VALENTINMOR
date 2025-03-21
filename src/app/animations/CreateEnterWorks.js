"use client";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

export const createEnterWorks = ({
  imageRefs,
  smallImageRefs,
  descriptionsRef,
  date,
  type,
  title,
  arrow,
  frameRef,
  visit,
  overview,
}) => {
  gsap.registerPlugin(CustomEase);

  CustomEase.create("customEasing", "M0,0 C0.89,0 0.48,0.98 1,1");
  const tl = gsap.timeline();

  // Make sure we have refs to work with
  if (
    !imageRefs ||
    (imageRefs.length === 0 && !smallImageRefs) ||
    smallImageRefs.length === 0
  ) {
    console.error("Image refs are missing");
    return Promise.resolve();
  }

  // Animate each image ref with stagger
  tl.fromTo(
    imageRefs.map((ref) => ref.current).filter(Boolean), // Filter out any null refs
    { clipPath: "inset(50% 50% 50% 50%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      ease: "power3.out",
      stagger: {
        amount: 0.2,
        from: "end",
        ease: "customEasing",
      },
    },
    0.11
  )
    .fromTo(
      frameRef.map((ref) => ref.current).filter(Boolean), // Filter out any null refs
      { clipPath: "inset(50% 50% 50% 50%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        ease: "power3.out",
        stagger: {
          amount: 0.2,
          from: "end",
          ease: "customEasing",
        },
      },
      0.11
    )
    .fromTo(
      smallImageRefs.map((ref) => ref.current).filter(Boolean),
      { clipPath: "inset(50% 50% 50% 50%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 2.2,
        ease: "expo.out",
        stagger: {
          amount: 0.4,
          from: "left",
          ease: "customEasing",
        },
      },
      0.2
    )
    .fromTo(
      overview.current,
      { y: "100%" },
      {
        y: 0,
        duration: 2.2,
        ease: "expo.out",
      },
      0.3
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
      0.3
    )
    .fromTo(
      date.current,
      { y: "100%" },
      {
        y: 0,
        duration: 2.2,
        ease: "expo.out",
      },
      0.35
    )
    .fromTo(
      type.current,
      { y: "100%" },
      {
        y: 0,
        duration: 2.2,
        ease: "expo.out",
      },
      0.35
    )
    .fromTo(
      title.current,
      { y: "100%", rotateX: "120deg" },
      {
        y: 0,
        rotateX: 0,
        duration: 1.22,
        ease: "power2.out",
      },
      0.15
    )
    .fromTo(
      arrow.current,
      { y: "100%", rotateX: "-120deg" },
      {
        y: 0,
        rotateX: 0,
        duration: 2.2,
        ease: "expo.out",
      },
      0.5
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
      ".smallimgs",

      {
        x: 0,
        duration: 0.95,
        ease: "power3.inOut",
      },
      0
    );

  return new Promise((resolve) => {
    // Resolve when the timeline completes
    tl.eventCallback("onComplete", resolve);
  });
};
