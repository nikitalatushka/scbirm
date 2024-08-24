import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/stores">Stores</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
