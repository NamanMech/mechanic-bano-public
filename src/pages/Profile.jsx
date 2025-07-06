import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import useSubscription from '../hooks/useSubscription';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isSubscribed, loading: subscriptionLoading } = useSubscription(user?.email);
  const [activating, setActivating] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/subscriptionPlans');
        setPlans(response.data);
      } catch (error) {
        alert('Error fetching plans.');
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (days) => {
    try {
      setActivating(true);
      await axios.put(`https://mechanic-bano-backend.vercel.app/api/subscribe?email=${user.email}`, {
        days,
      });
      alert('Subscription Activated Successfully!');
      navigate('/videos');
    } catch (error) {
      alert('Error activating subscription.');
    } finally {
      setActivating(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '30px' }}>Please login to view profile.</div>;
  }

  if (subscriptionLoading || loadingPlans) return <Spinner />;

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
            <h3 style={{ marginTop: '30px' }}>Available Subscription Plans</h3>
            {plans.length === 0 ? (
              <p>No plans available.</p>
            ) : (
              plans.map((plan) => (
                <div key={plan._id} style={{ border: '1px solid gray', padding: '10px', marginTop: '10px', borderRadius: '8px' }}>
                  <h4>{plan.title}</h4>
                  <p>Price: ₹{plan.price}</p>
                  <p>Validity: {plan.days} days</p>
                  <p>Discount: {plan.discount || 0}%</p>
                  <button
                    onClick={() => handleSubscribe(plan.days)}
                    disabled={activating}
                    className="logout-btn"
                    style={{ backgroundColor: '#1e88e5', marginTop: '10px' }}
                  >
                    {activating ? 'Activating...' : 'Subscribe'}
                  </button>
                </div>
              ))
            )}
          </>
        )}

        <button onClick={handleLogout} className="logout-btn" style={{ marginTop: '20px' }}>
          Logout
        </button>
      </div>
    </div>
  );
}
