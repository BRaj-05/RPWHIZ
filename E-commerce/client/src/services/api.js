import axios from "axios";
import { auth } from "../config/firebase";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// ✅ SAFE INTERCEPTOR (NO LOOP)
API.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    // 🔥 IMPORTANT: DON'T FORCE REFRESH
    const token = await user.getIdToken(false); // ✅ FIX

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;