import React, { useEffect, useState } from 'react';
import VideoList from './VideoList';
import axios from 'axios';

export default function Home() {
  const [welcomeNote, setWelcomeNote] = useState({ title: '', message: '' });

  const fetchWelcomeNote = async () => {
    try {
      const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/welcome');
      if (response.data) {
        setWelcomeNote(response.data);
      }
    } catch (error) {
      console.error('Error fetching welcome note');
    }
  };

  useEffect(() => {
    fetchWelcomeNote();
  }, []);

  return (
    <div>
      {/* Welcome Note Card */}
      <div style={{
        backgroundColor: '#e0f7fa',
        border: '1px solid #00acc1',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <h2>{welcomeNote.title || 'Welcome to Mechanic Bano!'}</h2>
        <p>{welcomeNote.message || 'Learn bike repairing with our free and premium tutorials.'}</p>
      </div>

      {/* Video Section */}
      <h2>All Tutorials</h2>
      <VideoList />
    </div>
  );
}
