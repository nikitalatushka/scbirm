// Main component of the application
import React from 'react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Stores from './components/stores';
import Products from './components/Products';
import Header from './components/Header';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container">
                    <Header app_name='SimCity BuildIt: Resouce Manager'/>
                    <Products />
                    <Stores />
            </div>
        </Router>
    );
};

export default App;