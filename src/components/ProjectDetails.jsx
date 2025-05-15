import { useEffect, useRef, useState } from "react";
import { useProject } from "../Context/ProjectContext";
import TaskCard from "./TaskCard";
import { getProjectDetails } from "../services/projectService";
import { useSelector } from "react-redux";
import LoaderSpinner from "../ui/LoaderSpinner";
import { getNameFromEmail } from "../utilites/getNameFromEmail";

export default function ProjectDetails({ isVisible }) {
  const { setIsVisable, selectedProjectId } = useProject();
  console.log("selectedID" +selectedProjectId)
  const detailRef = useRef();
  const token = useSelector((state) => state.auth.token);

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      if (!selectedProjectId || !isVisible) return;

      setLoading(true);
      try {
        const data = await getProjectDetails(selectedProjectId, token);
        console.log("📦 Project Details:", data);
        setProject(data);
        console.log(data)
      } catch (error) {
        console.error("Error loading project:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [selectedProjectId, isVisible, token]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (detailRef.current && !detailRef.current.contains(event.target)) {
        setIsVisable(false);
      }
    }

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, setIsVisable]);

  if (!isVisible) return null;

  return (
    <div
      ref={detailRef}
      className={`fixed top-0 right-0 h-full w-[30%] bg-white dark:bg-[#1e1e1e] border-l-[3px] border-l-[#2e2e2e] shadow-lg transition-transform duration-300 z-[50] overflow-y-auto`}
    >
      <div className="p-4">
        {loading ? (
          <LoaderSpinner />
        ) : project ? (
          <>
            <h2 className="text-2xl font-bold text-[#117380] py-4">
              {project.name}
            </h2>
            <hr className="h-[2px] border-none bg-[#2f2f2f]" />
            <div className="flex flex-col gap-3">
              <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Category:</strong> {project.category}</p>
              <p><strong>Start Date:</strong> {project.startDate}</p>
              <p><strong>End Date:</strong> {project.endDate}</p>
              <p>
                <strong>Students:</strong>{" "}
                {project.members && project.members.length > 0
                  ? project.members.map((m, index) => (
                      <span key={index}>
                        {getNameFromEmail(m.email)}
                        {index < project.members.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : "No members"}
              </p>
            </div>

            <div className="mt-5">
              <h1 className="text-[#02b5cc] font-bold text-2xl pb-2">Tasks:</h1>
              <hr className="h-[2px] border-none bg-[#2f2f2f]" />
              <div className="tasks-Container mt-2 flex flex-col gap-2">
                {project.tasks.length > 0 ? (
                  project.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <p className="text-gray-500">No tasks found.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No project data available.</p>
        )}
      </div>
    </div>
  );
}
