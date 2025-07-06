// src/components/GoogleAuth.jsx
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function GoogleAuth() {
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    console.log('Credential Response:', credentialResponse);

    try {
      const decoded = jwt_decode(credentialResponse.credential);
      console.log('Decoded User:', decoded);

      if (decoded && decoded.email) {
        // ✅ Save to backend
        const response = await axios.post('https://mechanic-bano-backend.vercel.app/api/user', {
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
        });

        console.log('Backend Response:', response.data);

        login(response.data, rememberMe);
      } else {
        alert('Invalid token data.');
      }
    } catch (error) {
      console.error('Token decode error:', error);
      alert('Error decoding token. Please try again.');
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
