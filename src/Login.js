// Login.js
import React from 'react';
import AuthButton from './AuthButton'; // Ensure the path is correct
import './Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <h1>Welcome to Sakanu</h1>
            <div className="sakanu-section">
                <div className="section-left">
                    <h2>Learning Search Engine</h2>
                    <p>With Sakanu, you get a personalized learning experience. Our advanced search engine uses AI to
                        generate
                        comprehensive descriptions, simplified explanations, and categories. It also automatically
                        stores
                        the
                        flashcards to Anki, making your learning more efficient.</p>
                </div>
                <div className="section-right">
                    <img src="/ai-power.webp" alt="AI-powered search engine"/>
                </div>
            </div>
            <div className="anki-section">
                <div className="section-left">
                    <img src="/anki-review.webp" alt="Anki connection"/>
                </div>
                <div className="section-right">
                    <h2>Enhanced Review</h2>
                    <p>Sakanu is a powerful tool that connects to Anki to generate decks and cards, helping you retain
                        information more effectively.</p>
                </div>
            </div>
            <div className="join-us-section">
                <div className="section-left">
                    <h2>Join Us</h2>
                    <p>Ready to take your learning to the next level? Sign up or log in to start using Sakanu today.</p>
                    <AuthButton/>
                </div>
                <div className="section-right">
                    <img src="/join-us.webp" alt="Join us"/>
                </div>
            </div>
        </div>
    );
};

export default Login;