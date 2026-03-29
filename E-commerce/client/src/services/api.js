import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1", // ✅ your backend
  withCredentials: true,
});

// attach token (future ready)
API.interceptors.request.use((config) => {
  const admin = JSON.parse(localStorage.getItem("admin_auth"));

  if (admin?.token) {
    config.headers.Authorization = `Bearer ${admin.token}`;
  }

  return config;
});

export default API;