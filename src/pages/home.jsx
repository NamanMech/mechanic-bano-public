// src/pages/home.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
// Existing imports remain same

export default function Home() {
  const [welcomeNote, setWelcomeNote] = useState('');
  const [title, setTitle] = useState('');

  const fetchWelcomeNote = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/welcome');
      console.log('API response:', response.data);
      setWelcomeNote(response.data.message);
      setTitle(response.data.title);
    } catch (error) {
      console.error('Error fetching welcome note', error);
    }
  };

  useEffect(() => {
    fetchWelcomeNote();
  }, []);

  return (
    <div>
      <h2>{title || 'Welcome to Mechanic Bano'}</h2>
      <p>{welcomeNote || 'Learn bike repairing with our free and premium tutorials and PDFs!'}</p>
    </div>
  );
}
