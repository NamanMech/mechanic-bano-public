import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Video, FileText, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './FooterMenu.css';

export default function FooterMenu() {
  const location = useLocation();
  const { user } = useAuth();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const toggleMoreMenu = () => {
    setShowMoreMenu(!showMoreMenu);
  };

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

      {user && (
        <div className="footer-link" onClick={toggleMoreMenu} style={{ cursor: 'pointer' }}>
          <Menu size={24} />
          <span>More</span>
        </div>
      )}

      {showMoreMenu && (
        <div className="more-menu">
          <Link to="/profile" onClick={() => setShowMoreMenu(false)}>
            Profile
          </Link>
          <Link to="/subscription" onClick={() => setShowMoreMenu(false)}>
            Subscription
          </Link>
          {/* Add more options here */}
        </div>
      )}
    </footer>
  );
}
