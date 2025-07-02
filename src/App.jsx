import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PDFList from './pages/PDFList';

export default function App() {
  return (
    <Router>
      <header>
        <h1>Mechanic Bano - Bike Repair Tutorials</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link to="/" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Videos</Link>
          <Link to="/pdfs" style={{ color: 'white', textDecoration: 'none' }}>PDFs</Link>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pdfs" element={<PDFList />} />
        </Routes>
      </div>
    </Router>
  );
}
