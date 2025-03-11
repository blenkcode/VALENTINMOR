// context/FirstVisitContext.js
"use client";

import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useVisit must be used within a ModalContext");
  }
  return context;
}

export function ModalProvider({ children }) {
  const [isHoverLink, setIsHoverLink] = useState(false);
  const [isHoverThing, setIsHoverThing] = useState(false);

  const value = {
    isHoverLink,
    setIsHoverLink,
    isHoverThing,
    setIsHoverThing,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
