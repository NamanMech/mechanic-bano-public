import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import useSubscription from '../hooks/useSubscription';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isSubscribed, loading } = useSubscription(user?.email);
  const [activating, setActivating] = useState(false);

  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '30px' }}>Please login to view profile.</div>;
  }

  const handleSubscribe = async () => {
    try {
      setActivating(true);
      await axios.put(`https://mechanic-bano-backend.vercel.app/api/subscribe?email=${user.email}`, {
        days: 30,
      });
      alert('Subscription Activated Successfully!');
      navigate('/videos');
    } catch (error) {
      alert('Error activating subscription.');
    } finally {
      setActivating(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.picture} alt={user.name} className="profile-pic" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        {isSubscribed ? (
          <p style={{ color: 'green', marginTop: '10px' }}>Subscription Status: Active 🎉</p>
        ) : (
          <>
            <p style={{ color: 'red', marginTop: '10px' }}>Subscription Status: Inactive ❌</p>
            <button
              onClick={handleSubscribe}
              disabled={activating}
              className="logout-btn"
              style={{ backgroundColor: '#1e88e5', marginTop: '10px' }}
            >
              {activating ? 'Activating...' : 'Activate 30 Days Subscription'}
            </button>
          </>
        )}

        <button onClick={logout} className="logout-btn" style={{ marginTop: '20px' }}>
          Logout
        </button>
      </div>
    </div>
  );
}
