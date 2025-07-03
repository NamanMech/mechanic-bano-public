import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HomeIcon, VideoIcon, FileTextIcon } from 'lucide-react';
import Home from './pages/Home';
import VideoList from './pages/VideoList';
import PDFList from './pages/pdf';
import axios from 'axios';

export default function App() {
  const [siteName, setSiteName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSiteName = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/sitename');
      if (response.data && response.data.name) {
        setSiteName(response.data.name);
      }
    } catch (error) {
      console.error('Error fetching site name');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteName();
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <Router>
      {/* Desktop Navbar */}
      <header className="desktop-navbar">
        <h1>{siteName}</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link to="/" style={{ marginRight: '15px', color: 'white' }}>Home</Link>
          <Link to="/videos" style={{ marginRight: '15px', color: 'white' }}>Videos</Link>
          <Link to="/pdfs" style={{ color: 'white' }}>PDFs</Link>
        </nav>
      </header>

      {/* Mobile Header */}
      <div className="mobile-header">
        {siteName}
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/pdfs" element={<PDFList />} />
        </Routes>
      </div>

      {/* Footer Menu for Mobile */}
      <FooterMenu />
    </Router>
  );
}

function FooterMenu() {
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
    </div>
  );
}
