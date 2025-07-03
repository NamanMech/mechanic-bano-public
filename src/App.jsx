import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoList from './pages/VideoList';
import PDFList from './pages/pdf';
import axios from 'axios';
import FooterMenu from './components/FooterMenu';

export default function App() {
  const [siteName, setSiteName] = useState('');
  const [isDark, setIsDark] = useState(false);
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

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-theme', !isDark);
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <Router>
      <header className="site-header">
        <h1>{siteName}</h1>
      </header>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/pdfs" element={<PDFList />} />
        </Routes>
      </div>

      <FooterMenu isDark={isDark} toggleTheme={toggleTheme} />
    </Router>
  );
}
