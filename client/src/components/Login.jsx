import { useState } from "react";
import api from "../api/api"; // ✅ Make sure this points to the correct path

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const data = await api.login(username, password);
        console.log("✅ Login successful: ", data);
    };

    return (
        <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
