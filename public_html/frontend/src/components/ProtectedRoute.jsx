import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, getUserRole } = useAuth();
    const userRole = getUserRole();

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole?.toLowerCase())) {
        // Redirect to an unauthorized page or home
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute; 