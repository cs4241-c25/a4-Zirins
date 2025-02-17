import { useState, useEffect } from "react";
import Header from "../components/Header";



const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";


// API request helper functions
const api = {

    get: async (url) => {
        const response = await fetch (`${API_BASE_URL}${url}`, { credentials: "include" });
        return response.json();
    },

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

    logout: async () => {
        await fetch
    }
    loginWithGithub: () => {
        window.location.href = `${API_BASE_URL}/auth/github`;
    },

    checkAuth: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/status`, { credentials: "include" });
        return response.json();
    }


};

export default api;
