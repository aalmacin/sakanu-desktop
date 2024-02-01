// Login.js
import React from 'react';
import AuthButton from './AuthButton'; // Ensure the path is correct

const Login = () => {
    return (
        <div className="login-container">
            <h2>Welcome to Sakanu</h2>
            <p>Please log in to continue.</p>
            <AuthButton />
        </div>
    );
};

export default Login;
