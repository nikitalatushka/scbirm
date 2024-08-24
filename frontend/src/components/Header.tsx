import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    title: string;
};

const Header: React.FC<HeaderProps> = ({title}) => {
    return (
        <div className="header">
            <h1 className="title">{title}</h1>
            <div className="navbar">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/stores">Stores</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;