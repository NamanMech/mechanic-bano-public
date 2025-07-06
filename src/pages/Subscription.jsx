// src/pages/Subscription.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import useSubscription from '../hooks/useSubscription';

export default function Subscription() {
  const { user } = useAuth();
  const { subscriptionDays, loading: subscriptionLoading } = useSubscription(user?.email);
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
      await axios.put(`https://mechanic-bano-backend.vercel.app/api/subscribe?email=${user.email}`, { days });
      alert('Subscription Activated Successfully!');
      window.location.reload();
    } catch (error) {
      alert('Error activating subscription.');
    } finally {
      setActivating(false);
    }
  };

  if (subscriptionLoading || loadingPlans) return <Spinner />;

  return (
    <div className="profile-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Available Subscription Plans</h2>
      {plans.length === 0 ? (
        <p>No plans available.</p>
      ) : (
        plans.map((plan) => {
          const isCurrentPlan = subscriptionDays === parseInt(plan.days);
          const isLowerPlan = subscriptionDays > parseInt(plan.days);

          return (
            <div key={plan._id} style={{ border: '1px solid gray', padding: '10px', marginTop: '10px', borderRadius: '8px' }}>
              <h4>{plan.title}</h4>
              <p>Price: ₹{plan.price}</p>
              <p>Validity: {plan.days} days</p>

              {isCurrentPlan && <p style={{ color: 'green' }}>Your Current Plan ✅</p>}

              <button
                onClick={() => handleSubscribe(plan.days)}
                disabled={isCurrentPlan || isLowerPlan || activating}
                className="logout-btn"
                style={{
                  backgroundColor: isCurrentPlan || isLowerPlan ? 'gray' : '#1e88e5',
                  marginTop: '10px',
                  cursor: isCurrentPlan || isLowerPlan ? 'not-allowed' : 'pointer',
                }}
              >
                {isCurrentPlan ? 'Current Plan' : isLowerPlan ? 'Lower Plan' : activating ? 'Activating...' : 'Subscribe / Upgrade'}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
