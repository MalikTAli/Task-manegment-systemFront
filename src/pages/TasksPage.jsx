import { useEffect, useState } from "react";
import TasksHeader from "../components/TasksHeader";
import TasksContainer from "../components/TasksContainer";
import AddTaskModal from "../components/AddTaskModal";
import LoaderSpinner from "../ui/LoaderSpinner";
import { getAllTasks } from "../services/taskService";
import { useSelector } from "react-redux";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
 const token = useSelector((state)=>state.auth.token)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
         
        const fetchedTasks = await getAllTasks(token);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [showModal]);

  return (
    <div className="dark:bg-[#1e1e1e] w-full p-4">
      <TasksHeader
        onShowModal={() => {
          setShowModal(true);
        }}
      />
      {loading ? <LoaderSpinner /> : <TasksContainer tasks={tasks} />}
      {showModal && (
        <AddTaskModal
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
