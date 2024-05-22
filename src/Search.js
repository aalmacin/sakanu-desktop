import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import './Search.css';
import Result from "./Result";
import CreatableSelect from "react-select/creatable";
import AnkiDeckService from "./anki/AnkiDeckService";
import AddToAnki from "./AddToAnki";
import {useAnkiConnect} from "./useAnkiConnect";
import {Typography, Box, TextField, Button, CircularProgress, Paper, Grid} from '@mui/material';
import {useAuth0Consent} from "./auth0/useAuth0Consent";

const Search = () => {
    const [termResponse, setTermResponse] = useState(null);
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(false);
    const {ankiConnectError, ankiModelExists} = useAnkiConnect();
    const {token} = useAuth0Consent();


    // Function to fetch domains
    const fetchDomains = () => {
        AnkiDeckService.getDecks().then(response => {
            console.log('Domain Response:', response)
            return response.json();
        }).then(data => {
            console.log('Domains:', data)
            setDomains(data.result);
        }).catch(error => {
            console.error('There was an error!', error);
        });
    };

    useEffect(() => {
        if (!ankiConnectError && !ankiModelExists) {
            fetchDomains();
        }
    }, [ankiConnectError, ankiModelExists]);

    const formik = useFormik({
        initialValues: {
            domain: '', searchTerm: ''
        },
        onSubmit: async ({domain: {value: domain}, searchTerm}) => {
            try {
                setLoading(true);
                setTermResponse(null);
                fetch(`${process.env.REACT_APP_API_URL}/learn/${domain}/${searchTerm}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setTermResponse(data);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('There was an error setting term response!', error);
                    }).finally(() => setLoading(false));
            } catch (error) {
                console.error('There was an error!', error);
            }
        },
    });

    // Options for react-select
    const domainOptions = domains.map(domain => ({label: domain, value: domain}));

    if (!token) {
        return <Box sx={{p: 4}}><Typography variant="h4" align="center">Please accept consent to
            continue</Typography></Box>;
    }

    return (
        <Box sx={{flexGrow: 1, width: '100%'}}>
            <Paper elevation={3} sx={{p: 4}}>
                <Typography variant="h4" align="center" gutterBottom>
                    Search
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <CreatableSelect
                                options={domainOptions}
                                onChange={value => formik.setFieldValue('domain', value)}
                                placeholder="Select or create a domain"
                                isClearable
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="text"
                                name="searchTerm"
                                onChange={formik.handleChange}
                                value={formik.values.searchTerm}
                                placeholder="Enter search term"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Tip: Make domain as specific as possible for better results. For example, instead of
                                Biology, use Biology::Zoology::Herpetology
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                                {!loading ? (
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Submit
                                    </Button>
                                ) : (
                                    <CircularProgress/>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </form>
                {termResponse && (
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
