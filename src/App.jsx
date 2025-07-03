import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import VideoList from './pages/VideoList';
import PDFList from './pages/pdf';
import axios from 'axios';

export default function App() {
  const [siteName, setSiteName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSiteData = async () => {
    try {
      const [siteNameResponse, logoResponse] = await Promise.all([
        axios.get('https://mechanic-bano-backend.vercel.app/api/sitename'),
        axios.get('https://mechanic-bano-backend.vercel.app/api/logo')
      ]);

      if (siteNameResponse.data && siteNameResponse.data.name) {
        setSiteName(siteNameResponse.data.name);
      }

      if (logoResponse.data && logoResponse.data.url) {
        setLogoUrl(logoResponse.data.url);
      }
    } catch (error) {
      console.error('Error fetching site data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteData();
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <Router>
      <header>
        {logoUrl && <img src={logoUrl} alt="Site Logo" style={{ maxWidth: '120px', marginBottom: '10px' }} />}
        <h1>{siteName}</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link to="/" style={{ marginRight: '15px', color: 'white' }}>Home</Link>
          <Link to="/videos" style={{ marginRight: '15px', color: 'white' }}>Videos</Link>
          <Link to="/pdfs" style={{ color: 'white' }}>PDFs</Link>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/pdfs" element={<PDFList />} />
        </Routes>
      </div>
    </Router>
  );
}
