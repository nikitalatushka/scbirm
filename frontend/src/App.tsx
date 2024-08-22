// Main component of the application
import React from 'react';
import Stores from './stores';

const App: React.FC = () => {
    return (
        <div className="app-container">
            <h1> Stores </h1>
                <Stores />
        </div>
    );
};

export default App;