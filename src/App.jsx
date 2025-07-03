import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import VideoList from './pages/VideoList';
import PDFList from './pages/pdf';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [siteName, setSiteName] = useState('');
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <header className="navbar">
        <h1>{siteName}</h1>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/videos" onClick={() => setMenuOpen(false)}>Videos</Link>
              <Link to="/pdfs" onClick={() => setMenuOpen(false)}>PDFs</Link>
            </motion.nav>
          )}
        </AnimatePresence>
        <nav className="desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/videos">Videos</Link>
          <Link to="/pdfs">PDFs</Link>
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
