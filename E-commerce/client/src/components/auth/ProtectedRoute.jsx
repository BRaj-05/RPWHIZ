import { Navigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useStore();

  // Wait for Firebase to resolve auth state before deciding
  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#020617] text-white text-sm">
        Verifying session…
      </div>
    );
  }

  // Not logged in → go to admin login
  if (!user) {
    return <Navigate to="/control-center-7845/login" replace />;
  }

  // Logged in but not admin → block
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}