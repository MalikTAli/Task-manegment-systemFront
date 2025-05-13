export default function ProjectsHeader(){
    return(
        <div>
            <h1 className="text-2xl font-bold pb-5 text-[#0b5eba]">Projetcs Overview</h1>
            <div className="flex justify-between">
                <button className="bg-[#027bff] buttonStyle">Add New Project</button>
                <input type="text" placeholder="Search projects by title or description" className="w-[60%] rounded-md p-2 bg-[#e0e0e0] dark:bg-[#ffffff]" />
                <select className="text-black rounded-md bg-[#e0e0e0] dark:bg-[#f6f6f6]">
                    <option>All Statuses</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>On Hold</option>
                    <option>Cancelled</option>
                </select>
            </div>
        </div>
    )
}