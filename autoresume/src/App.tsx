import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
// import Drawer from './components/Drawer';
// import WinCard from './components/WinCard';
// import GenericHeader from './components/GenericHeader';
// import Wins from './components/Wins';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard />
      </Router>
    </div>
  );
}

export default App;
