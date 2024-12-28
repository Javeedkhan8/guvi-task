// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Example AuthContext for holding user authentication state
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Assume we fetch user details from local storage or an API (e.g., after login)
    const storedUser = JSON.parse(localStorage.getItem('user')); // Or call an API
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    // Set user to state and store in local storage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
