import { useState, useEffect } from "react";
import api from "../api/api";

export default function Header({ onShowLogin, onShowRegister }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        async function checkAuthStatus() {
            const data = await api.checkAuth();
            setIsAuthenticated(data.status === "authenticated");
        }
        checkAuthStatus();
    }, []);

    const handleLogout = async () => {
        await api.logout();
        setIsAuthenticated(false);
    };

    return (
        <header className="flex justify-between items-center p-5 bg-gray-100 shadow-md">
            <h1 className="text-2xl font-bold text-green-600">To-Do List App</h1>

            {/* Buttons for Authentication */}
            <div>
                {!isAuthenticated ? (
                    <>
                        <button
                            onClick={onShowLogin}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            Login
                        </button>
                        <button
                            onClick={onShowRegister}
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Register
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}
