import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on mount
    const checkAuth = () => {
      const authData = localStorage.getItem('adminAuth');
      if (authData) {
        try {
          const { authenticated, adminData } = JSON.parse(authData);
          setIsAuthenticated(authenticated);
          setAdmin(adminData);
        } catch (error) {
          console.error('Error parsing auth data:', error);
          localStorage.removeItem('adminAuth');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      // Simulate API call for authentication
      if (credentials.username === 'admin' && credentials.password === 'drools2024') {
        const adminData = {
          username: credentials.username,
          name: 'Administrator',
          email: 'admin@droolspetstore.com',
        };

        setIsAuthenticated(true);
        setAdmin(adminData);
        
        // Store authentication data
        localStorage.setItem('adminAuth', JSON.stringify({
          authenticated: true,
          adminData
        }));

        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
    localStorage.removeItem('adminAuth');
  };

  const value = {
    isAuthenticated,
    admin,
    loading,
    login,
    logout,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
