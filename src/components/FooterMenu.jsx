// src/components/FooterMenu.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Video, FileText, LogIn, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './FooterMenu.css';

export default function FooterMenu() {
  const location = useLocation();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

      {/* More Button */}
      <div className="footer-link more-menu-wrapper" ref={menuRef}>
        <button onClick={toggleMenu} className="more-button">
          <MoreHorizontal size={24} />
          <span>More</span>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="more-dropdown">
            {user ? (
              <>
                <Link to="/profile" className="dropdown-link" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
                <Link to="/subscription" className="dropdown-link" onClick={() => setMenuOpen(false)}>
                  Subscription
                </Link>
              </>
            ) : (
              <Link to="/" className="dropdown-link" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
