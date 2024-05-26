import {useState, useEffect} from 'react';
import {useAuth0} from "@auth0/auth0-react";

export const useAuth0Consent = () => {
    const {getAccessTokenSilently} = useAuth0();
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAccessTokenSilently({
            authorizationParams: {
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: "openid email profile",
                ignoreCache: false
            }
        }).then(token => {
            setToken(token);
        }).catch(error => {
            console.error('There was an error!', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [getAccessTokenSilently]);

    return {token, loading};
}