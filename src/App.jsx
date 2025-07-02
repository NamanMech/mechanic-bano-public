// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Videos from './pages/VideoList';
import Pdf from './pages/pdf';

export default function App() {
  return (
    <Router>
      <header>
        <h1>Mechanic Bano</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/videos" style={{ marginRight: '15px' }}>Videos</Link>
          <Link to="/pdf" style={{ marginRight: '15px' }}>PDFs</Link>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/pdf" element={<Pdf />} />
        </Routes>
      </div>
    </Router>
  );
}
