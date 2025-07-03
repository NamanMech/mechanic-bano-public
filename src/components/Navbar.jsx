import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="site-header">
      <h1>Mechanic Bano</h1>
      <nav style={{ marginTop: '10px' }}>
        <Link to="/" className={location.pathname === '/' ? 'active-link' : ''} style={{ marginRight: '15px', color: 'white' }}>Home</Link>
        <Link to="/videos" className={location.pathname === '/videos' ? 'active-link' : ''} style={{ marginRight: '15px', color: 'white' }}>Videos</Link>
        <Link to="/pdfs" className={location.pathname === '/pdfs' ? 'active-link' : ''} style={{ color: 'white' }}>PDFs</Link>
      </nav>
    </header>
  );
}
