// SmoothScroll.js
"use client";
import React from "react";
import Lenis from "@studio-freight/lenis";

function SmoothScroll({ children }) {
  React.useEffect(() => {
    const isMobile = () => {
      return window.innerWidth <= 768;
    };

    if (isMobile()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      orientation: "vertical",
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(raf);
    });

    resizeObserver.observe(document.documentElement);

    const handleResize = () => {
      if (isMobile()) {
        lenis.destroy();
      } else {
        requestAnimationFrame(raf);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      lenis.destroy();
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return children;
}

export default SmoothScroll;
