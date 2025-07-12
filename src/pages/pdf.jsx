import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import PDFViewer from '../components/PDFViewer';

export default function PDFList() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasedPDFIds, setPurchasedPDFIds] = useState([]); // 🔐 simulate purchased list

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

    // 🔐 Simulate login & purchased PDF IDs
    const dummyPurchased = JSON.parse(localStorage.getItem('purchasedPDFIds')) || [];
    setPurchasedPDFIds(dummyPurchased);
  }, []);

  const handlePurchase = (pdfId) => {
    const updated = [...purchasedPDFIds, pdfId];
    localStorage.setItem('purchasedPDFIds', JSON.stringify(updated));
    setPurchasedPDFIds(updated);
  };

  if (loading) return <Spinner />;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>All PDFs</h2>

      {pdfs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No PDFs available</p>
      ) : (
        <div className="video-grid">
          {pdfs.map((pdf) => {
            const isFree = pdf.category === 'free';
            const hasAccess = isFree || purchasedPDFIds.includes(pdf._id);

            return (
              <div className="video-card" key={pdf._id} style={{ marginBottom: '30px' }}>
                <h3>{pdf.title}</h3>

                {!hasAccess ? (
                  <div
                    style={{
                      height: '300px',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      flexDirection: 'column',
                      padding: '10px',
                    }}
                  >
                    <p style={{ marginBottom: '10px' }}>
                      This is a <strong>Premium PDF</strong>
                    </p>
                    <p style={{ marginBottom: '10px' }}>Price: ₹{pdf.price || 0}</p>
                    <button onClick={() => handlePurchase(pdf._id)}>Buy Now</button>
                  </div>
                ) : (
                  <PDFViewer url={pdf.originalLink} />
                )}

                <span
                  className="category-badge"
                  style={{
                    marginTop: '10px',
                    display: 'inline-block',
                    backgroundColor: isFree ? '#28a745' : '#ffc107',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                  }}
                >
                  {isFree ? 'Free' : 'Premium'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
