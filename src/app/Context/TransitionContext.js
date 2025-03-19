// context/FirstVisitContext.js
"use client";

import React, { createContext, useContext, useState } from "react";

const TransitionContext = createContext(undefined);

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useVisit must be used within a TransitionContext");
  }
  return context;
}

export function TransitionProvider({ children }) {
  const [transition, setTransition] = useState(false);

  const value = {
    transition,
    setTransition,
  };

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
}
