const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Uses environment variable

export const loginUser = async (username, password) => {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    return response.json();
};

export const getTasks = async () => {
    const response = await fetch(`${BACKEND_URL}/data`, {
        credentials: "include",
    });

    return response.json();
};
