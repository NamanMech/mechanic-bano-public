// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/'); // Redirect if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
  localStorage.removeItem('user');
  navigate('/');
  window.location.reload(); // Force refresh to reset state in App
};
  if (!user) return null;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-card">
        {user.picture && <img src={user.picture} alt="Profile" className="profile-pic" />}
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
