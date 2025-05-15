import { useEffect, useRef } from "react";
import { useProject } from "../Context/ProjectContext";
import TaskCard from "./TaskCard";

export default function ProjectDetails({ isVisible }) {
  const { setIsVisable ,selectedProjectId } = useProject();
  const detailRef = useRef();
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
      className={`fixed top-0 right-0 h-full w-[30%] bg-white dark:bg-[#1e1e1e] border-l-[3px] border-l-[#2e2e2e] shadow-lg transition-transform duration-300 z-[50]`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold text-[#117380] py-4">Project Title</h2>
        <hr className="h-[2px] border-none bg-[#2f2f2f] text-black" />
        <div className="flex flex-col gap-3">
          <p><strong>Description:</strong> this is the project description</p>
          <p><strong>Category:</strong> This is a Category project.</p>
          <p><strong>Students:</strong> Student1,Student2, Student3</p>
          <p><strong>Start Date:</strong>20-5-2025</p>
          <p><strong>Start Date:</strong>25-5-2025</p>
        </div>
        <div className="mt-5">
          <h1 className="text-[#02b5cc] font-bold text-2xl pb-2">Tasks:</h1>
          <hr className="h-[2px] border-none bg-[#2f2f2f] text-black" />
          <div className="tasks-Container">
              <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
}


//  <div className="p-4 flex flex-col h-full">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold">Project Details</h2>
//           <button onClick={onClose} className="text-red-500 text-xl font-bold">&times;</button>
//         </div>
//         {project ? (
//           <div>
//             <p><strong>Name:</strong> {project.name}</p>
//             <p><strong>Description:</strong> {project.description}</p>
//             {/* يمكنك إضافة مزيد من التفاصيل هنا */}
//           </div>
//         ) : (
//           <p>No project selected.</p>
//         )}
//       </div>