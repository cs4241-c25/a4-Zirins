import { useEffect, useState } from "react";
import api from "../api/api";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get("/data")
            .then((res) => setTasks(res.data))
            .catch(() => setTasks([]));
    }, []);

    return (
        <div className="mt-4 p-4 bg-white shadow-lg rounded-lg w-80">
            <h2 className="text-lg font-bold mb-2">Your Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                tasks.map((task) => (
                    <div key={task._id} className="border-b py-2">
                        <p>{task.content}</p>
                        <small className="text-gray-500">{task.priority} - {task.dueDate}</small>
                    </div>
                ))
            )}
        </div>
    );
}
