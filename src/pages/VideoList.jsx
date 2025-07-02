import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VideoList() {
  const [videos, setVideos] = useState([]);

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

  return (
    <div className="video-grid">
      {videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        videos.map((video) => (
          <div className="video-card" key={video._id}>
            <iframe
              src={video.embedLink}
              title={video.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <span className="category-badge">{video.category}</span>
          </div>
        ))
      )}
    </div>
  );
}
