import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoList from './pages/VideoList';
import PDFList from './pages/pdf';
import axios from 'axios';
import Navbar from './components/Navbar';

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
      <Navbar siteName={siteName} />
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
