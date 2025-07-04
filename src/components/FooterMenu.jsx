// src/components/FooterMenu.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, VideoIcon, FileTextIcon, UserIcon, LogInIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './FooterMenu.css';

export default function FooterMenu() {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <footer className="footer-menu">
      <Link to="/" className={`footer-link ${isActive('/') ? 'active' : ''}`}>
        <HomeIcon size={24} />
        <span>Home</span>
      </Link>

      <Link to="/videos" className={`footer-link ${isActive('/videos') ? 'active' : ''}`}>
        <VideoIcon size={24} />
        <span>Videos</span>
      </Link>

      <Link to="/pdfs" className={`footer-link ${isActive('/pdfs') ? 'active' : ''}`}>
        <FileTextIcon size={24} />
        <span>PDFs</span>
      </Link>

      {user ? (
        <Link to="/profile" className={`footer-link ${isActive('/profile') ? 'active' : ''}`}>
          <UserIcon size={24} />
          <span>Profile</span>
        </Link>
      ) : (
        <Link to="/" className="footer-link">
          <LogInIcon size={24} />
          <span>Login</span>
        </Link>
      )}
    </footer>
  );
}
