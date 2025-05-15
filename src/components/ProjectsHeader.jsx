import { useSelector } from "react-redux";
import { useFilterAndSearch } from "../Context/FilterAndSearchContext";
export default function ProjectsHeader({onShowModal}){
    const { statusFilter, setStatusFilter } = useFilterAndSearch();
    const { searchQuery, setSearchQuery } = useFilterAndSearch();
    const user = useSelector((state)=>state.auth.user)
    return(
        <div className="mb-5">
            <h1 className="text-2xl font-bold pb-5 text-[#0b5eba]">Projetcs Overview</h1>
            <div className="flex justify-between gap-2">
                {user.role=="admin"&&<button className="bg-[#027bff] hover:bg-[#2b5889] buttonStyle" onClick={onShowModal}>Add New Project</button>}
                <input value={searchQuery} type="text" placeholder="Search projects by title or description" className="sm:w-[20%] md:w-[40%] lg:w-[60%] rounded-md p-2 bg-[#e0e0e0] dark:bg-[#ffffff]" onChange={(e)=>{
                    setSearchQuery(e.target.value)
                }}/>
                <select className="text-black rounded-md bg-[#e0e0e0] dark:bg-[#f6f6f6]" value={statusFilter} onChange={(e)=>{
                    setStatusFilter(e.target.value)
                }}>
                    <option value="all">All Statuses</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
        </div>
    )
}