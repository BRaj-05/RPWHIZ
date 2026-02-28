import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(StoreContext);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}