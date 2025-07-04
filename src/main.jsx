import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="303726026304-0q7mt0gsqervgmkgp8tkck7nviluek1l.apps.googleusercontent.com">
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </GoogleOAuthProvider>
);
