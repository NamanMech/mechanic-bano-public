import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Video, FileText, Sun, Moon } from 'lucide-react';

export default function FooterMenu({ isDark, toggleTheme }) {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Home', icon: <Home size={24} /> },
    { path: '/videos', label: 'Videos', icon: <Video size={24} /> },
    { path: '/pdfs', label: 'PDFs', icon: <FileText size={24} /> },
  ];

  return (
    <div className="footer-menu">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={location.pathname === item.path ? 'active' : ''}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
      <button onClick={toggleTheme} className="theme-toggle">
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
}
