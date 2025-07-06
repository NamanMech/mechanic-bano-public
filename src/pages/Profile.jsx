// src/pages/Profile.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useSubscription from '../hooks/useSubscription';
import Spinner from '../components/Spinner';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isSubscribed, loading: subscriptionLoading, subscriptionEnd } = useSubscription(user?.email);

  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '30px' }}>Please login to view profile.</div>;
  }

  if (subscriptionLoading) return <Spinner />;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.picture} alt={user.name} className="profile-pic" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        {isSubscribed ? (
          <>
            <p style={{ color: 'green', marginTop: '10px' }}>Subscription Status: Active 🎉</p>
            {subscriptionEnd && (
              <p>Valid Till: {formatDate(subscriptionEnd)}</p>
            )}
          </>
        ) : (
          <p style={{ color: 'red', marginTop: '10px' }}>Subscription Status: Inactive ❌</p>
        )}

        <button
          onClick={() => navigate('/subscription')}
          className="logout-btn"
          style={{ marginTop: '20px', backgroundColor: '#1e88e5' }}
        >
          View Subscription Plans
        </button>

        <button onClick={handleLogout} className="logout-btn" style={{ marginTop: '20px' }}>
          Logout
        </button>
      </div>
    </div>
  );
}
