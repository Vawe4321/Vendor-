import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, RegisterData } from '../../types/auth';
import { mockUser } from '../../utils/mockData';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isFreshLogin: boolean; // Track if this is a fresh login
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isFreshLogin: false, // Start as false, will be set to true on fresh login
};

// Storage keys
const AUTH_STORAGE_KEY = '@auth_data';

// Helper functions for persistence
const saveAuthData = async (authData: { user: User; token: string }) => {
  try {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
  } catch (error) {
    console.error('Error saving auth data:', error);
  }
};

const loadAuthData = async () => {
  try {
    const authData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    return authData ? JSON.parse(authData) : null;
  } catch (error) {
    console.error('Error loading auth data:', error);
    return null;
  }
};

const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication - accept any phone/password combination
      if (credentials.phone.trim()) {
        const authData = {
          user: mockUser,
          token: 'mock-jwt-token-12345',
          refreshToken: 'mock-refresh-token-67890',
        };
        
        // Save to persistent storage
        await saveAuthData({ user: authData.user, token: authData.token });
        
        return authData;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      return {
        message: 'Registration successful. Please verify your phone number.',
        phone: userData.phone,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ phone, otp }: { phone: string; otp: string }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      // Mock OTP verification - accept any 6-digit OTP
      if (otp.length === 6) {
        const authData = {
          user: { ...mockUser, phone },
          token: 'mock-jwt-token-12345',
          refreshToken: 'mock-refresh-token-67890',
        };
        
        // Save to persistent storage
        await saveAuthData({ user: authData.user, token: authData.token });
        
        return authData;
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'OTP verification failed');
    }
  }
);

// Initialize auth state from storage
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    try {
      // For demo purposes, always start with no authentication
      // This ensures the login flow is shown every time
      await clearAuthData(); // Clear any stored auth data
      return null;
    } catch (error) {
      console.error('Error initializing auth:', error);
      return null;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isFreshLogin = false; // Set to false after logout
      // Clear from storage
      clearAuthData();
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Initialize auth
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.isFreshLogin = false; // Set to false after successful initialization
        }
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isFreshLogin = true; // This is a fresh login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Don't set as authenticated until OTP verification
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // OTP Verification
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isFreshLogin = true; // This is a fresh login
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;