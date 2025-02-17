// src/App.jsx
import { useState, useEffect } from "react";
import api from "./api/api";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.checkAuth().then((data) => {
            if (data.status === "authenticated") {
                setUser(data.user);
                fetchTasks();
            }
        });
    }, []);

    const fetchTasks = async () => {
        const data = await api.getTasks();
        setTasks(data);
    };

    const handleLogout = async () => {
        await api.logout();
        setUser(null);
        setTasks([]);
    };

    return (
        <div className="container mx-auto p-4">
            {!user ? (
                <Login setUser={setUser} fetchTasks={fetchTasks} />
            ) : (
                <div>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                    <TaskForm fetchTasks={fetchTasks} />
                    <TaskList tasks={tasks} fetchTasks={fetchTasks} />
                </div>
            )}
        </div>
    );
}

// src/components/Login.jsx
import { useState } from "react";
import api from "../api/api";

export default function Login({ setUser, fetchTasks }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const data = await api.login(username, password);
        if (data.user) {
            setUser(data.user);
            fetchTasks();
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <input type="text" placeholder="Username" className="border p-2 m-2" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className="border p-2 m-2" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-blue-500 text-white p-2 m-2" onClick={handleLogin}>Login</button>
        </div>
    );
}

// src/components/TaskForm.jsx
export default function TaskForm({ fetchTasks }) {
    const [content, setContent] = useState("");
    const [priority, setPriority] = useState("Low");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.addTask(content, priority, dueDate);
        fetchTasks();
        setContent("");
        setPriority("Low");
        setDueDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Task Content" className="border p-2 w-full" value={content} onChange={(e) => setContent(e.target.value)} />
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 w-full">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <input type="date" className="border p-2 w-full" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Task</button>
        </form>
    );
}

// src/components/TaskList.jsx
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, fetchTasks }) {
    return (
        <div className="mt-4">
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
            ))}
        </div>
    );
}

// src/components/TaskItem.jsx
export default function TaskItem({ task, fetchTasks }) {
    const handleDelete = async () => {
        await api.deleteTask(task._id);
        fetchTasks();
    };

    return (
        <div className="border p-2 mb-2 flex justify-between items-center">
            <span>{task.content} - {task.priority} - {new Date(task.dueDate).toLocaleDateString()}</span>
            <button onClick={handleDelete} className="bg-red-500 text-white p-1 rounded">Delete</button>
        </div>
    );
}
