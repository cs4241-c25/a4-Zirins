import { useState } from "react";
import api from "../api/api";

export default function TaskList({ tasks, refreshTasks }) {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [editedPriority, setEditedPriority] = useState("");
    const [editedDueDate, setEditedDueDate] = useState("");

    // Enter edit mode when clicking on a task
    const handleEdit = (task) => {
        setEditingTaskId(task._id);
        setEditedContent(task.content);
        setEditedPriority(task.priority);
        setEditedDueDate(task.dueDate.split("T")[0]); // Format for input
    };

    // Save updated task
    const handleSave = async (taskId) => {
        await api.updateTask(taskId, {
            content: editedContent,
            priority: editedPriority,
            dueDate: editedDueDate
        });
        setEditingTaskId(null);
        refreshTasks();
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg mt-4">
            <h2 className="text-xl font-semibold mb-3">Your Tasks</h2>
            <ul className="space-y-3">
                {tasks.length === 0 ? (
                    <p className="text-gray-500">No tasks found.</p>
                ) : (
                    tasks.map((task) => (
                        <li
                            key={task._id}
                            className="p-4 border border-gray-300 rounded-lg flex items-center justify-between shadow-sm bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                        >
                            {/* ✅ Task Completion Circle Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering edit mode
                                    api.deleteTask(task._id).then(refreshTasks);
                                }}
                                className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-green-500 transition"
                            >
                                ✔
                            </button>

                            {/* ✅ Task Details (Click to edit) */}
                            {editingTaskId === task._id ? (
                                <div className="ml-3 flex-1 flex flex-col gap-2">
                                    <input
                                        type="text"
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                        className="border p-1 w-full rounded"
                                    />
                                    <div className="flex gap-2">
                                        <select
                                            value={editedPriority}
                                            onChange={(e) => setEditedPriority(e.target.value)}
                                            className="border p-1 rounded w-1/3"
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                        <input
                                            type="date"
                                            value={editedDueDate}
                                            onChange={(e) => setEditedDueDate(e.target.value)}
                                            className="border p-1 rounded w-2/3"
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleSave(task._id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Save
                                    </button>
                                    {/* ✅ Delete Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering edit mode
                                            api.deleteTask(task._id).then(refreshTasks);
                                        }}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                <div className="ml-3 flex-1 flex justify-between items-center" onClick={() => handleEdit(task)}>
                                    {/* ✅ Task Name & Due Date} */}
                                    <div className="flex flex-col text-left">
                                        <span className="font-semibold">{task.content}</span>
                                        <p className="text-sm text-gray-500">
                                            Due: {new Date(task.dueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {/* ✅ Urgency Level */}
                                    <p className="text-sm font-bold text-gray-700 ml-auto">
                                        {task.urgencyLevel}
                                    </p>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
