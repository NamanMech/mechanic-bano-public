import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Video, FileText, User, LogIn } from 'lucide-react';
import './FooterMenu.css';
import { useAuth } from '../context/AuthContext';

export default function FooterMenu() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <footer className="footer-menu">
      <Link to="/" className={`footer-link ${location.pathname === '/' ? 'active' : ''}`}>
        <Home size={24} />
        <span>Home</span>
      </Link>

      <Link to="/videos" className={`footer-link ${location.pathname === '/videos' ? 'active' : ''}`}>
        <Video size={24} />
        <span>Videos</span>
      </Link>

      <Link to="/pdfs" className={`footer-link ${location.pathname === '/pdfs' ? 'active' : ''}`}>
        <FileText size={24} />
        <span>PDFs</span>
      </Link>

      {user ? (
        <Link to="/profile" className={`footer-link ${location.pathname === '/profile' ? 'active' : ''}`}>
          <User size={24} />
          <span>Profile</span>
        </Link>
      ) : (
        <Link to="/" className="footer-link">
          <LogIn size={24} />
          <span>Login</span>
        </Link>
      )}
    </footer>
  );
}
