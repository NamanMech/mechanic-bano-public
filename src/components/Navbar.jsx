import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ siteName }) {
  const { user } = useAuth();

  return (
    <header className="desktop-navbar">
      <h1>{siteName}</h1>
      <nav style={{ marginTop: '10px' }}>
        <Link to="/" style={{ marginRight: '15px', color: 'white' }}>Home</Link>
        <Link to="/videos" style={{ marginRight: '15px', color: 'white' }}>Videos</Link>
        <Link to="/pdfs" style={{ marginRight: '15px', color: 'white' }}>PDFs</Link>
        {user ? (
          <Link to="/profile" style={{ color: 'white' }}>Profile</Link>
        ) : (
          <Link to="/login" style={{ color: 'white' }}>Login</Link>
        )}
      </nav>
    </header>
  );
}
