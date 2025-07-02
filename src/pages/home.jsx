import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [welcomeNote, setWelcomeNote] = useState('');

  const fetchWelcomeNote = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/welcome');
      setWelcomeNote(response.data.note);
    } catch (error) {
      console.error('Error fetching welcome note');
    }
  };

  useEffect(() => {
    fetchWelcomeNote();
  }, []);

  return (
    <div>
      <h2>Welcome to Mechanic Bano</h2>
      <p>{welcomeNote || 'Learn bike repairing with our free and premium tutorials and PDFs!'}</p>
    </div>
  );
}
