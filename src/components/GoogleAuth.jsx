import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function GoogleAuth() {
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSuccess = async (response) => {
    try {
      const { credential } = response;

      if (!credential) {
        alert('Login failed: No credential received.');
        return;
      }

      // ✅ Send credential directly to Google's userinfo API
      const googleUser = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credential}`);

      if (!googleUser?.data?.email) {
        alert('Login failed: Unable to verify token.');
        return;
      }

      // ✅ Save to backend
      const backendResponse = await axios.post('https://mechanic-bano-backend.vercel.app/api/user', {
        email: googleUser.data.email,
        name: googleUser.data.name,
        picture: googleUser.data.picture,
      });

      login(backendResponse.data, rememberMe);
    } catch (error) {
      console.error('Login error:', error);
      alert('Error during login. Please try again.');
    }
  };

  const handleError = () => {
    alert('Google Login Failed. Please try again.');
  };

  return (
    <div className="login-container">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      <label className="remember-me">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        Remember Me
      </label>
    </div>
  );
}
