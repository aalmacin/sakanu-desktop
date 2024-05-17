import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";

export const useAuthToken = () => {
    const {getAccessTokenSilently, getAccessTokenWithPopup} = useAuth0();
    const [token, setToken] = useState(null);

    const fetchToken = async () => {
        try {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                    scope: "openid email profile",
                    ignoreCache: false
                }
            });
            setToken(token);
        } catch (error) {
            if (error.error === 'consent_required') {
                const token = await getAccessTokenWithPopup({
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                    scope: "openid email profile"
                });
                setToken(token);
            } else {
                throw error;
            }
        }
    };

    useEffect(() => {
        fetchToken().then(() => {
            console.log('Token fetched');
        });
    }, []);

    return {token};
};