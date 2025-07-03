// src/components/GoogleAuth.jsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function GoogleAuth({ onSuccess }) {
  return (
    <GoogleOAuthProvider clientId="303726026304-0q7mt0gsqervgmkgp8tkck7nviluek1l.apps.googleusercontent.com">
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            const decoded = jwt_decode(credentialResponse.credential);
            onSuccess(decoded);
          }}
          onError={() => {
            alert('Login Failed');
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
