import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Already logged in → redirect
  useEffect(() => {
    const admin = localStorage.getItem("admin_auth");
    if (admin) {
      navigate("/control-center-7845");
    }
  }, []);

  const handleLogin = () => {
    setError("");

    // simple delay (feels real)
    setTimeout(() => {
      if (email === "admin@shopora.com" && password === "admin123") {
        localStorage.setItem(
          "admin_auth",
          JSON.stringify({ role: "admin", email })
        );

        navigate("/control-center-7845");
      } else {
        setError("Invalid admin credentials ❌");
      }
    }, 400);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#020617]">

      <div className="bg-white/5 p-6 rounded-xl w-[350px] border border-white/10">

        <h2 className="text-lg font-semibold mb-4 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2 bg-white/5 rounded outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 bg-white/5 rounded outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-500 py-2 rounded hover:bg-red-600 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}