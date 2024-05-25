import React, { useCallback, useEffect, useState } from "react";
import { Pagination, Accordion, AccordionSummary, AccordionDetails, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useAuth0Consent} from "./auth0/useAuth0Consent";

const Terms = () => {
    const {token} = useAuth0Consent();
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTerms = useCallback(async () => {
        fetch(`${process.env.REACT_APP_API_URL}/terms?page=${page}&size=20`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Terms:', data);
                setResults(data.content);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setLoading(false);
            });
    }, [page, token]);

    useEffect(() => {
        setLoading(true);
        fetchTerms().then(() => {
            console.log('Terms fetched');
        });
    }, [fetchTerms]);

    const handleOpen = (id) => () => {
        setDeleteId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        handleDelete(deleteId).then(() => {
            console.log('Delete confirmed');
            handleClose();
        });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleDelete = async (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/terms/term/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Delete:', data);
                fetchTerms().then(() => {
                    console.log('Terms fetched');
                });
            })
            .catch(error => console.error('There was an error!', error));
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {results.map((result) => (
                <CollapsiblePanel key={result.id} result={result} onDelete={handleOpen(result.id)} />
            ))}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this term?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} sx={{ mb: 4 }} />
            </Box>
        </Box>
    );
};

const TermResultItem = ({ field, item }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">{field}</Typography>
            <Typography variant="body2">{item}</Typography>
        </Box>
    );
}

const CollapsiblePanel = ({ result, onDelete }) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography variant="h6">{result.term}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mr: 2 }}>{result.domain}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TermResultItem field="Term" item={result.term} />
                    <TermResultItem field="Domain" item={result.domain} />
                    <TermResultItem field="Description" item={result.description} />
                    <TermResultItem field="Simple Explanation" item={result.simpleExplanation} />
                    <TermResultItem field="Purpose" item={result.purpose} />
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Questions</Typography>
                        {result.questions.map((question, index) => (
                            <Box key={index} sx={{ ml: 2, mb: 1 }}>
                                <Typography variant="body2">Q: {question.question}</Typography>
                                <Typography variant="body2">A: {question.answer}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Categories</Typography>
                        {result.categories.map((category, index) => (
                            <Typography key={index} variant="body2" sx={{ ml: 2 }}>{category}</Typography>
                        ))}
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Related Terms</Typography>
                        {result.relatedTerms.map((relatedTerm, index) => (
                            <Typography key={index} variant="body2" sx={{ ml: 2 }}>{relatedTerm}</Typography>
                        ))}
                    </Box>
                    {/*TODO: Add to Anki button*/}
                    {/*TODO: Refresh definition button*/}
                    <Button variant="contained" color="secondary" onClick={onDelete}>
                        Delete Term
                    </Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default Terms;