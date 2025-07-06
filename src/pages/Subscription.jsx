// src/pages/Subscription.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import useSubscription from '../hooks/useSubscription';

export default function Subscription() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isSubscribed, loading: subscriptionLoading } = useSubscription(user?.email);

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [activating, setActivating] = useState(false);

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

  if (!user) return <div style={{ textAlign: 'center', marginTop: '30px' }}>Please login to view subscription plans.</div>;

  if (subscriptionLoading || loadingPlans) return <Spinner />;

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>Available Subscription Plans</h2>

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
    </div>
  );
}
