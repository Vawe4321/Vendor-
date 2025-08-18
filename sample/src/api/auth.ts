import api from './index';
import { LoginRequest, LoginResponse, RegisterRequest, ApiResponse } from './types';

// Authentication API endpoints
export const authAPI = {
  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Register new restaurant
  register: async (data: RegisterRequest): Promise<ApiResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Logout
  logout: async (): Promise<ApiResponse> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Refresh token
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  // Verify email
  verifyEmail: async (token: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  // Resend verification email
  resendVerification: async (email: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data;
  },

  // Get current user profile
  getProfile: async (): Promise<ApiResponse> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update profile
  updateProfile: async (data: any): Promise<ApiResponse> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },
};
