export default function TasksHeader({onShowModal}){
    return(
        <div className="flex justify-between w-[100%] mb-5">
            <label className="textcolre font-bold text-2xl">
                Sorted By:
                <select className="inputColore borderStyle">
                    <option value="status">Task Status</option>
                    <option value="project">Project</option>
                    <option value="date">Due Date</option>
                    <option value="student">Assigend Student</option>
                </select>
            </label>
            <button className="bg-[#027bff] hover:bg-[#2b5889] buttonStyle" onClick={onShowModal}>Create a New Task</button>
        </div>
    )
}