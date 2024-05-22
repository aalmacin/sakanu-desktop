import {useState, useEffect} from 'react';
import {useAuth0} from "@auth0/auth0-react";

export const useAuth0Consent = () => {
    const {getAccessTokenSilently, getAccessTokenWithPopup} = useAuth0();
    const [token, setToken] = useState(null);

    useEffect(() => {
        getAccessTokenSilently({
            authorizationParams: {
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: "openid email profile",
                ignoreCache: false
            }
        }).then(token => {
            setToken(token);
        }).catch(error => {
            if (error.error === 'consent_required') {
                getAccessTokenWithPopup({
                    authorizationParams: {
                        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                        scope: "openid email profile"
                    }
                }).then(token => {
                    setToken(token);
                }).catch(error => {
                    console.error('Failed to get token from popup!', error);
                });
            }
        });
    }, [getAccessTokenSilently, getAccessTokenWithPopup]);

    return {token};
}