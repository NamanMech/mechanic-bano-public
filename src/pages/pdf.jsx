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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>All PDFs</h2>

      {pdfs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No PDFs available</p>
      ) : (
        <div className="pdf-grid" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {pdfs.map((pdf) => (
            <div
              key={pdf._id}
              className="pdf-card"
              style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '12px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              }}
            >
              <h3 style={{ marginBottom: '10px' }}>{pdf.title}</h3>

              {/* ✅ Canvas PDF Viewer */}
              <PDFViewer url={pdf.originalLink} />

              <span
                className="category-badge"
                style={{
                  marginTop: '12px',
                  display: 'inline-block',
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '12px'
                }}
              >
                {pdf.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
