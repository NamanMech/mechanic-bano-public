import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import PDFViewer from '../components/PDFViewer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../utils/firebaseConfig';

export default function PDFList() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [purchasedPDFIds, setPurchasedPDFIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const res = await axios.get('https://mechanic-bano-backend.vercel.app/api/general?type=pdf');
        setPdfs(res.data);
      } catch {
        console.error('Error fetching PDFs');
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();

    // auth state check
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const local = localStorage.getItem(`purchased_${u.uid}`);
        setPurchasedPDFIds(local ? JSON.parse(local) : []);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleBuy = (pdfId) => {
    const updated = [...purchasedPDFIds, pdfId];
    localStorage.setItem(`purchased_${user.uid}`, JSON.stringify(updated));
    setPurchasedPDFIds(updated);
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // or show a login popup if you have one
  };

  if (loading) return <Spinner />;

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
              <div
                key={pdf._id}
                className="video-card"
                style={{
                  marginBottom: '30px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#fefefe',
                }}
              >
                <h3>{pdf.title}</h3>

                {!hasAccess ? (
                  <div
                    style={{
                      height: '250px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '6px',
                      border: '1px dashed #ccc',
                    }}
                  >
                    {user ? (
                      <>
                        <p>This is a <strong>Premium PDF</strong></p>
                        <p>Price: ₹{pdf.price || 0}</p>
                        <button onClick={() => handleBuy(pdf._id)}>Buy Now</button>
                      </>
                    ) : (
                      <>
                        <p>This is a <strong>Premium PDF</strong></p>
                        <button onClick={handleLoginRedirect} style={{ marginTop: '10px' }}>
                          🔒 Login to Buy
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <PDFViewer url={pdf.originalLink} />
                )}

                <span
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
