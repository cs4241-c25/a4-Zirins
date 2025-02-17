import { useState } from "react";
import api from "../api/api";

export default function TaskForm({ onTaskAdded }) {
    const [task, setTask] = useState({ content: "", priority: "Medium", dueDate: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = await api.addTask(task);
        onTaskAdded(newTask); // ✅ Trigger re-fetching of tasks
        setTask({ content: "", priority: "Medium", dueDate: "" }); // ✅ Reset form
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Add a New Task</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Task description"
                    value={task.content}
                    onChange={(e) => setTask({ ...task, content: e.target.value })}
                    className="border p-2 rounded"
                    required
                />
                <select
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    className="border p-2 rounded"
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <input
                    type="date"
                    value={task.dueDate}
                    onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                    className="border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-green-500 text-white py-2 rounded-lg">
                    Add Task
                </button>
            </form>
        </div>
    );
}
