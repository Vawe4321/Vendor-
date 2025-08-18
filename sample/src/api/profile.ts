import api from './index';
import { 
  RestaurantProfile, 
  UpdateProfileRequest, 
  NotificationSettings,
  UpdateNotificationSettingsRequest,
  ApiResponse 
} from './types';

// Profile API endpoints
export const profileAPI = {
  // Get restaurant profile
  getProfile: async (): Promise<ApiResponse<RestaurantProfile>> => {
    const response = await api.get('/profile');
    return response.data;
  },

  // Update restaurant profile
  updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse<RestaurantProfile>> => {
    const response = await api.put('/profile', data);
    return response.data;
  },

  // Update restaurant status (online/offline)
  updateStatus: async (isOnline: boolean): Promise<ApiResponse> => {
    const response = await api.put('/profile/status', { isOnline });
    return response.data;
  },

  // Get notification settings
  getNotificationSettings: async (): Promise<ApiResponse<NotificationSettings>> => {
    const response = await api.get('/profile/notifications');
    return response.data;
  },

  // Update notification settings
  updateNotificationSettings: async (data: UpdateNotificationSettingsRequest): Promise<ApiResponse> => {
    const response = await api.put('/profile/notifications', data);
    return response.data;
  },

  // Upload restaurant logo
  uploadLogo: async (logoFile: any): Promise<ApiResponse<{ logoUrl: string }>> => {
    const formData = new FormData();
    formData.append('logo', logoFile);
    
    const response = await api.post('/profile/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Upload restaurant banner
  uploadBanner: async (bannerFile: any): Promise<ApiResponse<{ bannerUrl: string }>> => {
    const formData = new FormData();
    formData.append('banner', bannerFile);
    
    const response = await api.post('/profile/banner', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get business hours
  getBusinessHours: async (): Promise<ApiResponse<RestaurantProfile['openingHours']>> => {
    const response = await api.get('/profile/business-hours');
    return response.data;
  },

  // Update business hours
  updateBusinessHours: async (hours: RestaurantProfile['openingHours']): Promise<ApiResponse> => {
    const response = await api.put('/profile/business-hours', { hours });
    return response.data;
  },

  // Get delivery settings
  getDeliverySettings: async (): Promise<ApiResponse<{
    deliveryRadius: number;
    minimumOrder: number;
    deliveryFee: number;
    averagePreparationTime: number;
  }>> => {
    const response = await api.get('/profile/delivery-settings');
    return response.data;
  },

  // Update delivery settings
  updateDeliverySettings: async (data: {
    deliveryRadius?: number;
    minimumOrder?: number;
    deliveryFee?: number;
    averagePreparationTime?: number;
  }): Promise<ApiResponse> => {
    const response = await api.put('/profile/delivery-settings', data);
    return response.data;
  },

  // Get cuisine preferences
  getCuisinePreferences: async (): Promise<ApiResponse<string[]>> => {
    const response = await api.get('/profile/cuisine-preferences');
    return response.data;
  },

  // Update cuisine preferences
  updateCuisinePreferences: async (cuisines: string[]): Promise<ApiResponse> => {
    const response = await api.put('/profile/cuisine-preferences', { cuisines });
    return response.data;
  },

  // Get account settings
  getAccountSettings: async (): Promise<ApiResponse<{
    email: string;
    phone: string;
    language: string;
    timezone: string;
    currency: string;
  }>> => {
    const response = await api.get('/profile/account-settings');
    return response.data;
  },

  // Update account settings
  updateAccountSettings: async (data: {
    email?: string;
    phone?: string;
    language?: string;
    timezone?: string;
    currency?: string;
  }): Promise<ApiResponse> => {
    const response = await api.put('/profile/account-settings', data);
    return response.data;
  },

  // Get security settings
  getSecuritySettings: async (): Promise<ApiResponse<{
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginHistory: Array<{
      date: string;
      device: string;
      location: string;
    }>;
  }>> => {
    const response = await api.get('/profile/security-settings');
    return response.data;
  },

  // Enable/disable two-factor authentication
  toggleTwoFactor: async (enabled: boolean): Promise<ApiResponse> => {
    const response = await api.put('/profile/security-settings/two-factor', { enabled });
    return response.data;
  },

  // Get privacy settings
  getPrivacySettings: async (): Promise<ApiResponse<{
    dataSharing: boolean;
    marketingEmails: boolean;
    analyticsTracking: boolean;
  }>> => {
    const response = await api.get('/profile/privacy-settings');
    return response.data;
  },

  // Update privacy settings
  updatePrivacySettings: async (data: {
    dataSharing?: boolean;
    marketingEmails?: boolean;
    analyticsTracking?: boolean;
  }): Promise<ApiResponse> => {
    const response = await api.put('/profile/privacy-settings', data);
    return response.data;
  },

  // Get support information
  getSupportInfo: async (): Promise<ApiResponse<{
    supportEmail: string;
    supportPhone: string;
    supportHours: string;
    faqUrl: string;
    documentationUrl: string;
  }>> => {
    const response = await api.get('/profile/support-info');
    return response.data;
  },

  // Submit support ticket
  submitSupportTicket: async (data: {
    subject: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: string;
  }): Promise<ApiResponse<{ ticketId: string }>> => {
    const response = await api.post('/profile/support-ticket', data);
    return response.data;
  },

  // Get system preferences
  getSystemPreferences: async (): Promise<ApiResponse<{
    theme: 'light' | 'dark' | 'auto';
    language: string;
    timezone: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
  }>> => {
    const response = await api.get('/profile/system-preferences');
    return response.data;
  },

  // Update system preferences
  updateSystemPreferences: async (data: {
    theme?: 'light' | 'dark' | 'auto';
    language?: string;
    timezone?: string;
    dateFormat?: string;
    timeFormat?: '12h' | '24h';
  }): Promise<ApiResponse> => {
    const response = await api.put('/profile/system-preferences', data);
    return response.data;
  },

  // Export profile data
  exportProfileData: async (): Promise<ApiResponse<{ downloadUrl: string }>> => {
    const response = await api.get('/profile/export');
    return response.data;
  },

  // Delete account
  deleteAccount: async (reason: string): Promise<ApiResponse> => {
    const response = await api.delete('/profile/account', { data: { reason } });
    return response.data;
  },
};
