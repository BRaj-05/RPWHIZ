import { Navigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useStore();

  // ⏳ Wait for auth to load
  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#020617] text-white text-sm">
        Verifying session...
      </div>
    );
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/control-center-7845/login" replace />;
  }

  // ❌ Not admin → STOP LOOP HERE
  if (user.role !== "admin") {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Access Denied (Admin Only)
      </div>
    );
  }

  // ✅ Allow access
  return children;
}