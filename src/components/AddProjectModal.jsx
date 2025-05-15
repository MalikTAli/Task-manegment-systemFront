import { useEffect, useState } from "react";
import Input from "./Input";
import LoaderSpinner from "../ui/LoaderSpinner";
import { getAllStudents } from "../services/studentService";
import { createProject } from "../services/projectService";
import {getNameFromEmail} from "../utilites/getNameFromEmail"    

export default function AddProjectModal({ onClose, token }) {
  const [allStudent, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [category, setCategory] = useState("AI");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStaus] = useState("In Progress");

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const students = await getAllStudents(token);
        setAllStudents(students);
      } catch (error) {
        console.error("Failed to load students:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, [token]);

  function handelSetTitle(e){
    setTitle(e.target.value)
  }
  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedStudents(selectedOptions);
  };

 async function handleSubmit(e) {
  e.preventDefault();
  setSubmitting(true);
  const projectInput = {
    name: title,
    description,
    category,
    users: selectedStudents,
    startDate,
    endDate,
    status,
  };

  try {
    const result = await createProject(projectInput, token);
    console.log("Project created:", result);
    onClose();
  } catch (error) {
    console.error("Failed to create project:", error);
  }finally{
    setSubmitting(false)
    setTitle("");
    setDescription("");
    setCategory("AI");
    setSelectedStudents([]);
    setStartDate("");
    setEndDate("");
    setStaus("In Progress");
  }

 
}

  const studentList = allStudent.map((student) => (
    <option key={student.id} value={student.id}>
      {getNameFromEmail(student.email)}
    </option>
  ));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="textcolre w-[50%] bg-[#f8f8f8] dark:bg-[#1e1e1e] p-10 borderStyle min-h-[400px] rounded-lg shadow-lg relative">
        <div className="modalHeader flex justify-between items-center">
          <h1 className="font-bold text-3xl text-[#0570e5]">Add New Project</h1>
          <span
            className="text-xl cursor-pointer font-bold text-gray-400"
            onClick={onClose}
          >
            ×
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <LoaderSpinner size={40} color="#0570e5" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="lableStyle">
              Project Title:
              <Input onChange={handelSetTitle} Value={title} type="text" />
            </label>
            <label className="lableStyle">
              Project Description:
              <textarea
                className="inputColore w-[100%] rounded-md h-[100px]"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </label>
            <label className="lableStyle">
              Student List:<br />
              <select
                className="inputColore w-[100%] rounded-md"
                multiple
                value={selectedStudents}
                onChange={handleSelectChange}
              >
                {studentList}
              </select>
            </label>
            <label className="lableStyle">
              Project Category:<br />
              <select
                className="inputColore w-[100%] rounded-md"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="AI">AI</option>
                <option value="Web development">Web development</option>
                <option value="Mobile application">Mobile application</option>
                <option value="Data science">Data science</option>
                <option value="Networking">Networking</option>
              </select>
            </label>
            <label className="lableStyle">
              Starting Date:<br />
              <Input
                type="date"
                Value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </label>
            <label className="lableStyle">
              Ending Date:<br />
              <Input
                type="date"
                Value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </label>
            <label className="lableStyle">
              Project Status:<br />
              <select
                className="inputColore w-[100%] rounded-md"
                value={status}
                onChange={(e) => {
                  setStaus(e.target.value);
                }}
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="On Hold">On Hold</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </label>
            <button
              type="submit"
              disabled={
                !title ||
                !description ||
                !category ||
                selectedStudents.length === 0 ||
                !startDate ||
                !endDate ||
                !status
              }
              className={`px-4 py-2 rounded ${
                !title ||
                !description ||
                !category ||
                selectedStudents.length === 0 ||
                !startDate ||
                !endDate
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4caf50] hover:bg-[#3c923f] text-white"
              }`}
            >
               {submitting ? (
                <>
                  <LoaderSpinner size={20} color="#fff" />
                      <span>Submitting...</span>
                </>
               ) : (
                "Create Project"
               )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
