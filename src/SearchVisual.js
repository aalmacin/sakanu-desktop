import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Autocomplete,
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, {useState} from "react";
import {useFormik} from "formik";

const SearchVisual = ({url, setTermResponse, setErrorMessage, domains, token}) => {
    const [loading, setLoading] = useState(false);
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
                    let searchUrl = `${url}/${searchTerm}`;

                    if (domain) {
                        searchUrl += `?domain=${domain}`;
                    }
                    const headers = {headers: {}};
                    if(token) {
                        headers.headers = {
                            Authorization: `Bearer ${token}`
                        }
                    }
                    fetch(searchUrl, headers)
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
    return (
        <>
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
                                <Autocomplete
                                    options={domains}
                                    freeSolo
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            type="text"
                                            placeholder="Domain, Category or Clue"
                                            onChange={value => formik.setFieldValue('domain', value)}
                                            value={formik.values.domain}
                                        />
                                    )}
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
        </>
    )
}

export default SearchVisual;
