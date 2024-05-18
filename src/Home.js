// Home.js
import React from 'react';
import {Link} from "react-router-dom";
import {Button, Typography, Box, Container, List, ListItem, ListItemText} from "@mui/material";

const Home = () => {
    return (
        <Container maxWidth="lg"
                   sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                   mt={8}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    p: 4,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Sakanu
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Your Ultimate Study Companion
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to <span style={{fontWeight: 'bold', color: '#1976d2'}}>Sakanu</span>, the web app designed
                    to make your learning experience smooth and effective. Whether you're a student, a professional, or
                    a lifelong learner, Sakanu is here to assist you with your studies.
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'center'}} mb={4}>
                    <Button variant="contained" color="primary" component={Link} to="/search"
                            style={{marginTop: '20px'}}>Click here to search for a term</Button>
                </Box>
                <Typography variant="body1" gutterBottom>
                    With Sakanu, you can:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Get Detailed Descriptions"
                                      secondary="Receive comprehensive explanations of any term or concept you need to understand."/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Explain Like I'm Five"
                                      secondary="Sometimes, simplicity is key. Get easy-to-understand explanations that break down complex ideas."/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Understand the Purpose"
                                      secondary="Learn the significance and application of various concepts."/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Explore Categories"
                                      secondary="Discover related topics and delve deeper into subjects of interest."/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="FAQ"
                                      secondary="Have questions? Find quick answers to common inquiries about your study topics."/>
                    </ListItem>
                </List>
                <Typography variant="body1" gutterBottom>
                    All you need to do is enter a term or concept, and Sakanu will provide you with all the information
                    you need to boost your knowledge. Plus, if you’re an Anki user, you can seamlessly add any card to
                    your Anki deck for future review.
                </Typography>
                <Typography variant="body1">
                    Start exploring and make your learning journey enjoyable and productive with Sakanu!
                </Typography>
            </Box>
        </Container>
    );
};

export default Home;