import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 4;

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/youtube');
      setVideos(response.data);
    } catch (error) {
      alert('Error fetching videos');
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Search and filter logic
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  return (
    <div>
      {/* Search and Filter */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            maxWidth: '400px',
            width: '100%',
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            maxWidth: '200px',
            width: '100%',
          }}
        >
          <option value="all">All Categories</option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      {/* Videos */}
      {currentVideos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        <div className="video-grid">
          {currentVideos.map((video) => (
            <div className="video-card" key={video._id}>
              <h3>{video.title}</h3>
              <iframe
                src={video.embedLink}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <p>{video.description}</p>
              <span className="category-badge">{video.category}</span>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: currentPage === index + 1 ? '2px solid #1e88e5' : '1px solid #ccc',
                backgroundColor: currentPage === index + 1 ? '#1e88e5' : '#fff',
                color: currentPage === index + 1 ? '#fff' : '#000',
                cursor: 'pointer',
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
