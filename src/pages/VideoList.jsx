// src/pages/VideoList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/youtube');
      setVideos(response.data);
    } catch (error) {
      alert('Error fetching videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div>
      <h2>All Tutorials</h2>
      {videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
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
    </div>
  );
}
