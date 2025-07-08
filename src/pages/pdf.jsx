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
    <div style={{ padding: '20px' }}>
      <h2>All PDFs</h2>
      {pdfs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No PDFs available</p>
      ) : (
        <div className="video-grid">
          {pdfs.map((pdf) => (
            <div className="video-card" key={pdf._id} style={{ marginBottom: '30px' }}>
              <h3>{pdf.title}</h3>

              {/* ✅ Embed PDF using Google Docs Viewer */}
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdf.originalLink)}&embedded=true`}
                title={pdf.title}
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: '1px solid #ccc', borderRadius: '4px', marginTop: '10px' }}
              ></iframe>

              <span className="category-badge" style={{ marginTop: '10px', display: 'inline-block' }}>
                {pdf.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
