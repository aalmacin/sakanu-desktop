import React, {useEffect, useState} from "react";
import Pagination from '@mui/material/Pagination';
import {Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Terms = () => {
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/terms?page=${page}&size=3`)
            .then(response => response.json())
            .then(data => {
                console.log('Terms:', data)
                setResults(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('There was an error!', error));
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            {results.map((result) => (
                <CollapsiblePanel key={result.id} result={result}/>
            ))}
        </Box>
    );
};

const TermResultItem = ({field, item}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography variant="h6">{field}</Typography>
            <Typography variant="body1">{item}</Typography>
        </Box>
    );
}

const CollapsiblePanel = ({result}) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h6">{result.domain}: {result.term}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TermResultItem field="Term" item={result.term}/>
                    <TermResultItem field="Domain" item={result.domain}/>
                    <TermResultItem field="Description" item={result.description}/>
                    <TermResultItem field="Simple Explanation" item={result.simpleExplanation}/>
                    <TermResultItem field="Purpose" item={result.purpose}/>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                        <Typography variant="subtitle1">Questions</Typography>
                        {result.questions.map((question, index) => (
                            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                                <Typography variant="body1">Question: {question.question}</Typography>
                                <Typography variant="body1">Answer: {question.answer}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                        <Typography variant="subtitle1">Categories</Typography>
                        {result.categories.map((category) => (
                            <Typography key={category} variant="body1">{category}</Typography>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                        <Typography variant="subtitle1">Related Terms</Typography>
                        {result.relatedTerms.map((relatedTerm) => (
                            <Typography key={relatedTerm} variant="body1">{relatedTerm}</Typography>
                        ))}
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default Terms;