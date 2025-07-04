// src/components/FooterMenu.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Video, FileText, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './FooterMenu.css';

export default function FooterMenu() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <footer className="footer-menu">
      <Link to="/" className={`footer-link ${isActive('/') ? 'active' : ''}`}>
        <Home size={24} />
        <span>Home</span>
      </Link>

      <Link to="/videos" className={`footer-link ${isActive('/videos') ? 'active' : ''}`}>
        <Video size={24} />
        <span>Videos</span>
      </Link>

      <Link to="/pdfs" className={`footer-link ${isActive('/pdfs') ? 'active' : ''}`}>
        <FileText size={24} />
        <span>PDFs</span>
      </Link>

      {user ? (
        <Link to="/profile" className={`footer-link ${isActive('/profile') ? 'active' : ''}`}>
          <User size={24} />
          <span>Profile</span>
        </Link>
      ) : (
        <Link to="/" className={`footer-link ${isActive('/') ? 'active' : ''}`}>
          <LogIn size={24} />
          <span>Login</span>
        </Link>
      )}
    </footer>
  );
}
