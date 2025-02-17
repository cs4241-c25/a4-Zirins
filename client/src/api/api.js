const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// API request helper functions
const api = {
    login: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Ensures session cookies are sent
            body: JSON.stringify({ username, password }),
        });
        return response.json();
    },

    register: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        return response.json();
    },

    checkAuth: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/status`, {
            credentials: "include",
        });
        return response.json();
    },
};

export default api;
