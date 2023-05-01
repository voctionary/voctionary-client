import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';


// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(  
    <Router>
      <App />
    </Router>
);