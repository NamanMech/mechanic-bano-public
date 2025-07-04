import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ siteName }) {
  const { user } = useAuth();

  return (
    <header className="desktop-navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/assets/logo.png" alt="Logo" style={{ width: '35px', height: '35px', marginRight: '10px', borderRadius: '50%' }} />
        <h1 style={{ whiteSpace: 'nowrap', fontSize: '24px' }}>{siteName}</h1>
      </div>

      <nav style={{ marginTop: '10px' }}>
        <Link to="/" style={{ marginRight: '15px', color: 'white' }}>Home</Link>
        <Link to="/videos" style={{ marginRight: '15px', color: 'white' }}>Videos</Link>
        <Link to="/pdfs" style={{ marginRight: '15px', color: 'white' }}>PDFs</Link>
        {user ? (
          <Link to="/profile" style={{ color: 'white' }}>Profile</Link>
        ) : (
          <Link to="/" style={{ color: 'white' }}>Login</Link>
        )}
      </nav>
    </header>
  );
}
