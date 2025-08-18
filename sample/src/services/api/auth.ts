import { apiClient } from './client';
import { LoginCredentials, RegisterData, AuthResponse } from '../../types/auth';

export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  },

  register: async (userData: RegisterData) => {
    return apiClient.post<{ message: string }>('/auth/register', userData);
  },

  verifyOTP: async (phone: string, otp: string) => {
    return apiClient.post<AuthResponse>('/auth/verify-otp', { phone, otp });
  },

  resendOTP: async (phone: string) => {
    return apiClient.post<{ message: string }>('/auth/resend-otp', { phone });
  },

  logout: async () => {
    return apiClient.post('/auth/logout');
  },

  refreshToken: async (refreshToken: string) => {
    return apiClient.post<AuthResponse>('/auth/refresh', { refreshToken });
  },

  forgotPassword: async (phone: string) => {
    return apiClient.post<{ message: string }>('/auth/forgot-password', { phone });
  },

  resetPassword: async (phone: string, otp: string, newPassword: string) => {
    return apiClient.post<{ message: string }>('/auth/reset-password', {
      phone,
      otp,
      newPassword,
    });
  },
};