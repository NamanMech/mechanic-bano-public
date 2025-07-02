// src/pages/PDFList.jsx 

import React, { useEffect, useState } from 'react'; import axios from 'axios';

export default function PDFList() { const [pdfs, setPdfs] = useState([]); const [filteredPdfs, setFilteredPdfs] = useState([]); const [searchQuery, setSearchQuery] = useState(''); const [category, setCategory] = useState('all'); const [currentPage, setCurrentPage] = useState(1); const pdfsPerPage = 3;

const fetchPdfs = async () => { try { const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/pdf'); setPdfs(response.data); setFilteredPdfs(response.data); } catch (error) { alert('Error fetching PDFs'); } };

useEffect(() => { fetchPdfs(); }, []);

useEffect(() => { filterPdfs(); }, [searchQuery, category, pdfs]);

const filterPdfs = () => { let filtered = pdfs.filter((pdf) => pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) );

if (category !== 'all') {
  filtered = filtered.filter((pdf) => pdf.category === category);
}

setFilteredPdfs(filtered);
setCurrentPage(1);

};

// Pagination Logic const indexOfLastPdf = currentPage * pdfsPerPage; const indexOfFirstPdf = indexOfLastPdf - pdfsPerPage; const currentPdfs = filteredPdfs.slice(indexOfFirstPdf, indexOfLastPdf); const totalPages = Math.ceil(filteredPdfs.length / pdfsPerPage);

return ( <div> <h2>PDF Tutorials</h2>

{/* Search and Filter */}
  <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <input
      type="text"
      placeholder="Search PDFs"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ padding: '8px', flex: '1', minWidth: '150px' }}
    />
    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px' }}>
      <option value="all">All Categories</option>
      <option value="free">Free</option>
      <option value="premium">Premium</option>
    </select>
  </div>

  {/* PDF List */}
  <div className="video-grid">
    {currentPdfs.length === 0 ? (
      <p>No PDFs found</p>
    ) : (
      currentPdfs.map((pdf) => (
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
      ))
    )}
  </div>

  {/* Pagination */}
  {totalPages > 1 && (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          style={{
            margin: '0 5px',
            padding: '8px 12px',
            backgroundColor: currentPage === index + 1 ? '#1e88e5' : '#ddd',
            color: currentPage === index + 1 ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )}
</div>

); }

