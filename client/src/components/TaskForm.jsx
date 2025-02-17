import { useState } from "react";
import api from "../api/api";

export default function TaskForm({ onTaskAdded }) {
    const [taskContent, setTaskContent] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskContent || !dueDate) return;

        setLoading(true);
        try {
            await api.addTask({ content: taskContent, priority, dueDate });
            onTaskAdded(); // ✅ Refresh parent state instead of updating local state
            setTaskContent("");
            setPriority("Medium");
            setDueDate("");
        } catch (error) {
            console.error("❌ Error adding task:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 rounded shadow">
            <input
                type="text"
                placeholder="Task name"
                value={taskContent}
                onChange={(e) => setTaskContent(e.target.value)}
                className="border p-2 w-full rounded mb-2"
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 w-full rounded mb-2">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border p-2 w-full rounded mb-2"
            />
            <button
                type="submit"
                className={`w-full bg-green-500 text-white p-2 rounded ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600 transition"
                }`}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Task"}
            </button>
        </form>
    );
}
