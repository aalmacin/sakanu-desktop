import React, {useCallback} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from '@mui/material';

const AuthButton = ({text}) => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    const login = useCallback(() => {
        return loginWithRedirect({
            authorizationParams: {
                redirect_uri: `${window.location.origin}/search`,
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: "openid email profile",
            },
        })
    }, [loginWithRedirect]);

    return isAuthenticated ? (
        <Button variant="contained" color="secondary"
                onClick={() => logout({logoutParams: {returnTo: `${window.location.origin}`}})}>
            Log Out
        </Button>
    ) : (
        <Button variant="contained" color="primary" onClick={login}>
            {text || "Log In"}
        </Button>
    );
};

export default AuthButton;