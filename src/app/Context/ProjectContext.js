// context/FirstVisitContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useMobile } from "./isMobileContext";
const ProjectContext = createContext(undefined);

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useVisit must be used within a ProjectContext");
  }
  return context;
}

export function ProjectProvider({ children }) {
  const { isMobile } = useMobile();
  const [lastpProject, setLastProject] = useState("0");
  const [project, setProject] = useState("0");

  useEffect(() => {
    if (isMobile) {
      setProject("1");
    }
  }, [isMobile]);

  const value = {
    lastpProject,
    setLastProject,
    project,
    setProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}
