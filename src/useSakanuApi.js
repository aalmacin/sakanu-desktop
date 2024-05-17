import {useAuthToken} from "./useAuthToken";
import {SakanuApi} from "./SakanuApi";
import {useEffect, useState} from "react";

export const useSakanuApi = () => {
    const {token} = useAuthToken();
    const [sakanuApi, setSakanuApi] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setSakanuApi(new SakanuApi(token));
        setLoading(false);
    }, []);

    return {loading, sakanuApi};
}