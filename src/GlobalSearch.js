import React, {useEffect, useState} from 'react';
import './Search.css';
import Result from "./Result";
import {
    Typography,
    Box,
    Paper,
    Divider,
    List,
    ListItem, ListItemText, ListItemIcon
} from '@mui/material';
import {useAuth0} from "@auth0/auth0-react";
import {Navigate} from "react-router-dom";
import AuthButton from "./AuthButton";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SearchVisual from "./SearchVisual";

const GlobalSearch = () => {
    const [termResponse, setTermResponse] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const {isAuthenticated} = useAuth0();
    const [domains, setDomains] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/global/domains`)
            .then(response => response.json())
            .then(data => {
                setDomains(data);
            }).catch(error => {
            console.error('There was an error!', error);
        });
    }, []);

    if (isAuthenticated) {
        return <Navigate to="/search"/>;
    }

    // Options for react-select
    return (
        <Box sx={{flexGrow: 1, width: '100%'}}>
            <Paper elevation={3} sx={{p: 4}}>
                <SearchVisual url={`${process.env.REACT_APP_API_URL}/global/learn`}
                              setTermResponse={setTermResponse}
                              setErrorMessage={setErrorMessage}
                              domains={domains}
                />
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
