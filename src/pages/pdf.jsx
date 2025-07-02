import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

export default function PDFList() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + 'pdf');
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

  if (loading) return <Spinner />;

  return (
    <div>
      {pdfs.length === 0 ? (
        <p>No PDFs available</p>
      ) : (
        pdfs.map((pdf) => (
          <div className="video-card" key={pdf._id}>
            <h3>{pdf.title}</h3>
            <iframe
              src={pdf.embedLink}
              width="350"
              height="200"
              title={pdf.title}
              frameBorder="0"
              allow="autoplay"
            ></iframe>
            <p className="category-badge">{pdf.category}</p>
          </div>
        ))
      )}
    </div>
  );
}
