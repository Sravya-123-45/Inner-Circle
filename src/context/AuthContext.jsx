import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('vibecraft_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) { // Simple validation
          const mockUser = { id: '1', name: 'User', email };
          setUser(mockUser);
          localStorage.setItem('vibecraft_user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject('Invalid credentials');
        }
      }, 500); // Simulate network delay
    });
  };

  const signup = (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = { id: '1', name: 'New User', email };
        setUser(mockUser);
        localStorage.setItem('vibecraft_user', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vibecraft_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
