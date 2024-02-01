// Home.js
import React from 'react';
import AuthButton from './AuthButton'; // Adjust the path as necessary

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Sakanu</h1>
            <p>
                Sakanu is an innovative learning platform designed to enhance your
                educational experience. Through our integration with Anki, we provide
                a seamless and interactive learning environment.
            </p>

            <AuthButton />
        </div>
    );
};

export default Home;
