import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PDFList() {
  const [pdfs, setPdfs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  // Search + Category Filter Logic
  const filteredPdfs = pdfs.filter((pdf) => {
    const matchesSearch = pdf.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || pdf.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPdfs = filteredPdfs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPdfs.length / itemsPerPage);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>All PDF Resources</h2>

      {/* Search and Filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search PDFs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', flex: '1', minWidth: '200px' }}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: '10px', minWidth: '150px' }}
        >
          <option value="all">All Categories</option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      {/* PDF List */}
      {currentPdfs.length === 0 ? (
        <p>No PDFs available</p>
      ) : (
        <div className="video-grid">
          {currentPdfs.map((pdf) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              style={{
                padding: '8px 12px',
                margin: '0 5px',
                backgroundColor: currentPage === i + 1 ? '#1e88e5' : '#f0f0f0',
                color: currentPage === i + 1 ? 'white' : 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
