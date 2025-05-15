import { useEffect, useState } from "react";
import Input from "./Input";
import {getAllProjects} from "../services/projectService"
import { getAllStudents } from "../services/studentService";
import { addTask } from "../services/taskService";
import { useSelector } from "react-redux";
import LoaderSpinner from "../ui/LoaderSpinner";
export default function AddTaskModal({ onClose }) {
  const [allStudent,setAllStudents] = useState([])
  const [allProjetcs,setProjects] =useState([])
  const [loading,setLoading] = useState(true)
  const { token, user } = useSelector((state) => state.auth);
  console.log(user)
   const [selectedProject,setSelectedProject] =useState("")
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [endDate,setEndDate] = useState("")
  const [status,setStaus] = useState("In Progress")

  const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);

      const [projectsData, studentsData] = await Promise.all([
        getAllProjects({ status: "", search: "", token }),
        getAllStudents(token),
      ]);

      setProjects(projectsData);
      setAllStudents(studentsData);

      if (user?.role === "student") {
        setSelectedStudent(user.id);
      }
    } catch (error) {
      console.error("Error loading data:", error.message);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, [token,user]);

 

  function handelSetTitle(e){
    setTitle(e.target.value)
  }


  const handleSelectChange = (e) => {
   
    setSelectedStudent(e.target.value);
  };

  async function handleSubmit(e) {
  e.preventDefault();

  const taskInput = {
    name: title,
    description,
    assignedTo: selectedStudent,
    assignedToProject: selectedProject,
    status,
    dueDate: new Date(endDate).toISOString(),
  };

  setSubmitting(true);

  try {
    await addTask(taskInput, token);
    
    setSelectedProject("");
    setTitle("");
    setDescription("");
    setSelectedStudent("");
    setEndDate("");
    setStaus("In Progress");

    onClose();
  } catch (err) {
    console.error("Failed to add task:", err.message);
    alert("Error: " + err.message);
  } finally {
    setSubmitting(false);
  }
}


  const studentList =allStudent.map((student)=>{
    return <option key={student.id} value={student.id}>{student.email}</option>
  })
  

  const projectsList = allProjetcs.map((project)=>{
    return <option key={project.id} value={project.id}>{project.name}</option>
  })

  if(loading)return <LoaderSpinner />
  return (
      
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="textcolre w-[50%] bg-[#f8f8f8] dark:bg-[#1e1e1e] p-10 borderStyle min-h-[400px] rounded-lg shadow-lg relative">
        <div className="modalHeader flex justify-between items-center">
          <h1 className="font-bold text-3xl text-[#0570e5]">Create New Task</h1>
          <span
            className="text-xl cursor-pointer font-bold text-gray-400"
            onClick={onClose}
          >
            ×
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="lableStyle" >
              Project Title:
              <select className="inputColore w-[100%] rounded-md h-[100px]" value={selectedProject} onChange={(e)=>{
                setSelectedProject(e.target.value)
              }}>
                {projectsList}
              </select>
            </label>
            <label className="lableStyle">
                Task Name:
                <Input onChange={handelSetTitle} Value={title} type="text"  />
            </label>
            <label className="lableStyle">
                Task Description:
                <textarea className="inputColore w-[100%] rounded-md h-[100px]" value={description} onChange={(e)=>{
                    setDescription(e.target.value)
                }} />
            </label>

            {user?.role !== "student" && (
              <label className="lableStyle">
                Assigned Student:<br />
                <select
                  className="inputColore w-[100%] rounded-md"
                  value={selectedStudent}
                  onChange={handleSelectChange}
                >
                  {studentList}
                </select>
              </label>
            )}

            <label className="lableStyle"
                >Task Status:<br />
                <select className="inputColore w-[100%] rounded-md" value={status} onChange={(e)=>{
                    setStaus(e.target.value)
                }} >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </label>
             <label className="lableStyle"
                >Ending Date:<br />
                <Input type="date"  Value={endDate} onChange={(e)=>{
                    setEndDate(e.target.value)
                }} />
            </label>
            <button
                type="submit"
                disabled={
                    !selectedProject ||
                    !title ||
                    !description ||
                    !selectedStudent ||
                    !endDate ||
                    !status
                }  
                className={`px-4 py-2 rounded ${
                    !selectedProject ||
                    !title ||
                    !description ||
                    !selectedStudent ||
                    !endDate
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#4caf50] hover:bg-[#3c923f] text-white'
                }`}
            >
              {submitting ? "Adding..." : "Add Task"}
            </button>
        </form>

      </div>
    </div>
  );
}
