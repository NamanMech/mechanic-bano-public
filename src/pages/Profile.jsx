import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import useSubscription from '../hooks/useSubscription';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isSubscribed, loading: subscriptionLoading, subscriptionEnd, subscriptionDays } = useSubscription(user?.email);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [activating, setActivating] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <button onClick={() => setActiveTab('profile')} style={activeTab === 'profile' ? activeTabStyle : tabStyle}>Profile</button>
          <button onClick={() => setActiveTab('plans')} style={activeTab === 'plans' ? activeTabStyle : tabStyle}>Subscription Plans</button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <>
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

            <button onClick={handleLogout} className="logout-btn" style={{ marginTop: '20px' }}>
              Logout
            </button>
          </>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <>
            <h3>Available Subscription Plans</h3>
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
                    <p>Discount: {plan.discount || 0}%</p>

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

            <button onClick={() => setActiveTab('profile')} className="logout-btn" style={{ marginTop: '20px' }}>
              Back to Profile
            </button>
          </>
        )}

      </div>
    </div>
  );
}

const tabStyle = {
  padding: '10px 20px',
  margin: '0 10px',
  border: '1px solid gray',
  backgroundColor: '#2c3e50',
  color: 'white',
  cursor: 'pointer',
};

const activeTabStyle = {
  ...tabStyle,
  backgroundColor: '#1e88e5',
};
