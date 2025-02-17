import { useState } from "react";
import api from "../api/api";

export default function Auth({ setUser }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAuth = async () => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const response = isRegistering
                ? await api.register(formData.username, formData.password)
                : await api.login(formData.username, formData.password);

            if (response.user) {
                setUser(response.user); // Set authenticated user in state
                console.log("✅ User Logged In!");
            } else {
                setErrorMessage("Invalid credentials or registration issue.");
            }
        } catch (err) {
            setErrorMessage("An error occurred. Please try again.");
            console.error("Auth Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
            <h2 className="text-2xl mb-3">{isRegistering ? "Register" : "Login"}</h2>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="border p-2 w-full mb-2"
                disabled={loading}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border p-2 w-full mb-2"
                disabled={loading}
            />

            <button
                onClick={handleAuth}
                className={`w-full py-2 rounded-lg ${
                    isRegistering ? "bg-blue-500" : "bg-green-500"
                } text-white ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 transition"}`}
                disabled={loading}
            >
                {loading ? "Processing..." : isRegistering ? "Register" : "Login"}
            </button>

            <p
                className="text-blue-500 mt-2 cursor-pointer"
                onClick={() => setIsRegistering(!isRegistering)}
            >
                {isRegistering ? "Already have an account? Login" : "No account? Register"}
            </p>

            <p className="mt-4">Or login with:</p>
            <button
                onClick={api.loginWithGithub}
                className="bg-gray-900 text-white px-4 py-2 mt-2 rounded-lg flex items-center gap-2"
                disabled={loading}
            >
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.82-.262.82-.583 0-.29-.01-1.06-.015-2.08-3.338.724-4.043-1.61-4.043-1.61-.547-1.388-1.335-1.757-1.335-1.757-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.24 1.84 1.24 1.07 1.835 2.805 1.305 3.49.997.107-.777.42-1.305.76-1.605-2.666-.3-5.467-1.332-5.467-5.93 0-1.31.465-2.385 1.24-3.23-.125-.303-.54-1.527.115-3.18 0 0 1.01-.323 3.3 1.23a11.526 11.526 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.29-1.553 3.3-1.23 3.3-1.23.655 1.653.24 2.877.115 3.18.775.845 1.24 1.92 1.24 3.23 0 4.61-2.805 5.63-5.475 5.93.43.37.81 1.1.81 2.22 0 1.605-.015 2.89-.015 3.29 0 .323.22.697.825.58C20.565 21.795 24 17.297 24 12c0-6.627-5.373-12-12-12z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                Login with GitHub
            </button>
        </div>
    );
}
