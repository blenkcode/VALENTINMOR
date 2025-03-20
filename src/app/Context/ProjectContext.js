// context/FirstVisitContext.js
"use client";

import React, { createContext, useContext, useState } from "react";

const ProjectContext = createContext(undefined);

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useVisit must be used within a ProjectContext");
  }
  return context;
}

export function ProjectProvider({ children }) {
  const [lastpProject, setLastProject] = useState("0");
  const [project, setProject] = useState("0");

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
