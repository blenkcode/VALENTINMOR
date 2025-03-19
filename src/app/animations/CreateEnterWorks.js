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
      duration: 1.6,
      ease: "expo.out",
      stagger: {
        amount: 0.5,
        from: "end",
        ease: "customEasing",
      },
    },
    0
  )
    .fromTo(
      smallImageRefs.map((ref) => ref.current).filter(Boolean),
      { clipPath: "inset(50% 50% 50% 50%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "expo.out",
        stagger: {
          amount: 0.5,
          from: "end",
          ease: "customEasing",
        },
      },
      0.4
    )
    .fromTo(
      descriptionsRef.map((ref) => ref.current).filter(Boolean),
      { y: "100%" },
      {
        y: 0,
        duration: 1.2,
        ease: "expo.inOut",
        stagger: {
          amount: 0.3,
          from: "end",
        },
      },
      0
    )
    .fromTo(
      date.current,
      { y: "100%" },
      {
        y: 0,
        duration: 1.5,
        ease: "expo.inOut",
      },
      0.3
    )
    .fromTo(
      type.current,
      { y: "100%" },
      {
        y: 0,
        duration: 1.5,
        ease: "expo.inOut",
      },
      0.35
    )
    .fromTo(
      title.current,
      { y: "-100%" },
      {
        y: 0,
        duration: 1.8,
        ease: "expo.inOut",
      },
      0.1
    );

  return new Promise((resolve) => {
    // Resolve when the timeline completes
    tl.eventCallback("onComplete", resolve);
  });
};
