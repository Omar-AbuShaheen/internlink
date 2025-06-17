import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setUser(decoded);
      } catch {
        setRole(null);
        setUser(null);
      }
    } else {
      setRole(null);
      setUser(null);
    }
  }, []);

  const login = (token) => {
    sessionStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      setUser(decoded);
    } catch {
      setRole(null);
      setUser(null);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 