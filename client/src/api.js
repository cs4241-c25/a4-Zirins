const API_URL = import.meta.env.VITE_BACKEND_URL;


async function fetchTasks() {
    const response = await fetch(`${API_URL}/data`, {
        method: "GET",
        credentials: "include",
    });
    return response.json();
}
