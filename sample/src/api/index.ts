import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_BASE_URL = 'https://api.grooso.com/v1'; // Replace with your actual API base URL

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      // You can add navigation to login screen here
    }
    return Promise.reject(error);
  }
);

// Export all API modules
export { default as api } from './index';
export { authAPI } from './auth';
export { ordersAPI } from './orders';
export { inventoryAPI } from './inventory';
export { analyticsAPI } from './analytics';
export { feedbackAPI } from './feedback';
export { profileAPI } from './profile';

// Export types
export * from './types';

export default api;
