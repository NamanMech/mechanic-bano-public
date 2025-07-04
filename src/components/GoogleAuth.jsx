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
      <div style={{ marginTop: '10px' }}>
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        <label htmlFor="rememberMe" style={{ marginLeft: '5px' }}>Remember Me</label>
      </div>
    </div>
  );
}
