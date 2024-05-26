import React, {useCallback, useEffect, useState} from 'react';
import './Search.css';
import Result from "./Result";
import AnkiDeckService from "./anki/AnkiDeckService";
import AddToAnki from "./AddToAnki";
import {useAnkiConnect} from "./useAnkiConnect";
import {Typography, Box,  CircularProgress, Paper} from '@mui/material';
import {useAuth0Consent} from "./auth0/useAuth0Consent";
import SearchVisual from "./SearchVisual";

const Search = () => {
    const [termResponse, setTermResponse] = useState(null);
    const [domains, setDomains] = useState(new Set([]));
    const {ankiConnectError, ankiModelExists} = useAnkiConnect();
    const {token, loading: consentLoading} = useAuth0Consent();
    const [errorMessage, setErrorMessage] = useState(null);


    // Function to fetch domains
    const fetchDomains = useCallback(() => {
        AnkiDeckService.getDecks().then(response => {
            console.log('Domain Response:', response)
            return response.json();
        }).then(data => {
            console.log('Domains:', data)
            setDomains(new Set([...domains, ...data.result]));
        }).catch(error => {
            console.error('There was an error!', error);
        });
    }, [domains]);

    useEffect(() => {
        if (!ankiConnectError && !ankiModelExists) {
            fetchDomains();
        }
    }, [ankiConnectError, ankiModelExists, fetchDomains]);

    useEffect(() => {
        if(!consentLoading) {
            fetch(`${process.env.REACT_APP_API_URL}/terms/domains`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    setDomains(new Set([...domains, ...data]));
                }).catch(error => {
                console.error('There was an error!', error);
            });
        }
    }, [consentLoading, token, domains]);

    if (consentLoading) {
        return <CircularProgress/>;
    }

    if (!token && !consentLoading) {
        return <Box sx={{p: 4}}><Typography variant="h4" align="center">Please accept consent to
            continue</Typography></Box>;
    }

    return (
        <Box sx={{flexGrow: 1, width: '100%'}}>
            <Paper elevation={3} sx={{p: 4}}>
                <SearchVisual url={`${process.env.REACT_APP_API_URL}/learn`}
                              token={token}
                              setTermResponse={setTermResponse}
                              setErrorMessage={setErrorMessage}
                              domains={[...domains]}
                />
                {errorMessage && <Box mt={4}>
                    <Typography variant="h5" color="error">{errorMessage}</Typography>
                </Box>}
                {!errorMessage && termResponse && (
                    <Box mt={4}>
                        <Result termResponse={termResponse}/>
                        <AddToAnki termResponse={termResponse} domain={termResponse.domain}/>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default Search;
