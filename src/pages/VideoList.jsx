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
    <div>
      {videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        videos.map((video) => (
          <div className="video-card" key={video._id}>
            <h3>{video.title}</h3>
            <iframe
              width="350"
              height="200"
              src={video.link}
              title={video.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <p>{video.description}</p>
            <p style={{ fontWeight: 'bold' }}>Category: {video.category}</p>
          </div>
        ))
      )}
    </div>
  );
}
