import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PDFViewer from '../components/PDFViewer';
import Spinner from '../components/Spinner';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function PDFList() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Google Login
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const decoded = jwt_decode(tokenResponse.credential || tokenResponse.access_token);
      setUser(decoded);
    },
    onError: (err) => {
      console.error('Login failed:', err);
    }
  });

  const fetchPDFs = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/general?type=pdf');
      setPdfs(response.data);
    } catch (err) {
      setError('Error fetching PDFs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>All PDFs</h2>

      <div className="video-grid">
        {pdfs.map((pdf) => {
          const isPremium = !!pdf.price;
          const isLoggedIn = !!user;

          return (
            <div key={pdf._id} className="video-card" style={{ marginBottom: '30px' }}>
              <h3>{pdf.title}</h3>

              {/* 👁️ SHOW LOCK IF PREMIUM */}
              {isPremium ? (
                isLoggedIn ? (
                  <>
                    {/* 🔓 TODO: Check purchase logic */}
                    <PDFViewer url={pdf.originalLink} />
                    <p style={{ marginTop: '8px', fontWeight: 'bold', color: 'green' }}>Premium PDF - Purchased</p>
                  </>
                ) : (
                  <>
                    <div style={{ height: 300, border: '1px dashed gray', borderRadius: 6, padding: 20, textAlign: 'center' }}>
                      <p>This is a premium PDF.</p>
                      <p>Login to purchase & view.</p>
                      <button onClick={login} style={{ marginTop: '10px' }}>Login with Google</button>
                    </div>
                  </>
                )
              ) : (
                <PDFViewer url={pdf.originalLink} />
              )}

              <span
                className="category-badge"
                style={{
                  marginTop: '10px',
                  display: 'inline-block',
                  backgroundColor: isPremium ? '#d9534f' : '#007bff',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '12px'
                }}
              >
                {isPremium ? `Premium - ₹${pdf.price}` : pdf.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
