import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PDFs from './pages/PDFs';

export default function App() {
  return (
    <Router>
      <header>
        <h1>Mechanic Bano - Bike Repair Tutorials</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Home</Link>
          <Link to="/pdfs" style={{ color: 'white' }}>PDFs</Link>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pdfs" element={<PDFs />} />
        </Routes>
      </div>
    </Router>
  );
}
