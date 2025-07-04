// src/components/GoogleAuth.jsx
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

export default function GoogleAuth() {
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwt_decode(credentialResponse.credential);
      if (decoded) {
        login(decoded, rememberMe);
      }
    } catch (error) {
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
