import React, {useEffect, useState} from "react";
import Pagination from '@mui/material/Pagination';
import {Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import {useSakanuApi} from "./useSakanuApi";

const Terms = () => {
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const {loading, sakanuApi} = useSakanuApi();

    const fetchTerms = async () => {
        // fetch(`${process.env.REACT_APP_API_URL}/terms?page=${page}&size=10`)
        sakanuApi.getTerms(page)
            .then(data => {
                console.log('Terms:', data)
                setResults(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('There was an error!', error));
    };

    useEffect(() => {
        if(!loading) {
            fetchTerms().then(() => {
                console.log('Terms fetched');
            });
        }
    }, [sakanuApi, loading]);

    const handleOpen = (id) => () => {
        setDeleteId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        handleDelete(deleteId);
        handleClose();
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/terms/term/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Delete:', data)
                fetchTerms();
            })
            .catch(error => console.error('There was an error!', error));
    };

    if(loading) {
        return <Typography variant="h4">Loading...</Typography>;
    }

    return (
        <Box>
            <Pagination count={totalPages} page={page} onChange={handlePageChange}/>
            {results.map((result) => (
                <CollapsiblePanel key={result.id} result={result} onDelete={handleOpen(result.id)}/>
            ))}
            <Dialog
                open={open}
                onClose={handleClose}
            >
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
        </Box>
    );
};

const TermResultItem = ({field, item}) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', mb: 2}}>
            <Typography variant="h6">{field}</Typography>
            <Typography variant="body1">{item}</Typography>
        </Box>
    );
}

const CollapsiblePanel = ({result, onDelete}) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%'}}>
                    <Typography variant="h6">{result.term}</Typography>
                    <Typography variant="small"  sx={{ mr: 3 }}>{result.domain}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <TermResultItem field="Term" item={result.term}/>
                    <TermResultItem field="Domain" item={result.domain}/>
                    <TermResultItem field="Description" item={result.description}/>
                    <TermResultItem field="Simple Explanation" item={result.simpleExplanation}/>
                    <TermResultItem field="Purpose" item={result.purpose}/>
                    <Box sx={{display: 'flex', flexDirection: 'column', mb: 2}}>
                        <Typography variant="subtitle1">Questions</Typography>
                        {result.questions.map((question, index) => (
                            <Box key={index} sx={{display: 'flex', flexDirection: 'column', mb: 2}}>
                                <Typography variant="body1">Question: {question.question}</Typography>
                                <Typography variant="body1">Answer: {question.answer}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', mb: 2}}>
                        <Typography variant="subtitle1">Categories</Typography>
                        {result.categories.map((category) => (
                            <Typography key={category} variant="body1">{category}</Typography>
                        ))}
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', mb: 2}}>
                        <Typography variant="subtitle1">Related Terms</Typography>
                        {result.relatedTerms.map((relatedTerm) => (
                            <Typography key={relatedTerm} variant="body1">{relatedTerm}</Typography>
                        ))}
                    </Box>
                    {/*TODO: Add to Anki button*/}
                    {/*TODO: Refresh definition button*/}
                    <Button variant="contained" color="secondary" onClick={() => onDelete(result.id)}>
                        Delete Term
                    </Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default Terms;