import React from "react";
import { userLocation, Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  {
    /* Utilisateur connecté ou non */
  }
  return auth?.username ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
