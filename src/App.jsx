import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import VideoList from './pages/VideoList';
import PDFList from './pages/pdf';
import FooterMenu from './components/FooterMenu';
import axios from 'axios';

export default function App() {
  const [siteName, setSiteName] = useState('');
  const [pageStatus, setPageStatus] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSiteName = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/sitename');
      if (response.data && response.data.name) {
        setSiteName(response.data.name);
      }
    } catch (error) {
      console.error('Error fetching site name');
    }
  };

  const fetchPageControl = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/pagecontrol');
      const statusMap = {};
      response.data.forEach(item => {
        statusMap[item.page] = item.enabled;
      });
      setPageStatus(statusMap);
    } catch (error) {
      console.error('Error fetching page control');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteName();
    fetchPageControl();
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
          {pageStatus.videos && <Link to="/videos" style={{ marginRight: '15px', color: 'white' }}>Videos</Link>}
          {pageStatus.pdfs && <Link to="/pdfs" style={{ color: 'white' }}>PDFs</Link>}
        </nav>
      </header>

      {/* Page Content */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          {pageStatus.videos && <Route path="/videos" element={<VideoList />} />}
          {pageStatus.pdfs && <Route path="/pdfs" element={<PDFList />} />}
        </Routes>
      </div>

      {/* Mobile Footer Menu */}
      <FooterMenu pageStatus={pageStatus} />
    </Router>
  );
}
