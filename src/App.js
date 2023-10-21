import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import IncidentList from './components/IncidentList';
import AddIncident from './components/AddIncident';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<IncidentList />} />
          <Route path="/add-incident" element={<AddIncident />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;