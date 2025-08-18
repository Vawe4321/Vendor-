export interface User {
  id: string;
  email: string;
  phone: string;
  businessName: string;
  ownerName: string;
  address: string;
  isOnline: boolean;
  isVerified: boolean;
  rating: number;
  totalOrders: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  phone: string;
  password?: string;
  otp?: string;
}

export interface RegisterData {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  businessType: string;
  gstNumber?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface OTPVerificationData {
  phone: string;
  otp: string;
}