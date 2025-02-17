const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Backend URL

const api = {
    // 🔹 Login User
    login: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Allows session cookies
            body: JSON.stringify({ username, password }),
        });
        return response.json();
    },

    // 🔹 Register User
    register: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        return response.json();
    },

    // 🔹 Logout User
    logout: async () => {
        await fetch(`${API_BASE_URL}/auth/logout`, { method: "GET", credentials: "include" });
    },

    // 🔹 Check Auth Status
    checkAuth: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/status`, { credentials: "include" });
        return response.json();
    },

    // 🔹 Fetch Tasks
    getTasks: async () => {
        const response = await fetch(`${API_BASE_URL}/data`, { credentials: "include" });
        return response.json();
    },

    // 🔹 Add Task
    addTask: async (task) => {
        const response = await fetch(`${API_BASE_URL}/data/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
            credentials: "include",
        });
        return response.json();
    },

    // 🔹 Update Task
    updateTask: async (taskId, updatedTask) => {
        const response = await fetch(`${API_BASE_URL}/data/update/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
            credentials: "include",
        });
        return response.json();
    },

    // 🔹 Delete Task
    deleteTask: async (taskId) => {
        await fetch(`${API_BASE_URL}/data/delete/${taskId}`, {
            method: "DELETE",
            credentials: "include",
        });
    },

    loginWithGithub: () => {
        window.location.href = `${API_BASE_URL}/auth/github`;
    },
};

export default api;

