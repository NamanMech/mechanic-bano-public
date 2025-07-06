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
    try {
      if (!credentialResponse?.credential) {
        alert('Login failed: No credential received.');
        return;
      }

      const decoded = jwt_decode(credentialResponse.credential);

      if (!decoded?.email) {
        alert('Login failed: Invalid token data.');
        return;
      }

      // ✅ Send to backend at /api/users
      const response = await axios.post('https://mechanic-bano-backend.vercel.app/api/users', {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      });

      login(response.data, rememberMe);

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
