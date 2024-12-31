<<<<<<< HEAD
// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

  const login = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id);
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
=======
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
>>>>>>> d98f03bd2c26482d7aa5c4510ef50d7d7954ad4e
      {children}
    </AuthContext.Provider>
  );
};
<<<<<<< HEAD

export const useAuth = () => useContext(AuthContext);
=======
>>>>>>> d98f03bd2c26482d7aa5c4510ef50d7d7954ad4e
