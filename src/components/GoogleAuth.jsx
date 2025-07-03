// src/components/GoogleAuth.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function GoogleAuth({ onLogin }) {
  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwt_decode(credentialResponse.credential);
      if (decoded) {
        localStorage.setItem('user', JSON.stringify(decoded));
        onLogin(decoded);
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
    </div>
  );
}
