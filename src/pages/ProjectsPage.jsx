import { useEffect, useState } from "react";
import ProjectsContainer from "../components/ProjectsContainer";
import ProjectsHeader from "../components/ProjectsHeader";
import ProjectDetails from "../components/ProjectDetails";
import { useProject } from "../Context/ProjectContext";
import AddProjectModal from "../components/AddProjectModal";
import { useFilterAndSearch } from "../Context/FilterAndSearchContext";
export default function ProjectsPage(){
   const [projects, setProjects] = useState([]);
   const [showModal,setShowModal] = useState(false)
   const { statusFilter, searchQuery } = useFilterAndSearch();
  // here i will use them to get projects according to the status and search

   function handelCloseModal(){
    setShowModal(false)
   }
   function handelShowModal(){
    setShowModal(true)
   }

   const {isVisable} =useProject()
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

    return(
        <div className="dark:bg-[#1e1e1e] w-full p-4">
            <ProjectsHeader onShowModal={handelShowModal} />
            <ProjectsContainer projects={projects} />
            {isVisable&&<ProjectDetails isVisible={isVisable} />}
            {showModal&& <AddProjectModal onClose={handelCloseModal} />}
        </div>
    )
}