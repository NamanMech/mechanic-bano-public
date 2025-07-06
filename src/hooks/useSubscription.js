import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useSubscription(email) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    const checkSubscription = async () => {
      try {
        const response = await axios.get(`https://mechanic-bano-backend.vercel.app/api/subscription?type=check&email=${email}`);
        setIsSubscribed(response.data.isSubscribed);
        setSubscriptionEnd(response.data.subscriptionEnd);
      } catch (error) {
        console.error('Error checking subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [email]);

  return { isSubscribed, subscriptionEnd, loading };
}
