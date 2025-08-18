import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginCredentials, RegisterData } from '../../types/auth';
import { mockUser } from '../../utils/mockData';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
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
        return {
          user: mockUser,
          token: 'mock-jwt-token-12345',
          refreshToken: 'mock-refresh-token-67890',
        };
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
        return {
          user: { ...mockUser, phone },
          token: 'mock-jwt-token-12345',
          refreshToken: 'mock-refresh-token-67890',
        };
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'OTP verification failed');
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
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;