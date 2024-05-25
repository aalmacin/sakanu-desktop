import React from 'react';
import {Link} from "react-router-dom";
import {Button, Typography, Box, List, ListItem, ListItemText, Paper} from "@mui/material";

const Home = () => {
    return (
        <Paper elevation={3} sx={{textAlign: 'center', width: '100%'}}>
            <Box py={2} px={3}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Sumelu
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Your Ultimate Study Companion
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to <span style={{fontWeight: 'bold', color: '#1976d2'}}>Sumelu</span>, the web app designed
                    to make your learning experience smooth and effective. Whether you're a student, a professional, or
                    a lifelong learner, Sumelu is here to assist you with your studies.
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/search"
                        sx={{mt: 2}}
                    >
                        Click here to search for a term
                    </Button>
                </Box>
                <Typography variant="body1" gutterBottom>
                    With Sumelu, you can:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Get Detailed Descriptions"
                            secondary="Receive comprehensive explanations of any term or concept you need to understand."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Explain Like I'm Five"
                            secondary="Sometimes, simplicity is key. Get easy-to-understand explanations that break down complex ideas."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Understand the Purpose"
                            secondary="Learn the significance and application of various concepts."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Explore Categories"
                            secondary="Discover related topics and delve deeper into subjects of interest."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="FAQ"
                            secondary="Have questions? Find quick answers to common inquiries about your study topics."
                        />
                    </ListItem>
                </List>
                <Typography textAlign="left" variant="body1" gutterBottom>
                    All you need to do is enter a term or concept, and Sumelu will provide you with all the information
                    you need to boost your knowledge. Plus, if you’re an Anki user, you can seamlessly add any card to
                    your Anki deck for future review.
                </Typography>
                <Typography variant="h6" mt={3}>
                    Start exploring and make your learning journey enjoyable and productive with Sumelu!
                </Typography>
            </Box>
        </Paper>
    );
};

export default Home;