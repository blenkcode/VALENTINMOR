import { useEffect } from "react";
import { useMouseStore } from "./mouseStore";

export const MouseTracker = () => {
  const setMouse = useMouseStore((state) => state.setMouse);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMouse(x * 4, y * 4);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setMouse]);

  return null;
};
