import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isVisable, setIsVisable] = useState(false)

  return (
    <ProjectContext.Provider value={{ selectedProjectId, setSelectedProjectId,isVisable,setIsVisable }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  return useContext(ProjectContext);
}
