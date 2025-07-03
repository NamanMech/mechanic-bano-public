import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Video, FileText, Menu } from 'lucide-react';
import './FooterMenu.css';

export default function FooterMenu({ pageStatus }) {
  const location = useLocation();

  return (
    <footer className="footer-menu">
      <Link to="/" className={`footer-link ${location.pathname === '/' ? 'active' : ''}`}>
        <Home size={24} />
        <span>Home</span>
      </Link>

      {pageStatus.videos && (
        <Link to="/videos" className={`footer-link ${location.pathname === '/videos' ? 'active' : ''}`}>
          <Video size={24} />
          <span>Videos</span>
        </Link>
      )}

      {pageStatus.pdfs && (
        <Link to="/pdfs" className={`footer-link ${location.pathname === '/pdfs' ? 'active' : ''}`}>
          <FileText size={24} />
          <span>PDFs</span>
        </Link>
      )}

      <Link to="#" className="footer-link">
        <Menu size={24} />
        <span>More</span>
      </Link>
    </footer>
  );
}
