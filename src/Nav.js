// Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import AuthButton from "./AuthButton";

const Nav = () => {
    return (
        <nav>
            <div className="logo-links">
                <Link to="/">
                    <img src="/logo-main.png" alt="Logo" className="nav-logo"/>
                </Link>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/terms">Terms</Link></li>
                </ul>
            </div>
            <AuthButton/>
        </nav>
    );
};

export default Nav;