import {getNameFromEmail} from "../utilites/getNameFromEmail"
export default function TaskCard({task}){
    return(
        <div className="m-2 p-2 rounded-md border-[#f6f6f6] dark:border-[#1c4c46] border-[2px] flex flex-col gap-2">
            <p><strong>TaskID:</strong>{task.id}</p>
            <p><strong className="pr-1">Task Name:</strong> {task.name} </p>
            <p><strong className="pr-1">Description:</strong>{task.description}</p>
            <p><strong className="pr-1">Assigent Student:</strong>{getNameFromEmail(task.assignedTo.email)}</p>
            <p><strong className="pr-1">Status:</strong>{task.status}</p>
        </div>
    )
}