// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getRole } from "../services/authService";

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getRole();
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // redirect unauthorized users
  }

  return children;
};

export default ProtectedRoute;
