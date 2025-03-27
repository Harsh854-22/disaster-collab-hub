
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '@/middleware/auth';

interface AuthGuardProps {
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ requireAuth = true }) => {
  const location = useLocation();
  
  // If authentication is required but user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If user is already authenticated and tries to access login page, redirect to home
  if (!requireAuth && isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

export default AuthGuard;
