import { useState } from "react";
import api from "../api/api";

export default function Auth({ setUser }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [isRegistering, setIsRegistering] = useState(false);

    const handleAuth = async () => {
        try {
            const route = isRegistering ? "/auth/register" : "/auth/login";
            const res = await api.post(route, formData);
            setUser(res.data.user);
        } catch (err) {
            console.error("Auth Error:", err);
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl mb-3">{isRegistering ? "Register" : "Login"}</h2>
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="border p-2 w-full mb-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border p-2 w-full mb-2"
            />
            <button
                onClick={handleAuth}
                className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
                {isRegistering ? "Register" : "Login"}
            </button>
            <p
                className="text-blue-500 mt-2 cursor-pointer"
                onClick={() => setIsRegistering(!isRegistering)}
            >
                {isRegistering ? "Already have an account? Login" : "No account? Register"}
            </p>
        </div>
    );
}
