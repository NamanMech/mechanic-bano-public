// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [welcomeNote, setWelcomeNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWelcomeNote = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/welcome');
      if (response.data.length > 0) {
        setWelcomeNote(response.data[0]);
      }
    } catch (error) {
      alert('Error fetching welcome note');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWelcomeNote();
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div>
      <h2>{welcomeNote?.title || 'Welcome to Mechanic Bano'}</h2>
      <p>{welcomeNote?.message || 'Learn to repair bikes with our easy tutorials.'}</p>
    </div>
  );
}
