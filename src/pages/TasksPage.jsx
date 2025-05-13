import { useState } from "react";
import TasksHeader from "../components/TasksHeader";
import TasksContainer from "../components/TasksContainer";
import AddTaskModal from "../components/AddTaskModal";

export default function TasksPage(){
    const [showModal,setShowModal] = useState(false)
    return(
        <div className="dark:bg-[#1e1e1e] w-full p-4">
            <TasksHeader onShowModal={()=>{
                setShowModal(true)
            }} />
            <TasksContainer />
            {showModal&& <AddTaskModal onClose={()=>{
                setShowModal(false)
            }} />}
        </div>
    )
}