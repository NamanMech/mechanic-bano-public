// src/pages/VideoList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import useSubscription from '../hooks/useSubscription';

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { isSubscribed, loading: subscriptionLoading } = useSubscription(user?.email);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/youtube');
      setVideos(response.data);
    } catch (error) {
      setError('Error fetching videos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading || subscriptionLoading) return <Spinner />;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>;

  return (
    <div>
      {videos.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No videos available</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <div className="video-card" key={video._id}>
              <h3>{video.title}</h3>
              {isSubscribed ? (
                <iframe
                  width="100%"
                  height="300"
                  src={video.embedLink}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px'
                  }}
                >
                  🔒 <span style={{ marginLeft: '8px' }}>Subscribe to unlock this video</span>
                </div>
              )}
              <p>{video.description}</p>
              <span className="category-badge">{video.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
