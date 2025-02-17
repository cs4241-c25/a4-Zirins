import { useState, useEffect } from "react";
import Auth from "./components/Auth";
import api from "./api/api";

export default function App() {
    const [user, setUser] = useState(null);

    // Check if user is already logged in on page load
    useEffect(() => {
        const fetchUser = async () => {
            const response = await api.checkAuth();
            if (response.user) {
                setUser(response.user);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {!user ? (
                <Auth setUser={setUser} />
            ) : (
                <div>
                    <h1>Welcome, {user.username}!</h1>
                    <button onClick={() => api.logout().then(() => setUser(null))} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
