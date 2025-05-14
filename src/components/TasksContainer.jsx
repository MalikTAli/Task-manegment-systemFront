export default function TasksContainer(){
    return(
        <div className="shadow-custom rounded-md bg-[#1e1e1e]">
                <table className="min-w-full border border-gray-200 dark:bg-[#1e1e1e] bg-[#e0e0e0]  rounded-lg shadow-md overflow-hidden">
                    <thead className="textcolre">
                        <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Task ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Project</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Task Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Description</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Assigned Student</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Due Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4">001</td>
                        <td className="px-6 py-4">Web App</td>
                        <td className="px-6 py-4">Login Feature</td>
                        <td className="px-6 py-4">Build login UI & logic</td>
                        <td className="px-6 py-4">ahmad@gmail.com</td>
                        <td className="px-6 py-4">In Progress</td>
                        <td className="px-6 py-4">2025-05-20</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    )
}