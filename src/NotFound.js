import React from 'react';
import { Typography, Box } from '@mui/material';

const NotFound = () => {
    return (
        <Box>
            <Typography variant="h1">404</Typography>
            <Typography variant="subtitle1">Page Not Found</Typography>
            <Typography variant="body1">The page you are looking for does not exist.</Typography>
        </Box>
    );
};

export default NotFound;