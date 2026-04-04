import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";
import API from "../../../services/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Already logged in → redirect
  useEffect(() => {
    const admin = localStorage.getItem("admin_auth");
    if (admin) navigate("/control-center-7845");
  }, []);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // 1. Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // 2. Exchange Firebase token for MongoDB user (token is attached by api.js interceptor)
      const { data } = await API.post("/auth/login");
      const mongoUser = data?.data?.user;

      if (!mongoUser || mongoUser.role !== "admin") {
        await signOut(auth);
        setError("Access denied. Admin account required.");
        setLoading(false);
        return;
      }

      // 3. Store admin info (token is managed by Firebase; re-fetched on each API call)
      localStorage.setItem(
        "admin_auth",
        JSON.stringify({ role: "admin", email: mongoUser.email })
      );

      navigate("/control-center-7845");
    } catch (err) {
      const code = err.code;
      if (
        code === "auth/wrong-password" ||
        code === "auth/user-not-found" ||
        code === "auth/invalid-credential"
      ) {
        setError("Invalid email or password ❌");
      } else if (code === "auth/invalid-email") {
        setError("Invalid email address ❌");
      } else {
        setError("Login failed. Please try again ❌");
      }
    } finally {
      setLoading(false);
    }
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
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="w-full mb-4 px-3 py-2 bg-white/5 rounded outline-none"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-red-500 py-2 rounded hover:bg-red-600 transition disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Login"}
        </button>

      </div>
    </div>
  );
}