import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    console.log('isAuthenticated:', isAuthenticated);
    console.log('isLoading:', isLoading);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;