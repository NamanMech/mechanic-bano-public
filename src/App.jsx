import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoList from './pages/VideoList';
import PDFList from './pages/pdf';
import Profile from './pages/Profile';
import GoogleAuth from './components/GoogleAuth';
import FooterMenu from './components/FooterMenu';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';
import NotFound from './pages/NotFound';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import Subscription from './pages/Subscription';

export default function App() {
  const [siteName, setSiteName] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const fetchSiteName = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/general?type=sitename');
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
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <Spinner />;

  return (
    <Router>
      <Navbar siteName={siteName} />

      {isMobile && (
        <div className="mobile-header">
          <img src="/assets/logo.png" alt="Logo" className="mobile-logo" />
          <span>{siteName}</span>
        </div>
      )}

      <div className="container">
        <Routes>
          <Route path="/" element={user ? <Home /> : <GoogleAuth />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/pdfs" element={<PDFList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </div>

      <FooterMenu />
    </Router>
  );
}
