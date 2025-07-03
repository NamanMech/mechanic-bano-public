import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, VideoIcon, FileTextIcon, UserIcon } from 'lucide-react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home';
import VideoList from './pages/VideoList';
import PDFList from './pages/pdf';
import Profile from './pages/Profile';
import GoogleAuth from './components/GoogleAuth';
import axios from 'axios';

export default function App() {
  const [siteName, setSiteName] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

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
    <GoogleOAuthProvider clientId="303726026304-0q7mt0gsqervgmkgp8tkck7nviluek1l.apps.googleusercontent.com">
      <Router>
        <Header siteName={siteName} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videos" element={<VideoList />} />
            <Route path="/pdfs" element={<PDFList />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <FooterMenu user={user} />
        {!user && <GoogleAuth onLogin={setUser} />}
      </Router>
    </GoogleOAuthProvider>
  );
}

function Header({ siteName }) {
  return (
    <header className="desktop-navbar">
      <h1>{siteName}</h1>
      <nav style={{ marginTop: '10px' }}>
        <Link to="/" style={{ marginRight: '15px', color: 'white' }}>Home</Link>
        <Link to="/videos" style={{ marginRight: '15px', color: 'white' }}>Videos</Link>
        <Link to="/pdfs" style={{ color: 'white' }}>PDFs</Link>
      </nav>
    </header>
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
      {user && (
        <Link to="/profile" className="footer-item" style={{ color: isActive('/profile') ? '#1e88e5' : '#555' }}>
          <UserIcon />
          <span>Profile</span>
        </Link>
      )}
    </div>
  );
}
