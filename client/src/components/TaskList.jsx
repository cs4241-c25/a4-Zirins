import { useEffect, useState } from "react";
import api from "../api/api";

export default function TaskList({ user }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    const fetchTasks = async () => {
        const tasksData = await api.getTasks();
        setTasks(tasksData);
    };

    const handleDelete = async (taskId) => {
        await api.deleteTask(taskId);
        fetchTasks(); // ✅ Refresh tasks after delete
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg mt-4">
            <h2 className="text-xl font-semibold mb-3">Your Tasks</h2>
            <ul>
                {tasks.length === 0 ? (
                    <p className="text-gray-500">No tasks found.</p>
                ) : (
                    tasks.map((task) => (
                        <li key={task._id} className="p-2 border-b flex justify-between items-center">
                            <span>{task.content} (Priority: {task.priority})</span>
                            <button
                                onClick={() => handleDelete(task._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
