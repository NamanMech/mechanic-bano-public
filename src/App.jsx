import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HomeIcon, VideoIcon, FileTextIcon, UserIcon } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import VideoList from './pages/VideoList';
import PDFList from './pages/pdf';
import Profile from './pages/Profile';
import GoogleAuth from './components/GoogleAuth';

export default function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      {/* Desktop Navbar */}
      <header className="desktop-navbar">
        <h1>Mechanic Bano</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link to="/" style={{ marginRight: '15px', color: 'white' }}>Home</Link>
          <Link to="/videos" style={{ marginRight: '15px', color: 'white' }}>Videos</Link>
          <Link to="/pdfs" style={{ marginRight: '15px', color: 'white' }}>PDFs</Link>
          {user && (
            <Link to="/profile" style={{ color: 'white' }}>Profile</Link>
          )}
        </nav>
      </header>

      {/* Mobile Header */}
      <div className="mobile-header">Mechanic Bano</div>

      <div className="container">
        <Routes>
          <Route path="/" element={user ? <Home /> : <GoogleAuth />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/pdfs" element={<PDFList />} />
          <Route path="/profile" element={user ? <Profile /> : <GoogleAuth />} />
        </Routes>
      </div>

      {/* Footer Menu */}
      <FooterMenu user={user} logout={logout} />
    </Router>
  );
}

function FooterMenu({ user }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="footer-menu">
      <Link to="/" className="footer-item" style={{ color: isActive('/') ? '#1e88e5' : '#555' }}>
        <HomeIcon />
        <span>Home</span>
      </Link>
      <Link to="/videos" className="footer-item" style={{ color: isActive('/videos') ? '#1e88e5' : '#555' }}>
        <VideoIcon />
        <span>Videos</span>
      </Link>
      <Link to="/pdfs" className="footer-item" style={{ color: isActive('/pdfs') ? '#1e88e5' : '#555' }}>
        <FileTextIcon />
        <span>PDFs</span>
      </Link>
      {user ? (
        <Link to="/profile" className="footer-item" style={{ color: isActive('/profile') ? '#1e88e5' : '#555' }}>
          <UserIcon />
          <span>Profile</span>
        </Link>
      ) : (
        <Link to="/" className="footer-item" style={{ color: '#555' }}>
          <UserIcon />
          <span>Login</span>
        </Link>
      )}
    </div>
  );
}
