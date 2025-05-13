export default function TaskCard(){
    return(
        <div className="m-2 p-2 rounded-md border-[#f6f6f6] dark:border-[#1c4c46] border-[2px] flex flex-col gap-2">
            <p><strong>TaskID:</strong>1</p>
            <p><strong className="pr-1">Task Name:</strong> this is the task name </p>
            <p><strong className="pr-1">Students:</strong> Student1,Student2, Student3</p>
            <p><strong className="pr-1">Description:</strong>task description</p>
            <p><strong className="pr-1">Assigent Student:</strong>malik</p>
            <p><strong className="pr-1">Status:</strong>pending</p>
        </div>
    )
}