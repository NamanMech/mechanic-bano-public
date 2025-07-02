import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PDFs() {
  const [pdfs, setPdfs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const filteredPdfs = pdfs.filter((pdf) => {
    const matchesSearch = pdf.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pdf.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h2>PDF Tutorials</h2>

      {/* Search and Filter */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search PDFs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', flex: '1', minWidth: '200px' }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      {/* PDF List */}
      {filteredPdfs.length === 0 ? (
        <p>No PDFs available.</p>
      ) : (
        <div className="video-grid">
          {filteredPdfs.map((pdf) => (
            <div className="video-card" key={pdf._id}>
              <h3>{pdf.title}</h3>
              <iframe
                src={pdf.embedLink}
                width="100%"
                height="300"
                title={pdf.title}
                frameBorder="0"
                allow="autoplay"
              ></iframe>
              <p className="category-badge">{pdf.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
