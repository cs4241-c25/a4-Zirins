import { useState } from "react";
import api from "../api/api";

export default function TaskForm() {
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/data/add", { content: task, priority, dueDate });
            setTask("");
            setPriority("Medium");
            setDueDate("");
        } catch (err) {
            console.error("Task Add Error:", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white shadow-lg rounded-lg w-80"
        >
            <input
                type="text"
                placeholder="Task Name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border p-2 w-full mb-2"
                required
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border p-2 w-full mb-2"
            >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <button className="w-full bg-green-500 text-white py-2 rounded-lg">
                Add Task
            </button>
        </form>
    );
}
