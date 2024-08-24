import React, {useState, useEffect } from 'react';

interface HeaderProps {
    app_name: string;
};

const Header: React.FC<HeaderProps> = ({app_name}) => {
    return (
        <h1>{app_name}</h1>
    );
};

export default Header;