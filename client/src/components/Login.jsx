import { useState } from "react";
import api from "../api/api"; // ✅ Ensure correct import path

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const data = await api.login(username, password);
        console.log("✅ Login successful: ", data);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <input
                type="text"
                placeholder="Username"
                className="border p-2 m-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 m-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-2 m-2 rounded"
                onClick={handleLogin}>
                Login
            </button>

            <p className="mt-4">Or login with:</p>

            {/* GitHub Login Button */}
            <a
                href={`${import.meta.env.VITE_BACKEND_URL}/auth/github`}
                className="bg-gray-900 text-white p-2 mt-2 rounded inline-block">
                Login with GitHub
            </a>
        </div>
    );
}

export default Login;
