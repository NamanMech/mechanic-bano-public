import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check both localStorage and sessionStorage
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, remember) => {
    if (remember) {
      localStorage.setItem('user', JSON.stringify(userData)); // Persistent
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData)); // Clears on browser close
    }
    setUser(userData);
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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsSubscribed(parsedUser.isSubscribed);
    }
  }, []);

  const login = (userData, remember) => {
    if (remember) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData));
    }
    setUser(userData);
    setIsSubscribed(userData.isSubscribed);
  };

  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setUser(null);
    setIsSubscribed(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isSubscribed, setIsSubscribed }}>
      {children}
    </AuthContext.Provider>
  );
}
