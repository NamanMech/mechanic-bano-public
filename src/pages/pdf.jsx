// src/pages/pdf.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

export default function PDFList() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/general?type=pdf');
      setPdfs(response.data);
    } catch (error) {
      setError('Error fetching PDFs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>;

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>All PDFs</h2>
      {pdfs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No PDFs available</p>
      ) : (
        <div className="video-grid">
          {pdfs.map((pdf) => (
            <div className="video-card" key={pdf._id}>
              <h3>{pdf.title}</h3>

              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%',
                  overflow: 'hidden',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                }}
                onContextMenu={(e) => e.preventDefault()} // ❌ Disable right-click
              >
                <iframe
                  src={pdf.embedLink}
                  title={pdf.title}
                  allow="autoplay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    pointerEvents: 'auto',
                  }}
                  sandbox="allow-scripts allow-same-origin" // ✅ Block download links inside PDF
                ></iframe>
              </div>

              <span className="category-badge">{pdf.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
