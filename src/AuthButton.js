import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./AuthButton.css";

const AuthButton = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return isAuthenticated ? (
        <button className="auth-button" onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
        </button>
    ) : (
        <button className="auth-button" onClick={loginWithRedirect}>Log In</button>
    );
};

export default AuthButton;
