import { useEffect, useState } from "react";
import ProjectsContainer from "../components/ProjectsContainer";
import ProjectsHeader from "../components/ProjectsHeader";
import ProjectDetails from "../components/ProjectDetails";
import { useProject } from "../Context/ProjectContext";

export default function ProjectsPage(){
   const [projects, setProjects] = useState([]);
   const {isVisable} =useProject()
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);
  
    return(
        <div className="dark:bg-[#1e1e1e] w-full p-4">
            <ProjectsHeader />
            <ProjectsContainer projects={projects} />
            {isVisable&&<ProjectDetails isVisible={isVisable} />}
        </div>
    )
}