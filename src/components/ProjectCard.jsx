import {getNameFromEmail} from "../utilites/getNameFromEmail"
export default function ProjectCard({id,title,description,students,category,progress,startDate,endDate,onClick}){
    return(
        <div  className="textcolre border-[#616161] border-[2px] rounded-md dark:bg-[#333333] bg-[#e0e0e0] px-3 flex flex-col gap-3 " onClick={onClick}>
            <h1 className="font-bold text-3xl text-[#1d538e]">{title}</h1>
            <h2><span className="font-bold">Description:</span> {description}</h2>
            <h2> <span className="font-bold">Students:</span>{students.map(student => getNameFromEmail(student.email)).join(", ")}</h2>
            <h2><span className="font-bold">Category:</span>{category}</h2>

            <div className="w-full h-6 bg-gray-300 rounded-md overflow-hidden text-white relative">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                 {progress}%
              </span>
            </div>

            <div className="flex justify-between">
                <h3> {startDate}</h3>
                <h3> {endDate}</h3>
            </div>
        </div>
    )
}