import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

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
    return <Spinner />;
  }

  return (
    <div>
      {videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <div className="video-card" key={video._id}>
              <h3>{video.title}</h3>
              <iframe
                width="100%"
                height="300"
                src={video.embedLink}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
