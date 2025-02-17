const API_URL = import.meta.env.VITE_BACKEND_URL;


async function fetchTasks() {
    const response = await fetch(`${API_URL}/data`, {
        method: "GET",
        credentials: "include",
    });
    return response.json();
}

async function loginUser(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include" // Allows session cookies
    });
    return response.json();
}