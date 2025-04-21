import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/context";
import Loading from "../components/Loading";


const ProtectedRoute = () => {
  const { isLogged } = useAuth()!;

  if (!isLogged) return <Loading />;

  return isLogged ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;