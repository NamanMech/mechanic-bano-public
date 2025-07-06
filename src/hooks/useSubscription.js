import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useSubscription(email) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    const checkSubscription = async () => {
      try {
        const response = await axios.get(`https://mechanic-bano-backend.vercel.app/api/checksubscription?email=${email}`);
        setIsSubscribed(response.data.isSubscribed);
      } catch (error) {
        console.error('Error checking subscription', error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [email]);

  return { isSubscribed, loading };
}
