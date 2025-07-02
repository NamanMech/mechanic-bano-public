import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar'; // Import kiya

export default function App() {
  return (
    <Router>
      <Navbar /> {/* Yaha navbar lagaya */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 404 Page yaha future me add hoga */}
        </Routes>
      </div>
    </Router>
  );
}
