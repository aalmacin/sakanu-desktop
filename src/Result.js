import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

const Result = ({ termResponse }) => {
        return (
            <Box sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                            {termResponse.searchTerm}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                            Domain: {termResponse.domain}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                            Description
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                            {termResponse.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                            Purpose
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                            {termResponse.purpose}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                            ELI5 Explanation
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                            {termResponse.simpleExplanation}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                            Questions:
                    </Typography>
                    <List>
                            {termResponse.questions.map((question, index) => (
                                <ListItem key={index}>
                                        <ListItemText
                                            primary={`Q: ${question.question}`}
                                            secondary={`A: ${question.answer}`}
                                        />
                                </ListItem>
                            ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                            Related Terms:
                    </Typography>
                    <List>
                            {termResponse.relatedTerms.map((term, index) => (
                                <ListItem key={index}>
                                        <ListItemText primary={term} />
                                </ListItem>
                            ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                            Categories:
                    </Typography>
                    <List>
                            {termResponse.categories.map((category, index) => (
                                <ListItem key={index}>
                                        <ListItemText primary={category} />
                                </ListItem>
                            ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                            Anki Cloze
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                            {termResponse.cloze}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" gutterBottom>
                            Did not get the result you need? Try to update the domain to be more specific.
                    </Typography>
            </Box>
        );
};

export default Result;
