import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import useSubscription from '../hooks/useSubscription';

export default function Subscription() {
  const { user } = useAuth();
  const { subscriptionDays, isSubscribed, loading: subscriptionLoading } = useSubscription(user?.email);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // ✅ Correct API
        const response = await axios.get('https://mechanic-bano-backend.vercel.app/api/subscription');
        setPlans(response.data);
      } catch (error) {
        alert('Error fetching plans.');
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId) => {
    try {
      setActivating(true);
      // ✅ Correct API
      await axios.put(`https://mechanic-bano-backend.vercel.app/api/user?email=${user.email}`, { planId });
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

          let buttonText = 'Subscribe';
          if (isSubscribed) {
            if (isCurrentPlan) buttonText = 'Current Plan';
            else if (isLowerPlan) buttonText = 'Lower Plan';
            else buttonText = 'Upgrade';
          }

          return (
            <div key={plan._id} style={cardStyle}>
              <h4>{plan.title}</h4>
              <p>Price: ₹{plan.price}</p>
              <p>Validity: {plan.days} days</p>

              {isCurrentPlan && <p style={{ color: 'green' }}>Your Current Plan ✅</p>}

              <button
                onClick={() => handleSubscribe(plan._id)}
                disabled={isCurrentPlan || isLowerPlan || activating}
                className="logout-btn"
                style={{
                  backgroundColor: isCurrentPlan || isLowerPlan ? 'gray' : '#1e88e5',
                  marginTop: '10px',
                  cursor: isCurrentPlan || isLowerPlan ? 'not-allowed' : 'pointer',
                  width: '100%',
                }}
              >
                {activating ? 'Processing...' : buttonText}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  marginBottom: '15px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  backgroundColor: 'white',
};
