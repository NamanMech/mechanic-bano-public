import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import PDFViewer from '../components/PDFViewer';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../context/AuthContext'; // ✅ use context

export default function PDFList() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, login, logout } = useAuth(); // ✅ from context

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const decoded = jwt_decode(tokenResponse.credential || tokenResponse.access_token);
      await login(decoded, true); // ✅ update context + storage
    },
    onError: (err) => {
      console.error('Login failed:', err);
    }
  });

  useEffect(() => {
    fetchPDFs();
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

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {user ? (
          <button onClick={logout} style={{ padding: '8px 16px' }}>Logout</button>
        ) : (
          <button onClick={() => googleLogin()} style={{ padding: '8px 16px' }}>Login with Google</button>
        )}
      </div>

      {pdfs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No PDFs available</p>
      ) : (
        <div className="video-grid">
          {pdfs.map((pdf) => {
            const isPremium = pdf.category?.toLowerCase() === 'premium';
            const hasPurchased = false; // 🔒 Replace with real logic later

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
                    <button onClick={() => googleLogin()} style={{ marginTop: '10px' }}>Login to Buy</button>
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
