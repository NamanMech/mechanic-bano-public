import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + 'youtube');
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

  if (loading) return <Spinner />;

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
              src={video.embedLink}
              title={video.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <p>{video.description}</p>
            <p className="category-badge">{video.category}</p>
          </div>
        ))
      )}
    </div>
  );
}
