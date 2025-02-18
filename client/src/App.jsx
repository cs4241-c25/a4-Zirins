import { useState, useEffect } from "react";
import Auth from "./components/Auth";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import api from "./api/api";

export default function App() {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);

    // ✅ Check authentication on load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.checkAuth();
                if (response.user) {
                    setUser(response.user);
                }
            } catch (error) {
                console.error("❌ Auth status check failed:", error);
            }
        };
        checkAuth();
    }, []);

    // ✅ Fetch tasks when user state updates
    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]); // ✅ Runs whenever `user` is updated

    // ✅ Fetch tasks from backend
    const fetchTasks = async () => {
        try {
            const fetchedTasks = await api.getTasks();
            setTasks(fetchedTasks);
        } catch (error) {
            console.error("❌ Failed to fetch tasks:", error);
            setTasks([]);
        }
    };

    // ✅ Refresh tasks after adding
    const handleTaskAdded = async () => {
        await fetchTasks();
    };

    // ✅ Logout logic
    const handleLogout = async () => {
        await api.logout();
        setUser(null);
        setTasks([]);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6 relative">
            {user && (
                <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            )}

            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
                {!user ? (
                    <Auth setUser={setUser} />
                ) : (
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-green-600 mb-6">Welcome, {user.username}!</h1>
                        <TaskForm onTaskAdded={handleTaskAdded} />
                        <TaskList tasks={tasks} refreshTasks={fetchTasks} />
                    </div>
                )}
            </div>
        </div>
    );
}
