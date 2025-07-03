import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

export default function PDFList() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/pdf');
      setPdfs(response.data);
    } catch (error) {
      alert('Error fetching PDFs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2>All PDFs</h2>
      {pdfs.length === 0 ? (
        <p>No PDFs available</p>
      ) : (
        <div className="video-grid">
          {pdfs.map((pdf) => (
            <div className="video-card" key={pdf._id}>
              <h3>{pdf.title}</h3>
              <iframe
                src={pdf.embedLink}
                title={pdf.title}
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
