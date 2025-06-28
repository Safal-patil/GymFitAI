import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  // Bypass authentication - always allow access for development
  const isAuthenticated = true;

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;