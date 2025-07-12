import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import PDFViewer from '../components/PDFViewer';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function PDFList() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Google OAuth Login Handler
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const decoded = jwt_decode(tokenResponse.credential || tokenResponse.access_token);
      localStorage.setItem('user', JSON.stringify(decoded)); // Save to localStorage
      setUser(decoded);
    },
    onError: (err) => {
      console.error('Login failed:', err);
    }
  });

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Load user if previously logged in
  useEffect(() => {
    fetchPDFs();
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const fetchPDFs = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/general?type=pdf');
      setPdfs(response.data);
    } catch (error) {
      setError('Error fetching PDFs.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>All PDFs</h2>

      {/* Login/Logout Button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {user ? (
          <button onClick={handleLogout} style={{ padding: '8px 16px' }}>Logout</button>
        ) : (
          <button onClick={() => login()} style={{ padding: '8px 16px' }}>Login with Google</button>
        )}
      </div>

      {pdfs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No PDFs available</p>
      ) : (
        <div className="video-grid">
          {pdfs.map((pdf) => {
            const isPremium = pdf.category?.toLowerCase() === 'premium';
            const hasPurchased = false; // 🔐 Placeholder — integrate payment system here

            return (
              <div className="video-card" key={pdf._id} style={{ marginBottom: '40px' }}>
                <h3>{pdf.title}</h3>

                {isPremium && !user ? (
                  <div
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      padding: '20px',
                      background: '#f9f9f9',
                      textAlign: 'center'
                    }}
                  >
                    <p>This is a <strong>Premium PDF</strong>.</p>
                    <p>Please login to view or purchase it.</p>
                    <button onClick={() => login()} style={{ marginTop: '10px' }}>Login to Buy</button>
                  </div>
                ) : isPremium && !hasPurchased ? (
                  <div
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      padding: '20px',
                      background: '#fffbe6',
                      textAlign: 'center'
                    }}
                  >
                    <p>This is a <strong>Premium PDF</strong>.</p>
                    <button style={{ marginTop: '10px' }}>Buy Now</button>
                  </div>
                ) : (
                  <PDFViewer url={pdf.originalLink} />
                )}

                {/* Category Tag */}
                <span
                  className="category-badge"
                  style={{
                    marginTop: '10px',
                    display: 'inline-block',
                    backgroundColor: isPremium ? '#ff5f5f' : '#007bff',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px'
                  }}
                >
                  {pdf.category}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
