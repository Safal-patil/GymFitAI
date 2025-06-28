import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  // For demo purposes, we'll allow access without authentication
  // In a real app, you would check authentication status here
  const isAuthenticated = true; // Mock authentication

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;