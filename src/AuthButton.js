import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@mui/material';

const AuthButton = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return isAuthenticated ? (
        <Button variant="contained" color="secondary" onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
        </Button>
    ) : (
        <Button variant="contained" color="primary" onClick={loginWithRedirect}>
            Log In
        </Button>
    );
};

export default AuthButton;