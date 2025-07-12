import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import PDFViewer from '../components/PDFViewer';

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
      <h2 style={{ color: '#fff' }}>All PDF Tutorials</h2>
      {pdfs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No PDFs available</p>
      ) : (
        <div className="video-grid" style={{ display: 'grid', gap: '30px' }}>
          {pdfs.map((pdf) => (
            <div
              className="pdf-card"
              key={pdf._id}
              style={{
                background: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ marginBottom: '5px', color: '#111' }}>{pdf.title}</h3>
              <p style={{ fontSize: '14px', color: '#333', marginTop: '0px' }}>
                Category: {pdf.category}
              </p>

              <div style={{ marginTop: '10px' }}>
                <PDFViewer url={pdf.originalLink} title={pdf.title} category={pdf.category} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
