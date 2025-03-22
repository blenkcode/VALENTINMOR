// context/FirstVisitContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const MobileContext = createContext(undefined);

export function useMobile() {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error("useVisit must be used within a mobilecontext");
  }
  return context;
}

export function MobileProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const value = {
    isMobile,
    setIsMobile,
  };

  return (
    <MobileContext.Provider value={value}>{children}</MobileContext.Provider>
  );
}
