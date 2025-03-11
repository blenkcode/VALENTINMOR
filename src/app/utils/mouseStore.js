import { create } from "zustand"; // Modifié ici

export const useMouseStore = create((set) => ({
  mouse: { x: 0.2, y: 0.2 },
  targetMouse: { x: 0.2, y: 0.2 },
  prevMouse: { x: 0.5, y: 0.5 },
  aberrationIntensity: 0.1,
  setTargetMouse: (x, y) => {
    set((state) => ({
      prevMouse: { ...state.targetMouse },
      targetMouse: { x, y },
    }));
  },
  setMouse: (x, y) => set({ mouse: { x, y } }),
  setAberrationIntensity: (value) => set({ aberrationIntensity: value }),
}));
