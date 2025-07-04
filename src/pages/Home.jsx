// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

export default function Home() {
  const [welcomeNote, setWelcomeNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWelcomeNote = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/welcome');
      if (response.data && response.data.title) {
        setWelcomeNote(response.data);
      } else {
        setError('No welcome note found.');
      }
    } catch (error) {
      setError('Error fetching welcome note.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWelcomeNote();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>;

  return (
    <div>
      <h2>{welcomeNote?.title || 'Welcome to Mechanic Bano'}</h2>
      <p>{welcomeNote?.message || 'Learn to repair bikes with our easy tutorials.'}</p>
    </div>
  );
}
