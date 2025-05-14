import { useEffect, useState } from "react";
import Input from "./Input";
export default function AddTaskModal({ onClose }) {
  const [allStudent,setAllStudents] = useState([])
  const [allProjetcs,setAllProjetcs] = useState([])
  useEffect(() => {
      const storedStudents = localStorage.getItem("students");
      const storedProjects = localStorage.getItem("projects")
      if (storedStudents) {
        setAllStudents(JSON.parse(storedStudents));
      }
      if(storedProjects){
        setAllProjetcs(JSON.parse(storedProjects))
      }
    }, []);
  const [selectedProject,setSelectedProject] =useState("")
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [endDate,setEndDate] = useState("")
  const [status,setStaus] = useState("In Progress")

  function handelSetTitle(e){
    setTitle(e.target.value)
  }


  const handleSelectChange = (e) => {
   
    setSelectedStudent(e.target.value);
  };

  function handleSubmit(e){
    e.preventDefault();
    const newTask = {
      project:selectedProject,
      title,
      description,
      student: selectedStudent,
      endDate,
      status
    };

    console.log(newTask)
    
    setSelectedProject("")
    setTitle("");
    setDescription("");
    setSelectedStudent("");
    setEndDate("");
    setStaus("In Progress")
  }

  const studentList =allStudent.map((student)=>{
    return <option key={student.id} value={student.id}>{student.email}</option>
  })

  const projectsList = allProjetcs.map((project)=>{
    return <option key={project.id} value={project.id}>{project.name}</option>
  })

  return (
    // الخلفية المعتمة
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      
      {/* محتوى المودال */}
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
            <label className="lableStyle"
                >Assigend Student:<br />
                <select className="inputColore w-[100%] rounded-md"
                value={selectedStudent}
                onChange={handleSelectChange} 
                >
                    {studentList}
                </select>
            </label>
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
               Add Task
            </button>
        </form>

      </div>
    </div>
  );
}
