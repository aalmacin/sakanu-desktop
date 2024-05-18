import React from 'react';
import AuthButton from './AuthButton'; // Ensure the path is correct
import {Box, Typography, Grid, Paper, Divider} from '@mui/material';

const Login = () => {
    return (
        <Box sx={{flexGrow: 1, m: 2, p: 4}}>
            <Typography variant="h4" gutterBottom align="center">Welcome to Sakanu</Typography>
            <Typography variant="h6" gutterBottom align="center" sx={{mb: 4}}>
                Transform Your Learning Journey with Sakanu Search Engine
            </Typography>
            <Grid container justifyContent="center" sx={{mb: 4}}>
                <Grid item>
                    <Typography variant="h5" align="center" sx={{mb: 2}}>
                        Login to search now
                    </Typography>
                    <Box display="flex" justifyContent="center">
                        <AuthButton/>
                    </Box>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{mb: 4}}>
                <Divider sx={{width: '100%', mb: 2}}/>
                <Grid item>
                    <Typography variant="h4" align="center" gutterBottom>
                        What is Sakanu?
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={4} sx={{p: 3}}>
                        <Typography variant="h5" gutterBottom>Personalized Learning Experience</Typography>
                        <Typography variant="body1" sx={{mb: 2}}>
                            Discover the power of AI with Sakanu. Our advanced search engine provides comprehensive
                            descriptions, simplified explanations, and categorized content tailored just for you. You
                            also have the option to send your flashcards to Anki for efficient review sessions.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src="/ai-power.webp" alt="AI-powered search engine"
                         style={{width: '100%', height: 'auto', borderRadius: '8px'}}/>
                </Grid>
            </Grid>
            <Grid container spacing={4} sx={{mt: 4}}>
                <Grid item xs={12} md={6} order={{xs: 2, md: 1}}>
                    <img src="/anki-review.webp" alt="Anki connection"
                         style={{width: '100%', height: 'auto', borderRadius: '8px'}}/>
                </Grid>
                <Grid item xs={12} md={6} order={{xs: 1, md: 2}}>
                    <Paper elevation={4} sx={{p: 3}}>
                        <Typography variant="h5" gutterBottom>Seamless Anki Integration</Typography>
                        <Typography variant="body1" sx={{mb: 2}}>
                            Enhance your review sessions with Sakanu. Our seamless integration with Anki allows you to
                            optionally send decks and cards, helping you retain information better and learn smarter.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={4} sx={{mt: 4}}>
                <Grid item xs={12} md={6}>
                    <img src="/explain-like-five.webp" alt="Explain Like I'm Five"
                         style={{width: '100%', height: 'auto', borderRadius: '8px'}}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={4} sx={{p: 3}}>
                        <Typography variant="h5" gutterBottom>Explain Like I'm Five</Typography>
                        <Typography variant="body1" sx={{mb: 2}}>
                            Sometimes, simplicity is key. Sakanu breaks down complex ideas into easy-to-understand
                            explanations, making learning accessible and enjoyable for everyone.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={4} sx={{mt: 4}}>
                <Grid item xs={12} md={6} order={{xs: 2, md: 1}}>
                    <img src="/join-us.webp" alt="Join us"
                         style={{width: '100%', height: 'auto', borderRadius: '8px'}}/>
                </Grid>
                <Grid item xs={12} md={6} order={{xs: 1, md: 2}}>
                    <Paper elevation={4} sx={{p: 3}}>
                        <Typography variant="h5" gutterBottom>Join Our Community</Typography>
                        <Typography variant="body1" sx={{mb: 2}}>
                            Ready to elevate your learning experience? Sign up or log in to start using Sakanu today and
                            become part of our growing community of learners.
                        </Typography>
                        <AuthButton/>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;
