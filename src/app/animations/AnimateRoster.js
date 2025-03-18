import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
export const AnimateRoster = (refs) => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("customEasing", "M0,0 C1,0 0.39,0.99 1,1");
  if (!refs || !refs.artists || !refs.artists.current) return;

  // Maintenant, refs.artists.current est le tableau de refs qu'on veut utiliser
  const artistRefsArray = refs.artists.current;

  // Filtrer les refs valides
  const validRefs = artistRefsArray.filter((ref) => ref && ref.current);
  const elements = validRefs.map((ref) => ref.current);

  // Vérifier qu'on a des éléments à animer
  if (elements.length === 0) return;

  const tl = gsap.timeline({});

  tl.fromTo(
    refs.title.current,
    { y: "100%", rotateX: "90deg", scale: 0.9 },
    {
      y: 0,
      z: 0,
      rotateX: "0deg",
      scale: 1,
      stagger: 0.03,

      duration: 1.95,
      ease: "power3.inOut",
    },
    0
  )
    .fromTo(
      refs.arrow.current,
      { x: "-150%", opacity: 0 },
      { x: 0, opacity: 1, duration: 1.95, ease: "power3.inOut" },
      0.1
    )
    .fromTo(
      refs.line.current,
      {
        x: "-101%",
      },
      {
        x: 0,

        duration: 1.9,
        ease: "power4.inOut",
      },
      0
    )
    .fromTo(
      elements,
      {
        clipPath: "inset(50% 50% 50% 50%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0% round 0%)",
        duration: 1.5,
        ease: "power4.inOut",
        stagger: {
          amount: 0.1, // Durée totale de l'effet de stagger
          from: "end", // Commence par le dernier élément
        },
      },
      0
    )
    .to(
      ".transitionBlack",

      {
        y: "-100%",

        duration: 1.5,
        ease: "power4.inOut",
      },
      0
    )
    .fromTo(
      ".artistName",
      { opacity: 0 },

      {
        opacity: 1,

        duration: 1.3,
        ease: "power4.inOut",
        stagger: {
          amount: 0.2, // Durée totale de l'effet de stagger
          from: "end", // Commence par le dernier élément
        },
      },
      0
    )
    .fromTo(
      refs.p1.current,
      { y: "100%" },

      {
        y: 0,

        duration: 1.8,
        ease: "power4.inOut",
      },
      0.2
    )
    .fromTo(
      refs.p2.current,
      { y: "100%" },

      {
        y: 0,

        duration: 1.8,
        ease: "power4.inOut",
      },
      0.3
    )
    .fromTo(
      refs.p3.current,
      { y: "100%" },

      {
        y: 0,

        duration: 1.8,
        ease: "power4.inOut",
      },
      0.4
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
