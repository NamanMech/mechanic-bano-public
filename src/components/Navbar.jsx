// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ siteName }) {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="desktop-navbar">
      <h1>{siteName}</h1>
      <nav style={{ marginTop: '10px' }}>
        <Link to="/" style={{ marginRight: '15px', color: isActive('/') ? '#ffeb3b' : 'white' }}>Home</Link>
        <Link to="/videos" style={{ marginRight: '15px', color: isActive('/videos') ? '#ffeb3b' : 'white' }}>Videos</Link>
        <Link to="/pdfs" style={{ marginRight: '15px', color: isActive('/pdfs') ? '#ffeb3b' : 'white' }}>PDFs</Link>
        {user ? (
          <Link to="/profile" style={{ color: isActive('/profile') ? '#ffeb3b' : 'white' }}>Profile</Link>
        ) : (
          <Link to="/" style={{ color: 'white' }}>Login</Link>
        )}
      </nav>
    </header>
  );
}
