import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

export default function PDFList() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPdfs = async () => {
    try {
      // ✅ Corrected API for fetching PDFs
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
      <h2>All PDFs</h2>
      {pdfs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No PDFs available</p>
      ) : (
        <div className="video-grid">
          {pdfs.map((pdf) => (
            <div className="video-card" key={pdf._id}>
              <h3>{pdf.title}</h3>
              <iframe
                src={pdf.embedLink}
                title={pdf.title}
                width="100%"
                height="300"
                frameBorder="0"
                allow="autoplay"
              ></iframe>
              <span className="category-badge">{pdf.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
