import { getNameFromEmail } from "../utilites/getNameFromEmail";

export default function TasksContainer({ tasks }) {
    console.log(tasks)
  return (
    <div className="shadow-custom rounded-md bg-[#1e1e1e]">
      <table className="min-w-full border border-gray-200 dark:bg-[#1e1e1e] bg-[#e0e0e0] rounded-lg shadow-md overflow-hidden">
        <thead className="textcolre">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Task ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Task Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Description</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Assigned Student</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Due Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-6 py-4">{task.id}</td>
              <td className="px-6 py-4">{task.name}</td>
              <td className="px-6 py-4">{task.description}</td>
              <td className="px-6 py-4">
                {getNameFromEmail(task.assignedTo?.email)}
              </td>
              <td className="px-6 py-4">{task.status}</td>
              <td className="px-6 py-4">{task.dueDate || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
