import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PDFList() {
  const [pdfs, setPdfs] = useState([]);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/pdf');
      setPdfs(response.data);
    } catch (error) {
      alert('Error fetching PDFs');
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  return (
    <div>
      <h2>All PDF Resources</h2>
      {pdfs.length === 0 ? (
        <p>No PDFs available</p>
      ) : (
        <div className="video-grid">
          {pdfs.map((pdf) => (
            <div className="video-card" key={pdf._id}>
              <h3>{pdf.title}</h3>
              <iframe
                src={pdf.embedLink}
                width="100%"
                height="400"
                title={pdf.title}
                frameBorder="0"
                allow="autoplay"
              ></iframe>
              <p>
                <span className="category-badge">{pdf.category}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
