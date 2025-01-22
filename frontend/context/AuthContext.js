import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    loadUser();
  }, []);

  const register = async (name, email, password) => {
    const response = await axios.post('http://10.0.0.10:4444/api/v1/auth/register', { name, email, password });
    setUser(response.data);
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  };

  const login = async (email, password) => {
    const response = await axios.post('http://10.0.0.10:4444/api/v1/auth/login', { email, password });
    setUser(response.data);
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };