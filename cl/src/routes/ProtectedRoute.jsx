// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth(); // Get user from context

    // Check if the user is authenticated and has the required role
    const isAuthenticated = !!user; // Check if user is logged in
    const hasRequiredRole = allowedRoles.includes(user?.role); // Check if user has the required role

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!hasRequiredRole) {
        return <Navigate to="/" replace />; // Redirect to home or another page if unauthorized
    }

    return children; // Render children if authenticated and authorized
};

export default ProtectedRoute;
