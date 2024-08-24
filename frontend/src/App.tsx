// Main component of the application
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Stores from './routes/Stores';
import Products from './routes/Products';
import Home from './routes/Home'

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container">
                <Header app_name='SimCity BuildIt: Resouce Manager'/>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/products" element={<Products />}></Route>
                    <Route path="/stores" element={<Stores />}></Route>
                </Routes>                    
            </div>
        </Router>
    );
};

export default App;