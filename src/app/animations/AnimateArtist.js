import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
export const AnimateArtists = (refs) => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("customEasing", "M0,0 C1,0 0.39,0.99 1,1");

  const tl = gsap.timeline({});

  tl.to(
    ".transitionBlack",

    {
      y: "-100%",

      duration: 1.35,
      ease: "power4.inOut",
    },
    0
  )
    .fromTo(
      ".titleLetters",
      { y: "100%", rotateX: "90deg", scale: 0.9 },
      {
        y: 0,
        z: 0,
        rotateX: "0deg",
        scale: 1,
        stagger: 0.03,

        duration: 1.7,
        ease: "power3.inOut",
      },
      0.05
    )
    .fromTo(
      ".item-title",
      { y: "100%" },
      {
        y: 0,

        stagger: 0.03,

        duration: 1.7,
        ease: "power3.inOut",
      },
      0
    )
    .fromTo(
      ".item-p",
      { y: "100%" },
      {
        y: 0,

        stagger: 0.03,

        duration: 1.7,
        ease: "power3.inOut",
      },
      0
    )
    .fromTo(
      ".dash",
      { y: "100%" },
      {
        y: 0,

        stagger: 0.03,

        duration: 1.7,
        ease: "power3.inOut",
      },
      0
    )
    .fromTo(
      ".item-bio",
      { opacity: 0 },
      {
        opacity: "1",

        stagger: 0.03,

        duration: 1,
        ease: "power3.inOut",
      },
      1
    )
    .fromTo(
      ".imageclip",
      {
        clipPath: "inset(50% 50% 50% 50%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0% round 0%)",
        duration: 1.7,
        ease: "power4.inOut",
      },
      0
    )
    .to(
      ".title-transition",

      {
        y: "-500%",

        duration: 1.35,
        ease: "power4.inOut",
      },
      0
    )
    .to(
      ".title-transition",

      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      0
    )
    .to(
      ".item-nav",

      {
        y: 0,

        duration: 1.55,
        ease: "power4.inOut",
      },
      0.4
    )
    .to(
      ".item-header",

      {
        y: 0,

        duration: 1.55,
        ease: "power4.inOut",
      },
      0.4
    );

  return tl;
};
