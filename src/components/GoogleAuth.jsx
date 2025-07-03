// src/components/GoogleAuth.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function GoogleAuth({ onLogin }) {
  return (
    <div className="login-container">
      <GoogleLogin
        onSuccess={credentialResponse => {
          const decoded = jwt_decode(credentialResponse.credential);
          localStorage.setItem('user', JSON.stringify(decoded));
          onLogin(decoded);
        }}
        onError={() => {
          alert('Login Failed');
        }}
      />
    </div>
  );
}
