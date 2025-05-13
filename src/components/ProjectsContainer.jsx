import { useProject } from "../Context/ProjectContext";
import ProjectCard from "./ProjectCard";

export default function ProjectsContainer({projects}){
    const {setSelectedProjectId,setIsVisable} = useProject()
    function handelSelectProject(projectId){
        setSelectedProjectId(projectId)
        setIsVisable(true)
    }
     const ProjectsList= projects.map((project)=>{
    return <ProjectCard key={project.id} id={project.id} title={project.name} description={project.description} students={project.assigendStudentId} category={project.category} progress={50} startDate={project.start_date} endDate={project.end_date} onClick={()=>handelSelectProject(project.id)} />
   })
    return(
        <div className="pt-5 flex gap-5 flex-wrap justify-center">
            {ProjectsList}
        </div>
    )
}