import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

export default function Home() {
  const [welcomeNote, setWelcomeNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWelcomeNote = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/welcome');
      if (response.data && response.data.title) {
        setWelcomeNote(response.data);
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
    return <Spinner />;
  }

  return (
    <div>
      <h2>{welcomeNote?.title || 'Welcome to Mechanic Bano'}</h2>
      <p>{welcomeNote?.message || 'Learn to repair bikes with our easy tutorials.'}</p>
    </div>
  );
}
