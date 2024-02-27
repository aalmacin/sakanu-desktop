// Home.js
import React from 'react';
import AuthButton from './AuthButton';
import {Link} from "react-router-dom"; // Adjust the path as necessary
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Sakanu</h1>
            <p>
                Sakanu is an innovative learning platform designed to enhance your
                educational experience. Through our integration with Anki, we provide
                a seamless and interactive learning environment.
            </p>
            <div className="search-for-term">
                <Link to="/search">Search for a term</Link>
            </div>
            <AuthButton/>
        </div>
    );
};

export default Home;
