import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (!allowedRoles.includes(decoded.role)) {
      // Redirect to a generic dashboard or not authorized page
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  } catch (err) {
    // Invalid token
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
