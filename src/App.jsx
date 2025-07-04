import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HomeIcon, VideoIcon, FileTextIcon, UserIcon, LogInIcon } from 'lucide-react';
import Home from './pages/Home';
import VideoList from './pages/VideoList';
import PDFList from './pages/pdf';
import Profile from './pages/Profile';
import GoogleAuth from './components/GoogleAuth';
import FooterMenu from './components/FooterMenu';
import Navbar from './components/Navbar';
import axios from 'axios';
import { useAuth } from './context/AuthContext';

export default function App() {
  const [siteName, setSiteName] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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

      <div className="mobile-header">
        {siteName}
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={user ? <Home /> : <GoogleAuth />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/pdfs" element={<PDFList />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      <FooterMenu />
    </Router>
  );
}
