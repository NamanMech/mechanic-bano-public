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
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>All PDFs</h2>

      {pdfs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No PDFs available</p>
      ) : (
        <div className="video-grid" style={{ display: 'grid', gap: '20px', padding: '10px' }}>
          {pdfs.map((pdf) => (
            <div
              className="video-card"
              key={pdf._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{pdf.title}</h3>

              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdf.originalLink)}&embedded=true`}
                title={pdf.title}
                width="100%"
                height="500"
                frameBorder="0"
                style={{ border: '1px solid #ccc' }}
              ></iframe>

              <span
                className="category-badge"
                style={{
                  display: 'inline-block',
                  marginTop: '10px',
                  padding: '5px 10px',
                  backgroundColor: pdf.category === 'premium' ? '#ffc107' : '#4caf50',
                  color: '#fff',
                  borderRadius: '5px',
                  fontSize: '0.9em',
                }}
              >
                {pdf.category.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
