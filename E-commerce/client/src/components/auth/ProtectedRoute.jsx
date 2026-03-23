import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

/* -------------------------------------------------------
   ADMIN ROUTE GUARD
-------------------------------------------------------- */
export default function ProtectedRoute({ children }) {
  const { user } = useContext(StoreContext);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}