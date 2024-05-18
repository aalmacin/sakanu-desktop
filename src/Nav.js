import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import AuthButton from "./AuthButton";

const Nav = () => {
    return (
        <AppBar position="static" color="accent" sx={{ zIndex: 1301, width: '100%'}}>
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    <img src="/logo-main.png" alt="Logo" style={{ height: '40px' }}/>
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/search">Search</Button>
                <Button color="inherit" component={Link} to="/terms">Terms</Button>
                <AuthButton/>
            </Toolbar>
        </AppBar>
    );
};

export default Nav;