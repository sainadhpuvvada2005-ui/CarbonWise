import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) {
    return <main className="grid min-h-screen place-items-center text-forest-700">Loading CarbonWise...</main>;
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
