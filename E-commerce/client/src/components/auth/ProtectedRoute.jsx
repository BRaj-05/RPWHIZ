import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const admin = JSON.parse(localStorage.getItem("admin_auth"));

  // ❌ Not logged in → go to admin login
  if (!admin) {
    return <Navigate to="/control-center-7845/login" replace />;
  }

  // ❌ Not admin → block
  if (admin.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children;
}