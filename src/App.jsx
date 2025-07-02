import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import VideoList from './pages/VideoList';
import PDFList from './pages/pdf';
import axios from 'axios';

export default function App() {
  const [siteName, setSiteName] = useState('Mechanic Bano');

  const fetchSiteName = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/sitename');
      if (response.data.length > 0) {
        setSiteName(response.data[0].name);
      }
    } catch (error) {
      console.error('Error fetching site name');
    }
  };

  useEffect(() => {
    fetchSiteName();
  }, []);

  return (
    <Router>
      <header>
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
