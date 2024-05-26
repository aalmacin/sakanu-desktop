import React, {useState} from 'react';
import {useFormik} from 'formik';
import './Search.css';
import Result from "./Result";
import {
    Typography,
    Box,
    TextField,
    Button,
    CircularProgress,
    Paper,
    Grid,
    Divider,
    List,
    ListItem, ListItemText, ListItemIcon, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {useAuth0} from "@auth0/auth0-react";
import {Navigate} from "react-router-dom";
import AuthButton from "./AuthButton";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const GlobalSearch = () => {
    const [termResponse, setTermResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const {isAuthenticated} = useAuth0();

    const formik = useFormik({
        initialValues: {
            domain: '', searchTerm: ''
        },
        onSubmit: async ({domain: {value: domain}, searchTerm}) => {
            setErrorMessage(null);
            try {
                setLoading(true);
                setTermResponse(null);
                if (!searchTerm) {
                    setErrorMessage("Please enter a search term");
                    setLoading(false);
                } else {
                    let searchUrl = `${process.env.REACT_APP_API_URL}/global/learn/${searchTerm}`;

                    if(domain) {
                        searchUrl += `?domain=${domain}`;
                    }
                    fetch(searchUrl)
                        .then(response => response.json())
                        .then(data => {
                            if (!data || data.status >= 400) {
                                setErrorMessage("A failure occurred. Please try again.")
                            } else if (data.detail) {
                                setErrorMessage(data.detail)
                            } else {
                                setTermResponse(data);
                            }
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('There was an error setting term response!', error);
                        }).finally(() => setLoading(false));
                }
            } catch (error) {
                console.error('There was an error!', error);
            }
        },
    });

    if (isAuthenticated) {
        return <Navigate to="/search"/>;
    }

    // Options for react-select
    return (
        <Box sx={{flexGrow: 1, width: '100%'}}>
            <Paper elevation={3} sx={{p: 4}}>
                <Typography variant="h4" align="center" gutterBottom>
                    Sumelu Search
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
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
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography variant="body2">Optional: Provide a domain, category or clue to improve
                                        results.</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2">
                                        Tip: Make domain, category or clue as specific as possible for better results.
                                        For example, instead of
                                        Biology, use Biology::Zoology::Herpetology
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        placeholder="Domain, Category or Clue"
                                        onChange={value => formik.setFieldValue('domain', value)}
                                        value={formik.values.domain}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                                {!loading ? (
                                    <Button type="submit" variant="contained" color="primary" fullWidth
                                            style={{padding: 10}}>
                                        Search
                                    </Button>
                                ) : (
                                    <CircularProgress/>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </form>
                {errorMessage && <Box mt={4}>
                    <Typography variant="h5" color="error">{errorMessage}</Typography>
                </Box>}
                {!errorMessage && termResponse && (
                    <Box mt={4}>
                        <Result termResponse={termResponse}/>
                    </Box>
                )}
                {!isAuthenticated && <Box mt={4}>
                    <Divider/>
                    <Typography variant="h5" mt={2}>Login/Register now to</Typography>
                    <Box mt={2}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText primary="Save your search history"/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Get a personal search limit.
                                No need to share with everyone."/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText primary="Anki Integration"/>
                            </ListItem>
                        </List>
                    </Box>
                    <Box mt={2} display="flex" gap={1}>
                        <AuthButton/>
                        <AuthButton text="Register"/>
                    </Box>
                </Box>}
            </Paper>
        </Box>
    );
};

export default GlobalSearch;
