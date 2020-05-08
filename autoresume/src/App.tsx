import React from 'react';
import './App.css';
import Drawer from './components/Drawer';

function App() {
  return (
    <div className="App">
      <Drawer collapsed={true} />
    </div>
  );
}

export default App;
