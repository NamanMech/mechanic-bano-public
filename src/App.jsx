import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoList from './pages/VideoList';
import PDFList from './pages/pdf';
import axios from 'axios';
import FooterMenu from './components/FooterMenu';
import Navbar from './components/Navbar';

export default function App() {
  const [siteName, setSiteName] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-theme', !isDark);
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <Router>
      {!isMobile && <Navbar />}
      <div className="container" style={{ paddingBottom: isMobile ? '60px' : '0' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/pdfs" element={<PDFList />} />
        </Routes>
      </div>
      {isMobile && <FooterMenu isDark={isDark} toggleTheme={toggleTheme} />}
    </Router>
  );
}
