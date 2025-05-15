import { useEffect, useState } from "react";
import ProjectsContainer from "../components/ProjectsContainer";
import ProjectsHeader from "../components/ProjectsHeader";
import ProjectDetails from "../components/ProjectDetails";
import { useProject } from "../Context/ProjectContext";
import AddProjectModal from "../components/AddProjectModal";
import { useFilterAndSearch } from "../Context/FilterAndSearchContext";
import {getAllProjects} from "../services/projectService"
import LoaderSpinner from "../ui/LoaderSpinner";
import { useSelector } from "react-redux";
export default function ProjectsPage(){

  const token = useSelector((state)=>state.auth.token)
   const [projects, setProjects] = useState([]);
   const [loading,setLoading] = useState(false)
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
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getAllProjects({
            status: statusFilter,
            search: searchQuery,
            token: token,
         });
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [statusFilter ?? "", searchQuery ?? "", token ?? "",showModal]);

    return(
        <div className="dark:bg-[#1e1e1e] w-full p-4">
            <ProjectsHeader onShowModal={handelShowModal} />
             {loading ? (
                <LoaderSpinner />
              ) : (
                  <ProjectsContainer projects={projects} />
              )}
            {isVisable&&<ProjectDetails isVisible={isVisable} />}
            {showModal&& <AddProjectModal onClose={handelCloseModal} token={token} />}
        </div>
    )
}