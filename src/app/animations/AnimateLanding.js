import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
export const AnimateLanding = ({
  VideocontainerRef,
  firstLineRefs,
  secondLineRefs,
  lineRef,
  p1Ref,
  p2Ref,
  p3Ref,
  arrow,
  p4Ref,
}) => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("customEasing", "M0,0 C1,0 0.39,0.99 1,1");
  const tl = gsap.timeline({});
  tl.fromTo(
    firstLineRefs.current,
    { y: "100%", rotateX: "90deg", scale: 0.9 },
    {
      y: 0,
      z: 0,
      rotateX: "0deg",
      scale: 1,
      stagger: 0.01,
      duration: 1.9,
      ease: "power4.inOut",
    },
    0
  )
    .fromTo(
      secondLineRefs.current,
      { y: "100%", rotateX: "90deg" },
      {
        y: 0,
        z: 0,
        rotateX: "0deg",
        scale: 1,
        stagger: 0.015,
        duration: 1.9,
        ease: "power4.inOut",
      },
      0
    )
    .fromTo(
      lineRef.current,
      { width: 0, opacity: "8%" },
      {
        width: "49vw",
        duration: 1.5,
        opacity: "20%",
        delay: 0.2,
        ease: "power4.inOut",
      },
      0
    )
    .fromTo(
      VideocontainerRef.current, // Utiliser la référence directe
      {
        clipPath: "inset(50% 0% 50% 0%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 2,

        ease: "power4.inOut",
      },
      0.2
    )
    .fromTo(
      VideocontainerRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.inOut",
      },
      "<"
    )
    .fromTo(
      p1Ref.current,
      { y: "100%" },
      { y: 0, rotate: 0, duration: 1.95, ease: "expo.inOut" },
      0.1
    )
    .fromTo(
      arrow.current,
      { x: "-150%", opacity: 0 },
      { x: 0, opacity: 1, duration: 1.95, delay: 0.1, ease: "expo.inOut" },
      0.1
    )
    .fromTo(
      p2Ref.current,
      { y: "100%" },
      { y: 0, duration: 1.95, delay: 0.15, ease: "expo.inOut" },
      0.1
    )
    .fromTo(
      p3Ref.current,
      { y: "100%" },
      { y: 0, duration: 1.95, delay: 0.2, ease: "expo.inOut" },
      0.1
    )
    .fromTo(
      p4Ref.current,
      { y: "100%" },
      { y: 0, duration: 1.95, delay: 0.25, ease: "expo.inOut" },
      0.1
    )
    .to(
      ".transitionBlack",

      {
        y: "-100%",

        duration: 1.55,
        ease: "power4.inOut",
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
    )
    .fromTo(
      ".cta",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        delay: 0.7,
        ease: "power3.inOut",
      },
      "<"
    );
};
