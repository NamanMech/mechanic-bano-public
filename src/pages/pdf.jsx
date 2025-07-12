import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import PDFViewer from '../components/PDFViewer';
import { Lock } from 'lucide-react';

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
  if (error)
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>
    );

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>All PDFs</h2>

      {pdfs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No PDFs available</p>
      ) : (
        <div className="video-grid" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {pdfs.map((pdf) => (
            <div
              key={pdf._id}
              style={{
                padding: '16px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                maxWidth: '100%',
                boxSizing: 'border-box',
              }}
            >
              <h3>{pdf.title}</h3>

              {pdf.category === 'free' ? (
                <PDFViewer url={pdf.originalLink} />
              ) : (
                <div
                  style={{
                    height: '400px',
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888',
                    background: '#f9f9f9',
                  }}
                >
                  <Lock size={40} />
                  <p style={{ marginTop: '10px' }}>Premium PDF - Locked</p>
                </div>
              )}

              <span
                style={{
                  marginTop: '10px',
                  display: 'inline-block',
                  backgroundColor: pdf.category === 'free' ? '#28a745' : '#ffc107',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
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
