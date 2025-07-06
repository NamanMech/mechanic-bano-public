// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.email) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('user');
          sessionStorage.removeItem('user');
        }
      }
    } catch (error) {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    }
  }, []);

  const login = async (userData, remember) => {
    try {
      const response = await axios.post('https://mechanic-bano-backend.vercel.app/api/user', userData);

      if (response.data && response.data.email) {
        const updatedUser = response.data;

        if (remember) {
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
        }
        setUser(updatedUser);
      } else {
        alert('Login failed. Invalid response from server.');
      }
    } catch (error) {
      console.error('Error syncing user:', error);
      alert('Login failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
