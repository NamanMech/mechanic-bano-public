import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import VideoList from './pages/videos';
import Pdf from './pages/pdf';

export default function App() {
  const [siteName, setSiteName] = useState('Mechanic Bano');

  const fetchSiteName = async () => {
    try {
      const response = await fetch('https://mechanic-bano-backend.vercel.app/api/sitename');
      const data = await response.json();
      if (data && data.name) {
        setSiteName(data.name);
      }
    } catch (error) {
      console.error('Error fetching site name', error);
    }
  };

  useEffect(() => {
    fetchSiteName();
  }, []);

  return (
    <Router>
      <header>
        <h1>{siteName}</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/videos">Videos</Link> | <Link to="/pdfs">PDFs</Link>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/pdfs" element={<Pdf />} />
        </Routes>
      </div>
    </Router>
  );
}
