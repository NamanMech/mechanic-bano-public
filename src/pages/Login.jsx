import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function Login() {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    console.log('User Info:', decoded);
    alert(`Welcome, ${decoded.name}!`);
    // Yaha tum user ki info localStorage me save kar sakte ho future ke liye
    localStorage.setItem('user', JSON.stringify(decoded));
    // Yaha tum redirect kar sakte ho home page ya profile page
    window.location.href = '/';
  };

  const handleError = () => {
    alert('Login Failed');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}
