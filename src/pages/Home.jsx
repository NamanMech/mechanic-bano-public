import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

export default function Home() {
  const [welcome, setWelcome] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWelcome = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + 'welcome');
      setWelcome(response.data);
    } catch (error) {
      alert('Error fetching welcome note');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWelcome();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2>{welcome ? welcome.title : 'Welcome to Mechanic Bano'}</h2>
      <p>{welcome ? welcome.message : 'Learn to repair your bike with us!'}</p>
    </div>
  );
}
